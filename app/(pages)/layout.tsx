import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

import { Metadata } from 'next'

import {Keywords} from "../components/meta/keys"
 
export const metadata: Metadata = {
  title: {
    template: '%s | Gopher Prerequisite',
    default: 'Gopher Prerequisite',
  },
  description: "Explore and plan your academic journey with Gopher Prerequisite, your ultimate guide to course prerequisites at the University of Minnesota. Find detailed course information, prerequisites, and plan your curriculum efficiently.",
  keywords: Keywords,
  icons: "/logo.png"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        </body>    
    </html>
  )
}
