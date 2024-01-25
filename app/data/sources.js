let fs = require('fs')

function hasNumber(str) { return /\d/.test(str); }

function deleteSpaces(str) { return str.replace(/\s/g, ''); }

// Replace all ',' with ' and '
// Replace all '/' with ' and '
function replaceSigns(str) {
  str = str.replaceAll(', ', ' and ')
  str = str.replaceAll('/', ' and ')
  str = str.replaceAll('&', ' and ')
  return str
}

// WARNING: Omit this case because of data's inconsistency ???

function spliceRecommendAt(str, splitPattern) {
  arr = str.split(splitPattern)
  let i = 0;
  while (i < arr.length) {
    // if (!arr[i] || arr[i].toLowerCase().includes('recommend')) arr.splice(i, 1)
    // else i ++
    if (!arr[i] || arr[i].toLowerCase().includes('special instruction')) arr.splice(i, 1)
    else i++
  }
  return arr.join(' or ')
}

function filterExtraInfo(str) {
  // if (str.toUpperCase().includes('NO PREREQUISITE')) return ""
  str = spliceRecommendAt(str, ';')
  str = spliceRecommendAt(str, '.')
  return str
}

function splitStringAt(str, type) {
  str = deleteSpaces(str)

  let num = ''
  if (type == "word") num = str.match(/[A-Za-z]/)
  else num = str.match(/\d/)
  
  if (num) {
    const index = num.index;
    return [str.slice(0, index), str.slice(index)]
  }

  // Course should always have number inside
  return [null, null]
}

// function filterHonorCourses() {
  
// }

