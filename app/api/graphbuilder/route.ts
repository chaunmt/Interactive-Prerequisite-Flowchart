import Access, { isEqualCourses } from "../../data/access";
import {
  Accessor,
  CourseShell,
  Course,
  PrereqFormat,
  PrereqTraversal,
} from "../../data/types";
import type { NodeData, EdgeData } from "reaflow";

export type GraphData = { nodes: NodeData[]; edges: EdgeData[] };

export async function GET(request: Request): Promise<GraphData> {
  // parse url for string params
  const url = new URL(request.url);
  const simplify = url.searchParams.get("simplify") || "false";
  const orphans = url.searchParams.get("orphans") || "false";

  // parse body for json params
  const body = (await request.json()) as BuildOptions; // as Partial<BuildOptions>
  const include = body.include || [];
  const folded = body.folded || [];
  const exclude = body.exclude || [];

  // do stuff
  console.log(body.include);
  console.log(body.folded);
  console.log(body.exclude);

  return { nodes: [], edges: [] };
}

/** type signature of GET request body */
interface BuildOptions {
  include?: CourseShell[]; // courses to include in the graph (these have their prerequisites recursively included too)
  folded?: CourseShell[]; // courses to include in the graph without their prerequisites
  exclude?: CourseShell[]; // courses to exclude entirely
}

// // example code for making api request ??

// const req = { includes: [{id: "CSCI 1"}, {id: "CSCI 2"}, {id: "CSCI 3"}] };
// const res = await fetch(
//   `/api/graphbuilder`,
//   {
//     method: "GET",
//     body: JSON.stringify(req),
//     headers: {"Content-Type": "application/json"},
//   },
// );

// // const res = await fetch(`/api/graphbuilder?includes=csci1133`);
