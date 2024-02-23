"use client";
import React from "react";
import Access from "../../data/access";
import "./styles/CoursesTable.css";

export default function CoursesTable() {
  const SUBJECT = "CSCI";

  const [targetCourse, setTargetCourse] = React.useState(null);
  const [prereq, setPrereq] = React.useState([null]);

  const updateTargetCourse = (course) => {
    setTargetCourse(course);
    setPrereq(Access(SUBJECT).prereq(course));
    setTimeout(1000);
    formatTable;
  };

  const handleHoverCard = (course) => {
    setTargetCourse(course);
    updateTargetCourse(course);
    // setTimeout(100)
    // window.location.reload()
  };

  const handleStopHoverCard = () => {
    setTargetCourse(null);
    setPrereq([null]);
  };

  const formatCard = (course) => {
    let name = "card ";
    if (prereq != null && Array.isArray(prereq) && prereq.includes(course))
      name += "prereq ";
    if (targetCourse != null && course == targetCourse) name += "target";
    console.log(name);

    return (
      <div
        className={name}
        onMouseEnter={() => handleHoverCard(course)}
        onMouseLeave={() => handleStopHoverCard()}
      >
        <h2 id="cardTitle">{Access(SUBJECT).title(course)}</h2>
        {/* <p id="classNumb"> {Access.prereq(course)}</p> */}
        {/* <p>{Access.isPrereq(targetCourse).toString()}</p> */}
        <p className="info">{course.info}</p>
      </div>
    );
  };

  const formatTable = () => {
    return Access(SUBJECT)
      .courses()
      .map((course, index) => <div key={index}>{formatCard(course)}</div>);
  };

  return <div id="card_table">{formatTable()}</div>;
}
