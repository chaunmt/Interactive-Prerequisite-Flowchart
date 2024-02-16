import Link from "next/link";
import Mermaid from "../../../components/Mermaid";
import {buildGraph} from "../../../data/graphBuilder";
import '../../../components/styles/Layout.css'
import '../../../components/styles/GraphPage.css'
import Access from "../../../data/access";




export default function Page({ params }) {
  var id = params.id;
  //todo: display 404 when data is unavailable
  var subj = params.subj.toUpperCase();
  var test = buildGraph(`${subj} ${id}`);
  var course = Access(subj).getCourse('id', id);

  
  return (
    <div>
      {/* <div className="header">
                <nav> 
                <a href='../'><img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisite_logo"/></a>
                <ul>
                <li><Link href={`/${params.subj}`}>{subj} Page</Link></li>
                <li><Link href="./table">{subj} Table</Link></li>
                <li><a href='https://github.com/chaunmt/Interactive-Prerequisite-Flowchart' target="_blank">Contribute to Github</a></li>
                </ul>
                </nav>
            </div>
   */}
      <h1>{subj} {id} </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
        <div>
          <Mermaid graph={test}/>
        </div>
        <div>
          <h2>{course.title}</h2>
          {course.info}
        </div>
      </div>          
    </div>
  );
}


export async function generateStaticParams() {
  // TODO should use the new access stuff when that's merged in
  const subjects = require(`../../../data/General/allSubjects.json`);
  return subjects.flatMap(s => {
    let ids = require(`../../../data/General/id/${s}.json`);
    return ids.map(i => ({ subj: s, id: i }));
  });
}


export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.subj.toUpperCase()} ${params.id}`,
  }
}