import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { DonationTableData } from "./types";
import { formatDate } from "../sponsorships/SponsorshipTable";

type Props = {
	data: DonationTableData[];
	onView: (id: string) => void;
};

export default function DonationsTable({ data, onView }: Props) {
	return (
		<div>
			<Table
				aria-label="Donations table"
				classNames={{
					wrapper:
						"mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-0 shadow-none",
					table: "w-full text-sm",
					thead: "[&>tr]:bg-slate-50",
					th: "!rounded-none border-b border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
					tbody: "divide-y divide-slate-100",
					tr: "hover:bg-slate-50",
					td: "px-4 py-3",
					emptyWrapper: "px-4 py-8 text-center text-slate-400",
				}}
			>
				<TableHeader>
					<TableColumn>Last Name</TableColumn>
					<TableColumn>First Name</TableColumn>
					<TableColumn>Amount</TableColumn>
					<TableColumn>Date</TableColumn>
					<TableColumn>Country</TableColumn>
					<TableColumn>Purpose</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody
					items={data}
					emptyContent="No donations match the current filters."
				>
					{(d) => (
						<TableRow key={d.id}>
							<TableCell className="text-slate-800">{d.last_name}</TableCell>
							<TableCell className="text-slate-800">{d.first_name}</TableCell>
							<TableCell className=" text-slate-800">{d.amount}</TableCell>
							<TableCell className="text-slate-800">
								{formatDate(d.date_time)}
							</TableCell>
							<TableCell className="text-slate-800">
								{d.country ?? "—"}
							</TableCell>
							<TableCell className="text-slate-800">
								{d.purpose ?? "—"}
							</TableCell>
							<TableCell>
								<button
									onClick={() => onView(d.id)}
									className="cursor-pointer text-primary hover:underline"
								>
									View
								</button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
