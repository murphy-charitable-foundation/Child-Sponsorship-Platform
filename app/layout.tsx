import "./globals.css";
//import type { Metadata } from "next";

import { Geist } from "next/font/google";
import PublicShell from "@/components/admin/layout/PublicShell";
import { AuthProvider } from "@/components/AuthProvider";
import { Suspense } from "react";

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
        <Suspense fallback={null}>

        <AuthProvider>
          <PublicShell>{children}</PublicShell>
        </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
