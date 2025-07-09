import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vishnu&nbsp;Vardhan · Portfolio",
  description: "Personal portfolio of Vishnu Vardhan Divithi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* apply the Inter font across the site */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
