import Link from "next/link";
import Image from "next/image";
import contributors from "@/contributors.json";

import { FaGithub, FaLinkedin, FaHome } from "react-icons/fa";

// three tiered listing
const { Head, Member, Contributor } = contributors;
const HeadStyles = {
  section: "flex flex-wrap justify-center gap-4 mb-6",
  card: "flex flex-col items-center bg-white p-2 rounded shadow-lg w-[20vw] max-w-[250px] h-[30vh] max-h-[320px]",
  avatar:
    "relative w-[6vw] h-[6vw] max-w-[80px] max-h-[80px] bg-gray-300 rounded-full flex items-center justify-center mt-4 overflow-hidden",
  name: "text-red-600 font-bold mt-2 text-sm",
  role: "text-xs overflow-hidden hover:overflow-visible hover:whitespace-normal hover:h-auto",
  buttons: "w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center",
};
const MemberStyles = {
  section: "flex flex-wrap justify-center gap-3 mb-6",
  card: "flex flex-col items-center bg-white p-2 rounded shadow w-[18vw] max-w-[200px] h-[25vh] max-h-[280px]",
  avatar:
    "relative w-[5vw] h-[5vw] max-w-[70px] max-h-[70px] bg-gray-300 rounded-full flex items-center justify-center mt-2 overflow-hidden",
  name: "text-red-600 font-bold mt-2 text-sm",
  role: "text-xs overflow-hidden hover:overflow-visible hover:whitespace-normal hover:h-auto transition-all duration-300",
  buttons: "w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center",
};
const ContributorStyles = {
  section: "flex flex-wrap justify-center gap-3 mb-6",
  container: "group flex flex-col items-center cursor-pointer",
  avatar:
    "relative w-[4vw] h-[4vw] max-w-[50px] max-h-[50px] bg-gray-300 rounded-full flex items-center justify-center overflow-hidden",
  tooltip:
    "absolute top-12 left-1/2 transform -translate-x-1/2 hidden group-hover:flex bg-black text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none",
};

export default function Footer() {
  return (
    <footer
      className="
      relative flex flex-col items-center text-center w-full mt-auto p-8 pt-12
      bg-gradient-to-t from-gray-100 to-white shadow-inner"
    >
      {CardSection(Head, HeadStyles)}
      {CardSection(Member, MemberStyles)}
      {AvatarSection(Contributor, ContributorStyles)}

      {/* GitHub Button */}
      <Link
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
        target="_blank"
      >
        <button
          className="
          mt-5 text-sm bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700
          transition duration-300 shadow-md"
        >
          Contribute to our GitHub
        </button>
      </Link>

      {/* Footer Text */}
      <p className="text-sm text-gray-600 mt-6">
        Created by and for{" "}
        <Link
          href="https://twin-cities.umn.edu/"
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          University of Minnesota - Twin Cities
        </Link>{" "}
        students through{" "}
        <Link
          href="https://www.socialcoding.net/"
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          Social Coding
        </Link>{" "}
        with data from{" "}
        <Link
          href="https://asr.umn.edu/applications-and-forms/applications/coursedog"
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          Coursedog
        </Link>{" "}
        - the University’s course and program catalog management system.
      </p>
      <Link
        href="/privacynotice"
        className="text-xs mt-3 underline text-gray-500 hover:text-gray-700"
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
      <p className={styles.role}>{person.Role}</p>

      <div className="flex gap-2 mt-auto mb-2">
        <Link href={person.Linkedin} target="_blank">
          <div className={styles.buttons}>
            <span className="text-sm">
              <FaLinkedin />
            </span>
          </div>
        </Link>
        <Link href={person.Homepage} target="_blank">
          <div className={styles.buttons}>
            <span className="text-sm">
              <FaHome />
            </span>
          </div>
        </Link>
        <Link href={person.GitHub} target="_blank">
          <div className={styles.buttons}>
            <span className="text-sm">
              <FaGithub />
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
      <div className={styles.tooltip}>{person.Name}</div>
    </div>
  );
}
