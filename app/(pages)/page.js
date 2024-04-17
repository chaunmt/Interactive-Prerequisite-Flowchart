// Home page - "google.com" w/ global search

import { NavigationSearch } from "../components/search/NavigationSearch";
import Image from "next/image";

import "./Layout.css";
import "./Mainpage.css";
import "../components/search/SearchBarBig.css"

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
