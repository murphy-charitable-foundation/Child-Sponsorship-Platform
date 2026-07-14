"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import ChildrenFilters from "@/components/admin/children/ChildrenFilters";
import ChildrenTable from "@/components/admin/children/ChildrenTable";
import { ChildProfile, ChildTableData } from "./types";
import EditChildDrawer from "./EditChildDrawer";

export default function ChildrenPage() {
	const [selectedStatus, setSelectedStatus] = useState<Set<string>>(
		new Set(["all"]),
	);
	const [selectedGender, setSelectedGender] = useState<Set<string>>(new Set());
	const [searchQuery, setSearchQuery] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [children, setChildren] = useState<ChildTableData[]>([]);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editChild, setEditChild] = useState<ChildProfile | null>(null);

	useEffect(() => {
		setError(null);
		async function fetchChildren() {
			try {
				const res = await fetch(`/api/supabase/children`);

				if (!res.ok) {
					setError("Failed to get children data");
					console.error("Error fetching children:", await res.text());
					return;
				}

				const { children: data } = await res.json();

				setChildren(data);
			} catch (err) {
				setError("Failed to get children data");
				console.log("Failed to fetch children:", err);
			}
		}
		fetchChildren();
	}, []);

	// Filter rows based on selection
	const filtered = children.filter((c) => {
		// Status filter
		const statusMatches =
			selectedStatus.has("all") || selectedStatus.has(c.status.toLowerCase());

		// Gender filter
		const genderMatches =
			selectedGender.size === 0 || selectedGender.has(c.gender.toLowerCase());

		// Search filter
		const searchMatches =
			!searchQuery ||
			c.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.last_name.toLowerCase().includes(searchQuery.toLowerCase());

		return statusMatches && genderMatches && searchMatches;
	});

	async function openEdit(id: string) {
		const res = await fetch(`/api/supabase/children/${id}`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		const { child } = await res.json();

		setEditChild(child);
		setIsEditOpen(true);
	}

	function handleChildSaved(updated: ChildProfile) {
		setChildren((prev) =>
			prev.map((c) =>
				c.id === updated.id
					? {
							...c,
							first_name: updated.first_name,
							last_name: updated.last_name,
							age: updated.age,
							gender: updated.gender,
							location: updated.location,
							status: updated.status,
						}
					: c,
			),
		);
	}

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

				{/* Table */}
				{error && (
					<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
						{error}
					</div>
				)}
				<ChildrenTable
					data={filtered}
					onEdit={openEdit}
				/>
			</div>

			<EditChildDrawer
				child={editChild}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleChildSaved}
			/>
		</div>
	);
}
