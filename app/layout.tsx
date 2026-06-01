import "./globals.css";
//import type { Metadata } from "next";

import { Suspense } from "react";
import { Geist } from "next/font/google";
import PublicShell from "@/components/admin/layout/PublicShell";
import { AuthProvider } from "@/components/AuthProvider";
import { UserProfileProvider } from "@/components/UserProfileContext";

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
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${geistSans.className} antialiased`}>
				<AuthProvider>
					<UserProfileProvider>
						<Suspense>
							<PublicShell>{children}</PublicShell>
						</Suspense>
					</UserProfileProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
