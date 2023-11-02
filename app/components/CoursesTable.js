"use client";
import React from "react"
import Access from "../data/Old/Access";
import './styles/CoursesTable.css'

export default function CoursesTable() {
  const [targetCourse, setTargetCourse] = React.useState(null)

  const handleHoverCard = (course) => {
    setTargetCourse(course)
  }

  const handleStopHoverCard = () => {
    setTargetCourse(null)
  }

  const formatCard = (course) => {
    return (
    <div className={`card ${Access.isPrereq(targetCourse) ? 'prereq' : ''} ${course == targetCourse ? 'target' : ''}`}
        onMouseEnter={() => handleHoverCard(course)}
        onMouseLeave={() => handleStopHoverCard()}
      >
      <h2>{Access.title(course)}</h2>
      <p>{Access.prereq(course)}</p>
      <p>{Access.isPrereq(targetCourse).toString()}</p>
      {/* <p className="info">{course.info}</p> */}
    </div> 
    );
  }

  const formatTable = () => {
    return Access.courses().map((course, index) => (
      <div key={index}>
        {formatCard(course)}
      </div>
    ));
  }

  return (
    <div id="page">
      <h1 id="title">CSCI COURSES</h1>
      <div id="card_table">
        {formatTable()}
      </div>
    </div>
  );
}