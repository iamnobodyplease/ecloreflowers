import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Eclore - European Style Luxury Flowers in the DMV",
  description: "Bespoke European style bouquets and gifts in Virginia Maryland and DC. Elevate any occasion with elegant, long-lasting florals that impress.",
  generator: 'v0.app',
  openGraph: {
    title: "Eclore - European Style Luxury Flowers in the DMV",
    description: "Bespoke European style bouquets and gifts in Virginia Maryland and DC. Elevate any occasion with elegant, long-lasting florals that impress.",
    type: "website",
    siteName: "Eclore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eclore - European Style Luxury Flowers in the DMV",
    description: "Bespoke European style bouquets and gifts in Virginia Maryland and DC. Elevate any occasion with elegant, long-lasting florals that impress.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-black font-sans antialiased selection:bg-[#f9abb9]/20", inter.variable)}>
        {children}
      </body>
    </html>
  )
}
