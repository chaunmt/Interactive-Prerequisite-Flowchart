import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

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
