import { course_get, targets, subjects, prereqs } from "@/backend/access";
import { reformat } from "@/backend/text-manipulation";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";

import Graph, { BuildOptions } from "@/components/graph/Graph";
import { Deck } from "@/components/deck/Deck";

import { FiDownload } from "react-icons/fi";
import { notFound } from "next/navigation";

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
  console.log(target.map((c) => c.code));
  const prereq = prereqs(course);
  console.log(prereq.map((c) => c.code));
  const build: BuildOptions = {
    includes: [course.uid],
    decimate_orphans: false, // if the current course is an orphan we probably shouldn't draw an empty graph
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50">
      <div>
        <NavigationSearchSmall />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Graph Section */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
          {/* Graph Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-red-500 font-bold text-sm">*Possible Prerequisites</div>
            <button className="p-2 rounded bg-gray-200 hover:bg-gray-300">
              <FiDownload size={24} />
            </button>
          </div>

          {/* Graph Container */}
          <div className="bg-gray-200 rounded-lg p-4">
            <Graph build={build} />
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
          <div id="code" className="text-xl font-bold">{course.code}</div>
          <div id="name" className="text-lg font-semibold">{course.fullname}</div>
          <div id="info" className="text-gray-700">{reformat(course.info, true)}</div>
        </div>
      </div>

      <Deck courses={target} />
    </div>
  );
}
