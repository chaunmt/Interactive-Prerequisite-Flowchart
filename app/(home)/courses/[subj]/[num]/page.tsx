import { course_get, targets, subjects } from "@/backend/access";
import { reformat } from "@/backend/text-manipulation";

import Graph, { BuildOptions } from "@/components/graph/Graph";
import { PathNavigation } from "@/components/layout/PathNavigation";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Deck } from "@/components/deck/Deck";

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
      <div className="min-h-screen bg-gray-50 dark:bg-stone-900 p-6">
        {/* Navigation Bar */}
        <div className="pb-2 md:pb-4 text-stone-700 dark:text-stone-400">
          <PathNavigation locations={["Course", "CSCI", course.code]} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graph Section */}
          <div className="order-1 bg-white dark:bg-stone-900 rounded-lg shadow border-gray-200 dark:border-gray-700 border-[0.15rem] p-4 flex-grow">
            {/* Graph Header */}
            <div className="flex justify-between items-center mb-4 ">
              <div 
                className="
                  font-bold text-3xl text-center justify-between items-center m-auto
                  bg-gradient-to-r 
                    from-purple-400 via-teal-400 to-blue-400
                    dark:from-purple-400 dark:via-pink-400 dark:to-blue-400
                  bg-200% bg-clip-text text-transparent animate-galaxy 
                "
              >
                Predicted Prerequisites
              </div>
            </div>

            {/* Graph Container */}
            <div className="bg-gray-100 dark:bg-stone-900 border-gray-200 dark:border-gray-700 border-[0.1rem] m-2 p-6 rounded-md">
              <div className="w-full max-w-screen-lg m-auto">
                <Graph build={build} display={{ theme: "light" }} />
              </div>
            </div>
          </div>

          {/* Course Info Section */}
          <div className="order-2 bg-white dark:bg-stone-900 rounded-lg shadow border-gray-200 dark:border-gray-700 border-[0.15rem] p-6 space-y-4 ">
            <div className="p-2 md:p-6 pb-8 gap-4 justify-center items-center text-center flex flex-col border-gray-200 dark:border-gray-700 border-b-[0.1rem]">
              <div id="code" className="text-3xl font-bold text-stone-900 dark:text-sky-400">
                {course.code}
              </div>
              <div id="name" className="text-3xl font-bold text-stone-900 dark:text-sky-400 ">
                {course.fullname}
              </div>
            </div>
            <ul className="space-y-6">
              <li className="space-y-2">
                <span className="text-stone-800 dark:text-stone-300 font-bold">
                  Course Attributes:
                </span>
              </li>
              <li className="space-y-2">
                <span className="text-stone-800 dark:text-stone-300 font-bold">
                  Liberal Educations:
                </span>
              </li>
              <li className="space-y-2">
                <span className="text-stone-800 dark:text-stone-300 font-bold">
                  Catalog Description:
                </span>
                <div id="info" className="bg-gray-100 dark:bg-stone-900 text-stone-700 dark:text-stone-400 p-4 rounded-md border-gray-200 dark:border-gray-700 border-[0.1rem] dark:border-dashed">
                  {reformat(course.info, true)}
                </div>
              </li>
              <li className="space-y-2">
                <span className="text-stone-800 dark:text-stone-300 font-bold">
                  Equivalent Courses:
                </span>
              </li>
            </ul>
            
          </div>
        </div>

        {/* Target Courses Section */}
        <div className="mt-6 bg-white dark:bg-stone-900 rounded-lg shadow p-4 md:p-6 border-gray-200 dark:border-gray-700 border-[0.15rem] overflow-hidden">
          <h2 className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 mt-2">
            Target Courses
          </h2>
          <div>
            <Deck courses={target} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
