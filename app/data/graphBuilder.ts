import { Access, isEqualCourses } from "./access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "./types";
// import { NodeData, EdgeData } from "reagraph"; // "reaflow"

// TODO redo documentation (reexported items should be documented where reexported)

export { buildGraph };
export type { GraphData, build_options };

/** debug messages from buildGraph */
const debug: {
  process?: boolean; // print at each stage of the process in order of evaluation
  postprocess?: boolean; // print steps of the post-processing where stuff is renamed and filtered
  output?: boolean; // print the output graph in dual list form before returning
  formatted?: boolean; // compacts the log output at the expense of some specificity
} = {
  // process: true,
  // postprocess: true,
  // output: true,
  formatted: true, // some prints don't work right if this is off
};

// note: hard_excludes takes precedence over soft_excludes, which takes precedence over includes (if a course appears in more than one list)
// and strong_orphans are an override to keep them in when filtering out orphan nodes (they still must be in includes to be placed in the graph)
type build_options = {
  includes?: readonly CourseShell[]; // courses to include in the graph (these have their prerequisites recursively included too)
  soft_excludes?: readonly CourseShell[]; // courses to include in the graph without their prerequisites
  hard_excludes?: readonly CourseShell[]; // courses to exclude entirely
  simplify?: boolean; // remove sophisticated representation of prerequisite relationships (no "or" or "and" nodes)
  decimate_orphans?: boolean; // filter out nodes with no edges (this can filter out courses from the above lists)
  strong_orphans?: readonly CourseShell[]; // will never be filtered out even if it's an orphan node (does not add to the graph, just overrides the filter)
};

function buildGraph(input: build_options): GraphData {
  let { strong_orphans } = input;
  let graph = surgery(rawbuild(input));
  return input.decimate_orphans ? assist(graph) : graph;

  // remove redundant or/and
  function surgery(graph: GraphData) {
    // note: reverse order for correctness
    // must process children before parents
    // -- a node's canonized id is based on its children
    for (let node of graph.nodes.reverse()) {
      // canonize only And/Or nodes
      switch (node.type) {
        case "and":
        case "or":
          // should always be in canonical order
          node.inbound_edges.sort();
          let old_id = node.id; // so we can fix the other nodes
          // compute the canonized id for a node
          node.id = `${node.type}_${node.inbound_edges.join("_")}`;
          // what nodes need their edge lists updated
          let updates = graph.nodes.filter((n) =>
            n.inbound_edges.includes(old_id),
          );
          for (let n of updates) {
            // replace the id in the edge list
            n.inbound_edges[n.inbound_edges.indexOf(old_id)] = node.id;
          }
          if (debug.postprocess) {
            console.log(old_id, "", node.id);
          }
        case "course": // immediate exit for course nodes
          break;
      }
    }

    // remove duplicates
    let out: GraphData = { nodes: [], edges: null };
    for (const node of graph.nodes) {
      if (out.nodes.every((n) => n.id !== node.id)) {
        out.nodes.push(node);
      }
    }
    return out;
  }

  // filter out orphans
  function assist(graph: GraphData): GraphData {
    let preserves = strong_orphans.map((sh) => `${sh.subject}_${sh.id}`);
    let nodes = graph.nodes.filter(
      (node) =>
        preserves.includes(node.id) ||
        graph.edges.some((edge) => node.id == edge.from || node.id == edge.to),
    );
    return { nodes: nodes, edges: graph.edges };
  }
}

