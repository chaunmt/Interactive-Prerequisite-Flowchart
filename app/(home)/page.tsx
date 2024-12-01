// Home page - "google.com" w/ global search

import "@/components/styles/Layout.css";
import "@/components/styles/Mainpage.css";

import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

export default function Page() {
  return (
    <div id="content">
      <div>
        <Image
          id="titleLogo"
          src={"/logos/cf_logo_words.png"}
          alt="Course Flowchart"
          width={1000}
          height={1000} // Pixel rendered
        />
      </div>
      <NavigationSearchBig />
    </div>
  );
}

export const metadata = {
  title: `Home | Course Flowchart`,
};
