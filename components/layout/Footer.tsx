import Link from "next/link";
import Image from "next/image";
import { reformat } from "@/backend/text-manipulation";
import contributors from "@/contributors.json";

import { MdHome as HomepageIcon } from "react-icons/md";
import { RxGithubLogo as GithubIcon } from "react-icons/rx";
import { RxLinkedinLogo as LinkedinIcon } from "react-icons/rx";

// three tiered listing
const { Head, Member, Contributor } = contributors;
const HeadStyles = {
  section: "flex flex-wrap justify-center gap-4 mb-6",
  card: "flex flex-col items-center bg-white dark:bg-zinc-900 p-2 rounded shadow w-[20vw] max-w-[250px] h-[30vh] max-h-[320px]",
  avatar:
    "relative w-[6vw] h-[6vw] max-w-[80px] max-h-[80px] shadow bg-gray-300 dark:bg-zinc-600 rounded-full flex items-center justify-center mt-4 overflow-hidden",
  name: "text-red-500 dark:text-red-400 font-bold mt-2 text-sm",
  role: "text-xs overflow-hidden hover:overflow-visible hover:whitespace-normal hover:h-auto transition-all duration-300 text-gray-900 dark:text-white",
  buttons:
    "w-8 h-8 bg-gray-200 dark:bg-zinc-700 shadow rounded-full flex items-center justify-center text-gray-900 dark:text-white shadow",
};
const MemberStyles = {
  section: "flex flex-wrap justify-center gap-3 mb-6",
  card: "flex flex-col items-center bg-white dark:bg-zinc-900 p-2 rounded shadow w-[18vw] max-w-[200px] h-[25vh] max-h-[280px]",
  avatar:
    "relative w-[5vw] h-[5vw] max-w-[70px] max-h-[70px] shadow bg-gray-300 dark:bg-zinc-600 rounded-full flex items-center justify-center mt-2 overflow-hidden",
  name: "text-red-500 dark:text-red-400 font-bold mt-2 text-sm",
  role: "text-xs overflow-hidden hover:overflow-visible hover:whitespace-normal hover:h-auto transition-all duration-300 text-gray-900 dark:text-white",
  buttons:
    "w-8 h-8 bg-gray-200 dark:bg-zinc-700 shadow rounded-full flex items-center justify-center text-gray-900 dark:text-white shadow",
};
const ContributorStyles = {
  section: "flex flex-wrap justify-center gap-3 mb-6",
  container: "group flex flex-col items-center cursor-pointer",
  avatar:
    "relative w-[4vw] h-[4vw] max-w-[50px] max-h-[50px] shadow bg-gray-300 dark:bg-zinc-600 rounded-full flex items-center justify-center overflow-hidden",
  tooltip:
    "absolute top-12 left-1/2 transform -translate-x-1/2 hidden group-hover:flex bg-gray-900 dark:bg-white text-white dark:text-zinc-900 text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none",
};

export default function Footer() {
  return (
    <footer className="relative mt-auto flex w-full flex-col items-center bg-gray-200 p-8 pt-12 text-center shadow-inner dark:bg-zinc-800">
      {CardSection(Head, HeadStyles)}
      {CardSection(Member, MemberStyles)}
      {AvatarSection(Contributor, ContributorStyles)}

      {/* GitHub Button */}
      <Link
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
        target="_blank"
      >
        {/* note: this should link to both repos */}
        <button className="rounded-md bg-gray-500 px-6 py-2 text-sm text-white shadow transition duration-300 hover:bg-gray-700 dark:bg-zinc-400 dark:text-zinc-900 dark:hover:bg-zinc-200">
          Contribute on GitHub
        </button>
      </Link>

      {/* Footer Text */}
      <p className="mt-6 text-balance text-sm text-gray-600 dark:text-zinc-300">
        Created by and for{" "}
        <Link
          href="https://twin-cities.umn.edu/"
          className="text-blue-500 hover:underline dark:text-blue-400"
          target="_blank"
        >
          University of Minnesota - Twin Cities
        </Link>{" "}
        students through{" "}
        <Link
          href="https://www.socialcoding.net/"
          className="text-blue-500 hover:underline dark:text-blue-400"
          target="_blank"
        >
          Social Coding
        </Link>{" "}
        with data from{" "}
        <Link
          href="https://asr.umn.edu/applications-and-forms/applications/coursedog"
          className="text-blue-500 hover:underline dark:text-blue-400"
          target="_blank"
        >
          Coursedog
        </Link>{" "}
        - the University’s course and program catalog management system.
      </p>
      <Link
        href="/privacynotice"
        className="mt-3 text-xs text-gray-500 underline hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        target="_blank"
      >
        Privacy Notice
      </Link>
    </footer>
  );
}

interface MemberInfo {
  [key: string]: {
    Name: string;
    Role: string;
    Linkedin: string;
    Homepage: string;
    GitHub: string;
    Avatar: string;
  };
}
interface CardStyles {
  section: string;
  card: string;
  avatar: string;
  name: string;
  role: string;
  buttons: string;
}

function CardSection(people: MemberInfo, styles: CardStyles) {
  return (
    <div className={styles.section}>
      {Object.entries(people).map(([key, person]) => (
        <Card key={key} person={person} styles={styles} />
      ))}
    </div>
  );
}

function Card({ person, styles }) {
  return (
    <div className={styles.card}>
      <Link href={person.GitHub} target="_blank">
        <div className={styles.avatar}>
          <Image
            src={person.Avatar}
            alt={`${person.Name} avatar`}
            fill
            sizes="10vw"
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
        </div>
      </Link>

      <h3 className={styles.name}>{person.Name}</h3>
      <div className={styles.role}>{reformat(person.Role)}</div>

      <div className="mb-2 mt-auto flex gap-2">
        <Link href={person.Linkedin} target="_blank">
          <div className={styles.buttons}>
            <span className="text-lg">
              <LinkedinIcon />
            </span>
          </div>
        </Link>
        <Link href={person.Homepage} target="_blank">
          <div className={styles.buttons}>
            <span className="text-lg">
              <HomepageIcon />
            </span>
          </div>
        </Link>
        <Link href={person.GitHub} target="_blank">
          <div className={styles.buttons}>
            <span className="text-lg">
              <GithubIcon />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

interface ContributorInfo {
  [key: string]: {
    Name: string;
    GitHub: string;
    Avatar: string;
  };
}
interface AvatarStyles {
  section: string;
  container: string;
  avatar: string;
  tooltip: string;
}

function AvatarSection(people: ContributorInfo, styles: AvatarStyles) {
  return (
    <div className={styles.section}>
      {Object.entries(people).map(([key, person]) => (
        <Avatar key={key} person={person} styles={styles} />
      ))}
    </div>
  );
}

function Avatar({ person, styles }) {
  return (
    <div className={styles.container}>
      <Link href={person.GitHub} target="_blank" className={styles.avatar}>
        <Image
          src={person.Avatar}
          alt={`${person.Name} avatar`}
          fill
          sizes="10vw"
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </Link>
      <div className={styles.tooltip}>{person.Name}</div>
    </div>
  );
}
