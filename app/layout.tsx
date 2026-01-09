import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { Geist } from "next/font/google";

const defaultUrl = "https://murphy-child-sponsorship-platform.netlify.app/";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Child Sponsorship System",
  description: "Sponsor a child and change a life.",
};

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

