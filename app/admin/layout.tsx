// app/admin/layout.tsx
import React from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen bg-zinc-50 overflow-hidden">
			<div className="flex h-full">
				<AdminSidebar />

				<div className="flex-1 overflow-auto px-10 py-10">{children}</div>
			</div>
		</div>
	);
}
