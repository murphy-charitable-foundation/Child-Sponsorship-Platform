"use client";

import { useState } from "react";
import Link from "next/link";
import { Chip } from "@heroui/react";
// import CreateSponsorshipDrawer from "./CreateSponsorshipDrawer";

type Sponsorship = {
	id: string;
	sponsorName: string;
	childName: string;
	childLocation: string;
	amount: string;
	frequency: "Monthly" | "One-time" | "Annual";
	status: "Active" | "Inactive";
	startDate: string;
	endDate: string | null;
};

const sponsorships: Sponsorship[] = [
	{
		id: "1",
		sponsorName: "Amanda Thomas",
		childName: "Faith Babirye",
		childLocation: "Uganda",
		amount: "$75",
		frequency: "Monthly",
		status: "Active",
		startDate: "2024-03-20",
		endDate: null,
	},
	{
		id: "2",
		sponsorName: "Amanda Thomas",
		childName: "Agnes Namubuga",
		childLocation: "Uganda",
		amount: "$250",
		frequency: "One-time",
		status: "Active",
		startDate: "2024-11-01",
		endDate: null,
	},
	{
		id: "3",
		sponsorName: "Christopher White",
		childName: "Joy Nakalembe",
		childLocation: "Uganda",
		amount: "$600",
		frequency: "Annual",
		status: "Active",
		startDate: "2023-11-11",
		endDate: null,
	},
	{
		id: "4",
		sponsorName: "Community Foundation",
		childName: "Brian Catered",
		childLocation: "Uganda",
		amount: "$1000",
		frequency: "Monthly",
		status: "Active",
		startDate: "2021-06-15",
		endDate: null,
	},
	{
		id: "5",
		sponsorName: "David Taylor",
		childName: "Peter Oleno",
		childLocation: "Uganda",
		amount: "$50",
		frequency: "Monthly",
		status: "Inactive",
		startDate: "2023-02-15",
		endDate: "2024-08-15",
	},
	{
		id: "6",
		sponsorName: "Emily Brown",
		childName: "Grace Namugga",
		childLocation: "Uganda",
		amount: "$75",
		frequency: "Monthly",
		status: "Active",
		startDate: "2022-11-10",
		endDate: null,
	},
	{
		id: "7",
		sponsorName: "Emily Brown",
		childName: "Samuel Okaito",
		childLocation: "Uganda",
		amount: "$75",
		frequency: "Monthly",
		status: "Active",
		startDate: "2022-11-10",
		endDate: null,
	},
	{
		id: "8",
		sponsorName: "Rotary Club Downtown",
		childName: "Stella Nabirye",
		childLocation: "Uganda",
		amount: "$750",
		frequency: "Monthly",
		status: "Active",
		startDate: "2023-02-18",
		endDate: null,
	},
	{
		id: "9",
		sponsorName: "Sarah Johnson",
		childName: "Aisha Nakato",
		childLocation: "Uganda",
		amount: "$50",
		frequency: "Monthly",
		status: "Active",
		startDate: "2023-01-15",
		endDate: null,
	},
	{
		id: "10",
		sponsorName: "St Mary's Church",
		childName: "David Waiswa",
		childLocation: "Uganda",
		amount: "$500",
		frequency: "Monthly",
		status: "Active",
		startDate: "2022-01-10",
		endDate: "2027-01-10",
	},
];

const LOCATIONS = ["All locations", "Uganda", "Kenya", "Tanzania", "Rwanda"];
const FREQUENCIES = ["All frequencies", "Monthly", "One-time", "Annual"];
const STATUSES = ["All statuses", "Active", "Inactive"];

const activeCount = sponsorships.filter((s) => s.status === "Active").length;
const uniqueSponsors = new Set(sponsorships.map((s) => s.sponsorName)).size;
const awaitingCount = 3; // placeholder

