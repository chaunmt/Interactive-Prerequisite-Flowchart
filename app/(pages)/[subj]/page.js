// page with dynamic graph generation and search bar for courses in [subj]
import Access, { allSubjects } from "../../data/access";
import "../../components/styles/GraphPage.css";
import Search from "../../components/search/Search";

import Mermaid from "../../components/graph/Mermaid";
import buildGraph from "../../data/graphBuilder";

import Custom404 from "../[errors]/404";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.subj.toUpperCase()} Courses`,
  };
}

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  if (!allSubjects.includes(SUBJ)) return <Custom404 />; // Display 404 page when subject is not available
  const SUBJ_COURSES = Access(SUBJ).courses;

  const graphString = buildGraph(SUBJ_COURSES);

  return (
    <div>
      <h1>{SUBJ} Courses </h1>
      <Search />
      <Mermaid graph={graphString} />
    </div>
  );
}
