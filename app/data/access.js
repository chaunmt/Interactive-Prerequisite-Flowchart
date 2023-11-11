function extractWords(code) { 
  if (!code) return ''
  let match = code.match(/[a-zA-Z]+/g)
  if (!match) return ''
  return match[0] 
}

function extractNumbers(code) { 
  if (!code) return ''
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

  function isEqualId(A, B) {
    if (extractNumbers(A) != extractNumbers(B)) return false

    let honors = ['H', 'V']
    let normal = ['W', '']

    let lvA = extractWords(A[A.length - 1])
    let lvB = extractWords(B[B.length - 1])

    if (lvA == lvB) return true
    if (honors.includes(lvA) && honors.includes(lvB)) return true
    if (normal.includes(lvA) && normal.includes(lvB)) return true

    return false
  }

  // xxxxW == xxxx and xxxxH == xxxxV
  function isEqualCourses(A, B) {
    if (!A || !B) return false
    if (!A.code || !B.code) return false

    if (A.subject == B.subject) {
      return isEqualId(A.id, B.id)
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
    for (let i = 0; i < allCourses.length; i++) {
      if (itemType == 'code' || itemType == 'id') {
        if (isEqualId(allCourses[i].id, item)) return allCourses[i]
      }
      if (allCourses[i][itemType] === item) return allCourses[i]
    }
    // return allCourses.find(each => each[itemType] === item) || null;
  }

  function getTitle(itemType, item) { return title(getCourse(itemType, item)) }

  function getSubject(itemType, item) { return subject(getCourse(itemType, item)) }

  function getId(itemType, item) { return id(getCourse(itemType, item)) }

  function getInfo(itemType, item) { return info(getCourse(itemType, item)) }

  function getPrereqInfo(itemType, item) { return prereqInfo(getCourse(itemType, item)) }

  function getPrereq(itemType, item) { return prereq(getCourse(itemType, item)) }

  return {
    // We only have API code for Twin Cities Campus
    // Get all courses in subject or campus
    courses,
    // Get information for non 'course' item base on item's type and item's value
    getCourse,
    getTitle,
    getSubject,
    getId,
    getInfo,
    getPrereqInfo,
    getPrereq,
    // Get information for item with type 'course'
    code,
    subject,
    id,
    title,
    info,
    prereqInfo,
    prereq,
    target,
    // Check whether a 'course' is something
    isPrereq,
    isTarget,
    isEqualCourses,
    isEqualId,
    // isCoreq,
  }
}

