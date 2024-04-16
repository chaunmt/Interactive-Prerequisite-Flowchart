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
import type { GraphData, build_options } from "../../data/graphBuilder";

/** TODO documentation */
export default Graph;
export type {
  /** TODO documentation */
  GraphData,
  /** TODO documentation */
  build_options,
  /** TODO documentation */
  display_options,
};

type display_options = {
  readonly orientation?: "TB" | "BT" | "LR" | "RL"; // top-bottom, bottom-top, left-right, right-left
  // TODO: other readonly optional members as needed (remember to pad for undefined when using nonboolean) -- jahndan 2024/04/11
};

function Graph({
  build,
  display,
}: {
  build: build_options;
  display?: display_options;
}) {
  //TODO: extract Mermaid compatibility layer from graphBuilder.ts
  // - add graph customization features
  const graph = buildGraph(build);

  return <Mermaid graph={convertJSONGraph(graph)} />;
}

/** naively converts a JSON representation of a graph to Mermaid's markdown representation */
function convertJSONGraph(input: GraphData) {
  // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
  return (
    "graph BT\n" +
    [
      input.nodes.map((n) => `${n.id}[${n.text}]`).join("\n"), // node declarations
      input.edges.map((e) => `${e.from} --> ${e.to}`).join("\n"), // edge declarations
    ].join("\n")
  );
}
