import Link from "next/link";
import Image from "next/image";
import contributors from "@/contributors.json";

import { FaGithub, FaLinkedin, FaHome } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="
      relative flex flex-col items-center text-center w-full mt-auto p-8 pt-12 
      bg-white shadow-inner" 
    >
      <div>
        <span className="font-bold text-4xl text-gray-950">Meet the team</span>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 mb-10 gap-y-4 gap-x-6 md:gap-x-10">
          {Object.entries(contributors?.Head ?? {})?.map(([pid, person]) => (
            <div 
              key={pid} 
              className={"flex flex-row md:flex-col items-center text-center gap-x-2 gap-y-4 p-6 border-gray-200 border-[0.02rem] rounded-lg shadow-lg bg-cover bg-center w-[20rem] md:w-[15rem]"}
              // style={{backgroundImage: `url(${person.Avatar})`}}
            >
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden w-[15rem] md:w-[10rem]">
                <Image 
                  className="w-full rounded-lg shadow-xl " 
                  height={400}
                  width={400}
                  src={person["Avatar"]} 
                  alt={person["Name"]} 
                />
              </div>
              <div className="flex flex-col gap-2 items-center text-center w-full">
                <span className="font-bold">{person.Name}</span>
                <span className="p-y-1 p-x-2 w-full font-semibold">{person.Role}</span>
                <ul className="flex gap-4 pt-1 text-gray-900">
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
              <div className="rounded-full overflow-hidden w-[2.5rem] md:w-[3.5rem] shadow-sm">
                <Image 
                  className="rounded-full hover:scale-110 hover:cursor-pointer" 
                  height={200}
                  width={200}
                  src={person["Avatar"]} 
                  alt={person["Name"]} 
                />
              </div>
            </div>
          ))}
        </div>

        <div 
          className="text-gray-900 border-[0.15rem] border-purple-200 font-semibold
          hover:text-gray-50 hover:bg-purple-500 hover:cursor-pointer
          p-1 m-auto mb-10 w-[20rem] items-center justify-center rounded-lg"
        >
          <Link href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart" target="_blank">
            Contribute to our GitHub
          </Link>
        </div>

        <span className="text-sm text-gray-500 m-4">
          Created by and for{" "}
          <Link
            href="https://twin-cities.umn.edu/"
            className="text-gray-600 font-bold hover:underline"
            target="_blank"
            >
            University of Minnesota - Twin Cities
          </Link>{" "}
          students through{" "}
          <Link
            href="https://www.socialcoding.net/"
            className="text-gray-600 font-bold hover:underline"
            target="_blank"
            >
            Social Coding
          </Link>{" "}
          with data from{" "}
          <Link
            href="https://asr.umn.edu/applications-and-forms/applications/coursedog"
            className="text-gray-600 font-bold hover:underline"
            target="_blank"
            >
            Coursedog
          </Link>{" "}
          - the University’s course and program catalog management system.
        </span>
      </div>
    </footer>
  );
}