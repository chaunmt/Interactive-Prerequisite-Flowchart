let fs = require('fs')
let allSubjects = require('./General/subjectCode.json')
let allCourseNumbers = require('./General/courseNumber.json')

// Remove all brackets
function filterBracket(data) { // ==> return string
  data = data.split('[').join('').split(']')
  data = data.join('')
  data = data.split('(').join('').split(')')
  return data
}

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
  return data.split(';')[0]
}

// TODO: Filter recommend
// TODO: Filter Sentences
// TODO: Unite form [SUBC XXXX]

// function filterCodes(data) {
//   const length = data.length
//   let i = 0;
//   while (i < length) {
//     i = 
//   }
// }


// Note: there is an instance of ', or' which is filter to 'and or' => conflict
// However: because ', or' in this case is treated as ';' => does not matter and will get remove later on anyway
function filterPrereq(data) { // ==> return array
  // TODO: Re order
  data = filterExtraInfo(data)
  data = replaceComma(data)
  data = filterBracket(data)
  //data = filterAndOr(data)
  //data = filterCodes(data)
  return data
}


const schoolId = 'umn_umntc_peoplesoft'
let subject = 'MATH'
let subjectCode = 'subjectCode=' + subject
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

        const info = course.description.split('\n\nprereq: ')

        const prereq = info[1]? filterPrereq(info[1]) : null

        return {
          subject: course.subjectCode,
          id: course.courseNumber,
          title: course.name,
          info: info[0],
          prereqInfo: info[1],
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