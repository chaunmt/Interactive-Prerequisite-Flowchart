// page with dynamic graph generation and search bar for courses in [subj]
import Access, { allSubjects } from "../../data/access";
import { NavigationSearch } from "../../components/search/NavigationSearch";

import Custom404 from "../[errors]/404";
import Graph from "../../components/graph/Graph";

import "../../components/styles/SearchBarSmall.css"

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
    <div>
      <h1>{SUBJ} Courses </h1>
      <NavigationSearch />
      <Graph sourceData={SUBJ_COURSES} />
      {/* <Mermaid graph={graphString} /> */}
    </div>
  );
}
