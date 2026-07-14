"use client";

import { useState } from "react";
import { ChildProfile } from "./types";
import { ChildTabHeader } from "./ChildTabHeader";

//TODO: We need to set report DB table to implement this.

type Report = {
	id: string;
	type: string;
	author: string;
	date: string;
};

const reportTypes = [
	"All report types",
	"Annual Report",
	"School Report",
	"Progress Report",
];

const reports: Report[] = [
	{
		id: "1",
		type: "Annual Report 2025",
		author: "authorUsername",
		date: "2025-12-30",
	},
	{
		id: "2",
		type: "School Report",
		author: "authorUsername",
		date: "2025-11-16",
	},
	{
		id: "3",
		type: "Progress Report",
		author: "authorUsername",
		date: "2025-08-20",
	},
	{
		id: "4",
		type: "Progress Report",
		author: "authorUsername",
		date: "2025-05-03",
	},
	{
		id: "5",
		type: "Progress Report",
		author: "authorUsername",
		date: "2025-02-02",
	},
];

type ChildReportsTabProps = {
	child: ChildProfile;
};

export default function ChildReportsTab({ child }: ChildReportsTabProps) {
	const [typeFilter, setTypeFilter] = useState("All report types");
	const [authorFilter, setAuthorFilter] = useState("");

	const filtered = reports.filter((r) => {
		const typeMatch =
			typeFilter === "All report types" ||
			r.type.toLowerCase().startsWith(typeFilter.toLowerCase());
		const authorMatch =
			!authorFilter ||
			r.author.toLowerCase().includes(authorFilter.toLowerCase());
		return typeMatch && authorMatch;
	});

	return (
		<div>
			<ChildTabHeader
				child={child}
				subtitle={`Reports: ${reports.length}`}
				actionLabel="Create report"
			/>

			{/* Filters */}
			<div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
				<div className="flex items-end gap-4">
					<div className="flex-1">
						<label className="mb-1 block text-xs text-slate-500">
							Report type
						</label>
						<select
							value={typeFilter}
							onChange={(e) => setTypeFilter(e.target.value)}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
						>
							{reportTypes.map((t) => (
								<option key={t}>{t}</option>
							))}
						</select>
					</div>

					<div className="flex-1">
						<label className="mb-1 block text-xs text-slate-500">Author</label>
						<input
							type="text"
							value={authorFilter}
							onChange={(e) => setAuthorFilter(e.target.value)}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					<button
						onClick={() => {
							setTypeFilter("All report types");
							setAuthorFilter("");
						}}
						className="pb-2 text-sm text-primary hover:underline"
					>
						Reset filters
					</button>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-slate-200 bg-slate-50">
							<th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
								Report type
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
								Author
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
								Date
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200">
						{filtered.length === 0 ? (
							<tr>
								<td
									colSpan={4}
									className="px-6 py-8 text-center text-slate-400"
								>
									No reports match the current filters.
								</td>
							</tr>
						) : (
							filtered.map((r) => (
								<tr
									key={r.id}
									className="hover:bg-slate-50"
								>
									<td className="px-6 py-4 text-slate-800">{r.type}</td>
									<td className="px-6 py-4 text-slate-600">{r.author}</td>
									<td className="px-6 py-4 text-slate-600">{r.date}</td>
									<td className="px-6 py-4">
										<span className="cursor-pointer text-primary hover:underline">
											View
										</span>
										<span className="mx-2 text-slate-300">|</span>
										<span className="cursor-pointer text-primary hover:underline">
											Edit
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
