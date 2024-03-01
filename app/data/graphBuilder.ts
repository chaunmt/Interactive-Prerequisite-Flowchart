import Access from "./access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "./types";
// import { NodeData, EdgeData } from "reagraph"; // "reaflow"

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

  if (debug) {
    console.log("end buildgraph:", node_list, edge_list);
  }
  return {
    nodes: node_list,
    edges: edge_list,
  };

  function single(course: CourseShell) {}
  function course_lambda(preq: CourseShell, state: { nid: string; i: 0 }) {}
  function arrx(state: build_state, index: number): build_state {}
  function orx(state: build_state): build_state {}
  function andx(state: build_state): build_state {}
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
