import type { Config } from "tailwindcss";
// if we ever want to alias tailwind's provided colors:
// import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        // making it look closer to the default box shadow
        DEFAULT: [
          "0 1px 2px rgba(0, 0, 0, 0.125)",
          "0 1px 1px rgba(0, 0, 0, 0.0625)",
        ],
        sm: "0 1px 1.5px rgba(0, 0, 0, 0.2)",
      },
      strokeWidth: {
        0.3: "0.3px",
      },
      colors: {
        // flowchart light/dark colors
        "fl-course": {
          DEFAULT: "oklch(82.76% 0.1013 230.32)",
          border: "oklch(69.88% 0.1254 234.35)",
        },
        "fd-course": {
          DEFAULT: "oklch(49.88% 0.1054 234.35)",
          border: "oklch(82.76% 0.1013 230.32)",
        },
        "fl-and": {
          DEFAULT: "oklch(87.12% 0.1363 154.45)",
          border: "oklch(73.27% 0.1524 157.58)",
        },
        "fd-and": {
          DEFAULT: "oklch(53.27% 0.1024 157.58)",
          border: "oklch(87.12% 0.1363 154.45)",
        },
        "fl-or": {
          DEFAULT: "oklch(82.28% 0.1095 346.02)",
          border: "oklch(70.39% 0.1343 351.18)",
        },
        "fd-or": {
          DEFAULT: "oklch(50.39% 0.1043 351.18)",
          border: "oklch(82.28% 0.1095 346.02)",
        },
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  plugins: [],
};

export default config;
