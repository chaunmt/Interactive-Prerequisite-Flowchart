function extractWords(code) { 
  let match = code.match(/[a-zA-Z]+/g)
  if (!match) return ''
  return match[0] 
}

function extractNumbers(code) { 
  let match = code.match(/\d+/g)
  if (!match) return ''
  return match[0]
}

// Access all courses by 'allCourses'
export default function Access(SUBJECT) {

  const allCourses = require(`./Dog/${SUBJECT}.json`);

  function courses() { return allCourses }

  function code(course) { return course.code }

  function subject(course) { return course.subject }

  function id(course) { return course.id }

  function title(course) { return course.title }

  function info(course) { return course.info }

  function prereqInfo(course) { return course.prereqInfo }

  function prereq(course) { return course.prereq }

  // xxxxW == xxxx and xxxxH == xxxxV
  function isEqualCourses(A, B) {
    if (!A || !B) return false
    if (!A.code || !B.code) return false

    let honors = ['H', 'V']
    let normal = ['W', '']
    let lvA = extractWords(A.id)
    let lvB = extractWords(B.id)

    if (extractNumbers(A.id) == extractNumbers(B.id) && A.subject == B.subject) {
      if (lvA == lvB) return true
      if (honors.includes(lvA) && honors.includes(lvB)) return true
      if (normal.includes(lvA) && normal.includes(lvB)) return true
    }

    return false
  }

  // return the array of course that have prereq as its prerequisites
  function target(prereq) {
    allCourses.map(
      (target) => {
        if (isPrereq(prereq, target)) return target
      }
    )
    return null
  }

  // Check whether prereq is in target's prereq 
  function isPrereq(prereq, target) {

    function traverse(prereq, arr) {
      if (!arr) return false

      // Found course --> Check course.code
      if (arr.code && isEqualCourses(prereq, arr)) return true

      // Traverse 'and' array, 'or' array
      if (arr.and) return traverse(prereq, arr.and)
      if (arr.or) return traverse(prereq, arr.or)

      // Traverse through normal array
      for (let i = 0; i < arr.length; i++) {
        if (traverse(prereq, arr[i]) == true) return true
      }

      return false
    }

    return traverse(prereq, prereq(target))
  }

  function isTarget(prereq, target) {
    return isPrereq(prereq, target)
  }

  // Return the first code with matched itemType and item
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
    isEqualCourses,
    // isCoreq,
  }
}

