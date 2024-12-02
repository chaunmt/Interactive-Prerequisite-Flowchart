import Link from "next/link";
import Image from "next/image";

import ThemeSelector from "../picker/ThemeSelector";

export default function Header() {
  return (
    <header
      className="
      relative top-0 left-0 w-full h-16 z-50
      flex justify-between items-center
      bg-white shadow-md border-b border-gray-200 px-6"
    >
      {/* Left Section: Logo and Links */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image
            className="w-10 h-auto"
            src="/logos/cf_logo_favicon.png"
            alt="interactive-prereq-logo"
            width={1000}
            height={1000}
          />
        </Link>
        <nav className="hidden md:block">
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

      {/* Right Section: Search Bar Button and Theme Placeholder */}
      <div className="flex items-center gap-4">
        {/* Search button */}
        <button
          className="
            hidden md:block w-40 p-2 rounded-md border border-gray-300 bg-gray-50
            hover:bg-gray-100 text-gray-600 text-sm font-medium transition"
        >
          <span className="text-gray-500">Search...</span>
        </button>
        {/* Theme switcher */}
        <div
          className="
            w-10 h-10 rounded-full bg-gray-50 border border-gray-300
            flex items-center justify-center hover:bg-gray-100 transition"
        >
          <span className="text-gray-500"><ThemeSelector/></span>
        </div>
      </div>
    </header>
  );
}
