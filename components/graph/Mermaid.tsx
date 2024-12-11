"use client";
import React from "react";
import { useEffect, useState } from "react";
import mermaid, { MermaidConfig } from "mermaid";
import elkLayouts from "@mermaid-js/layout-elk";

import "../styles/Mermaid.css";

/***
STYLING:
  # passed when initializing mermaid (no changes at runtime)
  site-wide config: # Mermaid.tsx
    - font family used for text in diagrams
    - layout engine (elk) + its config
    - padding between node text and borders (all nodes)
  # passed when asking mermaid to render graph
  diagram-specific config: # Graph.tsx
    - or-node css (svg styling only for the shape itself)
    - and-node css (svg styling only for the shape itself)
    - (default) course-node css (svg styling only for the shape itself)
    # TODO better graph representation to add specialized edge styling
    - theme # mermaid's base themes, mainly so arrows match site theme
  external styling:
    - nothing at the moment
***/

/** site-wide configuration options for mermaid */
const siteConfig: MermaidConfig = {
  // securityLevel: "loose", // allows click interaction
  startOnLoad: false, // do not render until react is ready - errors
  // TODO for the love of god please replace these fonts site-wide
  fontFamily: 'inter, "inria sans";', // css font-family
  layout: "elk",
  elk: {
    // relatively compact but destroys readability for some cases
    // mergeEdges: true, // maybe?
    nodePlacementStrategy: "LINEAR_SEGMENTS",
  },
  flowchart: {
    padding: 5,
  },
};

mermaid.registerLayoutLoaders(elkLayouts);
mermaid.initialize(siteConfig);

let { dx, dy, std, opacity } = { dx: 0.4, dy: 0.8, std: 2.0, opacity: 0.15 };
const nodeshadows = `<filter id="nodeshadows"><feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${std}" flood-opacity="${opacity}"></feDropShadow></filter>`;
({ dx, dy, std, opacity } = { dx: 0.2, dy: 0.4, std: 0.8, opacity: 0.4 });
const allshadows = `<filter id="allshadows"><feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${std}" flood-opacity="${opacity}"></feDropShadow></filter>`;

export default function Mermaid({ graph }) {
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
      const svgdoc = parser.parseFromString(`<div>${svg}</div>`, "text/xml");
      const topsvg = svgdoc.getElementsByTagName("svg")[0];

      // making svg filter available
      topsvg.innerHTML = allshadows + nodeshadows + topsvg.innerHTML;

      // // shadows don't work on these (edges won't render)
      // const edges = topsvg.getElementsByClassName("edges")[0];
      // edges.setAttribute("filter", "url(#shadowTag)");

      // applying small drop shadow to everything instead
      topsvg.setAttribute("filter", "url(#allshadows)");

      // applying drop shadow and slightly rounded corners to nodes
      const nodes = topsvg.getElementsByClassName("nodes")[0];
      nodes.setAttribute("filter", "url(#nodeshadows)");
      const rects = Array.from(nodes.getElementsByTagName("rect"));
      rects.forEach((r) => {
        if (!r.getAttribute("rx") && !r.getAttribute("ry")) {
          r.setAttribute("rx", "2");
        }
      });

      // getting it back into a string
      const topdiv = svgdoc.getElementsByTagName("div")[0];
      const fixedsvg = topdiv.innerHTML;

      // updating the real page DOM
      element.innerHTML = fixedsvg;
    };

    generateGraph();
  }, [didMount, graph]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return <div className="mermaid">{graph}</div>;
}
