"use client";

import { useState } from "react";
import { Course } from "@/data/types";
import Graph, { BuildOptions, DisplayOptions } from "@/components/graph/Graph";
import { reformat } from "@/backend/text-manipulation";
import Link from "next/link";

import { MdOpenInNew } from "react-icons/md";

export { CoursesTable };

function CoursesTable({ courses }: { courses: readonly Course[] }) {
  const build: BuildOptions = {
    decimate_orphans: false, // this is only necessary if you're adding courses in bulk
  };
  const display: DisplayOptions = {
    // orientation: "TB",
    // theme: ??
  };

  // no courses initially selected
  const [selection, setSelection] = useState<{
    list: { course: Course; selected: boolean }[];
    latest?: Course;
  }>({
    list: courses
      .filter((c) => c)
      .map((course) => ({ course, selected: false })),
    latest: undefined,
  });

  return (
    <div className="grid grid-cols-2 pt-4">
      <div className="mr-3 grid grid-cols-1 content-stretch items-stretch justify-stretch gap-2 rounded-md bg-gray-200 p-4 shadow sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {formatTable()}
      </div>
      <div className="ml-3 space-y-4 rounded-md bg-gray-200 p-4 shadow">
        {selection.latest ? (
          // when at least one course is selected
          <div className="rounded-md bg-white px-5 py-4 shadow">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg/relaxed font-semibold">
                {selection.latest.code}
              </h2>
              <Link
                href={`/courses/${selection.latest.subject}/${selection.latest.number}`}
              >
                <button id="openId">
                  <MdOpenInNew size={20} />
                </button>
              </Link>
            </div>
            <h2 className="mb-1 text-base font-medium">
              {selection.latest.fullname}
            </h2>
            <div className="space-y-1 text-sm font-normal">
              {reformat(selection.latest.info, true)}
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-white px-5 py-3 text-sm shadow">
            <p>
              Please click on a course to add it to the graph. You may click
              multiple courses to display their prerequisites together. To
              remove a course from the graph, click it again.
            </p>
          </div>
        )}
        <div id="graphBox">
          <Graph
            build={{
              includes: selection.list
                .filter((e) => e.selected)
                .map((e) => e.course.uid),
              ...build,
              strong_orphans: selection.list
                .filter((e) => e.selected)
                .map((e) => e.course.uid),
            }}
            display={display}
          />
        </div>
      </div>
    </div>
  );

  function handleClickCard(latest: Course) {
    console.log("clicked " + latest.code);
    // safe to compare objects by identity since no course objects are created (only reused)
    const i = selection.list.map((e) => e.course).indexOf(latest);
    if (i < 0) return; // should never happen, also there should only be one
    const { selected, course } = selection.list[i];
    // we're not supposed to mutate the state directly but this
    // works because we still call setSelection to update the state
    selection.list.splice(i, 1, { selected: !selected, course });
    setSelection({
      list: selection.list,
      latest: selection.list.some((e) => e.selected) ? latest : undefined,
    });
    // if react is updated and this breaks, rewrite this to not directly modify the array
  }

  function formatTable() {
    selection.list.map((e) => console.log(e));
    return selection.list.map((e) => (
      <div key={e.course.uid}>
        <button
          className={`ext-lg/tight h-12 w-24 rounded-md border-none px-2 text-center font-medium shadow ${
            e.selected === true ? "bg-amber-200" : "bg-white"
          }`}
          onClick={() => handleClickCard(e.course)}
        >
          {e.course.number}
        </button>
      </div>
    ));
  }
}
