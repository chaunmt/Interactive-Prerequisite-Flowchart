import Header from "../components/Header"
import Footer from "../components/Footer"

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Gopher Prerequisite',
    default: 'Gopher Prerequisite',
  },
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
