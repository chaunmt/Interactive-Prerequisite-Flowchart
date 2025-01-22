"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSelector from "@/components/layout/ThemeSelector";
import KbdShortcut, { Cmd } from "@/components/ui/KbdShortcut";
import { MdOutlineViewHeadline as BarsIcon } from "react-icons/md";
import { MdClear as CrossIcon } from "react-icons/md";
import { MdSearch as SearchIcon } from "react-icons/md";
import { useState } from "react";

import cf_logo_favicon from "@/public/cf_logo_favicon.png";
import cf_logo_words_long from "@/public/cf_logo_words_long.png";

// TODO finish styling and copying the nextjs site
// also todo dark variants

const header_links = [
  { display: "Homepage", url: "/" },
  { display: "Course Catalog", url: "/courses" },
  { display: "Program Catalog", url: "/programs" },
  // { display: "Editor", url: "/editor" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Menu visibility state

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full flex-col items-center justify-around bg-white/80 px-4 shadow backdrop-blur-sm backdrop-saturate-200 dark:bg-zinc-900/80">
      <nav className="relative flex w-full flex-1 items-center">
        <div id="left-nav" className="flex w-full items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              className="h-10 w-auto"
              src={cf_logo_favicon}
              alt="Course Flowchart logo"
            />
            <Image
              className="ml-4 block h-10 w-auto pt-1 brightness-150 lg:hidden dark:invert"
              src={cf_logo_words_long} // TODO make proper version of this
              alt="Course Flowchart logo"
            />
          </Link>
          {header_links.map(({ display, url }) => (
            <Link
              key={display}
              href={url}
              className="hidden rounded-md p-2 text-sm font-normal text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:block dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {display}
            </Link>
          ))}
        </div>

        <div id="right-nav" className="flex items-center gap-2 md:gap-4">
          <button
            id="search-button"
            className="flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-gray-100 text-sm font-medium text-gray-600 shadow transition hover:bg-gray-200 md:h-auto md:w-auto md:rounded-md md:px-4 md:py-2 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <SearchIcon className="text-lg" />
            <span className="hidden sm:block sm:pr-12">Search...</span>
            <KbdShortcut combination={[Cmd, "K"]} />
          </button>

          <ThemeSelector />

          <button
            id="hamburger-menu"
            className="flex h-9 w-9 items-center justify-center rounded bg-gray-100 shadow hover:bg-gray-200 lg:hidden dark:bg-zinc-800 dark:hover:bg-zinc-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CrossIcon size={24} /> : <BarsIcon size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="hamburger-dropdown"
            className="absolute left-0 top-16 z-40 w-full rounded shadow backdrop-blur-sm backdrop-saturate-200"
          >
            <ul className="flex flex-col items-start gap-1 bg-gray-100/90 p-4">
              {header_links.map(({ display, url }) => (
                <li key={display} className="w-full">
                  <Link
                    href={url}
                    className="block rounded bg-gray-50/85 px-4 py-2 font-medium text-gray-700 shadow transition-colors hover:bg-gray-200/85 hover:text-gray-900"
                    onClick={() => setMenuOpen(false)} // Close menu on click
                  >
                    {display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
