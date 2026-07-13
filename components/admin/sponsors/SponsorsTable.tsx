"use client";

import { useRouter } from "next/navigation";
import {
	SponsorGroupTableData,
	SponsorProfile,
	SponsorTableData,
} from "./types";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Chip,
} from "@heroui/react";
import EditSponsorDrawer from "./EditSponsorDrawer";

interface SponsorsTableProps {
	activeTab: "individuals" | "groups";
	searchValue?: string;
	locationValue?: string;
	statusValue?: string;
	typeValue?: string;
}

const supabase = createClient();

export function SponsorsTable({
	activeTab,
	searchValue = "",
	locationValue = "all",
	statusValue = "all",
	typeValue = "all",
}: SponsorsTableProps) {
	const router = useRouter();
	const isGroupsTab = activeTab === "groups";
	const [sponsors, setSponsors] = useState<
		(SponsorTableData | SponsorGroupTableData)[]
	>([]);
	const [error, setError] = useState<string | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editSponsor, setEditSponsor] = useState<SponsorProfile | null>(null);

	useEffect(() => {
		async function fetchSponsors() {
			try {
				const { data, error: sponsorsError } = await supabase
					.from("sponsors")
					.select(
						"last_name, first_name, id, country, status, sponsor_type, sponsorships(count)",
					)
					.eq("sponsor_type", "individual")
					.order("created_at");

				if (sponsorsError) {
					setError("Failed to get sponsors data");
					console.error("Error fetching sponsors:", sponsorsError);
					return;
				}

				if (!data || data.length === 0) {
					setSponsors([]);
					return;
				}

				const sponsorsWithCounts = data.map((s) => ({
					...s,
					children_count: s.sponsorships?.[0]?.count ?? 0,
				}));

				setSponsors(sponsorsWithCounts as SponsorTableData[]);
			} catch (err) {
				console.error("Failed to fetch sponsors:", err);
			}
		}

		async function fetchGroupSponsors() {
			try {
				const { data, error: sponsorsError } = await supabase
					.from("sponsors")
					.select(
						"id, country, status, sponsor_type, group_name, sponsorships(count)",
					)
					.neq("sponsor_type", "individual")
					.order("created_at");

				if (sponsorsError) {
					setError("Failed to get sponsors data");
					console.error("Error fetching sponsors:", sponsorsError);
					return;
				}

				if (!data || data.length === 0) {
					setSponsors([]);
					return;
				}

				const sponsorsWithCounts = data.map((s) => ({
					...s,
					children_count: s.sponsorships?.[0]?.count ?? 0,
				}));

				setSponsors(sponsorsWithCounts as SponsorGroupTableData[]);
			} catch (err) {
				console.error("Failed to fetch sponsors:", err);
			}
		}

		if (isGroupsTab) {
			fetchGroupSponsors();
		} else {
			fetchSponsors();
		}
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
		console.log("s", sponsor);

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
		<div className="w-full">
			{error && (
				<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
					{error}
				</div>
			)}
			<Table
				aria-label="Sponsor table"
				removeWrapper
			>
				<TableHeader>
					{isGroupsTab ? (
						<>
							<TableColumn key="group_name">GROUP NAME</TableColumn>
							<TableColumn key="sponsor_type">TYPE</TableColumn>
						</>
					) : (
						<>
							<TableColumn key="last_name">LAST NAME</TableColumn>
							<TableColumn key="first_name">FIRST NAME</TableColumn>
						</>
					)}
					<TableColumn key="id">ID</TableColumn>
					<TableColumn key="location">LOCATION</TableColumn>
					<TableColumn key="status">STATUS</TableColumn>
					<TableColumn key="children">CHILDREN</TableColumn>
					<TableColumn key="actions">ACTIONS</TableColumn>
				</TableHeader>
				<TableBody
					emptyContent={`No ${isGroupsTab ? "groups" : "sponsors"} found`}
					items={filtered}
				>
					{(item) =>
						isGroupsTab
							? (() => {
									const group = item as SponsorGroupTableData;
									return (
										<TableRow key={group.id}>
											<TableCell>{group.group_name}</TableCell>
											<TableCell>{group.sponsor_type}</TableCell>
											<TableCell>{group.id}</TableCell>
											<TableCell>{group.country}</TableCell>
											<TableCell>
												<Chip
													size="md"
													radius="full"
													variant="flat"
													color={
														group.status === "Active" ? "success" : "warning"
													}
													className="px-4 text-base"
												>
													{group.status}
												</Chip>
											</TableCell>
											<TableCell>{group.children_count}</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button
														onPress={() =>
															router.push(`/admin/sponsors/${group.id}`)
														}
														size="sm"
														radius="md"
														color="primary"
													>
														View
													</Button>
													<Button
														onPress={() => openEdit(group.id)}
														size="sm"
														radius="md"
														color="primary"
													>
														Edit
													</Button>
												</div>
											</TableCell>
										</TableRow>
									);
								})()
							: (() => {
									const sponsor = item as SponsorTableData;
									return (
										<TableRow key={sponsor.id}>
											<TableCell>{sponsor.last_name}</TableCell>
											<TableCell>{sponsor.first_name}</TableCell>
											<TableCell>{sponsor.id}</TableCell>
											<TableCell>{sponsor.country}</TableCell>
											<TableCell>
												<Chip
													size="md"
													radius="full"
													variant="flat"
													color={
														sponsor.status === "Active" ? "success" : "warning"
													}
													className="px-4 text-base"
												>
													{sponsor.status}
												</Chip>
											</TableCell>
											<TableCell>{sponsor.children_count}</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button
														onPress={() =>
															router.push(`/admin/sponsors/${sponsor.id}`)
														}
														size="sm"
														radius="md"
														color="primary"
													>
														View
													</Button>
													<Button
														onPress={() => openEdit(sponsor.id)}
														size="sm"
														radius="md"
														color="primary"
													>
														Edit
													</Button>
												</div>
											</TableCell>
										</TableRow>
									);
								})()
					}
				</TableBody>
			</Table>

			<EditSponsorDrawer
				sponsor={editSponsor}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleSponsorSaved}
			/>
		</div>
	);
}
