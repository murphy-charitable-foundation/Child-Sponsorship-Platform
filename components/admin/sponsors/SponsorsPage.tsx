"use client";

import { useEffect, useRef, useState } from "react";
import { KpiCard } from "@/components/admin/shared/KpiCard";
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
import TablePagination from "../shared/TablePagination";

type Props = {
	activeSponsorships: number;
	childrenAwaitingSponsorship: number;
	initialSponsors: (SponsorTableData | SponsorGroupTableData)[];
};

export default function SponsorPage({
	activeSponsorships,
	childrenAwaitingSponsorship,
	initialSponsors,
}: Props) {
	const [activeTab, setActiveTab] = useState<"individuals" | "groups">(
		"individuals",
	);
	const [searchValue, setSearchValue] = useState("");
	const [locationValue, setLocationValue] = useState("all");
	const [statusValue, setStatusValue] = useState("all");
	const [typeValue, setTypeValue] = useState("all");
	const [error, setError] = useState<string | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [editSponsor, setEditSponsor] = useState<SponsorProfile | null>(null);
	const [sponsors, setSponsors] =
		useState<(SponsorTableData | SponsorGroupTableData)[]>(initialSponsors);
	const [selectedPageCapacity, setPageCapacity] = useState(10);
	const [page, setPage] = useState(1);

	const isGroupsTab = activeTab === "groups";
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

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

	useEffect(() => {
		setPage(1);
	}, [locationValue, statusValue, searchValue, typeValue]);

	const uniqueSponsors = sponsors.length ?? 0;

	const uniqueCountries = new Set(
		sponsors.map((s) => s.country).filter(Boolean),
	);

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
		const statusMatches =
			statusValue === "all" ||
			item.status?.toLowerCase() === statusValue.toLowerCase();

		// Type filter (for groups tab only)
		const typeMatches =
			!isGroupsTab ||
			typeValue === "all" ||
			(item as SponsorGroupTableData).sponsor_type.toLowerCase() ===
				typeValue.toLowerCase();

		return searchMatches && locationMatches && statusMatches && typeMatches;
	});

	const sorted = [...filtered].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
	);

	async function handleEdit(id: string) {
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

	function handleSponsorSaved(newData: SponsorProfile) {
		const sponsorType =
			newData.sponsor_type === "individual" ? "individual" : "groups";

		if (activeTab !== sponsorType) {
			setSponsors((prev) => prev.filter((s) => s.id !== newData.id));
			return;
		}

		const tableRow: SponsorTableData = {
			id: newData.id,
			first_name: newData.first_name,
			last_name: newData.last_name,
			country: newData.country,
			status: newData.status,
			sponsor_type: newData.sponsor_type,
			group_name: newData.group_name ?? undefined,
			created_at: newData.created_at,
		};

		setSponsors((prev) => {
			const exists = prev.some((c) => c.id === newData.id);

			if (!exists) {
				return [tableRow, ...prev];
			}

			return prev.map((c) => (c.id === newData.id ? tableRow : c));
		});
	}

	//Pagination//
	const totalPage = Math.max(
		1,
		Math.ceil(sorted.length / selectedPageCapacity),
	);
	const paginated = sorted.slice(
		(page - 1) * selectedPageCapacity,
		page * selectedPageCapacity,
	);

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
					value={activeSponsorships}
				/>
				<KpiCard
					title="Unique Sponsors"
					value={uniqueSponsors}
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					value={childrenAwaitingSponsorship}
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
					setSearchValue={setSearchValue}
					locationValue={locationValue}
					setLocationValue={setLocationValue}
					statusValue={statusValue}
					setStatusValue={setStatusValue}
					typeValue={typeValue}
					setTypeValue={setTypeValue}
					countries={uniqueCountries}
				/>

				{/* Table */}
				{error && (
					<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
						{error}
					</div>
				)}
				<SponsorsTable
					data={paginated}
					isGroupsTab={isGroupsTab}
					onEdit={handleEdit}
				/>

				<TablePagination
					page={page}
					onSetPage={setPage}
					totalPage={totalPage}
					selectedPageCapacity={selectedPageCapacity}
					onSetPageCapacity={setPageCapacity}
				/>
			</div>

			<AddSponsorDrawer
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
				onSaved={handleSponsorSaved}
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
