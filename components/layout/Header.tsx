import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="
      fixed top-0 left-0 w-full h-16 z-50
      flex justify-between items-center
      bg-[var(--header-bar)] border-b border-[var(--header-bar-border)]
      px-4"
    >
      {/* Left Section: Logo and Links */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            className="w-10 h-auto"
            src="/logos/cf_logo_favicon.png"
            alt="interactive-prereq-logo"
            width={1000}
            height={1000}
          />
        </Link>
        <nav className="ml-4">
          <ul className="flex gap-4">
            {[
              { display: "Home", ref: "/" },
              { display: "Course", ref: "/courses" },
              { display: "Program", ref: "/programs" },
            ].map(({ display, ref }) => (
              <li key={display}>
                <Link
                  href={ref}
                  className="
                    px-4 py-2 rounded-md font-semibold 
                    hover:bg-[var(--header-block-hover)] hover:text-[var(--dark-gray-2)]
                    transition-colors"
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
        <button
          className="
            w-40 p-2 rounded border border-gray-300 bg-white 
            hover:bg-gray-200 transition"
        >
          <span className="text-gray-500">Search...</span>
        </button>
        <div
          className="
            w-20 p-2 rounded border border-gray-300 bg-white
            flex items-center justify-center"
        >
          <span className="text-gray-500">Theme</span>
        </div>
      </div>
    </header>
  );
}
