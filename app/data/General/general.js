const { error } = require('console')
let fs = require('fs')

function handleErrorExportJSON(error, fileName) {
  if (error) {
    console.error('Error exporting data to JSON file' + fileName + ':', error);
  } else {
    console.log('Data exported to', fileName);
  }
}

function filterDuplicate(data) {
  let seen = {}
  return data.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  })
}

function filterEmpty(data) {
  let i = 0
  while (i < data.length) {
    if (data[i] == '' || data[i] == null) data.splice(i, 1)
    else i++
  }
  return data
}

function exportSubject() {
  let filePath = './'
  let fileName = 'allSubjects.json'
  let data = require(`../Dog/allCourses.json`)
  data = filterDuplicate(data.map(
    (each) => each.subject
  ))
  fs.writeFile(filePath + fileName, JSON.stringify(data), (error) => handleErrorExportJSON(error, fileName))
}

function exportId(SUBJECT) {
  let filePath = './id/'
  let fileName = SUBJECT + '.json'
  let data = require(`../Dog/${SUBJECT}.json`)
  data = filterEmpty(filterDuplicate(data.map(
    (each) => {
      // No honor
      if (each.id.includes('V') || each.id.includes('H')) return ''
      return each.id
    }
  )))
  fs.writeFile(filePath + fileName, JSON.stringify(data), (error) => handleErrorExportJSON(error, fileName))
}

// export all subjects and ids for allCourses
// exportSubject()
// exportId('allCourses')

// export all ids for each subject
let subjects = require('./allSubjects.json')
for (s of subjects)
  exportId(s)