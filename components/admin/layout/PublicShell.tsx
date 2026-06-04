"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppNavbar } from "@/components/AppNavbar";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/auth");

  return (
    <>
      {!isAdminRoute && <AppNavbar />}

      {children}

      {!isAdminRoute && (
        <footer className="px-6 py-8 text-sm text-default-500">
          {/* move your existing footer JSX here */}
          © Murphy Charitable Foundation
        </footer>
      )}
    </>
  );
}
