let fs = require('fs')

function extractWords(code) { return code.match(/[a-zA-Z]+/g) }

function extractNumbers(code) { return code.match(/\d+/g) }

function hasNumber(str) { return /\d/.test(str); }

function deleteSpaces(str) { return str.replace(/\s/g, ''); }

// Replace all commas with ' and '
function replaceComma(str) {
  return str.replaceAll(', ', ' and ')
}

// Observed: Info after each ';' are extra info (i.e. recommendation, major,...)
function filterExtraInfo(str) {  
  if (str.toUpperCase().includes('NO PREREQUISITE')) return ""
  return str.split(';')[0]
}

function splitStringAtNumber(str) {
  str = deleteSpaces(str)

  const num = str.match(/\d/);
  if (num) {
    const index = num.index;
    return [str.slice(0, index), str.slice(index)];
  }

  // Course should always have number inside
  return null;
}

function extractCourses(str, defaultSubject) {
  // match full words for 3 cases: 
  //    3-4 digits + optional letters
  //    some letters + optional white space + 3-4 digits + optional letters
  //    'inside' + number
  const pattern = /\b\d{3,4}[A-Za-z]*\b|\b[A-Za-z]+\s\d{3,4}[A-Za-z]*\b|\binside\d+\b/g;
  const courses = str.match(pattern) || [];

  return courses.map(
    (each) => {
      let [subject, id] = splitStringAtNumber(each)

      // Get subject
      subject = subject.toUpperCase()
      if (!allSubjects.includes(subject)) subject = defaultSubject  // ASSUME: NO PREREQ'S SUBJECT --> USE TARGET'S SUBJECT

      // Get id
      id = id.toUpperCase()
      if (!allCourseNumbers.includes(id)) {
        if (allCourseNumbers.includes(id + 'W')) id = id + 'W'
        if (allCourseNumbers.includes(id + 'H')) id = id + 'H'
      }

      return { code: subject + ' ' + id, subject: subject, id: id }
    }
  )
}

function isEqualCourse(A, B) {
  // If A or B is not course, return false
  if (!A || !B) return false
  if (!A.code || !A.subject || !A.id) return false
  if (!B.code || !B.subject || !B.id) return false

  // If A's differs from B's, return false
  if (A.code != B.code) return false
  if (A.subject != B.subject) return false
  if (A.id != B.id) return false

  return true
}

// Use breadth first search to filter duplicate
function filterDuplicate(item) {
  // Return null and single course
  if (item == null) return null
  if (item.id) return item  

  // Traverse through 'and' array, 'or' array
  if (item.and) return { and : filterDuplicate(item.and) }
  if (item.or) return { or : filterDuplicate(item.or) }

  // Replace duplicate course with null
  for (let i = 0; i < item.length; i++) {
    for (let j = i + 1; j < item.length; j++)
      if (isEqualCourse(item[i], item[j])) {
        item[j] = null
      }

    // Filter each item
    filterDuplicate(item[i])
  }

  return item
}

function filterExtraArray(item) {
  // Return null and single course
  if (!item) return null
  if (item.id) return item  

  // Empty array becomes null
  if (item.length == 0) return null

  // Handle 'and' array
  if (item.and) {
    if (item.and.length < 2) 
      return filterExtraArray(item.and) // Single item array becomes single item
    else 
      return { and: filterExtraArray(item.and) }
  }

  // Handle 'or' array
  if (item.or) {
    if (item.or.length < 2) 
      return filterExtraArray(item.or)  // Single item array becomes single item
    else 
      return { or: filterExtraArray(item.or) }
  }

  // Single item array becomes single item
  if (item.length == 1) return filterExtraArray(item[0])

  // Recursively handle nested arrays
  for (let i = 0; i < item.length; i++) {
    if (!item[i].id) {
      item[i] = filterExtraArray(item[i])
    }
  }

  return item
}

function filterNull(item) {
  // Return null and single course
  if (!item) return null
  if (item.id) return item

  // Traverse through 'and' array, 'or' array
  if (item.and) return { and : filterNull(item.and) }
  if (item.or) return { or : filterNull(item.or) }

  // Recursively handle nested arrays
  let i = 0
  while (i < item.length) {
    if (!item[i]?.id) item[i] = filterNull(item[i])
    if (item[i] == null) item.splice(i, 1)  // Delete null
    i++
  }

  return item
}

function cutStringAtLastNumber(inputString) {
  let lastNumberIndex = inputString.search(/\d[^0-9]*$/);

  if (lastNumberIndex !== -1) {
    return inputString.slice(0, lastNumberIndex + 1).trim();
  }

  return "";
}

function convertLogic(str, defaultSubject) {
  // convert 'A and B' into { and: ['A', 'B'] }
  if (str.includes(' and ')) return { and: extractCourses(str, defaultSubject) }

  // convert 'A or B' into { or: ['A', 'B'] }
  if (str.includes(' or ')) return { or: extractCourses(str, defaultSubject) }

  return extractCourses(str, defaultSubject)
}

