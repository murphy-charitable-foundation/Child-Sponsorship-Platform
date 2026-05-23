"use client";

import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { SponsorsFilter } from "./SponsorsFilter";
import { SponsorsTable } from "./SponsorsTable";
import { TabSelection } from "./TabSelection";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Sponsor {
	id: string;
	first_name: string;
	last_name: string;
	sponsor_type: string;
	notes?: string;
	active: boolean;
	photo_path?: string;
	image_url?: string;
}

const supabase = createClient();

export default function SponsorPage() {
	const [activeTab, setActiveTab] = useState<"individuals" | "groups">(
		"individuals",
	);
	const [sponsors, setSponsors] = useState<Sponsor[]>([]);
	const [filters, setFilters] = useState({
		search: "",
		status: "all",
		type: "all",
	});

	useEffect(() => {
		async function fetchSponsors() {
			try {
				const { data, error: sponsorsError } = await supabase
					.from("sponsors")
					.select("*");

				if (sponsorsError) {
					console.error("Error fetching sponsors:", sponsorsError);
					return;
				}

				if (!data || data.length === 0) {
					setSponsors([]);
					return;
				}

				setSponsors(data as Sponsor[]);

				const photoPaths: string[] = data
					.map((s) => s.photo_path)
					.filter((p): p is string => !!p);

				if (photoPaths.length === 0) return;

				const res = await fetch("/api/supabase/signed-url/sponsor", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ paths: photoPaths }),
				});

				if (!res.ok) return;

				const { signedUrls } = await res.json();

				setSponsors(
					data.map((sponsor) => ({
						...sponsor,
						image_url: sponsor.photo_path
							? signedUrls[sponsor.photo_path]
							: undefined,
					})) as Sponsor[],
				);
			} catch (err) {
				console.error("Failed to fetch sponsors:", err);
			}
		}
		fetchSponsors();
	}, []);

	const filteredSponsors = sponsors.filter((s) => {
		const isIndividual = s.sponsor_type === "individual";
		if (activeTab === "individuals" && !isIndividual) return false;
		if (activeTab === "groups" && isIndividual) return false;

		if (filters.search) {
			const q = filters.search.toLowerCase();
			const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
			if (!fullName.includes(q)) return false;
		}

		if (filters.status !== "all") {
			const shouldBeActive = filters.status === "active";
			if (s.active !== shouldBeActive) return false;
		}

		if (activeTab === "groups" && filters.type !== "all") {
			if (s.sponsor_type !== filters.type) return false;
		}

		return true;
	});

	return (
		<div className="space-y-8 w-full">
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-bold">Sponsors</h1>
			</div>

			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
				<KpiCard
					title="Active Sponsorships"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Unique Sponsors"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="sponsors Awaiting Sponsorship"
					subtitle="Need KPI visualization"
				/>
			</div>

			<TabSelection
				activeTab={activeTab}
				onTabChange={setActiveTab}
			/>

			<div className="space-y-6">
				<SponsorsFilter
					activeTab={activeTab}
					onSearchChange={(v) => setFilters((f) => ({ ...f, search: v }))}
					onStatusChange={(v) => setFilters((f) => ({ ...f, status: v }))}
					onTypeChange={(v) => setFilters((f) => ({ ...f, type: v }))}
					onResetFilters={() => setFilters({ search: "", status: "all", type: "all" })}
				/>
				<SponsorsTable
					activeTab={activeTab}
					rows={filteredSponsors}
					onSponsorUpdate={(updated) =>
						setSponsors((prev) =>
							prev.map((s) => (s.id === updated.id ? updated : s)),
						)
					}
				/>
			</div>
		</div>
	);
}
