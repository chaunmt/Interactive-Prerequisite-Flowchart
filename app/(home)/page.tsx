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
        <div className="flex flex-col items-center pt-20 md:pt-40 bg-gray-50 dark:bg-gray-900">
          {/* Logo Section */}
          <div>
            {/* Light Mode Logo */}
            <Image
              id="titleLogo"
              src={"/logos/cf_logo_words_blue_green.png"}
              alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
              width={1000}
              height={1000} // Pixel rendered
              className="block dark:hidden mx-auto w-[18rem] md:w-[34rem] lg:w-[25rem]"
            />

            {/* Dark Mode Logo */}
            <Image
              id="titleLogo"
              src={"/logos/cf_logo_words_blue_pink.png"}
              alt="Course Flowchart Logo: Navigate your course prerequisites with ease"
              width={1000}
              height={1000} // Pixel rendered
              className="hidden dark:block mx-auto w-[18rem] md:w-[34rem] lg:w-[25rem]"
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
