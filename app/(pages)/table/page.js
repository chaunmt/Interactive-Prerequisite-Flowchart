/* 
 * this file (/table/page.js) shouldn't exist--not removing it yet so people
 * editing the correct one (/[subj]/table/page.js) can reference this
 */

// import Link from "next/link";
// import GraphSearch from "../components/GraphSearch";
// import mermaid from "mermaid";
// import '../components/styles/Layout.css';
// import '../components/styles/Mainpage.css';
// import Footer from '../components/Footer.js';
// import Header from '../components/Header.js';

// export default function Page() {
//   return (
//     <div>
//       <Header/>
//       <br/> {/* this line break doesn't seem to do anything */}
//       <GraphSearch/>
//       <Footer/>
//     </div>
//   );

"use client"

import CoursesTable from "../../components/CoursesTable";
import '../../components/styles/Layout.css';
import '../../components/styles/Mainpage.css';
import Footer from '../../components/Footer.js';
import Header from '../../components/Header.js';

//TODO: fix or update
export default function CSCI() {
  return (
    <div id="page">
       
      <Header/>
      <div id="backBoard">
      <h1 id="title">CSCI COURSES</h1>
      <CoursesTable />
      </div>
      <Footer/>
      </div>
  );
}
