"use client";

import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/components/layout/Contexts";

import mermaid, { MermaidConfig } from "mermaid";
import elkLayouts from "@mermaid-js/layout-elk";

//********************************* STYLING *********************************//
// # passed when initializing mermaid (no changes at runtime)
// site-wide config: # Mermaid.tsx
//   - font family used for text in diagrams
//   - layout engine (elk) + its config
//   - padding between node text and borders (all nodes)
//
// # passed when asking mermaid to render graph
// diagram-specific config: # Graph.tsx
//   - theme # mermaid's base theming, controls text and arrows
//   - distinguish node types to allow us to query by class name below
//
// # directly performing DOM manipulation to restyle client-side
// external restyling:
//   - pretty much all of the actual styling is here, external to mermaid
//   - we can use tailwind classes here, but only on the svg shapes
//   - (see react useEffect hook below)

/** site-wide configuration options for mermaid */
const siteConfig: MermaidConfig = {
  // securityLevel: "loose", // allows click interaction
  startOnLoad: false, // do not render until react is ready - errors otherwise
  fontFamily: "inter;", // css font-family
  layout: "elk",
  elk: {
    nodePlacementStrategy: "LINEAR_SEGMENTS",
    // relatively compact but destroys readability for some cases
    // mergeEdges: true, // maybe?
  },
  flowchart: { padding: 5 },
};

mermaid.registerLayoutLoaders(elkLayouts);
mermaid.initialize(siteConfig);

// only classes that can apply to svg shapes (or the contained text)
const courseStyles = [
  "drop-shadow",
  "stroke-0.3",
  "stroke-fl-course-border",
  "fill-fl-course",
  "dark:stroke-fd-course-border",
  "dark:fill-fd-course",
];
const andStyles = [
  "drop-shadow",
  "stroke-0.3",
  "stroke-fl-and-border",
  "fill-fl-and",
  "dark:stroke-fd-and-border",
  "dark:fill-fd-and",
];
const orStyles = [
  "drop-shadow",
  "stroke-0.3",
  "stroke-fl-or-border",
  "fill-fl-or",
  "dark:stroke-fd-or-border",
  "dark:fill-fd-or",
];
const edgeStyles = ["drop-shadow-sm"];

// /** the svg filter applied to everything to add a drop shadow */
// const shadowfilter = `\
// <filter id="svgshadow">
// <feDropShadow
//   dx="0.12" dy="0.3"
//   stdDeviation="1.4"
//   flood-opacity="0.25" />
// </filter>
// `;

export default function Mermaid({ input }) {
  const { dark } = useContext(ThemeContext);
  const frontmatter = `\
---
config:
  layout: elk
  theme: base
  themeVariables:
    primaryTextColor: ${dark ? `"#eee"` : `"#111"`}
    lineColor: ${dark ? `"#eee"` : `"#111"`}
    # used to compute other colors
    # background: ${dark ? `"#0b0b0b"` : `"#f4f4f4"`}
---

`;
  const graph = frontmatter + input;
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    // only call once during mount; https://react.dev/reference/react/useEffect#displaying-different-content-on-the-server-and-the-client
    if (!didMount) return;

    const generateGraph = async () => {
      const element = document.querySelector(".mermaid");
      /*--- we will need bindFunctions later ---*/
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { svg, bindFunctions } = await mermaid.render("mermaid", graph);

      // extraneous DOM manipulation to add additional styling to mermaid output
      const parser = new DOMParser();
      const svgdoc = parser.parseFromString(
        `<div id="top">${svg}</div>`,
        "text/xml",
      );
      const topsvg = svgdoc.getElementsByTagName("svg")[0];

      // treat the svg as a block level tag instead of inline
      // and center it within its container
      topsvg.classList.add("block", "m-auto");

      // inserting filter into svg so it's available
      // topsvg.innerHTML = shadowfilter + topsvg.innerHTML;

      // applying small drop shadow to everything
      // topsvg.setAttribute("filter", "url(#svgshadow)");

      const nodes = topsvg.getElementsByClassName("nodes")[0];
      const rects = Array.from(nodes.getElementsByTagName("rect"));
      rects.forEach((r) => {
        // round corners where they aren't already
        if (!r.getAttribute("rx") && !r.getAttribute("ry")) {
          r.setAttribute("rx", "2"); // unset ry uses same value as rx
        }
      });

      // stripping mermaid styles and manually styling each node type
      const ors = Array.from(nodes.getElementsByClassName("OR"));
      ors.forEach((o) => {
        o.classList.remove("node", "default");
        orStyles.forEach((css) => o.classList.add(css));
      });
      const ands = Array.from(nodes.getElementsByClassName("AND"));
      ands.forEach((a) => {
        a.classList.remove("node", "default");
        andStyles.forEach((css) => a.classList.add(css));
      });
      const courses = Array.from(nodes.getElementsByClassName("default"));
      courses.forEach((c) => {
        c.classList.remove("node");
        courseStyles.forEach((css) => c.classList.add(css));
      });

      const edges = topsvg.getElementsByClassName("edges")[0];
      // stripping mermaid styles and manually styling each node type
      const edgePaths = Array.from(
        edges.getElementsByClassName("flowchart-link"),
      );
      edgePaths.forEach((p) => {
        edgeStyles.forEach((css) => p.classList.add(css));
      });

      // getting it back into a string
      const topdiv = svgdoc.getElementById("top");
      const fixedsvg = topdiv.innerHTML;

      // updating the real page DOM
      element.innerHTML = fixedsvg;
    };

    generateGraph();
  }, [didMount, graph, input]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    // TODO sizing and placement
    <div className="m-auto">
      <div className="mermaid">
        <pre className="text-clip font-mono text-xs/5 text-zinc-700 dark:text-zinc-200">
          {graph}
        </pre>
      </div>
    </div>
  );
}
