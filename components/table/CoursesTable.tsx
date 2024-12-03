"use client";

import { useState } from "react";
import { Course } from "@/data/types";
import Graph, { BuildOptions, DisplayOptions } from "@/components/graph/Graph";
import Link from "next/link";

import "@/components/styles/CoursesTable.css";

import { MdOpenInNew } from "react-icons/md";

export { CoursesTable };

function CoursesTable({ courses }: { courses: readonly Course[] }) {
  const build: BuildOptions = {
    decimate_orphans: false, // this is only necessary if you're adding courses in bulk
  };
  const display: DisplayOptions = {
    // orientation: "TB",
    // theme: ??
  };

  // no courses initially selected
  const [selection, setSelection] = useState<{
    list: { course: Course; selected: boolean }[];
    latest?: Course;
  }>({
    list: courses.map((course) => ({ course, selected: false })),
    latest: undefined,
  });

  return (
    <div id="containers">
      <div id="coursesTable" className="rounded-sm shadow">
        {formatTable()}
      </div>
      <div id="courseBox" className="rounded-sm shadow">
        {/* pls style this nicer */}
        {selection.latest ? (
          // when at least one course is selected
          <div id="infoBox" className="rounded-sm shadow">
            <div id="infoBoxHead">
              <h2>
                {selection.latest.code}
                <br />
                {selection.latest.fullname}
              </h2>
              <Link
                href={`/courses/${selection.latest.subject}/${selection.latest.number}`}
              >
                <button id="openId">
                  <MdOpenInNew />
                </button>
              </Link>
            </div>
            <p>{selection.latest.info}</p>
          </div>
        ) : (
          <div id="infoBox" className="rounded-sm shadow">
            <p className="pt-2">
              Please click on a course to add it to the graph. You may click
              multiple courses to display their prerequisites together. To
              remove a course from the graph, click it again.
            </p>
          </div>
        )}
        <div id="graphBox">
          <Graph
            build={{
              includes: selection.list
                .filter((e) => e.selected)
                .map((e) => e.course.uid),
              ...build,
              strong_orphans: selection.list
                .filter((e) => e.selected)
                .map((e) => e.course.uid),
            }}
            display={display}
          />
        </div>
      </div>
    </div>
  );

  function handleClickCard(latest: Course) {
    console.log("clicked " + latest.code);
    // safe to compare objects by identity since no course objects are created (only reused)
    const i = selection.list.map((e) => e.course).indexOf(latest);
    if (i < 0) return; // should never happen, also there should only be one
    const { selected, course } = selection.list[i];
    // we're not supposed to mutate the state directly but this
    // works because we still call setSelection to update the state
    selection.list.splice(i, 1, { selected: !selected, course });
    setSelection({
      list: selection.list,
      latest: selection.list.some((e) => e.selected) ? latest : undefined,
    });
    // if react is updated and this breaks, rewrite this to not directly modify the array
  }

  function formatTable() {
    return selection.list.map((e, index) => (
      <div key={index}>
        <button
          className={e.selected ? "card_hl shadow" : "card shadow"}
          onClick={() => handleClickCard(e.course)}
        >
          {e.course.number}
        </button>
      </div>
    ));
  }
}
