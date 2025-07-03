"use client";

import Link from "next/link";
import Image from "next/image";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useState, useEffect } from "react";

import { useThemeMode } from "flowbite-react";

export default function Header() {
  const { computedMode, toggleMode } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  // only flip to "true" after we've hydrated
  useEffect(() => {
    setMounted(true);
  }, []);

  // don’t attempt to render the icons until after hydration
  if (!mounted) {
    return (
      <button
        disabled
        className="p-2 rounded-full bg-gray-200 dark:bg-stone-900 text-stone-400"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <header
      className="
        sticky top-0 h-20 z-50 flex items-center justify-between
        bg-white dark:bg-stone-900 shadow dark:shadow-gray-800 
        border-b-[0.15rem] border-gray-200 dark:border-gray-700 px-4 md:px-6 opacity-80"
    >
      {/* Left Section: Logo */}
      <div className="flex items-center gap-4 flex-grow">
        <Link href="/" className="flex items-center">
          {/* Light Mode Favicon */}
          <Image
            className="block dark:hidden w-[3.1rem] transform transition-transform duration-500 hover:rotate-180 hover:scale-105"
            src="/logos/favicon_blue_green.png"
            alt="interactive-prereq-logo"
            width={100}
            height={100}
          />

          {/* Dark Mode Favicon */}
          <Image
            className="hidden dark:block w-[3.1rem] transform transition-transform duration-500 hover:rotate-180 hover:scale-105"
            src="/logos/favicon_blue_pink.png"
            alt="interactive-prereq-logo"
            width={500}
            height={500}
          />
        </Link>
      </div>

      {/* Right Section: Theme Switcher */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={toggleMode}
          className="
            p-2 rounded-full border-[0.15rem] border-gray-200 dark:border-gray-700 shadow-sm 
            text-stone-800 dark:text-stone-200 hover:bg-gray-200 dark:hover:bg-gray-700 
          "
        >
          {computedMode === 'dark' ? (
            <MdSunny className="w-[1.6rem] h-[1.6rem]" />
          ) : (
            <FaMoon className="w-[1.6rem] h-[1.6rem]" />
          )}
        </button>
      </div>
    </header>
  );
}
