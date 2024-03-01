"use client";

import { useState } from "react";

import Mermaid from "./Mermaid";
import FilterSearch from "./FilterSearch";
import { buildCombinedGraph } from "../data/graphBuilder";

export default function GraphSearch({ sourceData }) {
  const [graph, setGraph] = useState("");

  function updateGraph(filteredData) {
    /* 2024-03-01 @jahndan -- I copied this over from doggu's
     * changes on the other branch but cannot verify functionality
     * of this as it is not currently used on any pages */
    const courses = filteredData
      .map((course) => `${course.subject} ${course.id}`)
      .map((code) => Access(code.split(" ")[0]).getCourse(code))
      .filter((e) => e !== null);

    /* also correct me if I'm wrong but I believe this should
     * accomplish the same thing:
     *   buildGraph(filteredData)
     * since the filtered data is already a list of courses (why
     * run it through the accessor again?) */
    var test = buildGraph(courses);

    setGraph(test);
  }

  return (
    <div>
      <Mermaid graph={graph} />
      <FilterSearch sourceData={sourceData} sendResults={updateGraph} />
    </div>
  );
}
