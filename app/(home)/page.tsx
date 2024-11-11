// Home page - "google.com" w/ global search

import "@/components/styles/Layout.css";
import "@/components/styles/Mainpage.css";
// import "@/components/styles/SearchBarBig.css";
import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

export default function Page() {
  return (
    <div id="content">
      <div>
        <Image
          id="titleLogo"
          src={"/logos/CFLongLogo.webp"}
          alt="Title name"
          width={1000}
          height={1000} // Pixel rendered
        />
      </div>
      <NavigationSearchBig />
    </div>
  );
}

export const metadata = {
  title: `Home | Gopher Prerequisite`,
};
