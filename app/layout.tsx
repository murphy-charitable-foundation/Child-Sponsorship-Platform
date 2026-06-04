import "./globals.css";
//import type { Metadata } from "next";

import { Suspense } from "react";
import { Geist } from "next/font/google";
import PublicShell from "@/components/admin/layout/PublicShell";

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
                <Suspense><PublicShell>{children}</PublicShell></Suspense>

        
      </body>
    </html>
  );
}
