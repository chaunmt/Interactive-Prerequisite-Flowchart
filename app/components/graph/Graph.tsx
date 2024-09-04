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
export default Graph;

import Mermaid from "./Mermaid";
import { CourseShell } from "../../data/types";
import buildGraph from "../../data/graphBuilder";
import type { GraphData, build_options } from "../../data/graphBuilder";

export type {
  /** nodes and edges */
  GraphData,
  /** @see graphBuilder */
  build_options,
  /** type definition is self-explanatory */
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
  //TODO: add graph customization features
  const graph = buildGraph(build);

  return <Mermaid graph={convertJSONGraph(graph, display)} />;
}

/** naively converts a JSON representation of a graph to Mermaid's markdown representation */
function convertJSONGraph(input: GraphData, display?: display_options) {
  // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
  let orientation = display?.orientation || "BT";

  return (
    `graph ${orientation}\n` +
    [
      input.nodes.map((n) => `${n.id}[${n.text}]`).join("\n"), // node declarations
      input.edges.map((e) => `${e.from} --> ${e.to}`).join("\n"), // edge declarations
    ].join("\n")
  );
}
