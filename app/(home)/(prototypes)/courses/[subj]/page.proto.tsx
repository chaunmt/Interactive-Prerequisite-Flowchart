// page with dynamic graph generation and search bar for courses in [subj]
import { Accessor, subjects } from "@/backend/access";

import { CoursesTable } from "@/components/table/CoursesTable";

import "@/components/styles/SearchBarSmall.css";
import "@/components/styles/SubjPage.css";
import { notFound } from "next/navigation";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";

export async function generateMetadata({ params }) {
  return {
    title: `${params.subj.toUpperCase()} Courses`,
  };
}

/* TODO generate all matching routes ahead of time */

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  if (!subjects.includes(SUBJ)) return notFound();
  const SUBJ_COURSES = Accessor(SUBJ).general;

  return (
    <div id="content">
      {/* <h1>{Search().exactDept(SUBJ).toUpperCase()}</h1> */}
      <NavigationSearchSmall />
      <div id="tableBox">
        <CoursesTable courses={SUBJ_COURSES} />
      </div>
    </div>
  );
}
