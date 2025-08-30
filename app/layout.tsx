import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "sonner"
import { Navbar } from "@/components/navbar"
import { PromoBanner } from "@/components/promo-banner"
import ScrollAnimator from "@/components/scroll-animator"
import PageTransitions from "@/components/page-transitions"
import "./globals.css"

export const metadata: Metadata = {
  title: "BrewCraft - Premium Coffee Shop",
  description:
    "Discover our carefully curated selection of premium coffee beans, expertly crafted beverages, and delicious pastries.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
              html {
                font-family: ${GeistSans.style.fontFamily};
                --font-sans: ${GeistSans.variable};
                --font-mono: ${GeistMono.variable};
              }
        `}</style>
      </head>
      <body>
        <Navbar />
        <PromoBanner />
        <ScrollAnimator />
        <main>
          <PageTransitions>{children}</PageTransitions>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
