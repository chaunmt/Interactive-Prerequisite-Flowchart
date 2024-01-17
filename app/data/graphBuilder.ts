import Access from "./access";

// these two interfaces belong in Access.js but i dont want to edit that yet
export interface CourseShell {
    code: string;
    subject: string;
    id: string;
}
export type PrerequisiteFormat = {
    and?: PrerequisiteFormat[]; or?: PrerequisiteFormat[]
} | PrerequisiteFormat[] | CourseShell;  // either intersection or union type

/** DOES NOT RECURSIVELY BUILD YET (only traverses one level back) */
export function buildGraph(input: CourseShell | CourseShell[]) {
    return Array.isArray(input) ? buildCombinedGraph(input) : buildCombinedGraph([input]);
}

function buildCombinedGraph(courses: CourseShell[]) {
    console.log("buildgraph:", courses);
    if (courses.length == 0) { console.log("WARNING: no courses passed in, built empty graph."); }
    
    let accs = new Map();  // add Access(subject) as they are made, reuse them when possible
    let nodes: NodeData[] = [];
    let edges: EdgeData[] = [];

    // start
    for (let k = 0; k < courses.length; k++) {
        console.log('>', courses[k]);
        let { subject, id } = courses[k];  // extract the identifying info
        if (!accs.has(subject)) { accs.set(subject, Access(subject)); }  // get the appropriate accessor if not already had
        let prereq: any; let junk: any;
        ({ id: id, prereq: prereq, ...junk } = accs.get(subject).getCourse("id", id));  // data retrieval + discrepancy safety for id
        
        // do stuff with this info
    }

    return convertJSONGraph(
        {
            nodes: nodes, 
            edges: edges
        } as {  // only pass properties relevant to the mermaid syntax
            nodes: { id: string; text: string; }[],
            edges: { from: string; to: string; }[]
        }
    );

    // return {
    //     nodes: nodes,
    //     edges: edges
    // } as {  // ditching the extra properties now that they are not needed
    //     nodes: NodeData[],
    //     edges: EdgeData[]
    // };
}

// function process(preqs: any, target: string) {
//     if (!preqs) { return; }  // most likely redundant now
//     // if (preqs.code) { return `${preqs.subject}_${preqs.id}[${preqs.code}]\n${preqs.subject}_${preqs.id} --> ${target}\n`; }
//     if (preqs.and) { return process(preqs.and, target); }
//     if (preqs.or) { return process(preqs.or, target); }

//     for (let i = 0; i < preqs.length; i++) { /*p +=*/ process(preqs[i], target); }
//     return;
// }

function build(course: CourseShell): { nodes: NodeData[], edges: EdgeData[] } {
    // "global"
    let nodes: MyNode[] = [];
    let edges: MyEdge[] = [];
    let accs = new Map();  // add Access(subject) as they are made, reuse them when possible
    
    // "local"
    let { subject, id } = course;
    accs.set(subject, Access(subject));
    const { code, prereq } = accs.get(subject).getCourse("id", id);
    nodes.push({ id: `${subject}_${id}`, text: code });
    process(prereq, `${subject}_${id}`); // exit "local"

    return {
        nodes: nodes,
        edges: edges
    } as {  // ditching the extra properties now that they are not needed
        nodes: NodeData[],
        edges: EdgeData[]
    };

    function process(input, target: string) {
        if (!input) { return; }  // most likely redundant now
        // if (input.or) { return process(input.or, target); }
        // if (input.and) { return process(input.and, target); }
        // if (input.code) {
        //     return `${input.subject}_${input.id}[${input.code}]\n${input.subject}_${input.id} --> ${target}\n`;
        // }
        for (let i = 0; i < input.length; i++) {
            /*p +=*/ process(input[i], target);
        }
        return;
    }

    function help(input: CourseShell, target: string) {
        if (!accs.has(input.subject)) { accs.set(input.subject, Access(input.subject)); }
        const { subject, id } = accs.get(input.subject).getCourse("code", input.code);
    }
}

interface MyNode extends NodeData {}
interface MyEdge extends EdgeData {}

/** DOES NOT RECURSIVELY BUILD YET (only traverses one level back)
export function buildCombinedGraph(courses) {
console.log("buildgraph:", courses)
if (courses.length == 0) { console.log("WARNING: no courses passed in, built empty graph.") }

    let accs = new Map()  // add Access(subject) as they are made, reuse them when possible
    let course_dupes = []
    let node_defs = []
    let or_defs = []
    let and_defs = []
    let edges = []

    for (let k = 0; k < courses.length; k++) {
console.log('>', courses[k])
        let [subjcode, coursenum] = courses[k].split(' ', 2)
        if (!accs.has(subjcode)) { accs.set(subjcode, Access(subjcode)) }
        coursenum = accs.get(subjcode).getId("id", coursenum)  // reassigned just in case there's a slight discrepancy between input and data
        // graph = graph.concat( helper(subjcode, coursenum) )
    }

    return "graph TB\n" + "??" //node_defs.join('\n')

    function helper (subj, idnum) {
        if (course_dupes.includes(`${subj} ${idnum}`)) { return '' }  // early exit for duplicates

console.log(':', subj, idnum)
        course_dupes.push(`${subj} ${idnum}`)
        let build = `${subj}_${idnum}[${subj} ${idnum}]\n`

        if (idnum < "1000") { return build }  // early exit for 0xxx-level courses

        let prereqs = accs.get(subj).getPrereq("code", `${subj} ${idnum}`)
        return build + process(prereqs, `${subj}_${idnum}`)
    }  // end of build_helper

    function process (preqs, target) {
        if (!preqs) { return '' }

        if (preqs.and) { return process(preqs.and, target) }
        if (preqs.or) { return process(preqs.or, target) }
        if (preqs.code) { return `${preqs.subject}_${preqs.id}[${preqs.code}]\n${preqs.subject}_${preqs.id} --> ${target}\n` }

        let proc = ''
        for (let i = 0; i < preqs.length; i++) { proc += process(preqs[i], target) }
        return proc
    }  // end of process
}
*/


/// MERMAID/REAGRAPH COMPATIBILITY

/** naively converts a JSON representation of a graph to Mermaid's markdown representation */
function convertJSONGraph(input: { nodes: { id: string; text: string; }[], edges: { from: string; to: string; }[] }) {
    // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
    return "graph TB\n" + [
            input.nodes.map(n => `${n.id}[${n.text}]`).join('\n'),    // node declarations
            input.edges.map(e => `${e.from} --> ${e.to}`).join('\n')  // edge declarations
    ].join('\n');
}

/** should be removed if migrating to reaflow/graph
 * reduced version of the corresponding reaflow/graph interface,
 * only keeping what I expect to use
 */
interface NodeData<T = any> {
    id: string;
    disabled?: boolean;
    text?: any;
    parent?: string;
    data?: T;
    className?: string;
    selectionDisabled?: boolean;
}

/** should be removed if migrating to reaflow/graph
 * reduced version of the corresponding reaflow/graph interface,
 * only keeping what I expect to use
 */
interface EdgeData<T = any> {
    id: string;
    disabled?: boolean;
    text?: any;
    from?: string;
    to?: string;
    data?: T;
    className?: string;
    arrowHeadType?: any;
    parent?: string;
    selectionDisabled?: boolean;
}
