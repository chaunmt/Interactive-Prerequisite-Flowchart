import Image from "next/image";
import NavigationSearchBig from "@/components/search/NavigationSearchBig";

export default function Page() {
  return (
    <div className="px-[5%]">
      <div>
        <Image
          className="block mx-auto w-[30%] h-auto"
          src="/logos/CFLongLogo.webp"
          alt="Title name"
          width={1000}
          height={1000}
        />
      </div>
      <NavigationSearchBig />
    </div>
  );
}

export const metadata = {
  title: `Home | Gopher Prerequisite`,
};
