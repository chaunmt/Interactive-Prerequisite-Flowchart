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
        graph TD
        A[CSCI 1933]
        B[CSCI 2011]
        C[CSCI 2041]
        D[CSCI 4041]
        E[CSCI 4011]
        A --> C
        B --> C & D
        A --> D
        C --> E
        `}/>
      <Search /> */}

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