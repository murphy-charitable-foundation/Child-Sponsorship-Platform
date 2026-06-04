"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ClientProviders from "@/components/ClientProviders";

export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return <>{!isAdminRoute && <ClientProviders>{children}</ClientProviders>}</>;
}
