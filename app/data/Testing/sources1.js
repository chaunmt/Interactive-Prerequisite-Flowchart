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
  const pattern = /\b\d{4}[A-Za-z]*\b|\b[A-Za-z]+\s\d{4}[A-Za-z]*\b/g;
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
function filterPrereq(info, defaultSubject) { // ==> return array
  info = filterExtraInfo(info)
  info = replaceComma(info)
  
  info = info.replaceAll('[', ' ')
  info = info.replaceAll('(', ' ')
  // for each ] and ) meet, process string from start to its index
  let data = []
  let num = -1
  let l = 0
  for (let r = 0; r < info.length; r ++) {
    if (info[r] === ']' || info[r] === ')') {
      num ++
      data.push([info.substring(l, r)])
      l = r + 1
    }
  }
  if (num == -1) data.push(info)
  else data.push(info.substring(l, info.length))

  function traverseEach(item) {
    if (typeof(item) == 'object') {
      let i = 0
      while (i < item.length) {
        if (typeof(item[i]) == 'object') item[i] = traverseEach(item[i])
        else {
          item[i] = item[i].replaceAll(')', '')
          item[i] = item[i].replaceAll(']', '')
          if (item[i].substring(0,5).includes(' or ')) 
            item[i] = item[i].replace(' or ', '')
          if (item[i].substring(0,5).includes(' and ')) 
            item[i] = item[i].replace(' and ', '')
          item[i] = extractCourses(item[i], defaultSubject)
        }
        i ++
      }
    }
    return item
  }
  data = traverseEach(data)
  return filterNull(filterDuplicate(filterExtraArray(data)))
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