import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { Geist } from "next/font/google";

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
        <ClientProviders>{children}</ClientProviders>
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
