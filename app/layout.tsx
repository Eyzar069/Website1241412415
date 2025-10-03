import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PasswordProtection } from "@/components/password-protection"

export const metadata: Metadata = {
  title: "MR. Phone - Elektronik verkaufen zum fairen Preis",
  description:
    "Verkaufen Sie Ihre gebrauchten Smartphones, Tablets, Laptops und mehr. Sofortiges Angebot, kostenloser Versand, schnelle Auszahlung.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <SiteHeader />
        <PasswordProtection>
          <main>{children}</main>
        </PasswordProtection>
        <SiteFooter />
      </body>
    </html>
  )
}
