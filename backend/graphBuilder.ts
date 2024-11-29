import { PrerequisiteTraversal, uid_get } from "@/backend/access";
import { Course } from "@/data/types";

// TODO client-side behavior to allow on-click interactivity
// - access caching/efficiency behavior?

export { buildGraph };
export type { GraphData, BuildOptions };

// note: hard_excludes takes precedence over soft_excludes, which takes precedence over includes (if a course appears in more than one list)
// and strong_orphans are an override to keep them in when filtering out orphan nodes (they still must be in includes to be placed in the graph)
type BuildOptions = {
  includes?: readonly string[]; // course uids to include in the graph (these have their prerequisites recursively included too)
  soft_excludes?: readonly string[]; // course uids to include in the graph without their prerequisites
  hard_excludes?: readonly string[]; // course uids to exclude entirely
  honor?: boolean; // whether or not to consider honors courses while building the graph
  decimate_orphans?: boolean; // filter out nodes with no edges (this can filter out courses from the above lists)
  strong_orphans?: readonly string[]; // course uids to avoid filtered out even if it's an orphan node (does not add to the graph, just overrides the filter)
};

function buildGraph(input: BuildOptions): GraphData {
  const { strong_orphans = [] } = input;
  const raw = rawbuild(input);
  // console.log(`RAW\n${graphtostring(raw)}`);
  const combined = combine(raw);
  // console.log(`COMBINE\n${graphtostring(combined)}`);
  const stitched = stitch(combined);
  // console.log(`STITCH\n${graphtostring(stitched)}`);
  const graph = surgery(stitched);
  // console.log(`GRAPH\n${graphtostring(graph)}`);
  return input.decimate_orphans ? assist(graph, strong_orphans) : graph;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function graphtostring(graph: GraphData): string {
  return graph.nodes
    .map(
      (node) =>
        `\
${node?.id}${node?.type === "course" ? `[${node?.meta}]` : ""}
  type: ${node?.type}
  edges: ${node?.inbound_edges}
`,
    )
    .join("");
}

/* post-build filtering functions */

// filter out orphans
function assist(
  graph: GraphData,
  strong_orphans: readonly string[],
): GraphData {
  const edges = graph.nodes
    .map((node) => node.inbound_edges.map((from) => ({ from, to: node.id })))
    .flat();
  const nodes = graph.nodes.filter(
    (node) =>
      strong_orphans.includes(node.id) ||
      edges.some((edge) => node.id === edge.from || node.id === edge.to),
  );
  return { nodes: nodes };
}

// stitch top level 'and' nodes out
function surgery(graph: GraphData): GraphData {
  graph.nodes
    .filter((n) => n.type === "course")
    .forEach((node) => {
      node.inbound_edges
        .map((e) => graph.nodes.find((n) => n.id === e))
        .filter((n) => n?.type === "and")
        .forEach((and, i) => {
          // if not a combined node
          if (!and.meta) {
            // remove 'and' node
            const idx = graph.nodes.indexOf(and);
            graph.nodes.splice(idx, 1); // from the list of nodes
            node.inbound_edges.splice(i, 1); // from this node's list of edges
            // stitch 'and' children to 'course' node
            node.inbound_edges.push(...and.inbound_edges);
          }
        });
    });
  return graph;
}

function stitch(graph: GraphData): GraphData {
  //
  return graph;
}

// de-duplicate 'and'/'or' nodes that share same child nodes
function combine(graph: GraphData): GraphData {
  // canonize ids of nodes (and for edges)
  const canonized = graph.nodes.map((n) => ({
    id: canonize(n.id),
    meta: n.meta,
    type: n.type,
    inbound_edges: n.inbound_edges.map(canonize),
    // calling canonize for every node and edge may be inefficient
  }));
  // deduplicate nodes
  const nodes = canonized.reduce((a, b) => {
    if (a.findIndex((c) => b.id === c.id) < 0) a.push(b);
    return a;
  }, []);
  return { nodes };

  function canonize(node_id: string): string {
    const node = graph.nodes.find((n) => n.id === node_id);
    // in case of ultra failure
    if (!node) {
      console.error("Graph contains edges that reference nonexistent nodes!");
      return null;
    }
    // actual canonized node ids
    if (node.type === "course") return node.id;
    return `${node.type}_${canonizer(node.inbound_edges.toSorted())}`;
  }

  function canonizer(edge_ids: string[]): string {
    return edge_ids
      .map((e) => canonize(e))
      .toSorted()
      .join("_");
  }
}

// TODO smarter caching behavior + test if this is always server-side
// or if we need to consider client-side behavior

/** the function that actually does all the building work */
function rawbuild(input: BuildOptions): GraphData {
  const {
    includes = [],
    soft_excludes = [],
    hard_excludes = [],
    honor,
  } = input;

  if (includes.length === 0 && soft_excludes.length === 0) {
    console.warn("WARNING: no courses passed in, returning empty graph.");
    return { nodes: [] };
  }

  // lots of declarations needed in scope for closures
  const node_list: NodeData[] = [];
  const processor = PrerequisiteTraversal<void, build_state>(
    () => {}, // do nothing
    course_lambda,
    () => {}, // do nothing
    () => {}, // do nothing
    undefined,
    honor,
    arrx,
    orx,
    andx,
  ); // no return value needed, so most of the lambdas can be void (mostly side-effects)

  // enter recursive pattern for each included/soft_excluded course
  soft_excludes.forEach((course_uid) => {
    if (hard_excludes.every((c) => c != course_uid)) {
      const course = uid_get(course_uid);
      if (!course)
        console.error(`ERROR: Invalid course received while building graph.`);
      singleton(course);
    }
  });
  includes.forEach((course_uid) => {
    if (hard_excludes.every((c) => c != course_uid)) {
      const course = uid_get(course_uid);
      if (!course)
        console.error(`ERROR: Invalid course received while building graph.`);
      singleton(course);
    }
  });

  // by the time flow of control is back here the graph should be complete
  return {
    nodes: node_list,
  };

  /* here follows a lot of closures that need this specific scope */

  // this is the entry point in a sort of "mutual recursion" between this and processor()
  function singleton(course: Course) {
    console.log(`>>>> singleton(${course.code}{ ${course.uid} })`);
    const { uid, code, prereq } = course;

    // skip this step if already processed
    if (node_list.every((node) => node.id !== uid)) {
      console.log("course:", uid, code);
      node_list.push({
        id: uid,
        meta: code,
        type: "course",
        inbound_edges: [],
      });

      // only process prereqs if not soft_excluded
      if (soft_excludes.every((c) => c != uid)) {
        console.log("prereq:", { parent: uid, i: 0 });
        processor(prereq, { parent: uid, i: 0 });
      }
    }

    console.log(`<<<< singleton(${course.code}{ ${course.uid} })`);
    return;
  }

  function course_lambda(preq: Course, state: build_state) {
    // skip if excluded
    if (hard_excludes.some((c) => c != preq.uid)) return;

    console.log(
      `>>>> crsl(${preq.code}{${preq.uid}}, {${state.parent}, ${state.i}})`,
    );
    singleton(preq);

    // add this node we are currently creating to the parent's list of inbound edges
    const parent: NodeData = node_list.find((n) => n.id === state.parent);
    console.log("edge:", preq.uid, preq.code, "-->", parent.id, parent.meta);
    if (!parent?.inbound_edges.includes(preq.uid))
      parent?.inbound_edges.push(preq.uid);

    console.log(
      `<<<< crsl(${preq.code}{${preq.uid}}, {${state.parent}, ${state.i}})`,
    );
    return;
  }

  function arrx(state: build_state, index: number): build_state {
    console.log(`---- arrx({${state.parent}, ${state.i}})`);
    return { parent: state.parent, i: index };
  }

  function orx(state: build_state): build_state {
    console.log(`>>>> orx({${state.parent}, ${state.i}})`);

    const node_id = `${state.parent}_${state.i}_or`;
    console.log("or:", node_id);
    node_list.push({ id: node_id, type: "or", inbound_edges: [] });

    // add this node we are currently creating to the parent's list of inbound edges
    const parent: NodeData = node_list.find((n) => n.id === state.parent);
    console.log("edge:", node_id, "-->", parent.id, parent.meta);
    if (!parent?.inbound_edges.includes(node_id))
      parent?.inbound_edges.push(node_id);

    console.log(`<<<< orx({${state.parent}, ${state.i}})`);
    return { parent: node_id, i: 0 };
  }

  function andx(state: build_state): build_state {
    console.log(`>>>> andx({${state.parent}, ${state.i}})`);

    const node_id = `${state.parent}_${state.i}_and`;
    console.log("and:", node_id);
    node_list.push({ id: node_id, type: "and", inbound_edges: [] });

    // add this node we are currently creating to the parent's list of inbound edges
    const parent: NodeData = node_list.find((n) => n.id === state.parent);
    console.log("edge:", node_id, "-->", parent.id, parent.meta);
    if (!parent?.inbound_edges.includes(node_id))
      parent?.inbound_edges.push(node_id);

    console.log(`<<<< andx({${state.parent}, ${state.i}})`);
    return { parent: node_id, i: 0 };
  }

  type build_state = { parent: string; i: number };
}

/// convenience type defs

type GraphData = {
  nodes: NodeData[]; //: Map<node_id, NodeData>;
  // codeps: string[][]; // list of [node_id, node_id] to store
};

type node_id = string;

interface NodeData {
  id: node_id;
  meta?: any; // display text for course nodes, combined status for and/or nodes
  type: "course" | "or" | "and";
  inbound_edges: node_id[]; // nodes in the list have edges going towards this one
}
