let fs = require('fs')

function extractWords(code) { return code.match(/[a-zA-Z]+/g) }

function extractNumbers(code) { return code.match(/\d+/g) }

// Every ', ' is replaced with ' and '
function replaceComma(data) { // ==> return string
  return data.replace(/, /g, ' and ')
}

// A and B ==> Need both to satisfy requirement => Different arrays 
// A or B ==> Only need one to satisfy requirement => Same array
function filterAndOr(data) {  // ==> return array
  return data.split(' and ').map(
    (subReq) => subReq.split(' or ')
  )
}

// Observed: Info after each ';' are extra info (i.e. recommendation, major,...)
function filterExtraInfo(data) {  // ==> return string
  if (data.toUpperCase().includes('NO PREREQUISITE')) return ""
  return data.split(';')[0]
}

function deleteSpaces(inputString) {
  return inputString.replace(/\s/g, '');
}

function splitStringAtNumber(inputString) {
  inputString = deleteSpaces(inputString)
  const match = inputString.match(/\d/);

  if (match) {
    const index = match.index;
    return [inputString.slice(0, index), inputString.slice(index)];
  }

  return [inputString];
}

function extractCourses(inputString, defaultSubject) {
  // pattern = match full words : 4 digits or (some letters + optional white space + 4 digits + some letters)
  // ERROR: DOES NOT WORK FOR "Prerequisuites: 3081W" BECAUSE : IS NOT LETTER
  const pattern = /\b\d{4}[A-Za-z]*\b|\b[A-Za-z]+\s\d{4}[A-Za-z]*\b|\binside\d+\b/g;
  const courses = inputString.match(pattern) || [];

  return courses.map(
      (each) => {
        let [subject, id] = splitStringAtNumber(each)
        subject = subject.toUpperCase()
        if (!allSubjects.includes(subject)) subject = defaultSubject
        id = id.toUpperCase()
        // ERROR: ADD THE W IF ID DOES NOT FIND BUT ID + W IS FOUND, SAME FOR H
        if (!allCourseNumbers.includes(id)) {
          if (allCourseNumbers.includes(id + 'W')) id = id + 'W'
          if (allCourseNumbers.includes(id + 'H')) id = id + 'H'
        }
        return { code: subject + ' ' + id, subject: subject, id: id }
      }
    )
}

function isEqualCourse(A, B) {
  if (!A || !B) return false
  if (!A.code || !A.subject || !A.id) return false
  if (!B.code || !B.subject || !B.id) return false
  if (A.code != B.code) return false
  if (A.subject != B.subject) return false
  if (A.id != B.id) return false
  return true
}

function filterDuplicate(item) {
  if (!Array.isArray(item)) return item; 
  for (let i = 0; i < item.length; i++) {
    for (let j = i + 1; j < item.length; j++) {
      if (isEqualCourse(item[i], item[j])) item[j] = null
      else
      if (isEqualCourse(item[i].and, item[j].and)) item[j].and = null
      else
      if (isEqualCourse(item[i].or, item[j].or)) item[j].or = null
    }
    filterDuplicate(item[i])
  }
  
  return item
}

function filterExtraArray(item) {
  if (typeof(item) == 'object') {
    if (!item) return null
    if (item.length == 0) return null
    else if (item.length == 1) return filterExtraArray(item[0])
    else {
      let i = 0
      while (i < item.length) {
        if (typeof(item[i]) == 'object') item[i] = filterExtraArray(item[i])
        i ++
      }
    }
  }
  return item
}

