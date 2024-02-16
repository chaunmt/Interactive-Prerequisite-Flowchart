import Access from "./access";

// this only exists for when you need Map<string, Accessor>
export type Accessor = ReturnType<typeof Access>;

export interface CourseShell {
    readonly code: string;
    readonly subject: string;
    readonly id: string;
}

export interface Course extends CourseShell {
    readonly title: string;
    readonly info: string;
    readonly prereq: PrereqFormat;
}

export type PrereqFormat = {
    and?: PrereqFormat[];
    or?: PrereqFormat[];
} | PrereqFormat[] | CourseShell;

/** like Array.isArray(), this does type verification */
function isCourseShell(arg: PrereqFormat): arg is CourseShell {
    return (arg as CourseShell).code !== undefined;
}

/** "a little bit of metaprogramming never hurt anybody" - jahndan, 2024
 * 
 * if you're using this, you probably wrote this monstrosity */
export function PrereqTraversal<out, state>(
                    arrl: (cl_outs: out[]) => out,
                    crsl: (crs: CourseShell, state_var: state) => out,
                    orl: (al_out: out) => out,
                    andl: (al_out: out) => out,
                    arrx?: (x: state, index: number) => state,
                    orx?: (x: state) => state,
                    andx?: (x: state) => state,
                ) : (input: PrereqFormat, state_var: state) => out {

    /* on a serious note, this takes four lambdas for each branch of the
     * traversal pattern used for PrereqFormat - it's abstracted away so
     * this pattern only has to be updated here to match the data format */

    /* there's also two optional lambdas for processing the extra value 
     * if needed before it is passed to the course lambda - if they are
     * excluded from the original call, the extra value is passed as-is */
    let rx = (arrx == undefined) ? (p, i) => (p) : arrx;
    let ox = (orx == undefined) ? (p) => (p) : orx;
    let ax = (andx == undefined) ? (p) => (p) : andx;

    /* extra variable in case data needs to be passed along for anything */
    let fn = (input: PrereqFormat, ex: any): out => {
        if (Array.isArray(input)) {
            /* in the array pattern, each entry is mapped to the corresponding
             * output, and this array is fed into the array lambda */
            return arrl(input.map((value, i) => fn(value, rx(ex, i))));
        } else if (isCourseShell(input)) {
            /* this is the branch whose lambda defines the behavior of the
             * whole function you get back, and it's the terminating case
             * of this recursion pattern */
            return crsl(input, ex);
        } else if (input.or) {
            /* these branches take output from the array branch and do what
             * they will with it - maybe just forwarding it, and maybe even
             * doing something else before doing so */
            return orl(fn(input.or, ox(ex)));
        } else if (input.and) {
            /* more or less identical to 'or' branch logic, but distinct so
             * you can process it differently if needed */
            return andl(fn(input.and, ax(ex)));
        } else return; // should never reach this
    };
    return fn;
}
