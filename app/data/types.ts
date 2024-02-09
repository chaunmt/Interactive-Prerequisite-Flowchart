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
export function isCourseShell(arg: PrereqFormat): arg is CourseShell {
    return (arg as CourseShell).code !== undefined;
}

// type output = any; // only used here to label the meta-args

// /** "a little bit of metaprogramming never hurt anybody" - jahndan, 2024
//  * 
//  * if you're using this, you probably wrote this monstrosity */
// export function PrereqTraversal(arrl: (cl_outs: output[]) => output,
//                                 crsl: (preq: CourseShell, carry: any) => output,
//                                 orl: (al_out: output) => output,
//                                 andl: (al_out: output) => output): output {

//     /* on a serious note, this takes four lambdas for each branch of the
//      * traversal pattern used for PrereqFormat - it's abstracted away so
//      * this pattern only has to be updated here to match the data format */

//     /* extra variable in case data needs to be passed along for anything */
//     let fn = (input: PrereqFormat, ex: any) => {
//         if (Array.isArray(input)) {
//             /* in the array pattern, each entry is mapped to the corresponding
//              * output, and this array is fed into the array lambda */
//             return arrl(input.map((value) => fn(value, ex)));
//         } else if (isCourseShell(input)) {
//             /* this is the branch whose lambda defines the behavior of the
//              * whole function you get back, and it's the terminating case
//              * of this recursion pattern */
//             return crsl(input, ex);
//         } else if (input.or) {
//             /* these branches take output from the array branch and do what
//              * they will with it - maybe just forwarding it, and maybe even
//              * doing something else before doing so */
//             return orl(fn(input.or, ex));
//         } else if (input.and) {
//             /* more or less identical to 'or' branch logic, but distinct so
//              * you can process it differently if needed */
//             return andl(fn(input.and, ex));
//         } else return; // should never reach this
//     };
//     return fn;
// }
