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

import type { GraphData, build_options } from "@/backend/graphBuilder";

export type {
  /** nodes and edges */
  GraphData,
  /** @see graphBuilder */
  build_options,
  /** type definition is self-explanatory */
  display_options,
};

type display_options = {
  orientation?: "TB" | "BT" | "LR" | "RL"; // top-bottom, bottom-top, left-right, right-left
  theme?: "light" | "dark"; // assumed light if not included
  // TODO: other optional members as needed (remember to pad for undefined when using nonboolean) -- jahndan 2024/04/11
};

function Graph({
  build,
  display,
}: {
  build: build_options;
  display?: display_options;
}) {
  // TODO: add graph customization features
  const graph = buildGraph(build);

  return <Mermaid graph={convertJSONGraph(graph, display)} />;
}

// here only SVG styling works -- text styling must happen in Mermaid init
const lightStyles = `
classDef AND fill:#9cc684,stroke:#53793a,stroke-width:1px;
classDef OR fill:#63c7e1,stroke:#007d96,stroke-width:1px;
classDef default fill:#d2aef1,stroke:#815f9c,stroke-width:1px;
`;
const darkStyles = `
classDef AND fill:#9cc684,stroke:#53793a,stroke-width:1px;
classDef OR fill:#63c7e1,stroke:#007d96,stroke-width:1px;
classDef default fill:#d2aef1,stroke:#815f9c,stroke-width:1px;
`;

/** naively converts a JSON representation of a graph to Mermaid's textual representation */
export function convertJSONGraph(input: GraphData, display?: display_options) {
  // TODO sophisticated conversion if still using Mermaid -- 2024/01/13
  let frontmatter = `\
---
config:
  # # probably use this for arrow colors
  # theme: ${display?.theme === "dark" ? "dark" : "neutral"}
  # # not yet sure how to use this or what for
  # themeCSS: ${display?.theme || "light"}
  # layout: elk  # redundant
---

`;
  let orientation = display?.orientation || "BT";
  let styling = display?.theme === "dark" ? darkStyles : lightStyles;

  let graph =
    frontmatter +
    `graph ${orientation}\n` +
    styling +
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
          .map((child) => `${child} --> ${parent.id}\n`)
          .join(""),
      )
      .join("");
  // input.edges
  //   .map((e) => {
  //     return `${e.from} --> ${e.to}\n`;
  //   })
  //   .join("");
  console.log(graph);
  return graph;
}
