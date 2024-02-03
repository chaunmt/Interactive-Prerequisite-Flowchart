// page with dynamic graph generation and search bar for courses in [subj]

import Link from "next/link";
import { buildCombinedGraph } from "../../data/graphBuilder";
import Access from "../../data/access";
// import logo from 'public/logo.png';
import '../../components/styles/Layout.css'
import '../../components/styles/GraphPage.css'

// import Mermaid from "../../components/Mermaid";
import GraphSearch from '../../components/GraphSearch'


export default function Page({ params }) {
  //todo: display 404 when data is unavailable
  var subj = params.subj.toUpperCase();
  const subjectCourses = Access(subj).courses();
  // const courses = subjectCourses.map(course => `${subj} ${course.id}`);
  // var test = buildCombinedGraph(courses);
  
  return (
    <div>
      <h1>{subj} Courses </h1>
      {/* <Link href="/"><button>Homepage</butt on></Link> */}
      <GraphSearch sourceData={subjectCourses}/>
    </div>
  );
}


export async function generateStaticParams() {
  // TODO should use the new access stuff when that's merged in
  const subjects = require(`../../data/General/allSubjects.json`);
  return subjects.map((s) => ({
    subj: s,
  }))
}


export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.subj.toUpperCase()} Courses`,
    description: '...',  // ??
  };
}