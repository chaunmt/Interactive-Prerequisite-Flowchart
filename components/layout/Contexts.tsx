"use client";

import { createContext, useState, useEffect } from "react";

// typescript sucks :(
type ThemeContextType = {
  theme: Theme;
  changeTheme: (t: Theme) => void;
  dark: boolean;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export type Theme = "light" | "dark" | "system";
const themes = ["light", "dark", "system"] as const;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [dark, setDark] = useState<boolean>(false);
  console.log("dark:", dark);

  useEffect(() => {
    // Sync theme with local storage or system preference
    const saved = localStorage.getItem("theme");
    const out = themes.find((t) => t === saved);
    console.log(
      out
        ? `retrieved theme preference from cookies: ${saved}`
        : "defaulting to system preference",
    );
    setTheme(out || "system");
    applyTheme(out || "system");
  }, []);

  const applyTheme = (selected: Theme) => {
    const isDark =
      selected === "dark" ||
      (selected === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  };

  const changeTheme = (selected: Theme) => {
    setTheme(selected);
    localStorage.setItem("theme", selected);
    applyTheme(selected);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, dark }}>
      {children}
    </ThemeContext.Provider>
  );
}
