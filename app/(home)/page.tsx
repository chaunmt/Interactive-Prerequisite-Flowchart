// Home page - "google.com" w/ global search

import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";
import cf_logo_words from "@/public/cf_logo_words.png";
// import cf_logo_hero from "@/public/cf_logo_hero.png" // TODO make this

// TODO completely redesign this and replace the contents with legitimately interesting/useful stuff

export default function Page() {
  return (
    <div
      id="content"
      className="relative flex min-h-screen flex-col items-center justify-start bg-gray-50"
    >
      <Image
        id="titleLogo"
        // src={cf_logo_hero} // TODO make this
        src={cf_logo_words}
        alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
        className="mx-auto mb-0 mt-10 h-auto w-1/2"
        priority
      />

      <NavigationSearchBig />
    </div>
  );
}

export const metadata = {
  title: `Home | Course Flowchart`,
};
