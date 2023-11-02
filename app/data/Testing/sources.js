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
  const pattern = /\b\d{4}\b|\b[A-Za-z]+\s\d{4}[A-Za-z]*\b/g;
  const courses = inputString.match(pattern) || [];

  return {
    course: courses.map(
      (each) => {
        let [subject, id] = splitStringAtNumber(each)
        subject = subject.toUpperCase()
        if (!allSubjects.includes(subject)) subject = defaultSubject
        // ERROR: ADD THE W IF ID DOES NOT FIND BUT ID + W IS FOUND, SAME FOR H
        //if (!allCourseNumbers.includes(id)) id = id + 'W'
        return { code: subject + ' ' + id, subject: subject, id: id }
      }
    )
  }

}

function filterPrereq(info, defaultSubject) { // ==> return array
  info = filterExtraInfo(info)
  info = replaceComma(info)
  info = info.replace('[', ' ')
  info = info.replace('(', ' ')
  
  // for each ] and ) meet, process string from start to its index
  let data = []
  let num = 0
  for (index in info) 
    if (info[index] == ']' || info[index] == ')') {
      data[num] = filterAndOr(info.subString(0, index))
      data[num].map(
        (each) => {
          // access all level and use extractCourses on each
        }
      )
      info = info.subString(index + 1, info.length)
      ++ num
    }
  
  //data = filterAndOr(data)
  info = extractCourses(info, defaultSubject)
  // ERROR: FILTER DUPLICATES TOO
  return info
}


function exportDogs(SUBJECT) {
  const schoolId = 'umn_umntc_peoplesoft'
  let subject = SUBJECT
  let subjectCode = (subject == 'All') ? '' : 'subjectCode=' + subject
  let fileName = subject + '.json'
  //let filePath = './Dog/'
  let fifePath = './'
  let returnFields = '&returnFields=subjectCode,courseNumber,name,description' // preq is at the end of description
  let limit = '&limit=infinity'

  let url = 'https://app.coursedog.com/api/v1/cm/' + schoolId + '/courses/search/$filters?' + subjectCode + returnFields + limit

  // let allCourseNumbers = require(`./General/id/${subject}.json`)
  //let allCourseNumbers = require(`./General/id/All.json`)

  fetch(url)
    .then(res => res.json())
    .then(data => {

      let courses = data.data.map(
        (course) => {

          let descrip = course.description.toLowerCase()
          let splitPattern = ''
          if (descrip.includes('\n\nprereq: ')) splitPattern = '\n\nprereq'
          else if (descrip.includes('\n\nprerequesite: ')) splitPattern = '\n\nprerequesite: '
          else if (descrip.includes('\n\nprerequesites: ')) splitPattern = '\n\nprerequesites: '
          else if (descrip.includes('\n\nprerequesite ')) splitPattern = '\n\nprerequesite '
          else if (descrip.includes('\n\nprerequesites ')) splitPattern = '\n\nprerequesites '

          info = descrip.split(splitPattern)

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

let allSubjects = require('./General/allSubjects.json')
exportDogs('CSCI')