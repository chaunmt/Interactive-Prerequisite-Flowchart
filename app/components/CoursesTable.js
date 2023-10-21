"use client";
import React from "react"
import access from "../data/access";
import './styles/CoursesTable.css'

export default function CoursesTable() {
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleCardHover = (course) => {
    setSelectedCourse(course);
  }

  const formatCard = (course) => {
    const isPrereq = selectedCourse && selectedCourse.pre
    
    return (
    <div className="card">
      <h2>{access.title(course)}</h2>
      {/* <p className="info">{course.info}</p> */}
    </div> 
    );
  }

  const formatTable = () => {
    return access.courses.map((course, index) => (
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