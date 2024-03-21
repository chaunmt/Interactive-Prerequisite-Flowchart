// Home page - "google.com" w/ global search

import "../components/styles/Layout.css";
import "../components/styles/Mainpage.css";
import Search from "../components/Search";
import Link from "next/link";

export default function Page() {
  return (
    <div class>
      <div>
        <img id = "titleLogo" src={"/logos/CFLongLogo.webp"} alt="Title name" />
      </div>
      <div className>
        {/* <GraphSearch /> */}
        <Search />
      </div>
    </div>
  );
}

export const metadata = {
  title: `Home | Gopher Prerequisite`,
};
