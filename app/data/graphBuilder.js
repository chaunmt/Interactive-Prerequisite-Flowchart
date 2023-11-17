import Access from "./access"

const use_elk = true;
const graph_config = (use_elk
  ? '---\nconfig:\n flowchart:\n  defaultRenderer: elk\n theme: dark\n themeVariables:\n  primaryColor: "#00ff00"\n---\n'
  : '---\nconfig:\n theme: dark\n themeVariables:\n  primaryColor: "#00ff00"\n---\n'
);


export function buildCombinedGraph(courses) {
    console.log("buildgraph:", courses)
    if (courses.length == 0) { console.log("WARNING: no courses passed in, built empty graph.") }

    const accs = Map()  // add Access(subject) as they are made, reuse them when possible
    let or_dupes = []  // these nodes will be represented as sets (of nodes)
    let course_dupes = []  // these nodes will be represented nodes as strings "subject id"

    // strings that make up the graphstring (node declarations, and edge declarations)
    let or_nodes = []
    let or_edges = []
    let and_nodes = []  // 'and' *should* be rare
    let and_edges = []
    let course_nodes = []
    let course_edges = []

    for (var k = 0; k < courses.length; k++) {
        console.log('>', courses[k])
        let [subjcode, coursenum] = courses[k].split(" ", 2)
        if (!accs.has(subjcode)) { accs.set(subjcode, Access(subjcode)) }
        coursenum = accs.get(subjcode).getCourse()
        // graph = graph.concat( build_helper(subjcode, coursenum) )
    }

    return graph_config + "graph TD\n" + or_nodes.join('\n') + and_nodes.join('\n') + course_nodes.join('\n') + course_edges.join('\n') + and_edges.join('\n') + or_edges.join('\n')

    // catch-all for non course items (including and/or nodes)
    function trav_helper (item, and, or) { // external calls should use -1, -1
// TODO fix the "then" parts of these if statements, and also the for loop
        if (!item) return  // null-check
        if (item.and) {
            //
            trav_helper(item.and, and_nodes.length, -1)
        }
        if (item.or) {
            //
            trav_helper(item.or, -1, or_nodes.length)
        }
        if (item.code) { build_helper(item.code) }

        for (i = 0; i < arr.length; i++) {
            if (and) {
                trav_helper(item[i])
                return //
            }
            if (or) {
                trav_helper(item[i])
                return //
            }
        }
    }  // end of trav_helper

    // course items are delegated to this (prereq recursion happens here)
    function build_helper (code) {
// TODO this entire thing
        if (course_dupes.includes(`${code}`)) { return '' }  // early exit for duplicates

        console.log(':', code)
        course_dupes.push(`${code}`)
        let build = `${subj}_${idnum}[${code}]\n`

        if (idnum < "1000") { return build }  // early exit for 0xxx-level courses

        let prereqs = accses.getPrereq("code", `${subj} ${idnum}`)
        for (var j = 0; j < req.length; j++) {
            let pre_subj = req[j].subject  // assume good
            let pre_id = req[j].id  // fetch appropriate id from accessors
            build += trav_helper(pre_subj, pre_id) + `${pre_subj}_${pre_id} --> ${subj}_${idnum}\n`
        }

        return build
    }  // end of build_helper
}

export function buildGraph(course) {
    return buildCombinedGraph([course])
}
