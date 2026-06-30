"use client";

import { useRouter } from "next/navigation";
import { Sponsor, SponsorGroup } from "./types";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

//TODO: We don't have the SponsorGroup database set yet. we only have sponsor table and we need to determine how we want to set the DB
//how to set the sponsorGroup. For now, we use mock data for this.
//Also there is no "location data column in sponsor".
const GROUPS_DATA: SponsorGroup[] = [
	{
		id: "1",
		group_name: "Business Leaders Alliance",
		type: "Company",
		group_id: "SG21-0089",
		location: "USA",
		active: false,
		children_count: 0,
	},
	{
		id: "2",
		group_name: "Community Foundation",
		type: "Organization",
		group_id: "SG22-0045",
		location: "Canada",
		active: true,
		children_count: 10,
	},
	{
		id: "3",
		group_name: "Grace Fellowship",
		type: "Religious",
		group_id: "SG23-0067",
		location: "Australia",
		active: true,
		children_count: 5,
	},
	{
		id: "4",
		group_name: "Hope Charity Collective",
		type: "Organization",
		group_id: "SG23-0012",
		location: "UK",
		active: true,
		children_count: 20,
	},
	{
		id: "5",
		group_name: "Howard & Associates",
		type: "Company",
		group_id: "SG23-0034",
		location: "Canada",
		active: true,
		children_count: 10,
	},
	{
		id: "6",
		group_name: "Rotary Club Downtown",
		type: "Organization",
		group_id: "SG24-0003",
		location: "USA",
		active: true,
		children_count: 15,
	},
	{
		id: "7",
		group_name: "St. Mary's Church",
		type: "Religious",
		group_id: "SG23-0001",
		location: "USA",
		active: true,
		children_count: 5,
	},
	{
		id: "8",
		group_name: "Tech for Good",
		type: "Company",
		group_id: "SG24-0008",
		location: "Spain",
		active: true,
		children_count: 25,
	},
];

interface SponsorsTableProps {
	activeTab: "individuals" | "groups";
	onEdit?: (row: Sponsor | SponsorGroup) => void;
	searchValue?: string;
	locationValue?: string;
	statusValue?: string;
	typeValue?: string;
}

const supabase = createClient();

