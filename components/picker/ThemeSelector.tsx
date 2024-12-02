"use client";

import { useState, useEffect } from "react";
import { FaMoon, FaDesktop } from "react-icons/fa";
import { CiLight } from "react-icons/ci";

export default function ThemeSelector() {
  const [theme, setTheme] = useState<string>("light"); // Default theme
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Dropdown visibility

  // Load theme from localStorage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  // Apply the theme to the HTML tag
  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  // Handle theme selection
  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    setMenuOpen(false); // Close menu after selection
  };

  // Get the icon corresponding to the current theme
  const getThemeIcon = () => {
    const iconSize = 28; // Set icon size
    if (theme === "light") return <CiLight className="text-gray-800" size={iconSize} />;
    if (theme === "dark") return <FaMoon className="text-gray-800" size={iconSize} />;
    if (theme === "computer") return <FaDesktop className="text-gray-800" size={iconSize} />;
  };

  return (
    <div className="relative inline-block">
      {/* Theme Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
        className={`w-10 h-10 flex items-center justify-center bg-gray-50 ${
          menuOpen ? "rounded-t-full" : "rounded-full"
        } shadow-sm hover:bg-gray-100 focus:outline-none`}
      >
        {getThemeIcon()}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute right-0 w-10 bg-gray-50 rounded-b-full shadow-lg z-50"
        >
          <ul className="flex flex-col items-center space-y-1">
            <li
              onClick={() => handleThemeChange("light")}
              className="text-gray-700 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100"
            >
              <CiLight size={28} />
            </li>
            <li
              onClick={() => handleThemeChange("dark")}
              className="text-gray-700 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100"
            >
              <FaMoon size={28} />
            </li>
            <li
              onClick={() => handleThemeChange("computer")}
              className="text-gray-700 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100"
            >
              <FaDesktop size={28} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
