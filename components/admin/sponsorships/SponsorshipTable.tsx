import {
	Chip,
	Link,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { Sponsorship } from "./types";
import { frequencies } from "../donations/types";

type Props = {
	data: Sponsorship[];
};

export function formatDate(date: Date | string) {
	return new Date(date).toISOString().slice(0, 10);
}

export default function SponsorshipTable({ data }: Props) {
	return (
		<Table
			aria-label="Sponsorships table"
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
				<TableColumn>Sponsor Name</TableColumn>
				<TableColumn>Child Name</TableColumn>
				<TableColumn>Child Location</TableColumn>
				<TableColumn>Amount</TableColumn>
				<TableColumn>Frequency</TableColumn>
				<TableColumn>Status</TableColumn>
				<TableColumn>Start Date</TableColumn>
				<TableColumn>End Date</TableColumn>
				<TableColumn>Actions</TableColumn>
			</TableHeader>
			<TableBody
				items={data}
				emptyContent="No sponsorships match the current filters."
			>
				{(s) => (
					<TableRow key={s.sponsorship_id}>
						<TableCell className="text-slate-800">{s.sponsor_name}</TableCell>
						<TableCell className="text-slate-800">{s.child_name}</TableCell>
						<TableCell className="text-slate-600">{s.child_location}</TableCell>
						<TableCell className="text-slate-800">{s.amount}</TableCell>
						<TableCell className="text-slate-600">
							{frequencies[s.frequency]}
						</TableCell>
						<TableCell>
							<Chip
								size="sm"
								variant="flat"
								color={s.sponsorship_active ? "success" : "warning"}
								className="px-2"
							>
								{s.sponsorship_active ? "Active" : "Inactive"}
							</Chip>
						</TableCell>
						<TableCell className="text-slate-600">
							{formatDate(s.start_date_time)}
						</TableCell>
						<TableCell className="text-slate-600">
							{s.end_date_time ? formatDate(s.end_date_time) : "—"}
						</TableCell>
						<TableCell>
							<div className="flex items-center whitespace-nowrap">
								<Link
									href={`/admin/sponsorships/${s.sponsorship_id}`}
									className="cursor-pointer text-primary hover:underline"
								>
									View
								</Link>
								<span className="mx-1 text-slate-300">|</span>
								<Link
									href={`/admin/sponsorships/${s.sponsorship_id}`}
									className="cursor-pointer text-primary hover:underline"
								>
									Edit
								</Link>
							</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
