import { course_get, targets, subjects } from "@/backend/access";
import { reformat } from "@/backend/text-manipulation";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";

import Graph, { BuildOptions } from "@/components/graph/Graph";
import { Deck } from "@/components/deck/Deck";

import { FiDownload } from "react-icons/fi";
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
      <div className="min-h-screen bg-gray-50 p-6">
      {/* Navigation Bar */}
      <div className="mb-6">
        <NavigationSearchSmall />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph Section */}
        <div className="lg:order-1 order-1 bg-white rounded-lg shadow p-4 flex-grow">
          {/* Graph Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-red-500 font-bold text-sm">
              *Possible Prerequisites
            </div>
            <button className="p-2 rounded bg-gray-100 hover:bg-gray-200">
              <FiDownload size={20} />
            </button>
          </div>

          {/* Graph Container */}
          <div className="bg-gray-100 rounded-md p-4 min-h-[50vh]">
            <Graph build={build} />
          </div>
        </div>

        {/* Course Info Section */}
        <div className="lg:order-2 order-2 bg-white rounded-lg shadow p-6 space-y-4">
          <div id="code" className="text-xl font-bold text-gray-800">
            {course.code}
          </div>
          <div id="name" className="text-lg font-semibold text-gray-700">
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
