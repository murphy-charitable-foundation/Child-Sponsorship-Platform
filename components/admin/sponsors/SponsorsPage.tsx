"use client";

import { useEffect, useState } from "react";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { SponsorsFilter } from "./SponsorsFilter";

import { TabSelection } from "./TabSelection";
import AddSponsorDrawer from "./AddSponsorDrawer";
import { SponsorsTable } from "./SponsorsTable";
import {
	SponsorGroupTableData,
	SponsorProfile,
	SponsorTableData,
} from "./types";
import EditSponsorDrawer from "./EditSponsorDrawer";

export default function SponsorPage() {
	const [activeTab, setActiveTab] = useState<"individuals" | "groups">(
		"individuals",
	);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [locationValue, setLocationValue] = useState("all");
	const [statusValue, setStatusValue] = useState("all");
	const [typeValue, setTypeValue] = useState("all");
	const [error, setError] = useState<string | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editSponsor, setEditSponsor] = useState<SponsorProfile | null>(null);
	const [sponsors, setSponsors] = useState<
		(SponsorTableData | SponsorGroupTableData)[]
	>([]);

	const isGroupsTab = activeTab === "groups";

	useEffect(() => {
		async function fetchSponsors() {
			try {
				const res = await fetch(
					`/api/supabase/sponsors?tab=${isGroupsTab ? "groups" : "individuals"}`,
				);

				if (!res.ok) {
					setError("Failed to get sponsors data");
					console.error("Error fetching sponsors:", await res.text());
					return;
				}

				const { sponsors: data } = await res.json();

				setSponsors(data as (SponsorTableData | SponsorGroupTableData)[]);
			} catch (err) {
				console.error("Failed to fetch sponsors:", err);
			}
		}

		fetchSponsors();
	}, [isGroupsTab]);

	const filtered = sponsors.filter((item) => {
		// Search filter
		const searchMatches = isGroupsTab
			? !searchValue ||
				(item as SponsorGroupTableData).group_name
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			: !searchValue ||
				(item as SponsorTableData).first_name
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				(item as SponsorTableData).last_name
					.toLowerCase()
					.includes(searchValue.toLowerCase());

		// Location filter
		const locationMatches =
			locationValue === "all" ||
			item.country?.toLowerCase() === locationValue.toLowerCase();

		// Status filter
		const statusMatches = statusValue === "all" || item.status === statusValue;

		// Type filter (for groups tab only)
		const typeMatches =
			!isGroupsTab ||
			typeValue === "all" ||
			(item as SponsorGroupTableData).sponsor_type.toLowerCase() ===
				typeValue.toLowerCase();

		return searchMatches && locationMatches && statusMatches && typeMatches;
	});

	async function openEdit(id: string) {
		const res = await fetch(`/api/supabase/sponsors/${id}`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		const { sponsor } = await res.json();

		setEditSponsor(sponsor);
		setIsEditOpen(true);
	}

	function handleSponsorSaved(updated: SponsorProfile) {
		setSponsors((prev) =>
			prev.map((c) =>
				c.id === updated.id
					? {
							...c,
							first_name: updated.first_name,
							last_name: updated.last_name,
							sponsor_type: updated.sponsor_type,
							group_name: updated.group_name ?? c.group_name,
							country: updated.country,
						}
					: c,
			),
		);
	}
	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-primary">Sponsors</h1>
				<button
					onClick={() => setIsAddOpen(true)}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Add Sponsor
				</button>
			</div>

			<div className="mt-6 grid w-full grid-cols-3 gap-10">
				<KpiCard
					title="Active Sponsorships"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Unique Sponsors"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					subtitle="Need KPI visualization"
				/>
			</div>

			<div className="mt-6">
				<TabSelection
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
			</div>

			<div className="mt-6">
				<SponsorsFilter
					activeTab={activeTab}
					searchValue={searchValue}
					onSearchChange={setSearchValue}
					locationValue={locationValue}
					onLocationChange={setLocationValue}
					statusValue={statusValue}
					onStatusChange={setStatusValue}
					typeValue={typeValue}
					onTypeChange={setTypeValue}
					onResetFilters={() => {
						setSearchValue("");
						setLocationValue("all");
						setStatusValue("all");
						setTypeValue("all");
					}}
				/>

				{/* Table */}
				{error && (
					<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
						{error}
					</div>
				)}
				<SponsorsTable
					data={filtered}
					isGroupsTab={isGroupsTab}
					onEdit={openEdit}
				/>
			</div>

			<AddSponsorDrawer
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
			/>

			<EditSponsorDrawer
				sponsor={editSponsor}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleSponsorSaved}
			/>
		</div>
	);
}
