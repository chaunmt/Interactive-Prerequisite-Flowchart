import { access } from "../Routes.js"

const Buttons = {
  findCourseInfo,
  addCourse,
  removeCourse,
  addPrereq,
  removePrereq,
}

// Expected Hierarchy
// -- Main Course
// ---- Main Prereq
// ------ Prereq Course
// --------- Sub Prereq

function findCourseInfo(course) {
  // choose a course in search --> return an array of course info
  return access.findCourseInfo(course);
}

function addCourse(prereq, course) {
  // TODO: add 1 course to prereq
  // TODO: mark course is removable
}

function removeCourse(prereq, index) {
  // TODO: check whether course is removable (user's added course using function addCourse)
  // TODO: remove all course's prereq (removePrereq)
  // TODO: remove course if possible 
 
}

function addPrereq(prereq, course) {
  // add subprereq display to current prereq display
  // == add subprereq to current prereq

  // TODO: sub = findCourse(course)
  // TODO: main = prereq
  // TODO: add sub to main
  // TODO: return new main
}

function removePrereq(prereq, course) {
  // TODO: check whether prereq is removable (user's added prereq using function addPrereq)
}

export default Buttons;