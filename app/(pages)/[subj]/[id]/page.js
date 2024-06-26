import Access, { allSubjects } from "../../../data/access";
import { NavigationSearch } from "../../../components/search/NavigationSearch";
import Link from "next/link";

import Graph from "../../../components/graph/Graph";

import Custom404 from "../../[errors]/404";

import "../../../components/styles/Idpage.css";
import "../../../components/styles/Layout.css";
import "../../../components/styles/SearchBarSmall.css"

import { FiDownload } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.subj.toUpperCase()} ${params.id}`,
  };
}

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  const ID = params.id.toUpperCase();
  if (!allSubjects.includes(SUBJ)) return <Custom404 />; // Display 404 page when subject is not available
  if (!Access(SUBJ).ids.includes(ID)) return <Custom404 />; // Display 404 page when id is not available

  let course = Access(SUBJ).getCourse(ID, "id");

  return (
    <div id="content">
      <div id="navSmall">
        <Link href={"/" + SUBJ}>
          <button id="back"><IoReturnUpBackOutline /></button>
        </Link>
        <NavigationSearch/>
      </div>
      <div id="container">
        <div id="graph">
          <div id="head">
            <div
              id="warning"
              title="Prerequisite information is unreliable and subject to change during and between terms."
            >
              <b>*Possible Prerequisites</b>
            </div>
            <button id="download"><FiDownload /></button>
          </div>
          <Graph sourceData={course} />
          {/* <Mermaid graph={graphString} /> */}
        </div>
        <div id="infoBox">
          <div id="code">{course.code}</div>
          <div id="title">{course.title}</div>
          <p id="info">{course.info}</p>
        </div>
      </div>
    </div>
  );
}
