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

export default function Mermaid({ graph }) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    // only call once during mount; https://react.dev/reference/react/useEffect#displaying-different-content-on-the-server-and-the-client
    if (!didMount) return;

    const generateGraph = async () => {
      const element = document.querySelector(".mermaid");
      const { svg, bindFunctions } = await mermaid.render("mermaid", graph);
      element.innerHTML = svg;
    };

    generateGraph();
  }, [didMount, graph]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return <div className="mermaid">{graph}</div>;
}
