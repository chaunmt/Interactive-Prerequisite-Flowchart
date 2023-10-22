import Access from "../data/Access"

const Buttons = {
  findCourseInfo,
  addCourse,
  removeCourse,
  addPrereq,
  removePrereq,
}

// Chosen Tool: Mermaid (test run in page.js)
{/* <Mermaid graph={`
        graph TD
        A[CSCI 1933] --> C[CSCI 2041]
        B[CSCI 2011] --> C
        A --> D[CSCI 4041]
        B --> D
        C --> E[CSCI 4011]
        `}/>
      <Search /> */}
// Main things to do: add course to a certain position in the array, remove course at a certain position in the array
// You can start with ignoring runtime and just try to make it finish
// Map, filter, include in javascript might be very helpful and suprisingly easy to use
// Feel free to change the layout and name as you seem fit
// Deadlines: as of 10/21/2023, we are at the end of week 5. 
//            First presentation on week 7, final presentation on week 10.
//            Please finish your scrappiest code by first presentation if possible.

function findCourseInfo(course) {
  // choose a course in search --> return an array of course info
  // Notice the difference between Access.info and Access.findCourseInfo
  // One of them is an array name course that is equal to sample.class[index] array
  // The other is just a string of id 
  return Access.info(course);
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