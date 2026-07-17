import "./globals.css";

import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import PublicShell from "@/components/admin/layout/PublicShell";
import { AuthProvider } from "@/components/AuthProvider";
import { Suspense } from "react";
import { UserProfileProvider } from "@/components/UserProfileContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Murphy Charity Foundation Uganda | Child Sponsorship",
    template: "%s | Murphy Charity Foundation Uganda",
  },

  description:
    "Murphy Charity Foundation Uganda is a non-profit organisation supporting vulnerable communities through child sponsorship, education, healthcare, and sustainable development projects.",

  keywords: [
    "Murphy Charity Foundation Uganda",
    "Child Sponsorship Uganda",
    "Sponsor a Child",
    "Children Education Support",
    "Community Development Uganda",
    "Healthcare Support Uganda",
    "Donation",
    "Charity Uganda",
    "Non Profit Organisation Uganda",
  ],

  icons: {
    icon: "/logo.ico",
  },

  openGraph: {
    title: "Murphy Charity Foundation Uganda | Child Sponsorship",
    description:
      "Supporting vulnerable communities through education, healthcare, child sponsorship, and sustainable development projects.",
    type: "website",
    images: [
      {
        url: "/children/logo.png",
        width: 400,
        height: 400,
        alt: "Murphy Charity Logo",
      },
    ],
  },
};
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
