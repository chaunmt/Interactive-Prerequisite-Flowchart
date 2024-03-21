import Access, { allSubjects } from "../../../data/access";
import { NavigationSearch } from "../../../components/search/NavigationSearch";
import Link from "next/link";

import Graph from "../../../components/graph/Graph"

import Custom404 from "../../[errors]/404";

import "../../../components/styles/Idpage.css"
import "../../../components/styles/Layout.css";

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
      <div id="nav">
        <Link href={"/"+SUBJ}>
          <button id="back">Back</button>
        </Link>
        <NavigationSearch id="search" />
      </div>
      <div id="container">
        <div id="graph">
          <div id="graph-header">
            <div id="warning" title="Prerequisite information is unreliable and subject to change during and between terms."><b>*Possible Prerequisites</b></div>
            <button id="graph-download">Download</button>
          </div>
          <Graph sourceData={course}/>
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
