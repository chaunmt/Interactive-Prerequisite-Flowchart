// scrolling deck of recommendation cards i.e. courses to take after another

import { Course } from "@/data/types";

export { Deck, Card };

function Deck({ courses }: { courses: readonly Course[] }) {
  return (
    <div className="container mx-auto flex flex-row space-x-4 overflow-x-auto whitespace-nowrap px-2 pb-4 pt-1">
      {courses.map((course) => (
        <Card key={course.uid} course={course} />
      ))}
    </div>
  );
}

function Card({ course }: { course: Course }) {
  return (
    <div className="w-[300px] min-w-[300px] rounded-md bg-gray-100 px-4 py-3 text-gray-900 shadow dark:bg-zinc-800 dark:text-white">
      <div className="basis-1/6 rounded-lg text-[1.1rem] font-medium">
        <h2>{course.code}</h2>
      </div>
      <div className="basis-full truncate pb-1 text-base font-normal">
        <h3>{course.fullname}</h3>
      </div>
      <div className="line-clamp-4 h-20 overflow-hidden text-ellipsis hyphens-auto text-pretty text-sm font-normal">
        <p>{course.info.split("prereq", 1)[0].split("Prereq", 1)[0]}</p>
      </div>
    </div>
  );
}
