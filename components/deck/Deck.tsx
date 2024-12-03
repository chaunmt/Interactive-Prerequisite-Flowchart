// scrolling deck of recommendation cards i.e. courses to take after another

import { Course } from "@/data/types";

export { Deck, Card };

function Deck({ courses }: { courses: readonly Course[] }) {
  return (
    <div className="container mx-auto pb-4 overflow-x-auto flex flex-row space-x-4 whitespace-nowrap">
      {courses.map((course) => (
        <Card key={course.uid} course={course} />
      ))}
    </div>
  );
}

function Card({ course }: { course: Course; key }) {
  return (
    <div className="w-[300px] min-w-[300px] bg-gray-100 shadow-lg text-black p-4 rounded-md">
      <div className="basis-1/6 font-medium text-lg rounded-lg">
        <h2>{course.code}</h2>
      </div>
      <div className="basis-full pb-2 font-normal text-base line-clamp-1 overflow-hidden text-ellipsis">
        <h3>{course.fullname}</h3>
      </div>
      <div className="font-light text-sm h-20 line-clamp-4 text-wrap overflow-hidden text-ellipsis">
        <p>{course.info}</p>
      </div>
    </div>
  );
}
