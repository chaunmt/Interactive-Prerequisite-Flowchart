"use client";

import { useState } from "react";
import { Course } from "../../data/types";
import Graph from "../graph/Graph";
import Link from "next/link";

import "../styles/CoursesTable.css"

import { MdOpenInNew } from "react-icons/md";

export { CoursesTable };

function CoursesTable({ SUBJ_COURSES } : { SUBJ_COURSES: Course[] }) {
  const [selectedCourse, setSelectedCourse] = useState<Course>(SUBJ_COURSES[0]);

  return (
    <div id="containers">
      <div id="coursesTable">
        {formatTable()}
      </div>
      <div id="courseBox">
        <div id="infoBox">
          <div id="infoBoxHead">
            <h2>
              {selectedCourse.code}
              <br></br>
              {selectedCourse.title}
            </h2>
            <Link href={"/" + selectedCourse.subject + "/" + selectedCourse.id}>
              <button id="openId">
                <MdOpenInNew />
              </button>
            </Link>
          </div>
          <p>{selectedCourse.info}</p>
        </div>
        <div id="graphBox">
          <Graph build={{ includes: [selectedCourse] }} />
        </div>
      </div>
    </div>
  );

  function handleClickCard(course: Course) {
    console.log("clicked " + course.code);
    setSelectedCourse(course);
  }

  function formatCard(course: Course) {
    return (
      <button 
        className="card"
        onClick={() => handleClickCard(course)}>
        {course.id}
      </button>
    );
  };

  function formatTable() {
    return SUBJ_COURSES.map(
      (course, index) => 
        <div key={index}>
          {formatCard(course)}
        </div>
    );
  };
}