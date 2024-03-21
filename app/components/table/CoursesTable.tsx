"use client";
import { Course } from "../../data/types";

import "../styles/CoursesTable.css"

export { CoursesTable };

function CoursesTable({ SUBJ_COURSES }: { SUBJ_COURSES: Course[] }) {
  return (
    <div id="coursesTable">
      {formatTable()}
    </div>
  );

  function handleClickCard() {
    console.log("clicked ");
  }

  function formatCard(course: Course) {
    return (
      <button 
        className="card"
        onClick={handleClickCard}>
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