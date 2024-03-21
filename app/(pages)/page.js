// Home page - "google.com" w/ global search

import "../components/styles/Layout.css";
import "../components/styles/Mainpage.css";
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
      <div className>
        <NavigationSearch />
      </div>
    </div>
  );
}

export const metadata = {
  title: `Home | Gopher Prerequisite`,
};
