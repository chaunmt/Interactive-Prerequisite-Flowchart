import { Course, CourseShell, PrereqFormat, PrereqTraversal } from "./types";

const subjects: string[] = require(`./General/allSubjects.json`);

// function foo() {}
/* note: function declarations and definitions of this form
 * are hoisted - they can be referenced prior to the actual
 * declaration, and as such I have placed the documentation
 * closer to the top of this file than the implementations */

export function allSubj() {
    return subjects;
}

/** Accessor Factory - returns a subject-specific accessor to get relevant course info
 * 
 * note: SUBJECT should be an uppercase string */
export default function Access(SUBJECT: string) {
    if (!subjects.includes(SUBJECT)) {
        throw new Error("Invalid subject passed to Access Factory!");
    }

    const ids: readonly string[] = require(`./General/id/${SUBJECT}.json`);
    const courses: readonly Course[] = require(`./Dog/${SUBJECT}.json`);

    return {
        /** all Courses in subject */
        courses,
        /** all course ID numbers in this subject */
        ids,
        /** Get course item that has a matching code or id
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
        isEqualId,
        /** Small utility function to get the full Course data from a CourseShell */
        get
    };

    // definitions which still need to happen in this scope

    function getCourse(property: "code" | "id", value: string): Course | null {
        let cmp = (property == "code") ? value.split(' ')[1] : value;
        // binary search
        let l = 0; let r = courses.length - 1;
        for (let m = Math.floor(r/2); l <= r; m = Math.floor((l+r)/2)) {
            // this first because they can be the same course with unequal code
            if (isEqualId(courses[m].id, cmp)) { return courses[m]; }
            if (courses[m].code < `${SUBJECT} ${cmp}`) { l = m + 1; }
            if (courses[m].code > `${SUBJECT} ${cmp}`) { r = m - 1; }
        }
        return null;
    }

    function target(prereq: CourseShell) {
        return courses.filter(target => isPrereq(prereq, target));
    }

    function big_or(couts: boolean[]) { return couts.some(t => t == true); }
    function nothing(arg: any) { return arg; }
    function traverse(input: PrereqFormat, c: CourseShell): boolean {
        return PrereqTraversal(big_or, isEqualCourses, nothing, nothing)(input, c);
    }

    function isPrereq(course: CourseShell, target: Course): boolean {
        return traverse(target.prereq, course);
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

    function get(shell: CourseShell): Course {
        return getCourse("code", shell.code);
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
