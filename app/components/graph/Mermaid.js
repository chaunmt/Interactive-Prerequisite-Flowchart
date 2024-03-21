"use client";
import React from "react";
import { useEffect, useState } from "react";
import mermaid from "mermaid";
import "../styles/Mermaid.css";  

const config = {
  theme: 'neutral',  // this should be dynamically updated
  securityLevel: "loose", // allows click interaction
  startOnLoad: false, // do not render until react is ready
  // logLevel: 'debug',
  flowchart: {
    defaultRenderer: "elk",
    nodeSpacing: 50,
    rankSpacing: 50,
  },
};

mermaid.initialize(config);

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
