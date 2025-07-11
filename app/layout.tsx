import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Keywords } from "@/components/layout/Meta";
import "@/app/globals.css";

import { Metadata } from "next";

import { ThemeModeScript } from "flowbite-react";

export const metadata: Metadata = {
  title: {
    template: "%s | Course Flowchart",
    default: "Course Flowchart",
  },
  description:
    "Explore and plan your academic journey with Course Flowchart, your ultimate guide to course prerequisites at the University of Minnesota - Twin Cities. Find detailed course information, prerequisites, and plan your curriculum efficiently.",
  keywords: Keywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className="bg-gray-50 dark:bg-stone-900">
        <Header />
        <main className="max-w-screen-2xl justify-center items-center m-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
