'use client'

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import "./globals.css";
import React from "react";

const COPYRIGHT_YEAR = new Date().getFullYear();

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

/*export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Child Sponsorship System",
  description: "Sponsor a child and change a life.",
};*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <HeroUIProvider>
          {children}
          <footer style={footerStyles}>
          <span style={copyStyles}>
            © {COPYRIGHT_YEAR} Child Sponsorship System
          </span>
          <div style={linksWrapperStyles}>
            <a href="/terms" style={linkStyles}>
              Terms of Use
            </a>
            <a href="/privacy" style={linkStyles}>
              Privacy Policy
            </a>
          </div>
        </footer>
        </HeroUIProvider>
      </body>
    </html>
  );
}

const footerStyles: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  padding: "12px 40px",
  fontSize: "0.9rem",
  color: "#6b7280",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const copyStyles: React.CSSProperties = {
  color: "#060606ff",
};

const linksWrapperStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const linkStyles: React.CSSProperties = {
  textDecoration: "none",
  color: "#060606ff",
  marginLeft: "16px", 
};
