// Home page - "google.com" w/ global search

import "../components/styles/Layout.css";
import "../components/styles/Mainpage.css";
import "../components/styles/SearchBarBig.css"
import { NavigationSearch } from "../components/search/NavigationSearch";
import Image from "next/image";

export default function Page() {
  return (
    <div class>
      <div>
        <Image
          id = "titleLogo"
          src={"/logos/CFLongLogo.webp"}
          alt="Title name"
          width={1000} height={1000} // Pixel rendered
        />
      </div>
      <div id="navBig">
        <NavigationSearch />
      </div>
    </div>
  );
}

export const metadata = {
  title: `Home | Gopher Prerequisite`,
};

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Gopher Prerequisite",
//     default: "Gopher Prerequisite",
//   },
//   description:
//     "Explore and plan your academic journey with Gopher Prerequisite, your ultimate guide to course prerequisites at the University of Minnesota. Find detailed course information, prerequisites, and plan your curriculum efficiently.",
//   keywords: Keywords,
//   icons: "/logo.png",
// };