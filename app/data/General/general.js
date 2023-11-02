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
  var seen = {};
  return data.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function exportSubject() {
  let filePath = './'
  let fileName = 'allSubjects.json'
  let data = require(`../Dog/allCourses`)
  data = filterDuplicate(data.map(
    (each) => each.subject
  ))
  fs.writeFile(filePath + fileName, JSON.stringify(data), (error) => handleErrorExportJSON(error, fileName))
}

//exportSubject()
// let allSubjects = require('./allSubjects.json')
// for (subject of allSubjects) {
//   let filePath = './id/'
//   let fileName = subject + '.json'
//   let data = require(`../Dog/${subject}`)
//   data = filterDuplicate(data.map(
//     (each) => each.id
//   ))
//   fs.writeFile(filePath + fileName, JSON.stringify(data), (error) => handleErrorExportJSON(error, fileName))
// }

// let subject = 'allCourses'
// let filePath = './id/'
// let fileName = subject + '.json'
// let data = require(`../Dog/${subject}`)
// data = filterDuplicate(data.map(
//   (each) => each.id
// ))
// fs.writeFile(filePath + fileName, JSON.stringify(data), (error) => handleErrorExportJSON(error, fileName))