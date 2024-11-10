"use client";

import { useState } from "react";
import { Course } from "@/backend/types";
import Graph, {
  build_options,
  display_options,
} from "@/components/graph/Graph";
import Link from "next/link";

import "@/components/styles/CoursesTable.css";

import { MdOpenInNew } from "react-icons/md";

export { CoursesTable };

function CoursesTable({ courses }: { courses: readonly Course[] }) {
  let build: build_options = {
    simplify: false, // set true to remove or/and distinction
    decimate_orphans: false, // this is only necessary if you're adding courses in bulk
  };
  let display: display_options = {
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
      <div id="coursesTable">{formatTable()}</div>
      <div id="courseBox">
        {/* pls style this nicer */}
        {selection.latest ? (
          // when at least one course is selected
          <div id="infoBox">
            <div id="infoBoxHead">
              <h2>
                {selection.latest.code}
                <br />
                {selection.latest.title}
              </h2>
              <Link
                href={`/${selection.latest.subject}/${selection.latest.id}`}
              >
                <button id="openId">
                  <MdOpenInNew />
                </button>
              </Link>
            </div>
            <p>{selection.latest.info}</p>
          </div>
        ) : (
          <div id="infoBox">
            <p>
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
                .map((e) => e.course),
              ...build,
              strong_orphans: selection.list
                .filter((e) => e.selected)
                .map((e) => e.course),
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
    let i = selection.list.map((e) => e.course).indexOf(latest);
    if (i < 0) return; // should never happen, also there should only be one
    let { selected, course } = selection.list[i];
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
          className={e.selected ? "card_hl" : "card"}
          onClick={() => handleClickCard(e.course)}
        >
          {e.course.id}
        </button>
      </div>
    ));
  }
}
