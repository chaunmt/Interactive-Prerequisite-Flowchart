import Access from "./access"

const use_elk = true;
const graph_config = (use_elk  // neither of these work currently
    // frontmatter is preferred
    ? '---\nconfig:\n flowchart:\n  defaultRenderer: elk\n theme: dark\n---\n'
    : '---\nconfig:\n theme: dark\n---\n'
    // directives are deprecated
    ? '%%{ init: { "theme": "dark", "flowchart": { "defaultRenderer": "elk" } } }%%\n'
    : '%%{ init: { "theme": "dark" } }%%\n'
);

// DOES NOT RECURSIVELY BUILD YET (only traverses one level back)
export function buildCombinedGraph(courses) {
    // redesign and write
}

export function buildGraph(course) {
    return buildCombinedGraph([course])
}
