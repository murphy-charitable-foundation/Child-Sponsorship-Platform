"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KpiCard } from "@/components/admin/shared/KpiCard";
import ChildrenFilters from "@/components/admin/children/ChildrenFilters";
import ChildrenTable from "@/components/admin/children/ChildrenTable";
import { ChildProfile, ChildTableData } from "./types";
import EditChildDrawer from "./EditChildDrawer";

export default function ChildrenPage() {
	const [selectedStatus, setSelectedStatus] = useState<Set<string>>(
		new Set(["all"]),
	);
	const [selectedGender, setSelectedGender] = useState<Set<string>>(
		new Set(["all"]),
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [children, setChildren] = useState<ChildTableData[]>([]);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editChild, setEditChild] = useState<ChildProfile | null>(null);
	const [activeSponsorships, setActiveSponsorships] = useState(0);
	const [childrenAwaitingSponsorship, setChildrenAwaitingSponsorship] =
		useState(0);

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

	useEffect(() => {
		async function fetchActiveSponsorships() {
			try {
				const res = await fetch("/api/supabase/sponsorships/active-count");

				if (!res.ok) {
					console.error(
						"Error fetching active sponsorships:",
						await res.text(),
					);
					return;
				}

				const { activeSponsorships } = await res.json();

				setActiveSponsorships(activeSponsorships ?? 0);
			} catch (err) {
				console.error("Failed to fetch active sponsorships:", err);
			}
		}

		fetchActiveSponsorships();
	}, []);

	useEffect(() => {
		async function fetchChildrenAwaitingSponsorship() {
			try {
				const res = await fetch("/api/supabase/children/awaiting-count");

				if (!res.ok) {
					console.error(
						"Error fetching children awaiting sponsorship:",
						await res.text(),
					);
					return;
				}

				const { childrenAwaitingSponsorship } = await res.json();

				setChildrenAwaitingSponsorship(childrenAwaitingSponsorship ?? 0);
			} catch (err) {
				console.error("Failed to fetch children awaiting sponsorship:", err);
			}
		}

		fetchChildrenAwaitingSponsorship();
	}, []);

	// Filter rows based on selection
	const filtered = children.filter((c) => {
		// Status filter
		const statusMatches =
			selectedStatus.has("all") || selectedStatus.has(c.status.toLowerCase());

		// Gender filter
		const genderMatches =
			selectedGender.has("all") || selectedGender.has(c.gender.toLowerCase());

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
					value="Need KPI visualization"
				/>
				<KpiCard
					title="Active Sponsorships"
					value={activeSponsorships}
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					value={childrenAwaitingSponsorship}
				/>
			</div>

			{/* Filters */}
			<div className="mt-10">
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
					<div className="my-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
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