/** the function that actually does all the work */
function rawbuild(input: build_options): GraphData {
  const {
    includes = [],
    soft_excludes = [],
    hard_excludes = [],
    simplify,
  } = input;

  if (includes.length == 0 && soft_excludes.length == 0) {
    console.warn("WARNING: no courses passed in, building empty graph.");
  }
  if (debug.process) {
    const log = debug.formatted ? includes.map((x) => x.code) : includes;
    console.log("begin build:", log);
  }

  // lots of declarations needed in scope for closures
  let node_list: NodeData[] = [];
  let edge_list: EdgeData[] = [];
  /** store and reuse Accessors instead of creating a new one every time it's needed */
  let accessors = new Map<string, Accessor>();
  let processor = PrereqTraversal<void, build_state>(
    () => {},
    course_lambda,
    () => {},
    () => {},
    arrx,
    orx,
    andx,
  ); // no return value needed, so most of the lambdas can be void (mostly side-effects)

  // enter recursive pattern for each included/soft_excluded course
  soft_excludes.forEach((course, i) => {
    const log = debug.formatted ? course.code : course;
    if (hard_excludes.some((excl) => isEqualCourses(excl, course))) {
      if (debug.process) {
        console.log(`soft_excludes[${i}]:`, log, "skipped (hard exclusion)");
      }
    } else {
      if (debug.process) {
        console.log(`soft_excludes[${i}]:`, log);
      }
      singleton(course);
    }
  });
  includes.forEach((course, i) => {
    const log = debug.formatted ? course.code : course;
    if (hard_excludes.some((thing) => isEqualCourses(thing, course))) {
      if (debug.process) {
        console.log(`includes[${i}]:`, log, "skipped (hard exclusion)");
      }
    } else {
      if (debug.process) {
        console.log(`includes[${i}]:`, log);
      }
      singleton(course);
    }
  });

  // by the time flow of control is back here the graph should be complete
  if (debug.output) {
    console.log("finish build:");
    const nlog = node_list
      .map(
        (n) => `\
${n.id}:
  type: ${n.type}
  inbounds: [${n.inbound_edges}]
`,
      )
      .join("");
    // const elog = edge_list.map((e) => `${e.from} -> ${e.to}\n`).join("");
    console.log(nlog);
  }
  return {
    nodes: node_list,
    edges: edge_list,
  };

  // here follows a lot of closures that need* this specific scope
  // *this could be done without, but all of these would need extra params

  // this is the entry point in a sort of "mutual recursion" between this and processor()
  function singleton(course: CourseShell) {
    if (debug.process) {
      const log = debug.formatted ? course.code : course;
      console.log("singleton:", log);
    }

    // request new accessor only when necessary
    if (!accessors.has(course.subject)) {
      accessors.set(course.subject, Access(course.subject));
    }

    let sublevel: boolean = Number(course.id.match(/\d+/g)[0]) < 1000;
    const full_course = sublevel
      ? {
          code: course.code,
          subject: course.subject,
          id: course.id,
          prereq: [],
        }
      : accessors.get(course.subject).get(course);

    // TODO proper error handling - 2024/03/08
    if (full_course == null) {
      console.error(
        "ERROR: Invalid course found while building graph:",
        course.code,
      );
      // throw Error(`Invalid course found: ${course.code}`);
      return "unknown"; // instead of undefined
    }

    const { code, subject, id, prereq } = full_course;
    let node_id = `${subject.toLowerCase()}${id}`;

    // skip this step if already processed
    if (node_list.every((node) => node.id !== node_id)) {
      node_list.push({
        id: node_id,
        display: code,
        type: "course",
        inbound_edges: [],
      });

      // only process prereqs if not soft_excluded
      if (soft_excludes.every((encl) => code != encl.code)) {
        processor(simplify ? flatten(prereq) : prereq, { nid: node_id, i: 0 });
      } // TODO pretty certain this if guard is unnecessary if we process soft_excludes before includes
    }

    // this is used to distinguish And/Or nodes from each other
    return node_id;
  }

  function course_lambda(preq: CourseShell, state: build_state) {
    // skip if excluded
    if (hard_excludes.some((excl) => isEqualCourses(excl, preq))) return;

    let node_id = singleton(preq);
    // add this node we are currently creating to the parent's list of inbound edges
    node_list.find((n) => n.id == state.nid)?.inbound_edges.push(node_id);
    let edge_id = `${node_id}___${state.nid}`;
    if (edge_list.every((edge) => edge.id !== edge_id)) {
      edge_list.push({ id: edge_id, from: node_id, to: state.nid });
    }
    return;
  }

  function arrx(state: build_state, index: number): build_state {
    return { nid: state.nid, i: index };
  }

  function orx(state: build_state): build_state {
    let node_id = `${state.nid}_${state.i}_or`;
    // add this node we are currently creating to the parent's list of inbound edges
    node_list.find((n) => n.id == state.nid)?.inbound_edges.push(node_id);
    let edge_id = `${node_id}___${state.nid}`;
    // if (node_list.every(node => node.id !== node_id)) {
    node_list.push({ id: node_id, type: "or", inbound_edges: [] });
    edge_list.push({ id: edge_id, from: node_id, to: state.nid });
    // }
    return { nid: node_id, i: state.i };
  }

  function andx(state: build_state): build_state {
    let node_id = `${state.nid}_${state.i}_and`;
    // add this node we are currently creating to the parent's list of inbound edges
    node_list.find((n) => n.id == state.nid)?.inbound_edges.push(node_id);
    let edge_id = `${node_id}___${state.nid}`;
    // if (node_list.every(node => node.id !== node_id)) {
    node_list.push({ id: node_id, type: "and", inbound_edges: [] });
    edge_list.push({ id: edge_id, from: node_id, to: state.nid });
    // }
    return { nid: node_id, i: state.i };
  }

  type build_state = { nid: string; i: number };
}

let flatten = PrereqTraversal<CourseShell[], void>(
  (cl_outs) => {
    return cl_outs.flat();
  },
  (crs) => {
    return [crs];
  },
  (al_out) => {
    return al_out;
  },
  (al_out) => {
    return al_out;
  },
);

/// convenience type defs

type GraphData = {
  nodes: NodeData[]; //: Map<node_id, NodeData>;
  edges: EdgeData[]; //: Map<edge_id, EdgeData>;
};

type node_id = string;
type edge_id = string;

interface NodeData {
  id: node_id;
  display?: any;
  type: "course" | "or" | "and";
  inbound_edges: node_id[]; // corresponds to an edge from list entry to this
}

// maybe redundant now -- but refactoring needed elsewhere before removing this
interface EdgeData {
  id: edge_id; // currently unused
  from?: string;
  to?: string;
}
