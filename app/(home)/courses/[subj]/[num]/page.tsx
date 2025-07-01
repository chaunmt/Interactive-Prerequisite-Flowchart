import { course_get, targets, subjects } from "@/backend/access";
import { reformat } from "@/backend/text-manipulation";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";

import Graph, { BuildOptions } from "@/components/graph/Graph";
import { Deck } from "@/components/deck/Deck";

import { notFound } from "next/navigation";

import { Suspense } from "react"
import Loading from "@/app/loading"

export function generateMetadata({ params }) {
  return {
    title: `${params.subj.toUpperCase()} ${params.num}`,
  };
}

export default function Page({ params }) {
  const subj: string = params.subj.toUpperCase();
  const num: string = params.num.toUpperCase();
  if (!subjects.includes(subj)) return notFound();
  const course = course_get(subj, num);
  if (!course) return notFound();

  const target = targets(course);
  const build: BuildOptions = {
    includes: [course.uid],
    decimate_orphans: false, // if the current course is an orphan we probably shouldn't draw an empty graph
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Navigation Bar */}
      <div className="mb-6">
        <NavigationSearchSmall />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph Section */}
        <div className="order-1 bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 dark:border-[0.15rem] p-4 flex-grow">
          {/* Graph Header */}
          <div className="flex justify-between items-center mb-4 ">
            <div 
              className="
                font-bold text-3xl text-center justify-between items-center m-auto
                text-sky-500 dark:text-transparent
                dark:bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-blue-400
                bg-200% bg-clip-text text-transparent animate-galaxy 
              "
            >
              Predicted Prerequisites
            </div>
          </div>

          {/* Graph Container */}
          <div className="bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:border-[0.15rem] rounded-md p-4 min-h-[50vh]">
            <Graph build={build} display={{ theme: "light" }} />
          </div>
        </div>

        {/* Course Info Section */}
        <div className="order-2 bg-white dark:bg-900 rounded-lg shadow p-6 space-y-4">
          <div id="code" className="text-3xl font-bold text-emerald-500">
            {course.code}
          </div>
          <div id="name" className="text-3xl font-bold text-emerald-500">
            {course.fullname}
          </div>
          <div id="info" className="text-gray-600">
            {reformat(course.info, true)}
          </div>
        </div>
      </div>

      {/* Target Courses Section */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Target Courses
        </h2>
        <div className="overflow-x-auto flex gap-4">
          <Deck courses={target} />
        </div>
      </div>
    </div>
    </Suspense>
  );
}
