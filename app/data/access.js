function extractWords(code) { return code.match(/[a-zA-Z]+/g) }

function extractNumbers(code) { return code.match(/\d+/g) }

export default function Access(SUBJECT) {

  const allCourses = require(`./Dummy/${SUBJECT}.json`);

  function courses() { return allCourses }

  function code(course) { return course.code }

  function subject(course) { return course.subject }

  function id(course) { return course.id }

  function title(course) { return course.title }

  function info(course) { return course.info }

  function prereqInfo(course) { return course.prereqInfo }

  function prereq(course) { return course.prereq }

  // return the array of course that have prereq as its prerequisites
  function target(prereq) {
    allCourses.map(
      (target) => {
        if (isPrereq(prereq, target)) return target
      }
    )
    return null
  }

  function isPrereq(prereq, target) {
    prereq(target)?.map(
      (each) => {
        if (each.course.includes(code(prereq))) return true
      }
    )
    return false
  }

  function isTarget(prereq, target) {
    return isPrereq(prereq, target)
  }

  function getCourse(itemType, item) {
    return allCourses.find(each => each[itemType] === item) || null;
  }

  function getTitle(itemType, item) { return title(getCourse(itemType, item)) }

  function getSubject(itemType, item) { return subject(getCourse(itemType, item)) }

  function getId(itemType, item) { return id(getCourse(itemType, item)) }

  function getInfo(itemType, item) { return info(getCourse(itemType, item)) }

  function getPrereqInfo(itemType, item) { return prereqInfo(getCourse(itemType, item)) }

  function getPrereq(itemType, item) { return prereq(getCourse(itemType, item)) }

  return {
    courses,
    getCourse,
    getTitle,
    getSubject,
    getId,
    getInfo,
    getPrereqInfo,
    getPrereq,
    code,
    subject,
    id,
    title,
    info,
    prereqInfo,
    prereq,
    target,
    isPrereq,
    isTarget,
    // isCoreq,
  }
}

