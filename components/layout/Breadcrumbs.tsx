import Link from "next/link";
import { ReactNode } from "react";
import { MdOutlineHome as HomeIcon } from "react-icons/md";
import { MdChevronRight as Chevron } from "react-icons/md";
// import { LuChevronsRight as Chevron } from "react-icons/lu";
// import { HiMiniChevronDoubleRight as Chevron } from "react-icons/hi2";
// import { TbChevronsRight as Chevron } from "react-icons/tb";
// import { BiChevronsRight as Chevron } from "react-icons/bi";

export interface BreadcrumbRoute {
  url?: string;
  display: ReactNode;
}

const home: BreadcrumbRoute = {
  url: "/",
  display: (
    <div className="flex flex-row gap-3">
      <HomeIcon size={20} />
      <span className="hidden sm:block">Home</span>
    </div>
  ),
};

// this has to be manually placed in each page because useRouter
// isn't super helpful--the literal routes are not very informative
export default function Breadcrumbs({
  segments,
}: {
  segments: BreadcrumbRoute[];
}) {
  const segs = [home].concat(segments);

  return (
    <nav className="text-sm">
      <ol className="flex space-x-2">
        {segs.map(({ url, display }, index) => (
          <BreadcrumbSegment
            key={`${url}_${display.toString()}`}
            url={url}
            display={display}
            first={index === 0}
          />
        ))}
      </ol>
    </nav>
  );
}

function BreadcrumbSegment({
  url,
  display,
  first,
}: BreadcrumbRoute & { first: boolean }) {
  return (
    <>
      {!first && (
        <span className="text-gray-300 dark:text-zinc-600">
          {<Chevron size={20} />}
        </span>
      )}
      <li className="flex items-center">
        {(url && (
          <Link
            href={url}
            className="text-gray-600 hover:text-gray-800 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            {display}
          </Link>
        )) || (
          <span className="text-wrap text-gray-500 dark:text-zinc-400">
            {display}
          </span>
        )}
      </li>
    </>
  );
}
