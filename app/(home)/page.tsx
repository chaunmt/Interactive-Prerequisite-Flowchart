// Home page - "google.com" w/ global search

import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <div className="mt-10 mb-0">
        <Image
          id="titleLogo"
          src={"/logos/cf_logo_words.png"}
          alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
          width={400}
          height={250} // Pixel rendered
          className="mx-auto"
        />
      </div>
      <NavigationSearchBig />
    </div>
  );
}

export const metadata = {
  title: `Home | Course Flowchart`,
};
