"use client";

import { useEffect, useState } from "react";
import {
	Chip,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { DonationTableData } from "../donations/types";
import { formatDate } from "../sponsorships/SponsorshipTable";

export default function RecentDonationsTable() {
	const [donations, setDonations] = useState<DonationTableData[]>([]);
	const [error, setError] = useState<string | null>(null);

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
	return (
		<div className="p-2">
			{error && (
				<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
					{error}
				</div>
			)}

			<Table
				aria-label="Recent donations table"
				classNames={{
					wrapper: "rounded-md border border-divider p-0 shadow-none",
					th: "!rounded-none bg-default-100 px-2 py-1 text-xs shadow-none",
					td: "px-2 py-1 text-xs",
				}}
			>
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>Donor</TableColumn>
					<TableColumn>Amount</TableColumn>
					<TableColumn>Date</TableColumn>
					<TableColumn>Status</TableColumn>
				</TableHeader>
				<TableBody>
					{donations.slice(0, 6).map((r) => (
						<TableRow key={r.id}>
							<TableCell>{r.id}</TableCell>
							<TableCell>
								{r.first_name} {r.last_name}
							</TableCell>
							<TableCell>{r.amount}</TableCell>
							<TableCell>{formatDate(r.date_time)}</TableCell>
							<TableCell>
								<Chip
									size="sm"
									variant="flat"
									color={r.status === "Completed" ? "success" : "warning"}
									classNames={{
										base: "h-5 px-1.5",
										content: "px-0 text-[10px]",
									}}
								>
									{r.status}
								</Chip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
