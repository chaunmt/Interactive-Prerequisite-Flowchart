// page with dynamic graph generation and search bar for courses in [subj]
"use client"

import Link from "next/link";
import { buildCombinedGraph } from "../../data/graphBuilder";
import Access from "../data/access";
import {CourseShell, Course, PrereqFormat} from "../data/access";
// import logo from 'public/logo.png';
import '../../components/styles/Layout.css';
import '../../components/styles/GraphPage.css';

import Header from '../../components/Header';
// import Mermaid from "../../components/Mermaid";
import GraphSearch from '../../components/GraphSearch';


export default function Page({ params }) {
  var id = params.id;
  //todo: display 404 when data is unavailable
  var subj = params.subj.toUpperCase();
  const subjectCourses = Access(subj).courses;
  const courses = subjectCourses.map(course => `${subj} ${course.id}`);
  var test = buildCombinedGraph(courses);
  
  return (
    <div>
      {/* <Header/> */}
      <h1>{subj} {id} </h1>
      {/* <Link href="/"><button>Homepage</butt on></Link> */}
      <GraphSearch sourceData={subjectCourses}/>
    </div>
  );
}
