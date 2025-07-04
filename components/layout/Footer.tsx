import Link from "next/link";

export default function Footer() {
  return (
    <footer className="
      relative flex flex-col items-center text-center mt-auto py-6 pt-14
      bg-white dark:bg-stone-900 shadow-gray-200 dark:shadow-gray-700 border-y-[0.15rem] border-gray-200 dark:border-gray-700" 
    >
      <div 
        className="text-stone-900 dark:text-stone-200  border-[0.15rem] border-purple-400 dark:border-purple-500 font-semibold
        hover:text-white hover:bg-purple-500 hover:cursor-pointer
        p-1 m-auto mb-4 w-[20rem] items-center justify-center rounded-lg"
      >
        <Link href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart" target="_blank">
          Contribute to our GitHub
        </Link>
      </div>

      <div 
        className="text-stone-900 dark:text-stone-200 border-[0.15rem] border-red-400 dark:border-red-500 font-semibold border-dashed hover:border-solid
        hover:text-white hover:bg-red-500 hover:cursor-pointer text-sm
        p-1 m-auto mb-4 w-[10rem] items-center justify-center rounded-lg"
      >
        <Link href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart/issues" target="_blank">
          Report an issue
        </Link>
      </div>

      <span className="text-sm text-stone-500 dark:text-stone-400 m-4">
        Created by and for the{" "}
        <Link
          href="https://twin-cities.umn.edu/"
          className="font-bold hover:underline"
          target="_blank"
          >
          University of Minnesota - Twin Cities
        </Link>{" "}
        students through{" "}
        <Link
          href="https://www.socialcoding.net/"
          className="font-bold hover:underline"
          target="_blank"
          >
          Social Coding
        </Link>{" "}
        with data from{" "}
        <Link
          href="https://asr.umn.edu/applications-and-forms/applications/coursedog"
          className="font-bold hover:underline"
          target="_blank"
          >
          Coursedog
        </Link>{" "}
        - the University’s course and program catalog management system.
      </span>
    </footer>
  );
}