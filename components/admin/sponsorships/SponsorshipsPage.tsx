"use client";

import { useEffect, useState } from "react";
import CreateSponsorshipDrawer from "./CreateSponsorshipDrawer";
import SponsorshipFilter from "./SponsorshipFilter";
import { Sponsorship } from "./types";
import SponsorshipTable from "./SponsorshipTable";
import { KpiCard } from "../shared/KpiCard";
import TablePagination from "../shared/TablePagination";
import EditSponsorshipDrawer from "./EditSponsorshipDrawer";

type Props = {
	childrenAwaitingSponsorship: number;
	initialSponsorships: Sponsorship[];
};

export default function SponsorshipsPage({
	childrenAwaitingSponsorship,
	initialSponsorships,
}: Props) {
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [selectedLocation, setSelectedLocation] = useState("all");
	const [selectedFrequency, setSelectedFrequency] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sponsorships, setSponsorships] =
		useState<Sponsorship[]>(initialSponsorships);

	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editSponsorship, setEditSponsorship] = useState<Sponsorship | null>(
		null,
	);
	const [selectedPageCapacity, setPageCapacity] = useState(10);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [selectedStatus, selectedFrequency, selectedLocation]);

	const activeCount = sponsorships.filter((s) => s.status === "Active").length;
	const uniqueSponsors = new Set(sponsorships.map((s) => s.sponsor_name)).size;

	const filtered = sponsorships.filter((s) => {
		const statusMatches =
			selectedStatus === "all" ||
			s.status.toLowerCase() === selectedStatus.toLowerCase();

		const locationMatches =
			selectedLocation === "all" ||
			selectedLocation.toLowerCase() === s.child_location.toLowerCase();

		const frequencyMatches =
			selectedFrequency === "all" ||
			selectedFrequency.toLowerCase() === s.frequency.toLowerCase();

		const q = searchQuery.toLowerCase();
		const searchMatches =
			!q ||
			s.sponsor_name.toLowerCase().includes(q) ||
			s.child_name.toLowerCase().includes(q);

		return (
			statusMatches && locationMatches && frequencyMatches && searchMatches
		);
	});

	async function fetchSponsorships() {
		try {
			const res = await fetch(`/api/supabase/sponsorships`);

			if (!res.ok) {
				setSponsorships([]);
				return;
			}

			const { sponsorships } = await res.json();
			setSponsorships(sponsorships ?? []);
		} catch {
			setSponsorships([]);
		}
	}

	async function handleEdit(id: string) {
		const res = await fetch(`/api/supabase/sponsorships/${id}`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		const { sponsorship } = await res.json();

		setEditSponsorship(sponsorship);
		setIsEditOpen(true);
	}

	//Pagination//
	const totalPage = Math.max(
		1,
		Math.ceil(filtered.length / selectedPageCapacity),
	);
	const paginated = filtered.slice(
		(page - 1) * selectedPageCapacity,
		page * selectedPageCapacity,
	);

	return (
		<div>
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-primary">Sponsorships</h1>
				<button
					onClick={() => setIsCreateOpen(true)}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Create Sponsorship
				</button>
			</div>

			{/* KPI cards */}
			<div className="mt-6 grid grid-cols-3 gap-10">
				<KpiCard
					title="Active Sponsorships"
					value={activeCount}
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

			{/* Filters */}
			<div className="mt-10">
				<SponsorshipFilter
					selectedStatus={selectedStatus}
					setSelectedStatus={setSelectedStatus}
					selectedLocation={selectedLocation}
					setSelectedLocation={setSelectedLocation}
					selectedFrequency={selectedFrequency}
					setSelectedFrequency={setSelectedFrequency}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>

				{/* Table */}
				<SponsorshipTable
					data={paginated}
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

			<CreateSponsorshipDrawer
				isOpen={isCreateOpen}
				onClose={() => setIsCreateOpen(false)}
				onSaved={fetchSponsorships}
			/>

			<EditSponsorshipDrawer
				sponsorship={editSponsorship}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={fetchSponsorships}
			/>
		</div>
	);
}
