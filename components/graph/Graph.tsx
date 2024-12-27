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
import { buildGraph } from "@/backend/graphBuilder";

import type { GraphData, BuildOptions } from "@/backend/graphBuilder";

export type {
  /** nodes and edges */
  GraphData,
  /** @see graphBuilder */
  BuildOptions,
  /** type definition is self-explanatory */
  DisplayOptions,
};

type DisplayOptions = {
  orientation?: "TB" | "BT" | "LR" | "RL"; // top-bottom, bottom-top, left-right, right-left
  theme?: "light" | "dark"; // assumed light if not included
  // TODO: other optional members as needed (remember to pad for undefined when using nonboolean) -- jahndan 2024/04/11
};

function Graph({
  build,
  display,
}: {
  build: BuildOptions;
  display?: DisplayOptions;
}) {
  const graph = buildGraph(build);

  return <Mermaid graph={convertJSONGraph(graph, display)} />;
}

// class definitions
const nodetypes = `
classDef AND !important
classDef OR !important
classDef default !important
`;

/** naively converts a JSON representation of a graph to Mermaid's textual representation */
export function convertJSONGraph(input: GraphData, display?: DisplayOptions) {
  // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
  const frontmatter = `\
---
config:
  layout: elk
  theme: ${display?.theme === "dark" ? "dark" : "default"}
---

`;
  const orientation = display?.orientation || "BT";

  const graph =
    frontmatter +
    `graph ${orientation}\n` +
    nodetypes +
    "\n%% node declarations\n" +
    input.nodes
      .map((n) => {
        if (n.type === "or") {
          // sorry if your editor bugs out: the zwj allows me to
          // add padding because mermaid trims whitespace otherwise
          return `${n.id}([‍  or  ‍]):::OR\n`;
        }
        if (n.type === "and") {
          // sorry if your editor bugs out: the zwj allows me to
          // add padding because mermaid trims whitespace otherwise
          return `${n.id}{{‍ and ‍}}:::AND\n`;
        }
        // course node
        return `${n.id}[${n.meta || "unknown"}]\n`;
      })
      .join("") +
    "\n%% edge declarations\n" +
    input.nodes
      .map((parent) =>
        parent.inbound_edges
          .map((child) => {
            const arrow = "-->"; // parent.type === "or" ? "-.->" : "-->";
            return `${child} ${arrow} ${parent.id}\n`;
          })
          .join(""),
      )
      .join("");
  return graph;
}
