import "./globals.css";
import type { Metadata } from "next";
import RootLayout from "@/components/root-layout";


const defaultUrl = "https://murphy-child-sponsorship-platform.netlify.app/";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Child Sponsorship System",
  description: "Sponsor a child and change a life.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>{children}</RootLayout>
  );
}