export function SponsorsTable({
	activeTab,
	onEdit,
	searchValue = "",
	locationValue = "all",
	statusValue = "all",
	typeValue = "all",
}: SponsorsTableProps) {
	const router = useRouter();
	const isGroupsTab = activeTab === "groups";
	const [sponsors, setSponsors] = useState<(Sponsor | SponsorGroup)[]>([]);

	useEffect(() => {
		async function fetchSponsors() {
			try {
				const [
					{ data, error: sponsorsError },
					{ data: sponsorshipCounts, error: countsError },
				] = await Promise.all([
					supabase.from("sponsors").select("*"),
					supabase.from("sponsorships").select("sponsor_id"),
				]);

				if (sponsorsError) {
					console.error("Error fetching sponsors:", sponsorsError);
					return;
				}

				if (!data || data.length === 0) {
					setSponsors([]);
					return;
				}

				if (countsError) {
					console.error("Error fetching sponsorship counts:", countsError);
				}

				const countMap: Record<string, number> = {};
				for (const row of sponsorshipCounts ?? []) {
					countMap[row.sponsor_id] = (countMap[row.sponsor_id] ?? 0) + 1;
				}

				const sponsorsWithCounts = data.map((s) => ({
					...s,
					children_count: countMap[s.id] ?? 0,
				}));

				setSponsors(sponsorsWithCounts as Sponsor[]);
			} catch (err) {
				console.error("Failed to fetch sponsors:", err);
			}
		}

		if (isGroupsTab) {
			setSponsors(GROUPS_DATA);
		} else {
			fetchSponsors();
		}
	}, [isGroupsTab]);

	const filtered = sponsors.filter((item) => {
		// Search filter
		const searchMatches = isGroupsTab
			? !searchValue ||
				(item as SponsorGroup).group_name
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			: !searchValue ||
				(item as Sponsor).first_name
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				(item as Sponsor).last_name
					.toLowerCase()
					.includes(searchValue.toLowerCase());

		// Location filter
		const locationMatches =
			locationValue === "all" ||
			item.location?.toLowerCase() === locationValue.toLowerCase();

		// Status filter
		const statusMatches =
			statusValue === "all" ||
			(statusValue === "active" ? item.active : !item.active);

		// Type filter (for groups tab only)
		const typeMatches =
			!isGroupsTab ||
			typeValue === "all" ||
			(item as SponsorGroup).type.toLowerCase() === typeValue.toLowerCase();

		return searchMatches && locationMatches && statusMatches && typeMatches;
	});

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-gray-200 bg-gray-100">
						{isGroupsTab ? (
							<>
								<th className="px-4 py-3 text-left font-semibold text-gray-700">
									GROUP NAME
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-700">
									TYPE
								</th>
							</>
						) : (
							<>
								<th className="px-4 py-3 text-left font-semibold text-gray-700">
									LAST NAME
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-700">
									FIRST NAME
								</th>
							</>
						)}
						<th className="px-4 py-3 text-left font-semibold text-gray-700">
							ID
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-700">
							LOCATION
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-700">
							STATUS
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-700">
							CHILDREN
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-700">
							ACTIONS
						</th>
					</tr>
				</thead>
				<tbody>
					{filtered.length === 0 ? (
						<tr>
							<td
								colSpan={7}
								className="px-4 py-8 text-center text-gray-400"
							>
								No {isGroupsTab ? "groups" : "sponsors"} found
							</td>
						</tr>
					) : isGroupsTab ? (
						(filtered as SponsorGroup[]).map((group) => (
							<tr
								key={group.id}
								className="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors"
							>
								<td className="px-4 py-3 text-gray-900">{group.group_name}</td>
								<td className="px-4 py-3 text-gray-900">{group.type}</td>
								<td className="px-4 py-3 text-gray-600">{group.group_id}</td>
								<td className="px-4 py-3 text-gray-600">{group.location}</td>
								<td className="px-4 py-3">
									<span
										className={`inline-block px-2 py-1 rounded text-xs font-medium ${
											group.active
												? "bg-green-100 text-green-800"
												: "bg-gray-200 text-gray-700"
										}`}
									>
										{group.active ? "Active" : "Inactive"}
									</span>
								</td>
								<td className="px-4 py-3 text-gray-900">
									{group.children_count}
								</td>
								<td className="px-4 py-3 text-sm">
									<div className="flex gap-3">
										<button
											onClick={() =>
												router.push(`/admin/sponsors/${group.group_id}`)
											}
											className="text-primary hover:underline font-medium cursor-pointer transition-all"
										>
											View
										</button>
										<span className="text-gray-300">|</span>
										<button
											onClick={() => onEdit?.(group)}
											className="text-primary hover:underline font-medium cursor-pointer transition-all"
										>
											Edit
										</button>
									</div>
								</td>
							</tr>
						))
					) : (
						(filtered as Sponsor[]).map((sponsor) => (
							<tr
								key={sponsor.id}
								className="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors"
							>
								<td className="px-4 py-3 text-gray-900">{sponsor.last_name}</td>
								<td className="px-4 py-3 text-gray-900">
									{sponsor.first_name}
								</td>
								<td className="px-4 py-3 text-gray-600">{sponsor.id}</td>
								<td className="px-4 py-3 text-gray-600">{sponsor.location}</td>
								<td className="px-4 py-3">
									<span
										className={`inline-block px-2 py-1 rounded text-xs font-medium ${
											sponsor.active
												? "bg-green-100 text-green-800"
												: "bg-gray-200 text-gray-700"
										}`}
									>
										{sponsor.active ? "Active" : "Inactive"}
									</span>
								</td>
								<td className="px-4 py-3 text-gray-900">
									{sponsor.children_count}
								</td>
								<td className="px-4 py-3 text-sm">
									<div className="flex gap-3">
										<button
											onClick={() =>
												router.push(`/admin/sponsors/${sponsor.id}`)
											}
											className="text-primary hover:underline font-medium cursor-pointer transition-all"
										>
											View
										</button>
										<span className="text-gray-300">|</span>
										<button
											onClick={() => onEdit?.(sponsor)}
											className="text-primary hover:underline font-medium cursor-pointer transition-all"
										>
											Edit
										</button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
