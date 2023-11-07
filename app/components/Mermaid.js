"use client"
import React from "react";
import { useEffect, useState } from "react";
import mermaid from "mermaid"


mermaid.initialize({
    //do not render until react is ready
    startOnLoad: false,
    //allow click events in mermaid
    securityLevel: 'loose'
})

export default function Mermaid({ graph }) {
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        // only call once during mount; https://react.dev/reference/react/useEffect#displaying-different-content-on-the-server-and-the-client
        if (!didMount) return;

        const generateGraph = async () => {
            const element = document.querySelector('.mermaid')
            const { svg, bindFunctions } = await mermaid.render('mermaid', graph);
            element.innerHTML = svg;
        }

        generateGraph()
    }, [didMount, graph]);

    useEffect(() => {
        setDidMount(true);
    }, []);

    return <div className="mermaid">{graph}</div>
}
