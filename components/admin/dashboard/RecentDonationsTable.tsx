"use client";
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

type Props = {
	donations: DonationTableData[];
};

export default function RecentDonationsTable({ donations }: Props) {
	return (
		<div className="p-2">
			<Table
				aria-label="Recent donations table"
				classNames={{
					wrapper: "rounded-md border border-divider p-0 shadow-none",
					th: "!rounded-none bg-default-100 px-2 py-1 text-xs shadow-none",
					td: "px-2 py-1 text-sm",
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
					{donations.map((r) => (
						<TableRow key={r.id}>
							<TableCell>{r.id}</TableCell>
							<TableCell className="whitespace-nowrap">
								{r.first_name} {r.last_name}
							</TableCell>
							<TableCell>{r.amount}</TableCell>
							<TableCell className="whitespace-nowrap">
								{formatDate(r.date_time)}
							</TableCell>
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
