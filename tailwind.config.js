// if, for whatever reason, we want to alias tailwind's provided colors
// import tw_colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // flowchart light/dark colors
        "fl-course": {
          DEFAULT: "oklch(82.76% 0.1013 230.32)",
          border: "oklch(69.88% 0.1254 234.35)",
        },
        "fd-course": {
          DEFAULT: "#0A0A0A",
          border: "#FFFFFF",
        },
        "fl-and": {
          DEFAULT: "oklch(87.12% 0.1363 154.45)",
          border: "oklch(73.27% 0.1524 157.58)",
        },
        "fd-and": {
          DEFAULT: "#0A0A0A",
          border: "#FFFFFF",
        },
        "fl-or": {
          DEFAULT: "oklch(82.28% 0.1095 346.02)",
          border: "oklch(70.39% 0.1343 351.18)",
        },
        "fd-or": {
          DEFAULT: "#0A0A0A",
          border: "#FFFFFF",
        },
        // others as needed
      },
    },
  },
  plugins: [],
};
