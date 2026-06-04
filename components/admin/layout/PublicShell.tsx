"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ClientProviders from "@/components/ClientProviders";
import { HeroUIProvider } from "@heroui/react";

export default function PublicShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAdminRoute = pathname?.startsWith("/admin");

	if (isAdminRoute) {
		return <HeroUIProvider>{children}</HeroUIProvider>;
	}

	return <ClientProviders>{children}</ClientProviders>;
}
