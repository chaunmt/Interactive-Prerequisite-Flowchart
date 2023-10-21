"use client"
import { useEffect } from "react"
import mermaid from "mermaid"

export default function Mermaid({ graph }) {
    useEffect(() => {
        mermaid.contentLoaded();
    });

    // return <MermaidComponent graph={graph}/>
    return <div className="mermaid">{graph}</div>
}