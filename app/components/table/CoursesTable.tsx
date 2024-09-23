"use client";

import { useState } from "react";
import { Course, CourseShell, cmpCourse } from "../../data/types";
import Graph, { build_options, display_options } from "../graph/Graph";
import Link from "next/link";

import "../styles/CoursesTable.css";

import { MdOpenInNew } from "react-icons/md";

export { CoursesTable };

function CoursesTable({ courses }: { courses: readonly Course[] }) {
  let build: build_options = {
    simplify: false, // set true to remove or/and distinction
    decimate_orphans: true,
  };
  let display: display_options = {
    // orientation: "TB",
    // theme: ??
  };

  // no courses initially selected
  const [{ selected, unselected }, setCourseSel] = useState<{
    selected: readonly Course[];
    unselected: readonly Course[];
  }>({
    selected: [],
    unselected: courses,
  });

  return (
    <div id="containers">
      <div id="coursesTable">{formatTable()}</div>
      <div id="courseBox">
        {selected[0] ? (
          // when at least one course is selected
          <div id="infoBox">
            <div id="infoBoxHead">
              <h2>
                {selected[0].code}
                <br />
                {selected[0].title}
              </h2>
              <Link href={`/${selected[0].subject}/${selected[0].id}`}>
                <button id="openId">
                  <MdOpenInNew />
                </button>
              </Link>
            </div>
            <p>{selected[0].info}</p>
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
              includes: selected,
              ...build,
              strong_orphans: selected,
            }}
            display={display}
          />
        </div>
      </div>
    </div>
  );

  function handleClickCard(course: Course) {
    console.log("clicked " + course.code);
    if (selected.some((c) => c.code == course.code)) {
      setCourseSel({
        selected: selected.filter((c) => c.code != course.code),
        unselected: [course, ...unselected].sort(cmpCourse),
      });
    } else {
      setCourseSel({
        selected: [course, ...selected],
        unselected: unselected.filter((c) => c.code != course.code),
      });
    }
  }

  function formatTable() {
    return [
      selected.map((course, index) => (
        <div key={index}>
          <button className="card_hl" onClick={() => handleClickCard(course)}>
            {course.id}
          </button>
        </div>
      )),
      unselected.map((course, index) => (
        // guarantee unique keys by offsetting by selection size
        <div key={index + selected.length}>
          <button className="card" onClick={() => handleClickCard(course)}>
            {course.id}
          </button>
        </div>
      )),
    ].flat();
  }
}
