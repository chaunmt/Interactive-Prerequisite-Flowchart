import { course_get, targets, subjects, prereqs } from "@/backend/access";
import { reformat } from "@/backend/text-manipulation";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";

import Graph, { BuildOptions } from "@/components/graph/Graph";
import { Deck } from "@/components/deck/Deck";

import "@/components/styles/Idpage.css";
import "@/components/styles/Layout.css";
import "@/components/styles/SearchBarSmall.css";

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
    <div id="content" className="flex flex-col gap-4">
      <div>
        {/* <Link href={"/" + subj}>
          <button id="back">
            <IoReturnUpBackOutline />
          </button>
        </Link> */}
        <NavigationSearchSmall />
      </div>
      <div id="container">
        <div id="graph">
          <div id="head">
            <div
              id="warning"
              title="Prerequisite information is unreliable and subject to change during and between terms."
            >
              <b>*Possible Prerequisites</b>
            </div>
            <button id="download">
              <FiDownload />
            </button>
          </div>
          <Graph build={build} />
          {/* <Mermaid graph={graphString} /> */}
        </div>
        <div id="infoBox">
          <div id="code">{course.code}</div>
          <div id="name">{course.fullname}</div>
          <div id="info">{reformat(course.info, true)}</div>
        </div>
      </div>
      <Deck courses={target} />
    </div>
  );
}
