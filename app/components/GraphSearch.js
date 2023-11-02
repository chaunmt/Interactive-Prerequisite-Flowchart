"use client"

import { useState, useEffect } from "react"

import Mermaid from "./Mermaid";
import Search from "./Search"

export default function GraphSearch() {
    const [graph, setGraph] = useState('');

    function updateGraph(filteredData) {
        const newGraph = "graph TD\n" + filteredData.map((row) => {
            const e = row.end[0]
            const entries = row.start
            .filter(s => s !== '')
            .map(s => {
                return `${s.replace(/\s+/g, '_')}[${s}] --> ${e.replace(/\s+/g, '_')}[${e}]`
            })
            return entries.join('\n')
        }).join('\n')

        setGraph(newGraph)
    }

    return <div>
        <Mermaid graph={graph} />
        <Search sendResults={updateGraph}/>
    </div>
    
}