export default function SponsorshipsPage() {
	// const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [location, setLocation] = useState("All locations");
	const [frequency, setFrequency] = useState("All frequencies");
	const [status, setStatus] = useState("All statuses");

	const filtered = sponsorships.filter((s) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			s.sponsorName.toLowerCase().includes(q) ||
			s.childName.toLowerCase().includes(q);
		const matchLocation =
			location === "All locations" || s.childLocation === location;
		const matchFrequency =
			frequency === "All frequencies" || s.frequency === frequency;
		const matchStatus = status === "All statuses" || s.status === status;
		return matchSearch && matchLocation && matchFrequency && matchStatus;
	});

	function reset() {
		setSearch("");
		setLocation("All locations");
		setFrequency("All frequencies");
		setStatus("All statuses");
	}

	return (
		<div className="px-10 py-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-primary">Sponsorships</h1>
				<button
					// onClick={() => setIsCreateOpen(true)}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Create Sponsorship
				</button>
			</div>

			{/* KPI cards */}
			<div className="mt-6 grid grid-cols-3 gap-4">
				<KpiCard
					label="Active Sponsorships"
					value={activeCount}
				/>
				<KpiCard
					label="Unique Sponsors"
					value={uniqueSponsors}
				/>
				<KpiCard
					label="Children Awaiting Sponsorship"
					value={awaitingCount}
				/>
			</div>

			{/* Filters */}
			<div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
				<div className="flex flex-wrap items-end gap-3">
					<div className="flex-1 min-w-[180px]">
						<label className="mb-1 block text-xs text-slate-500">Search</label>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search for sponsor or child"
							className={inputCls}
						/>
					</div>
					<div className="w-40">
						<label className="mb-1 block text-xs text-slate-500">
							Child Location
						</label>
						<select
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							className={inputCls}
						>
							{LOCATIONS.map((l) => (
								<option key={l}>{l}</option>
							))}
						</select>
					</div>
					<div className="w-40">
						<label className="mb-1 block text-xs text-slate-500">
							Frequency
						</label>
						<select
							value={frequency}
							onChange={(e) => setFrequency(e.target.value)}
							className={inputCls}
						>
							{FREQUENCIES.map((f) => (
								<option key={f}>{f}</option>
							))}
						</select>
					</div>
					<div className="w-36">
						<label className="mb-1 block text-xs text-slate-500">Status</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className={inputCls}
						>
							{STATUSES.map((s) => (
								<option key={s}>{s}</option>
							))}
						</select>
					</div>
					<button
						onClick={reset}
						className="pb-1 text-sm text-primary hover:underline"
					>
						Reset filters
					</button>
				</div>
			</div>

			{/* Table */}
			<div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-slate-200 bg-slate-50">
							{[
								"Sponsor Name",
								"Child Name",
								"Child Location",
								"Amount",
								"Frequency",
								"Status",
								"Start Date",
								"End Date",
								"Actions",
							].map((h) => (
								<th
									key={h}
									className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{filtered.length === 0 ? (
							<tr>
								<td
									colSpan={9}
									className="px-4 py-8 text-center text-slate-400"
								>
									No sponsorships match the current filters.
								</td>
							</tr>
						) : (
							filtered.map((s) => (
								<tr
									key={s.id}
									className="hover:bg-slate-50"
								>
									<td className="px-4 py-3 text-slate-800">{s.sponsorName}</td>
									<td className="px-4 py-3 text-slate-800">{s.childName}</td>
									<td className="px-4 py-3 text-slate-600">
										{s.childLocation}
									</td>
									<td className="px-4 py-3 text-slate-800">{s.amount}</td>
									<td className="px-4 py-3 text-slate-600">{s.frequency}</td>
									<td className="px-4 py-3">
										<Chip
											size="sm"
											variant="flat"
											color={s.status === "Active" ? "success" : "default"}
											className="px-2"
										>
											{s.status}
										</Chip>
									</td>
									<td className="px-4 py-3 text-slate-600">{s.startDate}</td>
									<td className="px-4 py-3 text-slate-600">
										{s.endDate ?? "—"}
									</td>
									<td className="px-4 py-3">
										<Link
											href={`/admin/sponsorships/${s.id}`}
											className="cursor-pointer text-primary hover:underline"
										>
											View
										</Link>
										<span className="mx-1 text-slate-300">|</span>
										<Link
											href={`/admin/sponsorships/${s.id}`}
											className="cursor-pointer text-primary hover:underline"
										>
											Edit
										</Link>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* <CreateSponsorshipDrawer isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} /> */}
		</div>
	);
}

function KpiCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white px-6 py-5">
			<p className="text-sm text-slate-500">{label}</p>
			<p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
		</div>
	);
}

const inputCls =
	"w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none";
