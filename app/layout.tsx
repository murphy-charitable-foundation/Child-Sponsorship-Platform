"use client";

import { Geist } from "next/font/google";
import Link from "next/link";
import { HeroUIProvider } from "@heroui/react";
import "./globals.css";
import React from "react";
import { AppNavbar } from "@/components/AppNavbar";

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
          <AppNavbar />
          {children}
          <footer className="bg-primary text-white py-12 px-10">
            <div style={footerStyles.inner}>
              <div style={footerStyles.left}>
                <h3 style={footerStyles.orgTitle}>
                  MURPHY CHARITABLE FOUNDATION
                  <br />
                  UGANDA
                </h3>
                <p style={footerStyles.orgText}>
                  REGISTERED UNDER THE UGANDA NATIONAL NGO BUREAU
                </p>
                <p style={footerStyles.orgText}>Number: INDR163215654NB</p>
                <p style={footerStyles.orgText}>Permit Number: INDP0005654NB</p>

                <div style={footerStyles.badgesRow}>
                  <div className="bg-primary border-2 border-white rounded-full w-20 h-20 flex items-center justify-center text-[0.7rem]">
                    Badge 1
                  </div>
                  <div className="bg-primary border-2 border-white rounded-full w-20 h-20 flex items-center justify-center text-[0.7rem]">
                    Badge 2
                  </div>
                </div>
              </div>

              <div style={footerStyles.middle}>
                <h4 style={footerStyles.columnTitle}>About</h4>
                <Link href="/privacy" style={footerStyles.link}>
                  Privacy Policy
                </Link>
                <Link href="/terms" style={footerStyles.link}>
                  Terms of Use
                </Link>
                <Link href="/contact" style={footerStyles.link}>
                  Contact
                </Link>
              </div>

              <div style={footerStyles.right}>
                <h4 style={footerStyles.columnTitle}>Follow Us</h4>
                <div style={footerStyles.socialRow}>
                  <span style={footerStyles.socialIcon}>in</span>
                  <span style={footerStyles.socialIcon}>f</span>
                  <span style={footerStyles.socialIcon}>▶</span>
                </div>

                <div style={footerStyles.searchRow}>
                  <input
                    type="text"
                    placeholder="Search for..."
                    style={footerStyles.searchInput}
                  />
                  <button className="bg-primary text-white px-4 rounded-r-full cursor-pointer">
                    🔍
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </HeroUIProvider>
      </body>
    </html>
  );
}

const footerStyles: { [key: string]: React.CSSProperties } = {
  footer: {
    color: "bg-white",
    padding: "48px 40px",
  },
  inner: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "flex",
    gap: "64px",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  left: {
    flex: 2,
  },
  orgTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "12px",
  },
  orgText: {
    margin: "2px 0",
    fontSize: "0.85rem",
    opacity: 0.9,
  },
  badgesRow: {
    display: "flex",
    gap: "16px",
    marginTop: "20px",
  },
  badgePlaceholder: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    border: "border-2 border-white",
  },
  middle: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  columnTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "12px",
  },
  link: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    fontSize: "0.9rem",
    marginBottom: "8px",
  },
  socialRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  socialIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "999px",
    border: "border border-white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
  },
  searchRow: {
    display: "flex",
    marginTop: "8px",
  },
  searchInput: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "999px 0 0 999px",
    border: "none",
    fontSize: "0.85rem",
  },
  searchButton: {
    padding: "8px 14px",
    borderRadius: "0 999px 999px 0",
    border: "none",

    color: "inherit",
    cursor: "pointer",
  },
};
