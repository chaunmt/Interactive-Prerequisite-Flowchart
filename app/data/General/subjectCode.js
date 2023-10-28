let fs = require('fs')

// get all subjectCode
let url = 'https://app.coursedog.com/api/v1/cm/umn_umntc_peoplesoft/courses/search/$filters?&returnFields=subjectCode&limit=inifnity'

let fileName = 'subjectCode.json'

function filterDuplicate(data) {
  return data.filter(
    (thing, index, self) => {
      index === 
      self.findIndex((t) => t === thing)
  })
}

fetch(url)
  .then(res => res.json())
  .then(data => {
    const subject = filterDuplicate(
      data.data.map((subject) => subject.subjectCode
    ))

    fs.writeFile(fileName, JSON.stringify(subject),
    (error) => {
      if (error) {
        console.error('Error exporting data to JSON file' + fileName + ':', error);
      } else {
        console.log('Data exported to', fileName);
      }
    })
  })