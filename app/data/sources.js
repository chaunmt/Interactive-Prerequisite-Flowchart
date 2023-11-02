let fs = require('fs')

function extractWords(code) { return code.match(/[a-zA-Z]+/g) }

function extractNumbers(code) { return code.match(/\d+/g) }

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
  if (data.toUpperCase().includes('NO PREREQUISITE')) return ""
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
  const pattern = /\b\d{4}\b|\b[A-Za-z]+\s\d{4}[A-Za-z]*\b/g;
  const courses = inputString.match(pattern) || [];

  return {
    course: courses.map(
      (each) => {
        let [subject, id] = splitStringAtNumber(each)
        subject = subject.toUpperCase()
        if (!allSubjects.includes(subject)) subject = defaultSubject
        //if (!allCourseNumbers.includes(id)) id = id + 'W'
        return { code: subject + ' ' + id, subject: subject, id: id }
      }
    )
  }

}


// Note: there is an instance of ', or' which is filter to 'and or' => conflict
// However: because ', or' in this case is treated as ';' => does not matter and will get remove later on anyway
function filterPrereq(data, defaultSubject) { // ==> return array
  // TODO: Re order
  data = filterExtraInfo(data)
  //data = replaceComma(data)
  //data = filterBracket(data)
  //data = filterAndOr(data)
  //data = filterCodes(data)
  // data = data.map (
  //   (each) => {
  //     return extractCourses(each)
  //   }
  // )
  data = extractCourses(data, defaultSubject)
  return data
}


function exportDogs(SUBJECT) {
  const schoolId = 'umn_umntc_peoplesoft'
  let subject = SUBJECT
  let subjectCode = (subject == 'allCourses') ? '' : 'subjectCode=' + subject
  let fileName = subject + '.json'
  let filePath = './Dog/'
  let returnFields = '&returnFields=subjectCode,courseNumber,name,description' // preq is at the end of description
  let limit = '&limit=infinity'

  let url = 'https://app.coursedog.com/api/v1/cm/' + schoolId + '/courses/search/$filters?' + subjectCode + returnFields + limit

  // let allCourseNumbers = require(`./General/id/${subject}.json`)
  //let allCourseNumbers = require(`./General/id/allCourses.json`)

  fetch(url)
    .then(res => res.json())
    .then(data => {

      let courses = data.data.map(
        (course) => {

          const info = course.description.split('\n\n')

          const prereq = info[1] ? filterPrereq(info[1], course.subjectCode) : { "course": [] }

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

// let allSubjects = require('./General/allSubjects.json')
// for (pup of allSubjects) exportDogs(pup)
// exportDogs('allCourses')