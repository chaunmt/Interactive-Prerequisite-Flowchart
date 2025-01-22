"use client";

import { useState, useContext } from "react";
import { ThemeContext, Theme } from "@/components/layout/Contexts";

import { IoSunny as SunFill } from "react-icons/io5";
import { IoSunnyOutline as SunLine } from "react-icons/io5";
import { IoMoon as MoonFill } from "react-icons/io5";
import { IoMoonOutline as MoonLine } from "react-icons/io5";
import { RiComputerFill as SystemFill } from "react-icons/ri";
import { RiComputerLine as SystemLine } from "react-icons/ri";
import { MdClear } from "react-icons/md";

export default function ThemeSelector() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Dropdown visibility

  const handleChange = (selected: Theme) => {
    console.log(`theme changed to ${selected}`);
    changeTheme(selected);
    setMenuOpen(false); // Close menu after selection
  };

  // Get the icon corresponding to the current theme
  const getThemeIcon = () => {
    if (theme === "light") return <SunFill size={24} />;
    if (theme === "dark") return <MoonFill size={24} />;
    if (theme === "system") return <SystemFill size={24} />;
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
        className="z-50 flex h-9 w-9 items-center justify-center rounded bg-gray-100 text-gray-800 shadow backdrop-blur-sm backdrop-saturate-200 hover:bg-gray-200 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {menuOpen ? <MdClear size={24} /> : getThemeIcon()}
      </button>

      {menuOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-50 mt-0.5 w-9 rounded bg-none"
        >
          <ul className="flex flex-col items-center space-y-0.5">
            <li
              onClick={() => handleChange("light")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-gray-100/75 text-gray-800 shadow backdrop-blur-sm backdrop-saturate-200 hover:bg-gray-200/75 dark:bg-zinc-700/75 dark:text-zinc-100 dark:hover:bg-zinc-700/75"
            >
              <SunLine size={24} />
            </li>
            <li
              onClick={() => handleChange("dark")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-gray-100/75 text-gray-800 shadow backdrop-blur-sm backdrop-saturate-200 hover:bg-gray-200/75 dark:bg-zinc-700/75 dark:text-zinc-100 dark:hover:bg-zinc-700/75"
            >
              <MoonLine size={24} />
            </li>
            <li
              onClick={() => handleChange("system")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-gray-100/75 text-gray-800 shadow backdrop-blur-sm backdrop-saturate-200 hover:bg-gray-200/75 dark:bg-zinc-700/75 dark:text-zinc-100 dark:hover:bg-zinc-700/75"
            >
              <SystemLine size={24} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
