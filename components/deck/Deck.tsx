// scrolling deck of recommendation cards i.e. courses to take after another
"use client";

import Link from "next/link";
import { useState, MouseEvent, useMemo } from "react";
import { Course } from "@/data/types";

export { Deck, Card };

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

function Deck({ courses }: { courses: readonly Course[] }) {
  return (
    <div
      className="
        container mx-auto p-4 overflow-x-auto flex flex-row gap-4 whitespace-nowrap 
        [&::-webkit-scrollbar]:h-[0.3rem]
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-400
        dark:[&::-webkit-scrollbar-track]:bg-stone-800
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
      "
    >
      {courses.map((course) => (
        <Card key={course.uid} course={course} />
      ))}
    </div>
  );
}

function Card({ course }: { course: Course }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useMemo(
    () =>
      throttle((e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = (y - centerY) / 7;
        const rotateY = (centerX - x) / 7;

        setRotate({ x: rotateX, y: rotateY });
      }, 100),
    [],
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className=" card transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform
        w-[15rem] min-w-[15rem] md:w-[20rem] md:min-w-[20rem] p-4 m-2 rounded-md shadow-gray-400 dark:shadow-gray-800 shadow-[0.2rem_0.2rem_0.2rem_rgba(0,0,0,0.25)]
        border-gray-200 dark:border-gray-700 border-[0.1rem]
        bg-gradient-to-r 
          from-gray-100 to-gray-50
          dark:from-stone-900 dark:to-stone-900
      "
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
      }}
    >
      <Link
        href={`/courses/${course.subject}/${course.number}`}
        target="_blank"
      >
        <div className="basis-1/6 font-semibold text-lg rounded-lg text-stone-900 dark:text-purple-400">
          <h2>{course.code}</h2>
        </div>
        <div className="basis-full pb-2 font-medium text-base line-clamp-1 text-stone-900 dark:text-purple-400">
          <h3>{course.fullname}</h3>
        </div>
        <div className="font-light text-sm h-20 line-clamp-4 text-wrap text-stone-700 dark:text-stone-300">
          <p>{course.info}</p>
        </div>
      </Link>
    </div>
  );
}
