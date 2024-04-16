import Access, { isEqualCourses } from "./access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "./types";
// import { NodeData, EdgeData } from "reagraph"; // "reaflow"

// TODO redo documentation (reexported items should be documented where reexported)

export type { GraphData, build_options };

/** debug messages from buildGraph */
const debug: {
  readonly process?: boolean; // print at each stage of the process in order of evaluation
  readonly output?: boolean; // print the output graph in dual list form before returning
  readonly reduced?: boolean; // compacts the log output at the expense of some specificity
} = {
  // process: true,
  // output: true,
  reduced: true,
};

// to avoid redundancy, this type's formal documentation will live in Graph.tsx
// note: hard_excludes takes precedence over soft_excludes, which takes precedence over includes (if a course appears in more than one list)
type build_options = {
  readonly includes?: CourseShell[]; // courses to include in the graph (these have their prerequisites recursively included too)
  readonly soft_excludes?: CourseShell[]; // courses to include in the graph without their prerequisites
  readonly hard_excludes?: CourseShell[]; // courses to exclude entirely
  readonly simplify?: boolean; // remove sophisticated representation of prerequisite relationships (no "or" or "and" nodes)
  readonly decimate_orphans?: boolean; // filter out nodes with no edges (this can filter out courses from the above lists)
};

/** use this to check if every or node is redundant */
function or_redundancy_check() {}

export default function buildGraph(input: build_options): GraphData {
  let graph = surgery(build(input));
  console.log(assist(graph).nodes);
  return input.decimate_orphans ? assist(graph) : graph;

  // remove redundant or/and
  function surgery(graph: GraphData) {
    // let redundancies = graph.nodes.filter((node) => {});
    return graph;
  }

  // filter out orphans
  function assist(graph: GraphData) {
    let nodes = graph.nodes.filter((node) =>
      graph.edges.some((edge) => node.id == edge.from || node.id == edge.to),
    );
    return { nodes: nodes, edges: graph.edges };
  }
}

/** the function that actually does all the work */
function build(input: build_options): GraphData {
  // unpacking solely for compactness of following code (at the expense of memory)
  const { includes = [], soft_excludes = [], hard_excludes = [], simplify } = input;

  if (includes.length == 0 && soft_excludes.length == 0) {
    console.warn("WARNING: no courses passed in, building empty graph.");
  }
  if (debug.process) {
    const log = debug.reduced ? includes.map((x) => x.code) : includes;
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
  includes.forEach((course, i) => {
    const log = debug.reduced ? course.code : course;
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
  soft_excludes.forEach((course, i) => {
    const log = debug.reduced ? course.code : course;
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

  // by the time flow of control is back here the graph should be complete
  if (debug.output) {
    const nlog = debug.reduced ? node_list.map((n) => n.id) : node_list;
    const elog = debug.reduced
      ? edge_list.map((e) => `${e.from} -> ${e.to}`)
      : edge_list;
    console.log("finish build:", nlog, elog);
  }
  return {
    nodes: node_list,
    edges: edge_list,
  };

  // here follows a lot of closures that need this specific scope

  // this is the entry point in a sort of "mutual recursion" between this and processor()
  function singleton(course: CourseShell) {
    if (debug.process) {
      const log = debug.reduced ? course.code : course;
      console.log("singleton:", log);
    }

    // request new accessor only when necessary
    if (!accessors.has(course.subject)) {
      accessors.set(course.subject, Access(course.subject));
    }

    let sublevel = Number(course.id.match(/\d+/g)[0]) < 1000;
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
      return;
    }

    const { code, subject, id, prereq } = full_course;
    let node_id = `${subject}_${id}`;

    // skip this step if already processed
    if (node_list.every((node) => node.id !== node_id)) {
      node_list.push({ id: node_id, text: code });

      // only process prereqs if not soft_excluded
      if (soft_excludes.every((encl) => code != encl.code)) {
        processor(simplify ? flatten(prereq) : prereq, { nid: node_id, i: 0 });
      }
    }

    // this is used to distinguish And/Or nodes from each other
    return node_id;
  }

  function course_lambda(preq: CourseShell, state: build_state) {
    // skip if excluded
    if (hard_excludes.some((excl) => isEqualCourses(excl, preq))) return;

    let node_id = singleton(preq);
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
    // if (node_list.every(node => node.id !== node_id)) {
    node_list.push({ id: node_id, text: "OR" });
    edge_list.push({
      id: `${node_id}___${state}`,
      from: node_id,
      to: state.nid,
    });
    // }
    return { nid: node_id, i: state.i };
  }

  function andx(state: build_state): build_state {
    let node_id = `${state.nid}_${state.i}_and`;
    // if (node_list.every(node => node.id !== node_id)) {
    node_list.push({ id: node_id, text: "AND" });
    edge_list.push({
      id: `${node_id}___${state}`,
      from: node_id,
      to: state.nid,
    });
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

type GraphData = { nodes: NodeData[]; edges: EdgeData[] };

/// MERMAID/REAGRAPH COMPATIBILITY

/** should be removed if migrating to reaflow/graph
 * reduced version of the corresponding reaflow/graph
 * interface, only keeping what I expect to use */
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
 * reduced version of the corresponding reaflow/graph
 * interface, only keeping what I expect to use */
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

// a smarter version of this would have the Nodes keep track of
// either their outbound or inbound edges, and then iterate over
// the node list to append together each of their edge lists
// interface NodeData {
//   id: string;
//   ...
//   edges: string[]; // list of connected node ids
// }
