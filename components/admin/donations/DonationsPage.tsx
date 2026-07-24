"use client";

import { useEffect, useState } from "react";
import { DonationTableData } from "./types";
import { KpiCard } from "../shared/KpiCard";
import TablePagination from "../shared/TablePagination";
import { ActivityPlaceholder } from "../dashboard/ActivityPlaceholder";
import DonorsFilters from "./DonorsFilters";
import DonorsTable from "./DonorsTable";

type Props = {
	donations: DonationTableData[];
	error: string | null;
};

export default function DonationsPage({ donations, error }: Props) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("all");
	const [selectedPurpose, setSelectedPurpose] = useState("all");
	const [selectedPageCapacity, setPageCapacity] = useState(10);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [selectedCountry, searchQuery]);

	const filtered = donations.filter((d) => {
		const countryMatches =
			selectedCountry === "all" ||
			selectedCountry.toLowerCase() === d.country?.toLowerCase();

		const purposeMatches =
			selectedPurpose === "all" ||
			selectedPurpose.toLowerCase() === d.purpose?.toLowerCase();

		const q = searchQuery.toLowerCase();
		const matchSearch =
			!q ||
			d.first_name.toLowerCase().includes(q) ||
			d.last_name.toLowerCase().includes(q);

		return matchSearch && countryMatches && purposeMatches;
	});

	const uniqueCountries = new Set(
		donations.map((s) => s.country).filter(Boolean),
	);

	const uniquePurposes = new Set(
		donations.map((s) => s.purpose).filter(Boolean),
	);

	//kpi values//
	const now = new Date();
	const monthlyTotal = donations
		.filter((d) => {
			const dt = new Date(d.date_time);
			return (
				dt.getFullYear() === now.getFullYear() &&
				dt.getMonth() === now.getMonth()
			);
		})
		.reduce((sum, d) => sum + d.amount, 0);
	const formattedMonthlyTotal = `$${monthlyTotal.toLocaleString("en-US")}`;

	const yearlyTotal = donations
		.filter((d) => new Date(d.date_time).getFullYear() === now.getFullYear())
		.reduce((sum, d) => sum + d.amount, 0);
	const formattedYearlyTotal = `$${yearlyTotal.toLocaleString("en-US")}`;

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
			<h1 className="text-2xl font-semibold text-primary">Donors</h1>

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
				<DonorsFilters
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
					selectedPurpose={selectedPurpose}
					setSelectedPurpose={setSelectedPurpose}
					countries={uniqueCountries}
					purposes={uniquePurposes}
				/>

				{/* Two-column layout: table left, recent activity right */}
				<div className="grid grid-cols-3 gap-10">
					<div className="col-span-2">
						{/* Table */}
						{error && (
							<div className="my-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
								{error}
							</div>
						)}
						<DonorsTable data={paginated} />
						<TablePagination
							page={page}
							onSetPage={setPage}
							totalPage={totalPage}
							selectedPageCapacity={selectedPageCapacity}
							onSetPageCapacity={setPageCapacity}
						/>
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
								<ActivityPlaceholder />
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
