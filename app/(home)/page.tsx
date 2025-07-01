// Home page - "google.com" w/ global search

import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

import { Suspense } from "react"
import Loading from "@/app/loading"

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative h-screen w-screen">
        {/* Main Content */}
        <div className="flex flex-col items-center pt-20 md:pt-40 bg-gray-50">
          {/* Logo Section */}
          <div>
            <Image
              id="titleLogo"
              src={"/logos/cf_logo_words.png"}
              alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
              width={1000}
              height={1000} // Pixel rendered
              className="mx-auto w-[18rem] md:w-[34rem] lg:w-[25rem]"
            />
          </div>

          {/* Search Section */}
          <NavigationSearchBig/>
        </div>
      </div>
    </Suspense>
  );
}

export const metadata = {
  title: `Home`,
};
