/**
 * Wrapper component around graphing utilities that should provide more
 * flexibility with regards to graphing libraries (Mermaid, Reagraph, etc) and
 * graphing methods (such as graphBuilder.js vs. graphBuilder.ts in the past)
 *
 * Currently only supports Mermaid and graphBuilder.ts, but should aid in
 * future refactoring
 *
 * This component may also enable new ways of modifying/updating the graph,
 * such as manually adding new entries instead of relying entirely on the
 * Mermaid compatibility layer in graphBuilder.ts
 */
// "use client"

// import { useState } from "react";

import Mermaid from "./Mermaid";
import { CourseShell } from "../../data/types";
import buildGraph from "../../data/graphBuilder";

/**
 * Component which accepts a list of courses and generates a graph
 *
 * @param {CourseShell | CourseShell[]} sourceData Courses to build a graph from
 * @returns Component
 */
export default function Graph({
  sourceData,
  top_down,
}: {
  sourceData: CourseShell | CourseShell[];
  top_down?: boolean;
}) {
  //TODO: extract Mermaid compatibility layer from graphBuilder.ts
  // - add graph customization features
  const graph = buildGraph(sourceData);

  return <Mermaid graph={graph} />;
}
