// page with dynamic graph generation and search bar for courses in [subj]
import Access, { allSubjects } from "../../data/access";
import { NavigationSearch } from "../../components/search/NavigationSearch";
import Link from "next/link";

import Custom404 from "../[errors]/404";
import Graph from "../../components/graph/Graph";
import { Search } from "../../data/search";
import { CoursesTable } from "../../components/table/CoursesTable";

import "../../components/styles/SearchBarSmall.css"
import "../../components/styles/SubjPage.css"

import { IoReturnUpBackOutline } from "react-icons/io5";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.subj.toUpperCase()} Courses`,
  };
}

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  if (!allSubjects.includes(SUBJ)) return <Custom404 />; // Display 404 page when subject is not available
  const SUBJ_COURSES = Access(SUBJ).courses;

  return (
    <div id="content">
      <h1>{Search().exactDept(SUBJ).toUpperCase()}</h1>
      <div id="nav">
        <NavigationSearch/>
      </div>
      <div id="containers">
        {/* Check CoursesTable.tsx to find id and class name */}
        <div id="tableBox">
          <CoursesTable SUBJ_COURSES={SUBJ_COURSES}/>
        </div>
        <div id="courseBox">
          <div id="infoBox">
            <h2>
              SUBJ XXXX
              <br></br>
              NAME OF SELECTED COURSE
            </h2>
            <p>*Possible Prerequisites: XXXX</p>
          </div>
          <div id="graphBox">
            <Graph sourceData={SUBJ_COURSES} />
          </div>
        </div>
      </div>
    </div>
  );
}