function extractCourses(str, targetSubject, targetId) {
  // match full words for 3 cases: 
  //    3-4 digits + optional letters
  //    some letters + optional white space + 3-4 digits + optional letters
  //    'inside' + number
  const pattern = /\b\d{2,4}[A-Za-z]*\b|\b[A-Za-z]+\s?\d{2,4}[A-Za-z]*\b|\binside\d+\b/g
  const courses = str.match(pattern) || []
  const allSems = require('./General/allSemesters.json')

  return courses.map(
    (each) => {
      let [subject, id] = splitStringAt(each, "number")

      subject = subject.toUpperCase()
      id = id.toUpperCase()

      function getId(id) {
        let [num, suffix] = splitStringAt(id, "word")
        let allowedSuffix = ['W', 'H', 'V', '']
        if (suffix && (suffix.length != 1 || !allowedSuffix.includes(suffix))) id = num
        if (!allCourseNumbers.includes(id)) {
          if (allCourseNumbers.includes(id + 'W')) id = id + 'W'
            else
          if (allCourseNumbers.includes(id + 'H')) id = id + 'H'
            else
          if (!(subject == 'INSIDE')) return null
            else
          if (allCourseNumbers.includes(num)) id = num
        }
        if (id.includes('V') || id.includes('H')) return null
        return id
      }

      id = getId(id)
      if (!id) return null

      // Remove semester and year (not a course)
      // ASSUME: NO PREREQ'S SUBJECT --> USE TARGET'S SUBJECT
      if (!(subject == "INSIDE") && !allSubjects.includes(subject)) {
        if (!allSems.includes(subject)) subject = targetSubject  
        else return null
      }

      // If this course = target, it is not prereq
      if (subject == targetSubject && id == targetId) return null

      // We don't have any honor
      

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
  if (!item.length) return item

  // Traverse through 'and' array, 'or' array
  if (item.and) {
    let filteredItem = filterDuplicate(item.and)
    if (!filteredItem) return null
    return { and: filterDuplicate(item.and) }
  }
  if (item.or) {
    let filteredItem = filterDuplicate(item.or)
    if (!filteredItem) return null
    return { or: filterDuplicate(item.or) }
  }

  // Replace duplicate course with null
  for (let i = 0; i < item.length - 1; i++) {
    for (let j = i + 1; j < item.length; j++)
      if (isEqualCourse(item[i], item[j])) {
        item.splice(j, 1)
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
    if (item.and.length == 1)
      return filterExtraArray(item.and[0]) // Single item array becomes single item
    else
      return { and: filterExtraArray(item.and) }
  }

  // Handle 'or' array
  if (item.or) {
    if (item.or.length == 1)
      return filterExtraArray(item.or[0])  // Single item array becomes single item
    else
      return { or: filterExtraArray(item.or) }
  }

  // Single item array becomes single item
  if (item.length == 1) return filterExtraArray(item[0])

  // Recursively handle nested arrays
  let i = 0
  while (i < item.length) {
    if (item[i] && !item[i].id) {
      item[i] = filterExtraArray(item[i])
    }
    if (!item[i]) item.splice(i, 1)
    else i++
  }

  return item
}

function filterNull(item) {
  // Return null and single course
  if (!item || item.length == 0) return null
  if (item.id) return item

  // Traverse through 'and' array, 'or' array
  if (item.and) return { and: filterNull(item.and) }
  if (item.or) return { or: filterNull(item.or) }

  // If item is not an array, it is null
  if (!item.length) return null

  // Recursively handle nested arrays
  let i = 0
  while (i < item.length) {
    if (item[i] && !item[i]?.id) item[i] = filterNull(item[i])
    if (!item[i]) item.splice(i, 1)  // Delete null
    else i++
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
// WARNING: Problem with ambiguous level
function convertLogic(str, targetSubject, targetId) {
 
  // convert 'A and B' into { and: ['A', 'B'] }
  if (str.includes(' and ')) return { and: extractCourses(str, targetSubject, targetId) }

  // convert 'A or B' into { or: ['A', 'B'] }
  if (str.includes(' or ')) return { or: extractCourses(str, targetSubject, targetId) }

  return extractCourses(str, targetSubject, targetId)
}

// Replace decoded substring with encoded data
function decodeBracket(data, encodedData) {
  if (!data) return null

  // Handle 'and' array, 'or' array
  if (data.and) {
    if (data.and.length == 1) return decodeBracket(data.and, encodedData)
    return { and: decodeBracket(data.and, encodedData) }
  }
  if (data.or) {
    if (data.or.length == 1) return decodeBracket(data.or, encodedData)
    return { or: decodeBracket(data.or, encodedData) }
  }

  // Data is array
  if (data.length) {
    for (let i = 0; i < data.length; i++)
      data[i] = decodeBracket(data[i], encodedData)
  }
  // Data is course
  else 
  if (data.subject == "INSIDE") { // Data is encoded
    data = encodedData[data.id]
    if (data != null) 
      data = decodeBracket(data, encodedData)
  }
  return data
}

function encodeBracket(info, targetSubject, targetId) {
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
    encodedArr.push(convertLogic(inside[i], targetSubject, targetId))
  }
  encodedArr.push(convertLogic(info, targetSubject, targetId))

  return encodedArr
}

function filterPrereq(info, targetSubject, targetId) {
  // No number == No prerequisite
  if (!hasNumber(info)) return []

  info = filterExtraInfo(info) // WARNING: Too inconsistent 
  info = info.replaceAll('(', '[')
  info = info.replaceAll(')', ']')
  info = replaceSigns(info)

  // return info
  let encoded = encodeBracket(info, targetSubject, targetId)

  // Only one encoded data in encoded array == No bracket
  if (!encoded.length || encoded.length == 0) return encoded

  let data = encoded[encoded.length - 1]
  data = decodeBracket(data, encoded)
  data = filterDuplicate(data)
  data = filterNull(data)
  data = filterExtraArray(data)
  data = filterNull(data)
  data = filterExtraArray(data)

  return data
}

function exportDogs(SUBJECT) {
  const schoolId = 'umn_umntc_peoplesoft'
  let subject = SUBJECT
  let subjectCode = (subject == 'allCourses') ? '' : 'subjectCode=' + subject
  let fileName = subject + '.json'
  let filePath = './Dog/'
  // let filePath = './'
  let returnFields = '&returnFields=subjectCode,courseNumber,name,description' // preq is at the end of description
  let limit = '&limit=infinity'

  let url = 'https://app.coursedog.com/api/v1/cm/' + schoolId + '/courses/search/$filters?' + subjectCode + returnFields + limit

  fetch(url)
    .then(res => res.json())
    .then(data => {

      let courses = filterNull(data.data.map(
        (course) => {

          let descrip = course.description.toLowerCase()
          let splitPattern = '\n\n\n\n\n'
          if (descrip.includes('prereq:')) splitPattern = 'prereq:'
          else if (descrip.includes('prerequisite:')) splitPattern = 'prerequisite:'
          else if (descrip.includes('prerequisites:')) splitPattern = 'prerequisites:'
          else if (descrip.includes('prereq')) splitPattern = 'prereq'
          else if (descrip.includes('prerequisite')) splitPattern = 'prerequisite'
          else if (descrip.includes('prerequisites')) splitPattern = 'prerequisites'
          // else if (descrip.includes('\n')) splitPattern = '\n'

          info = descrip.split(splitPattern)

          const prereq = info[1] ? filterPrereq(info[1], course.subjectCode, course.courseNumber) : []
          if (course.courseNumber.includes('H') || course.courseNumber.includes('V')) return null

          return {
            code: course.subjectCode + ' ' + course.courseNumber,
            subject: course.subjectCode,
            id: course.courseNumber,
            title: course.name,
            info: course.description,
            // info: info[0].trim(),
            // prereqInfo: info[1]?.trim() || null,
            prereq: prereq || []
          }
        }
      ))

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

let allSubjects = require('./General/allSubjects.json')
let allCourseNumbers = require('./General/id/allCourses.json')
// exportDogs('allCourses')

for (pup of allSubjects) {
  exportDogs(pup)
}