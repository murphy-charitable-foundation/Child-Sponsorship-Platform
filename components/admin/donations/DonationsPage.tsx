"use client";

import { useEffect, useState } from "react";
import DonationDetailsDrawer from "./DonationDetailsDrawer";
import { Donation, DonationTableData } from "./types";
import DonationsFilters from "./DonationsFilters";
import DonationsTable from "./DonationsTable";
import { formatDate } from "../sponsorships/SponsorshipTable";
import { KpiCard } from "../shared/KpiCard";

//TODO:Donation and payments are not associated yet. which we need to do.
//For now get the donation values from 'payments table' we need to update api/supabase/donations when we modified

export default function DonationsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCountry, setSelectedCountry] = useState<Set<string>>(
		new Set(["all"]),
	);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [donations, setDonations] = useState<DonationTableData[]>([]);
	const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
		null,
	);

	useEffect(() => {
		setError(null);
		async function fetchDonations() {
			try {
				const res = await fetch(`/api/supabase/donations`);

				if (!res.ok) {
					setError("Failed to get donations data");
					console.error("Error fetching donations:", await res.text());
					return;
				}

				const { data } = await res.json();

				setDonations(data);
			} catch (err) {
				setError("Failed to get donations data");
				console.log("Failed to fetch donations:", err);
			}
		}
		fetchDonations();
	}, []);

	const filtered = donations.filter((d) => {
		const countryMatches =
			selectedCountry.has("all") ||
			selectedCountry.has(d.country?.toLowerCase() ?? "");
		const q = searchQuery.toLowerCase();
		const matchSearch =
			!q ||
			d.first_name.toLowerCase().includes(q) ||
			d.last_name.toLowerCase().includes(q);

		return matchSearch && countryMatches;
	});

	async function openDrawer(id: string) {
		console.log(id);
		const res = await fetch(`/api/supabase/donations/${id}`);

		if (!res.ok) {
			return;
		}

		const { data } = await res.json();

		setSelectedDonation(data);
		setDrawerOpen(true);
	}

	//kpi values//
	const now = new Date();
	const monthlyTotal = donations
		.filter((d) => {
			const dt = new Date(d.date_time);
			return (
				dt.getFullYear() === now.getFullYear() &&
				dt.getMonth() === now.getMonth() &&
				d.status.toUpperCase() === "COMPLETED"
			);
		})
		.reduce((sum, d) => sum + d.amount, 0);
	const formattedMonthlyTotal = `$${monthlyTotal.toLocaleString("en-US")}`;

	const yearlyTotal = donations
		.filter(
			(d) =>
				new Date(d.date_time).getFullYear() === now.getFullYear() &&
				d.status.toUpperCase() === "COMPLETED",
		)
		.reduce((sum, d) => sum + d.amount, 0);
	const formattedYearlyTotal = `$${yearlyTotal.toLocaleString("en-US")}`;

	return (
		<div>
			{/* Header */}
			<h1 className="text-2xl font-semibold text-primary">Donations</h1>

			{/* Two-column layout: table left, recent activity right */}
			<div className="grid grid-cols-3 gap-10">
				{/* Left — kpi + filters + table */}
				<div className="col-span-2">
					{/* KPI cards */}
					<div className="mt-6 grid grid-cols-2 gap-10">
						<KpiCard
							title="Monthly Donations"
							value={formattedMonthlyTotal}
						/>
						<KpiCard
							title="Total Raised this Year"
							value={formattedYearlyTotal}
						/>
					</div>

					<div className="min-w-0 flex-1 mt-6 ">
						{/* Filters */}
						<DonationsFilters
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							selectedCountry={selectedCountry}
							setSelectedCountry={setSelectedCountry}
						/>

						{/* Table */}
						{error && (
							<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
								{error}
							</div>
						)}

						<DonationsTable
							data={filtered}
							onView={openDrawer}
						/>
					</div>
				</div>

				{/* Right — Recent Activity */}
				<div className="mt-6 self-start">
					<div className="rounded-xl border border-slate-200 bg-white">
						<div className="border-b border-slate-100 px-4 py-3">
							<h2 className="text-sm font-semibold text-slate-800">
								Recent Activity
							</h2>
						</div>
						<ul className="divide-y divide-slate-100">
							{donations.slice(0, 10).map((d) => (
								<li key={d.id}>
									<button
										onClick={() => openDrawer(d.id)}
										className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors"
									>
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-slate-800">
												{d.first_name} {d.last_name}
											</span>
											<span className="text-sm font-semibold text-primary">
												{d.amount}
											</span>
										</div>
										<div className="mt-0.5 flex items-center justify-between">
											<span className="text-xs text-slate-400">
												{d.purpose}
											</span>
											<span className="text-xs text-slate-400">
												{formatDate(d.date_time)}
											</span>
										</div>
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<DonationDetailsDrawer
				donation={selectedDonation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>
		</div>
	);
}
