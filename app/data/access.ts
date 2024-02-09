import { Course, CourseShell, PrereqFormat, PrereqTraversal } from "./types";

const subjects: string[] = require(`./General/allSubjects.json`);

export function allSubj() {
    return subjects;
}

/** Accessor Module - returns the subject-specific accessor to get relevant course info
 * 
 * note: SUBJECT should be an uppercase string matching those in /data/General/allSubjects.json */
export default function Access(SUBJECT: string) {
    if (!subjects.includes(SUBJECT)) {
        throw new Error(`Invalid subject "${SUBJECT}" passed to Access module!`);
    }

    const courses: readonly Course[] = require(`./Dog/${SUBJECT}.json`);
    const ids: readonly string[] = require(`./General/id/${SUBJECT}.json`);

    return {
        /** all Courses in subject */
        courses,
        /** all course ID numbers in this subject */
        ids,
        /** Get course item that has a matching code (or id if specified)
         * Returns a null if none found
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

    // definitions which still need to happen in this scope (closure)

    function getCourse(value: string): Course | null;
    function getCourse(value: string, property: "code" | "id"): Course | null;
    function getCourse(value: string, property?: "code" | "id"): Course | null {
        let cmp = (property == undefined || property == "code") ? value.split(' ')[1] : value;
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

    function isPrereq(course: CourseShell, target: Course): boolean {
        return (PrereqTraversal(reductive_or, isEqualCourses, iota, iota))(target.prereq, course);
    }

    function get(shell: CourseShell): Course {
        return getCourse(shell.code);
    }
}

/** not a factory, just directly access the methods on this one */
export const AccessAll = (() => {
    const courses: readonly Course[] = require(`./Dog/allCourses.json`);
    
    return {
        /** all Courses in campus */
        courses,
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

    // definitions which still need to happen in this scope (closure)

    function getCourse(value: string): Course | null;
    function getCourse(value: string, property: "code"): Course | null;    
    function getCourse(value: string, property?: "code"): Course | null {
        let cmp = value.split(' ')[1];
        // binary search
        let l = 0; let r = courses.length - 1;
        for (let m = Math.floor(r/2); l <= r; m = Math.floor((l+r)/2)) {
            // this first because they can be the same course with unequal code
            if (isEqualId(courses[m].id, cmp)) { return courses[m]; }
            if (courses[m].code.toUpperCase() < value.toUpperCase()) { l = m + 1; }
            if (courses[m].code.toUpperCase() > value.toUpperCase()) { r = m - 1; }
        }
        return null;
    }

    function target(prereq: CourseShell) {
        return courses.filter(target => isPrereq(prereq, target));
    }

    function isPrereq(course: CourseShell, target: Course): boolean {
        return (PrereqTraversal(reductive_or, isEqualCourses, iota, iota))(target.prereq, course);
    }

    function get(shell: CourseShell): Course {
        return getCourse(shell.code);
    }
})(); // IIFE


// utility functions that can either be imported separately or used as members of the accessor objects

export function isEqualCourses(A: CourseShell, B: CourseShell) {
    return (A.subject == B.subject && isEqualId(A.id, B.id));
}

export function isEqualId(idA: string, idB: string) {
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


// regex helpers used above

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

// trivial lambdas for isPrereq traversal

/** something like unary reductive OR but on a boolean array */
function reductive_or(couts: boolean[]) { return couts.some(t => t == true); }

/** the identity function */
function iota(arg: any) { return arg; }
