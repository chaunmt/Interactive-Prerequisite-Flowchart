// page with dynamic graph generation and search bar for courses in [subj]
import { Access, allSubjects } from "@/backend/access";

import { Search } from "@/backend/search";
import { CoursesTable } from "@/components/table/CoursesTable";

import { notFound } from "next/navigation";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";

import "../../../components/styles/SubjPage.css";

export async function generateMetadata({ params }) {
  return {
    title: `${params.subj.toUpperCase()} Courses`,
  };
}

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  if (!allSubjects.includes(SUBJ)) return notFound();
  const SUBJ_COURSES = Access(SUBJ).courses;

  return (
    <div className="px-[5%]">
      <h1 className="font-bold text-[var(--title)] text-[2.2rem]" >{Search().exactDept(SUBJ).toUpperCase()}</h1>
      <NavigationSearchSmall />
      <div>
        <CoursesTable courses={SUBJ_COURSES} />
      </div>
    </div>
  );
}
