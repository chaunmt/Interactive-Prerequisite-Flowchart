import { Access, allSubjects } from "@/backend/access";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";
import Link from "next/link";

import Graph from "@/components/graph/Graph";
import { Deck } from "@/components/deck/Deck";

import "@/components/styles/Idpage.css";
import "@/components/styles/Layout.css";
import "@/components/styles/SearchBarSmall.css";

import { FiDownload } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.subj.toUpperCase()} ${params.id}`,
  };
}

/* TODO generate all matching routes ahead of time */

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  const ID = params.id.toUpperCase();
  if (!allSubjects.includes(SUBJ)) notFound();
  if (!Access(SUBJ).ids.includes(ID)) notFound();

  let course = Access(SUBJ).getCourse(ID, "id");
  // this will only display targets from within its subject, but subject-specific accessors will be refactored out soon
  let targets = Access(SUBJ).target(course);
  let build = {
    includes: [course],
    simplify: false, // set true to remove or/and distinction
    decimate_orphans: false, // if the current course is an orphan we probably shouldn't draw an empty graph
  };

  return (
    <div id="content" className="flex flex-col gap-4">
      <div>
        <Link href={"/" + SUBJ}>
          <button id="back">
            <IoReturnUpBackOutline />
          </button>
        </Link>
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
          <div id="title">{course.title}</div>
          <p id="info">{course.info}</p>
        </div>
      </div>
      <Deck courses={targets} />
    </div>
  );
}
