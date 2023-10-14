// Get all courses details
// https://asr-custom.umn.edu/courses/
// campus: UMNTC -> Twin Cities
// terms: 1239 -> Fall 2023

// Get class details
// https://umn.lol/api/class/CSCI4041

// try this in console
// myData.courses[10].catalog_number
let url = 'https://courses.umn.edu/campuses/UMNTC/terms/1239/courses.json?q=subject_id=CSCI';

let myData;

fetch(url)
  .then(res => res.json())
  .then(data => { myData = data; })
  .catch(err => { throw err });

// Term ID to Term's Name
const termToName = (term) => {
  const baseYear = 1900;
  const year = baseYear + Math.floor(term / 10);

  switch (term % 10) {
    case 3:
      return `Spring ${year}`;
    case 5:
      return `Summer ${year}`;
    case 9:
      return `Fall ${year}`;
    default:
      return `Invalid Term`;
  }
}