// Home page - "google.com" w/ global search

import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

export default function Page() {
  return (
    <div className="relative">
      {/* Main Content */}
      <div className="min-h-[85vh] flex flex-col items-center justify-start bg-gray-50">
        {/* Logo Section */}
        <div className="mt-10 mb-0 py-5">
          <Image
            id="titleLogo"
            src={"/logos/cf_logo_words.png"}
            alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
            width={400}
            height={250} // Pixel rendered
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 300px"
            priority
            className="mx-auto w-96 h-auto"
            // true drop shadow using svg filters (TODO: proper svg instead of a png)
            style={{ filter: "drop-shadow(1px 1px 1px #1112)" }}
          />
        </div>

        {/* Search Section */}
        <NavigationSearchBig />
      </div>
    </div>
  );
}

export const metadata = {
  title: `Home | Course Flowchart`,
};
