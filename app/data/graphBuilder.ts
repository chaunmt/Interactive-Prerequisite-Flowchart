import Access from "./access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "./types";
// import { NodeData, EdgeData } from "reagraph"; // "reaflow"

/** turns on/off debug messages from buildGraph */
let debug: boolean = true;

/** pass in either a courseshell or an array of courseshells, and get back the appropriate graph */
export default function buildGraph(input: CourseShell | CourseShell[]) {
  return convertJSONGraph(
    (Array.isArray(input) ? build(input) : build([input])) as {
      nodes: { id: string; text: string }[];
      edges: { from: string; to: string }[];
    },
  );
}

/** type definition used only for the state variable in PrereqTraversal's lambdas */
type build_state = { nid: string; i: number };

/** the function that actually does all the work */
function build(courses: CourseShell[]): {
  nodes: NodeData[];
  edges: EdgeData[];
} {
  if (courses.length == 0) {
    console.log("WARNING: no courses passed in, built empty graph.");
  }
  if (debug) {
    console.log(
      "buildgraph:",
      courses.map((x) => x.code),
    );
  }

  let node_list: NodeData[] = [];
  let edge_list: EdgeData[] = [];
  /** store and reuse Accessors instead of creating a new one every time it's needed */
  let accessors = new Map<string, Accessor>();
  let process = PrereqTraversal<void, build_state>(
    () => {},
    course_lambda,
    () => {},
    () => {},
    arrx,
    orx,
    andx,
  ); // no return value needed, so most of the lambdas can be void

  courses.forEach((course) => {
    if (debug) {
      console.log(">", course.code);
    }
    single(course);
  });

  if (debug) {
    console.log("end buildgraph:", node_list, edge_list);
  }
  return {
    nodes: node_list,
    edges: edge_list,
  };

  function single(course: CourseShell) {
    if (debug) {
      console.log("single:", course.code);
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
    // if the course is not found in Access, simply do nothing
    if (full_course == null) {
      console.log(
        "ERROR: Invalid course found while building graph:",
        course.code,
      );
      return;
    }

    const { code, subject, id, prereq } = full_course;
    let node_id = `${subject}_${id}`;
    // skip if already processed
    if (node_list.every((node) => node.id !== node_id)) {
      node_list.push({ id: node_id, text: code });
      process(prereq, { nid: node_id, i: 0 });
    }
    return node_id;
  }

  function course_lambda(preq: CourseShell, state: build_state) {
    let node_id = single(preq);
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

/// MERMAID/REAGRAPH COMPATIBILITY

/** naively converts a JSON representation of a graph to Mermaid's markdown representation */
function convertJSONGraph(input: {
  nodes: { id: string; text: string }[];
  edges: { from: string; to: string }[];
}) {
  // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
  return (
    "graph TB\n" +
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
