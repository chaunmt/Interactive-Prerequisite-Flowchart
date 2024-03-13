import Mermaid from "../../../components/Mermaid";
import buildGraph from "../../../data/graphBuilder";
import "../../../components/styles/Layout.css";
import "../../../components/styles/GraphPage.css";
import Access, { allSubjects } from "../../../data/access";
import Search from "../../../components/Search"

import Custom404 from "../../[errors]/404";
import "../../../components/styles/Idpage.css"

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
  const graphString = buildGraph(course);
  
  return (
    <div>
      <div id="nav">
        <button id="back">back</button>
        <div id="small"><Search></Search></div>
      </div>
      <div id="container">
        <div id="graph">
          <h4 id="warning">*Possible Prerequisites</h4>
          <Mermaid graph={graphString} />
        </div>
        <div id="infoBox">
          <h2 id="code">{course.code}</h2>
          <h3 id="title">{course.title}</h3>
          <p id="info">{course.info}</p>
        </div>
      </div>
    </div>
  );
}
