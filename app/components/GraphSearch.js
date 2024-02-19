"use client";

import { useState } from "react";

import Mermaid from "./Mermaid";
import FilterSearch from "./FilterSearch";
import { buildCombinedGraph } from "../data/graphBuilder";

export default function GraphSearch({ sourceData }) {
  const [graph, setGraph] = useState("");

  function updateGraph(filteredData) {
    const courses = filteredData
      .map((course) => `${course.subject} ${course.id}`)
      .filter((course) => course.prereq !== null);
    var test = buildCombinedGraph(courses);

    setGraph(test);
  }

  return (
    <div>
      <Mermaid graph={graph} />
      <FilterSearch sourceData={sourceData} sendResults={updateGraph} />
    </div>
  );
}
