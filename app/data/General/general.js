const { error } = require('console')
let fs = require('fs')

function filterDuplicate(data) {
  var seen = {};
  return data.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function fetchSubjectCode() {
  // get all subjectCode
  let url = 'https://app.coursedog.com/api/v1/cm/umn_umntc_peoplesoft/courses/search/$filters?&returnFields=subjectCode&limit=inifnity'

  let fileName = 'subjectCode.json'

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      let subject = filterDuplicate(data.data.map((subject) => subject.subjectCode))

      fs.writeFile(fileName, JSON.stringify(subject),
        (error) => {
          if (error) {
            console.error('Error exporting data to JSON file' + fileName + ':', error);
          } else {
            console.log('Data exported to', fileName);
          }
        })
    })
    //.catch (err)
}

function fetchCourseNumber() {
  // get all courseNumber
  let url = 'https://app.coursedog.com/api/v1/cm/umn_umntc_peoplesoft/courses/search/$filters?&returnFields=courseNumber&limit=inifnity'

  let fileName = 'courseNumber.json'

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      let courseNumber = filterDuplicate(data.data.map((course) => course.courseNumber))

      fs.writeFile(fileName, JSON.stringify(courseNumber),
        (error) => {
          if (error) {
            console.error('Error exporting data to JSON file' + fileName + ':', error);
          } else {
            console.log('Data exported to', fileName);
          }
        })
    })
    //.catch (err)
}

fetchSubjectCode()
fetchCourseNumber()