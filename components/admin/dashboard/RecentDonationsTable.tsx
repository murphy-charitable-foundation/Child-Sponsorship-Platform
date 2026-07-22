"use client";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { DonationTableData } from "../donations/types";

type Props = {
	donations: DonationTableData[];
};

export function formatDate(date: Date | string) {
	return new Date(date).toISOString().slice(0, 10);
}

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
					<TableColumn>Donor</TableColumn>
					<TableColumn>ID</TableColumn>
					<TableColumn>Amount</TableColumn>
					<TableColumn>Date</TableColumn>
				</TableHeader>
				<TableBody>
					{donations.map((r) => (
						<TableRow key={r.id}>
							<TableCell className="whitespace-nowrap">
								{r.first_name} {r.last_name}
							</TableCell>
							<TableCell>{r.id}</TableCell>
							<TableCell>{r.amount}</TableCell>
							<TableCell className="whitespace-nowrap">
								{formatDate(r.date_time)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
