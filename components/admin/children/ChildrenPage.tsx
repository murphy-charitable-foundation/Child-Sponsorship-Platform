"use client";

import { useState } from "react";
import Link from "next/link";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import ChildrenFilters from "@/components/admin/children/ChildrenFilters";
import ChildrenTable from "@/components/admin/children/ChildrenTable";

export default function ChildrenPage() {
	const [selectedStatus, setSelectedStatus] = useState<Set<string>>(
		new Set(["all"]),
	);
	const [selectedGender, setSelectedGender] = useState<Set<string>>(new Set());
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div>
			{/* header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-primary">Children</h1>
				<Link
					href="/admin/children/add"
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Add Child
				</Link>
			</div>

			{/* KPI */}
			<div className="mt-6 grid grid-cols-3 gap-10">
				<KpiCard
					title="Children in Program"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Active Sponsorships"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					subtitle="Need KPI visualization"
				/>
			</div>

			{/* Filters */}
			<div className="mt-6">
				<ChildrenFilters
					selectedStatus={selectedStatus}
					setSelectedStatus={setSelectedStatus}
					selectedGender={selectedGender}
					setSelectedGender={setSelectedGender}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
			</div>

			{/* Table */}
			<ChildrenTable
				selectedStatus={selectedStatus}
				selectedGender={selectedGender}
				searchQuery={searchQuery}
			/>
		</div>
	);
}
