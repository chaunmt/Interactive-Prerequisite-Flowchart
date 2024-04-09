import Access from "./access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "./types";
// import { NodeData, EdgeData } from "reagraph"; // "reaflow"

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

type build_options = {
  // note: hard_excludes takes precedence over soft_excludes, which takes precedence over includes (if a course appears in more than one list)
  readonly includes?: CourseShell[]; // courses to include in the graph (these have their prerequisites recursively included too)
  readonly soft_excludes?: CourseShell[]; // courses to include in the graph without their prerequisites
  readonly hard_excludes?: CourseShell[]; // courses to exclude entirely
  readonly simplify?: boolean; // remove sophisticated representation of prerequisite relationships (no "or" or "and" nodes)
  readonly decimate_orphans?: boolean; // filter out nodes with no edges
};

/** use this to check if every or node is redundant */
function or_redundancy_check() {}

/** pass in either a courseshell or an array of courseshells, and get back the appropriate graph */
export default function buildGraph(input: build_options): GraphData {
  let graph = build(input);
  return input.decimate_orphans ? graph : cleanup(graph);

  function cleanup(graph: GraphData) {
    return graph;
  }
}

/** the function that actually does all the work */
function build(input: build_options): GraphData {
  let { includes, soft_excludes, hard_excludes, simplify } = input;

  if (!includes && !soft_excludes) {
    console.warn("WARNING: no courses passed in, building empty graph.");
  }
  if (debug.process) {
    const log = debug.reduced ? includes.map((x) => x.code) : includes;
    console.log("begin build:", log);
  }

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
  ); // no return value needed, so most of the lambdas can be void

  includes.forEach((course, i) => {
    if (debug.process) {
      const log = debug.reduced ? course.code : course;
      console.log("includes:", log, "—", i);
    }
    singleton(course);
  });
  soft_excludes.forEach((course, i) => {
    if (debug.process) {
      const log = debug.reduced ? course.code : course;
      console.log("soft_excludes:", log, "—", i);
    }
    singleton(course);
  });

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
    // TODO proper error handling
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
      if (soft_excludes.every((cours) => code != cours.code)) {
        processor(prereq, { nid: node_id, i: 0 });
      }
    }
    return node_id;
  }

  function course_lambda(preq: CourseShell, state: build_state) {
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
}

type build_state = { nid: string; i: number };

type GraphData = { nodes: NodeData[]; edges: EdgeData[] };

/// MERMAID/REAGRAPH COMPATIBILITY

/** naively converts a JSON representation of a graph to Mermaid's markdown representation */
export function convertJSONGraph(input: GraphData) {
  // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
  return (
    "graph BT\n" +
    [
      input.nodes.map((n) => `${n.id}[${n.text}]`).join("\n"), // node declarations
      input.edges.map((e) => `${e.from} --> ${e.to}`).join("\n"), // edge declarations
    ].join("\n")
  );
}

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
