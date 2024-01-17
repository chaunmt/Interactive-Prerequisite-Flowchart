const subjects: string[] = await import(`./General/allSubjects.json`);

// function foo() {}
/* note: function declarations and definitions of this form
 * are hoisted - they can be referenced prior to the actual
 * declaration, so I've placed the documentation closer to
 * the top of this file than the implementations */

export function allSubj() {
  return subjects;
}

/** Accessor Factory - returns a subject-specific accessor
 * to get relevant course info
 * 
 * note: all members of the returned object are functions
 */
export default async function Access(SUBJECT: string) {
  if (!subjects.includes(SUBJECT)) { throw new Error("Invalid subject passed to Access Factory!"); }
  const ids: readonly string[] = await import(`./General/id/${SUBJECT}.json`);
  const courses: readonly any[] = await import(`./Dog/${SUBJECT}.json`);
  // const someCourses: Course[] = await import(`./Dog/CSCI.json`);

  return {
    /** all Courses in subject or campus */
    courses,
    /** all course ID numbers in this subject */
    ids,
    /** Get course item that has a matching value for the property
     * @see Course for valid properties (invalidity just returns a null)
     */
    getCourse,
    /** Returns an array of Courses that have prereq as its prerequisites */
    target,
    /** Checks whether course is a prerequisite of target */
    isPrereq,
    // /** TODO */
    // isTarget,
    /** Checks for discrepancies like xxxxW == xxxx <s>or xxxxV == xxxxH</s> */
    isEqualCourses,
    /** Checks for discrepancies like xxxxW == xxxx <s>or xxxxV == xxxxH</s> */
    isEqualId,
    // /** TBD */
    // isCoreq,
  };

  // definitions which still need to happen in this scope

  function getCourse(property: string, value: any) {
    if (!value || !property) { return null; }
    // return courses.find(each => each[property] === value) || null;
    
    let cmp = (property == "code") ? value.split(' ')[1] : value;
    for (let i = 0; i < courses.length; i++) {
      if (property == "id" || property == "code") {
        if (isEqualId(courses[i].id, cmp)) { return courses[i]; }
      }
      if (courses[i][property] === value) { return courses[i]; }
    }
    return null;
  }

  function target(prereq) {
    return courses.filter( target => isPrereq(prereq, target) );
  }

  function isPrereq(course, target) {
    function traverse(c, input) {
      if (!input) { return false; }

      // Found course --> Check course.code
      if (input.code && isEqualCourses(c, input)) { return true; }

      // Traverse 'and' array, 'or' array
      if (input.and) { return traverse(c, input.and); }
      if (input.or) { return traverse(c, input.or); }

      // Traverse through normal array
      for (let i = 0; i < input.length; i++) {
        if (traverse(c, input[i])) { return true; }
      }

      return false;
    }

    return traverse(course, target.prereq);
  }

  function isEqualCourses(A: CourseShell, B: CourseShell) {
    if (!A || !B) { return false; }
    if (!A.code || !B.code) { return false; }
    if (A.subject == B.subject) { return isEqualId(A.id, B.id); }
    return false;
  }

  function isEqualId(idA: string, idB: string) {
    if (extractNumbers(idA) != extractNumbers(idB)) { return false; }

    // let honors = ['H', 'V'];
    let normal = ['W', ''];

    let lvA = extractWords(idA[idA.length - 1]);
    let lvB = extractWords(idB[idB.length - 1]);

    if (lvA == lvB) { return true; }
    // if (honors.includes(lvA) && honors.includes(lvB)) { return true; }
    if (normal.includes(lvA) && normal.includes(lvB)) { return true; }

    return false;
  }
}




export interface CourseShell {
  readonly code: string;
  readonly subject: string;
  readonly id: string;
}
export interface Course extends CourseShell {
  readonly title: string;
  readonly info: string;
  readonly prereqInfo: string | null;
  readonly prereq: PrereqFormat;
}
export type PrereqFormat = {
  and?: PrereqFormat[];
  or?: PrereqFormat[];
} | PrereqFormat[] | Course;  // not sure yet if intersection or union type

// /// move to where appropriate
// function fetchFromPrereq(shell: CourseShell): Course {
//   if (!shell) return null;
//   for (let i = 0; i < courses.length; i++) {
//     if (isEqualId(id(courses[i]), shell.id) && subject(courses[i]) == shell.subject) {
//       return courses[i];
//     }
//   }
//   return null;
// }





// helpers used above

function extractWords(code: string) { 
  if (!code) { return ''; }
  let match = code.match(/[a-zA-Z]+/g);
  if (!match) { return ''; }
  return match[0];
}

function extractNumbers(code: string) { 
  if (!code) { return ''; }
  let match = code.match(/\d+/g);
  if (!match) { return ''; }
  return match[0];
}