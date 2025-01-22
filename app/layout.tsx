import type { Metadata } from "next";
import { description, keywords } from "@/app/meta";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/Contexts";

// Google Fonts' Inter is slightly broken
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Course Flowchart",
    default: "Course Flowchart",
  },
  description,
  keywords,
};

const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.ttf", style: "normal" },
    { path: "./fonts/InterVariable-Italic.ttf", style: "italic" },
  ],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="bg-gray-100 dark:bg-zinc-950">
        <ThemeProvider>
          <Header />
          <main className="flex min-h-screen flex-col gap-4 p-4">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
