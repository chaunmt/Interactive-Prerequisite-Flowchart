import { Course, CourseShell, PrereqFormat } from "./types";

const subjects: string[] = require(`./General/allSubjects.json`);

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
    const ids: readonly string[] = require(`./General/id/${SUBJECT}.json`);
    const courses: readonly Course[] = require(`./Dog/${SUBJECT}.json`);

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
        /** Checks for discrepancies like xxxxW == xxxx <s>or xxxxV == xxxxH</s> */
        isEqualCourses,
        /** Checks for discrepancies like xxxxW == xxxx <s>or xxxxV == xxxxH</s> */
        isEqualId
    };

    // definitions which still need to happen in this scope

    function getCourse(property: "code" | "id", value: string): Course | null {
        let cmp = (property == "code") ? value.split(' ')[1] : value;
        for (let i = 0; i < courses.length; i++) {
            if (isEqualId(courses[i].id, cmp)) { return courses[i]; }
        }
        return null;
    }

    function target(prereq: CourseShell) {
        return courses.filter(target => isPrereq(prereq, target));
    }

    function isPrereq(course: CourseShell, target: Course): boolean {
        function helper(input: PrereqFormat): input is CourseShell {
            return (input as CourseShell).code !== undefined;
        }
        function traverse(c: CourseShell, input: PrereqFormat) {
            if (Array.isArray(input)) {
                for (let i = 0; i < input.length; i++) {
                    if (traverse(c, input[i])) { return true; }
                }
            } else if (helper(input)) {
                return isEqualCourses(c, input);
            } else {
                if (input.and) { return traverse(c, input.and); }
                if (input.or) { return traverse(c, input.or); }
            }
            return false;
        }
        return traverse(course, target.prereq);
    }

    function isEqualCourses(A: CourseShell, B: CourseShell) {
        return (A.subject == B.subject && isEqualId(A.id, B.id));
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