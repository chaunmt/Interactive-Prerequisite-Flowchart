import Access from "./access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "./types";
// import { NodeData, EdgeData } from "reagraph"; // "reaflow"

/** pass in either a courseshell or an array of courseshells, and get back the appropriate graph */
export default function buildGraph(input: CourseShell | CourseShell[]) {
  return convertJSONGraph(
    (Array.isArray(input) ? build(input) : build([input])) as {
      nodes: { id: string; text: string }[];
      edges: { from: string; to: string }[];
    },
  );
}

function build(courses: CourseShell[]): {
  nodes: NodeData[];
  edges: EdgeData[];
} {
  if (courses.length == 0) {
    console.log("WARNING: no courses passed in, built empty graph.");
  }

  let node_list: NodeData[] = [];
  let edge_list: EdgeData[] = [];
  /** store and reuse Accessors instead of creating a new one every time it's needed */
  let accessors = new Map<string, Accessor>();

  return {
    nodes: node_list,
    edges: edge_list,
  };
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