function filterNull(item) {
  if (typeof(item) == 'object') {
    if (item == null) return []
    let i = 0
    while (i < item.length) {
      if (typeof(item[i]) == 'object') item[i] = filterExtraArray(item[i])
      if (item[i] == null) item.splice(i,1)
      i ++
    }
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

function hasNumber(str) {
  return /\d/.test(str);
}

// ASSUME: 
//    Prerequisites that have Id without subject will have its subject = target's subject
//    There can not be both 'and' & 'or' in the same level of []
//    There are no more than 99 pairs of [] for each prereqInfo, please
function filterPrereq(info, defaultSubject) { // ==> return array
  if (!hasNumber(info)) return []
  info = filterExtraInfo(info)
  info = info.replaceAll('(', '[')
  info = info.replaceAll(')', ']')
  info = replaceComma(info)

  let open = []
  let inside = []
  let inNum = -1
  let i = 0
  while (i < info.length) {
    if (info[i] == '[') open.push(i)
    if (info[i] == ']') {
      inside[++inNum] = info.substring(open[open.length - 1], i + 1)
      open.pop()
      if (!hasNumber(inside[inNum])) {
        info = info.replace(inside[inNum], '') 
        inNum--
      } 
      else {
        info = info.replace(inside[inNum], 'inside' + inNum.toString()) 
        i = i - inside[inNum].length + 7
        // console.log('inside[' + inNum +'] = ' + inside[inNum] + '\n')
      }
    }
    i ++
  }
  info = cutStringAtLastNumber(info)
  //console.log('info = ' + info + '\n')

  function processed(str, defaultSubject) {
    if (str.includes(' and ')) return {and: extractCourses(str, defaultSubject)}
    if (str.includes(' or ')) return {or: extractCourses(str, defaultSubject)}
    return extractCourses(str, defaultSubject)
  }

  let data = []
  let inData = []
  for (i = 0; i <= inNum; i++) {
    inData.push(processed(inside[i], defaultSubject))
    // console.log('inData at i = ' + i + ' = ' + JSON.stringify(inData))
  }
  inData.push(processed(info, defaultSubject))
  inData = filterExtraArray(inData)
  // console.log('inData at info = ' + JSON.stringify(inData))

  // function traverseAll(item, inData) {
  //   if (item == null) return null
  //   if (typeof(item) != 'object') return item
  //   if (item.id) {
  //     let numId = parseInt(item.id)
  //     while (numId < 100) {
  //       item = inData[numId]
  //       console.log('item = ', JSON.stringify(item) + '\n')
  //       console.log('inData = ', JSON.stringify(inData[numId]) + '\n')
  //       traverseAll(item, inData)
  //     }
  //   }
  //   else
  //   for (let i = 0; i < item.length; i++)
  //     traverseAll(item[i], inData)
  //   return item
  // }
  // if (inData != null) traverseAll(inData[inData.length - 1], inData)
  if (inData == null) return inData
  else 
  if (inData.length == null) return inData
  else {  
    let data = inData[inData.length - 1]
    
    function traverse(data) {
      if (data.and) {
        for (let i = 0; i < data.and.length; i++) {
          let numId = parseInt(data.and[i].id)
          if (numId < 100) {
            data.and[i] = inData[numId]
            traverse(data.and[i])
          }
        }
      }
      else if (data.or) {
        for (let i = 0; i < data.or.length; i++) {
          let numId = parseInt(data.or[i].id)
          if (numId < 100) {
            data.or[i] = inData[numId]
            traverse(data.or[i])
          }
        }
      }
      else {
        let numId = parseInt(data.id)
        if (numId < 100) {
          data = inData[numId]
          traverse(data)
        }
      }
      return data
    }

    data = traverse(data)
    return filterDuplicate(data)
  }
}


function exportDogs(SUBJECT) {
  const schoolId = 'umn_umntc_peoplesoft'
  let subject = SUBJECT
  let subjectCode = (subject == 'All') ? '' : 'subjectCode=' + subject
  let fileName = subject + '.json'
  //let filePath = './Dog/'
  let filePath = './'
  let returnFields = '&returnFields=subjectCode,courseNumber,name,description' // preq is at the end of description
  let limit = '&limit=infinity'

  let url = 'https://app.coursedog.com/api/v1/cm/' + schoolId + '/courses/search/$filters?' + subjectCode + returnFields + limit

  // let allCourseNumbers = require(`./General/id/${subject}.json`)
  // let allCourseNumbers = require(`./General/id/All.json`)

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
            prereq: prereq
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

let SUBJECT = 'CSCI'
let allSubjects = require('../General/allSubjects.json')
let allCourseNumbers = require(`../General/id/${SUBJECT}.json`)
exportDogs(SUBJECT)