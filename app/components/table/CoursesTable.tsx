"use client";

import { useState } from "react";
import { Course } from "../../data/types";
import Graph from "../graph/Graph";
import Link from "next/link";

import "../styles/CoursesTable.css"

import { MdOpenInNew } from "react-icons/md";

export { CoursesTable };

function CoursesTable({ SUBJ_COURSES } : { SUBJ_COURSES: Course[] }) {
  // no courses initially selected
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  return (
    <div id="containers">
      <div id="coursesTable">
        {formatTable()}
      </div>
      <div id="courseBox">
        <div id="infoBox">
          <div id="infoBoxHead">
            <h2>
              {selectedCourses[0]?.code || ""}
              <br></br>
              {selectedCourses[0]?.title || ""}
            </h2>
            { selectedCourses[0] &&
            <Link href={"/" + selectedCourses[0].subject + "/" + selectedCourses[0].id}>
              <button id="openId">
                <MdOpenInNew />
              </button>
            </Link>
            }
          </div>
          <p>{selectedCourses[0]?.info || ""}</p>
        </div>
        <div id="graphBox">
          <Graph sourceData={selectedCourses} />
        </div>
      </div>
    </div>
  );

  function handleClickCard(course: Course) {
    console.log("clicked " + course.code);
    // toggle select functionality
    if (selectedCourses.some(c => c.code == course.code)) {
      // set to new array including all other elements but course
      setSelectedCourses(selectedCourses.filter(c => c.code !== course.code));
    } else {
      // new array including all elements and also course
      setSelectedCourses([ course, ...selectedCourses ]);
    }
  }

  function formatCard(course: Course) {
    return (
      <button 
        className="card"
        onClick={() => handleClickCard(course)}>
        {course.id}
      </button>
    );
  }

  function formatTable() {
    return SUBJ_COURSES.map(
      (course, index) => 
        <div key={index}>
          {formatCard(course)}
        </div>
    );
  }
}
