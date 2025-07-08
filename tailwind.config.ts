import type { Config } from "tailwindcss";
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbiteReact, // invoke the plugin factory
  ],
} satisfies Config;
