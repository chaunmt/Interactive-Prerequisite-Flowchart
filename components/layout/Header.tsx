"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSelector from "../picker/ThemeSelector";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Menu visibility state

  return (
    <header
      className="
        relative top-0 left-0 w-full h-16 z-50 flex items-center justify-between
        bg-white shadow border-b border-gray-200 px-4 md:px-6"
    >
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center gap-4 flex-grow">
        <Link href="/" className="flex items-center">
          <Image
            className="w-10 h-auto"
            src="/logos/cf_logo_favicon.png"
            alt="interactive-prereq-logo"
            width={40}
            height={40}
          />
        </Link>

        <nav className="hidden md:block flex-grow">
          <ul className="flex gap-6">
            {[
              { display: "Home", ref: "/" },
              { display: "Course", ref: "/courses" },
              { display: "Program", ref: "/programs" },
            ].map(({ display, ref }) => (
              <li key={display}>
                <Link
                  href={ref}
                  className="
                    px-3 py-2 rounded-md text-gray-600 font-medium
                    hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {display}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right Section: Search Button and Theme Switcher */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Button */}
        <button
          className="
            w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full md:rounded-md hover:bg-gray-100 text-gray-600 text-sm font-medium transition gap-2"
        >
          <CiSearch className="text-gray-500 text-lg" />
          <span className="hidden md:block">Search...</span>
        </button>

        {/* Theme Switcher */}
        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition">
          <ThemeSelector />
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-150 shadow-lg z-50">
          <ul className="flex flex-col items-start p-4 gap-2">
            {[
              { display: "Home", ref: "/" },
              { display: "Courses", ref: "/courses" },
              { display: "Programs", ref: "/programs" },
            ].map(({ display, ref }) => (
              <li key={display} className="w-full">
                <Link
                  href={ref}
                  className="
                    block w-full px-4 py-2 rounded-md text-gray-600 font-medium
                    hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  {display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
