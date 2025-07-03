// Home page - "google.com" w/ global search
import Link from "next/link";
import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

import { Suspense } from "react"
import Loading from "@/app/loading"
import contributors from "@/contributors.json";

import { Tooltip } from "flowbite-react";

import { FaGithub, FaLinkedin, FaHome } from "react-icons/fa";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        {/* Main Content */}
        <div className="flex flex-col items-center pt-20 md:pt-40 h-screen border-gray-200 dark:border-gray-700 border-b-[0.15rem]">
          {/* Logo Section */}
          <div>
            {/* Light Mode Logo */}
            <Image
              id="titleLogo"
              src={"/logos/cf_logo_words_blue_green.png"}
              alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
              width={1000}
              height={1000} // Pixel rendered
              className="block dark:hidden mx-auto w-[18rem] md:w-[34rem] lg:w-[25rem]"
            />

            {/* Dark Mode Logo */}
            <Image
              id="titleLogo"
              src={"/logos/cf_logo_words_blue_pink.png"}
              alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
              width={1000}
              height={1000} // Pixel rendered
              className="hidden dark:block mx-auto w-[18rem] md:w-[34rem] lg:w-[25rem]"
            />
          </div>

          {/* Search Section */}
          <NavigationSearchBig/>
        </div>

        {/* Meet the team */}
        <div className="flex flex-col items-center text-center mt-auto p-8 pt-12 h-max mb-10">
          <span className="font-bold text-4xl text-gray-950 dark:text-gray-100">Meet the team</span>
          <div 
            className="
              flex flex-col md:flex-row justify-center items-center 
              mt-8 mb-10 gap-y-4 gap-x-6 md:gap-x-10
            "
          >
            {Object.entries(contributors?.Head ?? {})?.map(([pid, person]) => (
              <div 
                key={pid} 
                className="
                  flex flex-row md:flex-col items-center text-center gap-x-2 gap-y-4 p-6 
                  border-gray-200 dark:border-gray-700 border-[0.02rem] rounded-lg shadow-lg 
                  bg-cover bg-center w-[20rem] md:w-[15rem]
                "
              >
                <div className="bg-gray-50 dark:bg-stone-900 rounded-full shadow-md overflow-hidden w-[15rem] md:w-[10rem]">
                  <Image 
                    className="w-full rounded-lg shadow-xl " 
                    height={400}
                    width={400}
                    src={person["Avatar"]} 
                    alt={person["Name"]} 
                  />
                </div>
                <div className="flex flex-col gap-2 items-center text-center w-full">
                  <span className="font-bold text-stone-900 dark:text-gray-300">{person.Name}</span>
                  <span className="p-y-1 p-x-2 w-full font-semibold text-stone-900 dark:text-gray-300">{person.Role}</span>
                  <ul className="flex gap-4 pt-1 text-stone-900 dark:text-gray-300">
                    <li className="text-2xl hover:scale-110">
                      <Link href={person.GitHub} target="_blank"><FaGithub/></Link>
                    </li>
                    <li className="text-2xl hover:scale-110">
                      <Link href={person.Linkedin} target="_blank"><FaLinkedin/></Link>
                    </li>
                    <li className="text-2xl hover:scale-110">
                      <Link href={person.Homepage} target="_blank"><FaHome/></Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center mb-8 gap-2">
            {Object.entries(contributors?.Contributor ?? {}).map(([pid, person]) => (
              <div key={pid} className={""}>
                <Tooltip content={person.Name}>
                  <Link href={person.GitHub} target="_blank">
                    <div className="rounded-full overflow-hidden w-[2.5rem] md:w-[3.5rem] shadow-sm">
                      <Image 
                        className="rounded-full hover:scale-110 hover:cursor-pointer" 
                        height={200}
                        width={200}
                        src={person["Avatar"]} 
                        alt={person["Name"]} 
                      />
                    </div>
                  </Link>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export const metadata = {
  title: `Home`,
};
