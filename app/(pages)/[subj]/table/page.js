import CoursesTable from "../../../components/CoursesTable.js";

import '../../../components/styles/Layout.css';
import '../../../components/styles/Mainpage.css';
import Footer from '../../../components/Footer.js';
import Header from '../../../components/Header.js';

//TODO: fix or update
export default function CSCI() {
  return (
    <div id="page">
       
      {/* <Header/> */}
      <div id="backBoard">
      <h1 id="title">CSCI COURSES</h1>
      <CoursesTable />
      {/* <Footer/> */}
      </div>
      {/* <div id="infoBackBoard"></div> */}
      
      </div>
  );
}

