// page with dynamic graph generation and search bar for courses in [subj]
import { Accessor, subjects } from "@/backend/access";

import { CoursesTable } from "./table/CoursesTable";

import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return {
    title: `${params.subj.toUpperCase()} Courses`,
  };
}

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  if (!subjects.includes(SUBJ)) return notFound();
  const SUBJ_COURSES = Accessor(SUBJ).general;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold">{SUBJ} Courses</h1>
      <CoursesTable courses={SUBJ_COURSES} />
    </div>
  );
}
