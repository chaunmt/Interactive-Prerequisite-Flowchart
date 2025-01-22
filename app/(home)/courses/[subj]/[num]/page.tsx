import {
  course_get,
  // targets,
  subjects,
} from "@/backend/access";
import { reformat, getDisplay } from "@/backend/text-manipulation";

import Graph, { BuildOptions } from "@/components/graph/Graph";
// import { Deck } from "./deck/Deck";

import { FiDownload } from "react-icons/fi";
import { notFound } from "next/navigation";
import Breadcrumb, { BreadcrumbRoute } from "@/components/layout/Breadcrumbs";

export function generateMetadata({
  params,
}: {
  params: { subj: string; num: string };
}) {
  return {
    title: `${params.subj.toUpperCase()} ${params.num}`,
  };
}

export default function Page({
  params,
}: {
  params: { subj: string; num: string };
}) {
  const subj = params.subj.toUpperCase();
  const num = params.num.toUpperCase();
  // const hon = ["H", "V"].includes(num.replace(/\d/g, ""));
  if (!subjects.includes(subj)) return notFound();
  const course = course_get(subj, num);
  if (!course) return notFound();
  // get display code
  const display = getDisplay(course);

  const segments: BreadcrumbRoute[] = [
    { url: "/courses", display: <>Course Catalog</> },
    { url: undefined, display: <>{display}</> },
  ];

  // const target = targets(course);
  const build: BuildOptions = {
    includes: [course.uid],
    decimate_orphans: false, // no empty graph for orphans
    // honor: hon,
  };

  // TODO make Header searchbar actually functional
  return (
    <>
      <div
        id="breadcrumb"
        className="rounded bg-white/80 px-4 py-2 shadow dark:bg-zinc-900/80"
      >
        <Breadcrumb segments={segments} />
      </div>

      <div id="content" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          id="graph"
          className="flex-grow rounded-lg bg-white/80 p-4 shadow dark:bg-zinc-900/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <div
              id="disclaimer"
              className="text-sm font-bold text-red-500 dark:text-red-400"
            >
              *Possible Prerequisites
            </div>
            <button
              id="export"
              className="rounded bg-gray-100 p-2 shadow hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <FiDownload size={20} className="text-gray-900 dark:text-white" />
            </button>
          </div>

          <div className="rounded-md bg-gray-100 p-4 shadow-[inset_0_0_4px_0_rgba(0,0,0,0.05)] dark:bg-zinc-800">
            <Graph build={build} />
          </div>
        </div>

        <div
          id="course-info"
          className="space-y-2 rounded-lg bg-white/80 p-6 shadow dark:bg-zinc-900/80"
        >
          <div
            id="code"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {display}
          </div>
          <div
            id="name"
            className="text-lg font-medium text-gray-800 dark:text-zinc-100"
          >
            {course.fullname}
          </div>
          <div
            id="info"
            className="space-y-2 font-normal text-gray-700 dark:text-zinc-200"
          >
            {reformat(course.info, true)}
          </div>
        </div>
      </div>

      {/*
      <div className="rounded-lg bg-white/80 p-4 shadow dark:bg-zinc-900/80">
        <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-zinc-200">
          Target Courses
        </h2>
        <div className="flex overflow-x-auto">
          <Deck courses={target} />
        </div>
      </div>
      */}
    </>
  );
}
