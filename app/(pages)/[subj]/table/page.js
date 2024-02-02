import CoursesTable from "../../../components/CoursesTable.js";

import '../../../components/styles/Layout.css';
import '../../../components/styles/Mainpage.css';

//TODO: fix or update
export default function CSCI() {
  return (
    <div id="page">
      <div id="backBoard">
      <h1 id="title">CSCI COURSES</h1>
      <CoursesTable />
      </div>
      {/* <div id="infoBackBoard"></div> */}
      
      </div>
  );
}

