"use client";

import { useEffect, useState } from "react";
import CreateSponsorshipDrawer from "./CreateSponsorshipDrawer";
import SponsorshipFilter from "./SponsorshipFilter";
import { Sponsorship } from "./types";
import SponsorshipTable from "./SponsorshipTable";
import { KpiCard } from "../shared/KpiCard";

export default function SponsorshipsPage() {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [selectedLocation, setSelectedLocation] = useState("all");
	const [selectedFrequency, setSelectedFrequency] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [error, setError] = useState("");
	const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);

	const [awaitingCount, setAwaitingCount] = useState(0);

	useEffect(() => {
		async function fetchSponsorships() {
			try {
				const res = await fetch("/api/supabase/sponsorships");

				if (!res.ok) {
					setError("Failed to get sponsorships data");
					console.error("Error fetching sponsorships:", await res.text());
					return;
				}

				const { sponsorships: data } = await res.json();

				setSponsorships(data as Sponsorship[]);
			} catch (err) {
				console.error("Failed to fetch sponsorships:", err);
			}
		}

		fetchSponsorships();
	}, []);

	useEffect(() => {
		async function fetchAwaitingCount() {
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

				setAwaitingCount(childrenAwaitingSponsorship ?? 0);
			} catch (err) {
				console.error("Failed to fetch children awaiting sponsorship:", err);
			}
		}

		fetchAwaitingCount();
	}, []);

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
					value={awaitingCount}
				/>
			</div>

			{/* Filters */}
			<div className="mt-6">
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
			</div>

			{/* Table */}
			{error && (
				<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
					{error}
				</div>
			)}
			<SponsorshipTable data={filtered} />

			<CreateSponsorshipDrawer
				isOpen={isCreateOpen}
				onClose={() => setIsCreateOpen(false)}
			/>
		</div>
	);
}