// Replace decoded substring with encoded data
function decodeBracket(data, encodedData) {
  // Handle 'and' array, 'or' array
  if (data.and) return {and: decodeBracket(data.and, encodedData) }
  if (data.or) return {or: decodeBracket(data.or, encodedData) }

  // Data is array
  if (!data.id) {
    for (let i = 0; i < data.length; i++)
      data[i] = decodeBracket(data[i], encodedData)
  }
  // Data is course
  else {  
    let numId = parseInt(data.id)

    // ASSUME: NO MORE THAN 99 PAIRS OF [] FOR EACH STRING
    if (numId < 100) {
      data = encodedData[numId]
      data = decodeBracket(data, encodedData)
    }
  }
  return data
}

function encodeBracket(info, defaultSubject) {
  let open = []
  let inside = []
  let inNum = -1
  let i = 0

  while (i < info.length) {
    // Store all indexes of open square brackets '['
    if (info[i] == '[') open.push(i)

    // Get string inside square brackets '[' + string inside + ']'
    if (info[i] == ']') {
      inside[++inNum] = info.substring(open[open.length - 1], i + 1)
      open.pop()
      
      // No number in inside == No course 
      if (!hasNumber(inside[inNum])) {
        info = info.replace(inside[inNum], '')
        inNum--
      }
      // Replace '[' + string inside + ']' with 'inside' + its index in the saved array
      else {
        info = info.replace(inside[inNum], 'inside' + inNum.toString())
        i = i - inside[inNum].length + 7
      }
    }
    i++
  }

  // All information after last number are redundant
  info = cutStringAtLastNumber(info)

  // Convert encoded string and saved array into encoded array
  let encodedArr = []
  for (i = 0; i <= inNum; i++) {
    encodedArr.push(convertLogic(inside[i], defaultSubject))
  }
  encodedArr.push(convertLogic(info, defaultSubject))

  return encodedArr
}

function filterPrereq(info, defaultSubject) {
  // No number == No prerequisite
  if (!hasNumber(info)) return []

  info = filterExtraInfo(info)
  info = info.replaceAll('(', '[')
  info = info.replaceAll(')', ']')
  info = replaceComma(info)

  let encoded = encodeBracket(info, defaultSubject)

  // Only one encoded data in encoded array == No bracket
  if (!encoded.length || encoded.length == 0) return encoded

  let data = encoded[encoded.length - 1]
  data = decodeBracket(data, encoded)
  data = filterExtraArray(data)
  data = filterDuplicate(data)
  data = filterNull(data)

  return data
}


function exportDogs(SUBJECT) {
  const schoolId = 'umn_umntc_peoplesoft'
  let subject = SUBJECT
  let subjectCode = (subject == 'All') ? '' : 'subjectCode=' + subject
  let fileName = subject + '.json'
  let filePath = './Dog/'
  let returnFields = '&returnFields=subjectCode,courseNumber,name,description' // preq is at the end of description
  let limit = '&limit=infinity'

  let url = 'https://app.coursedog.com/api/v1/cm/' + schoolId + '/courses/search/$filters?' + subjectCode + returnFields + limit

  fetch(url)
    .then(res => res.json())
    .then(data => {

      let courses = data.data.map(
        (course) => {

          let descrip = course.description.toLowerCase()
          let splitPattern = '\n\n'
          if (descrip.includes('\n\nprereq: ')) splitPattern = '\n\nprereq: '
          else if (descrip.includes('\n\nprerequisite: ')) splitPattern = '\n\nprerequisite: '
          else if (descrip.includes('\n\nprerequisites: ')) splitPattern = '\n\nprerequisites: '
          else if (descrip.includes('\n\nprerequisite ')) splitPattern = '\n\nprerequisite '
          else if (descrip.includes('\n\nprerequisites ')) splitPattern = '\n\nprerequisites '

          info = descrip.split(splitPattern)

          const prereq = info[1] ? filterPrereq(info[1], course.subjectCode) : []

          return {
            code: course.subjectCode + ' ' + course.courseNumber,
            subject: course.subjectCode,
            id: course.courseNumber,
            title: course.name,
            info: info[0],
            prereqInfo: info[1] || null,
            prereq: prereq || []
          }
        }
      )

      fs.writeFile(filePath + fileName, JSON.stringify(courses),
        (error) => {
          if (error) {
            console.error('Error exporting data to JSON file' + fileName + ':', error);
          } else {
            console.log('Data exported to', fileName);
          }
        })
    })
}

let allSubjects = require('../General/allSubjects.json')
let allCourseNumbers = ''

for (pup of allSubjects) {
  allCourseNumbers = require(`./General/id/${pup}.json`)
  exportDogs(pup)
}

allCourseNumbers = require(`./General/id/allCourses.json`)
exportDogs('allCourses')