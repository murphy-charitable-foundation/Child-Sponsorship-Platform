import {
	Link,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { Sponsorship } from "./types";
import { tableCls } from "../shared/styleConstants";
import { FREQUENCIES } from "@/lib/constants";
import { useState } from "react";
import EditSponsorshipDrawer from "./EditSponsorshipDrawer";

type Props = {
	data: Sponsorship[];
};

export function formatDate(date: Date | string) {
	return new Date(date).toISOString().slice(0, 10);
}

export default function SponsorshipTable({ data }: Props) {
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editSponsorship, setEditSponsorship] = useState<Sponsorship | null>(
		null,
	);

	function handleEdit(s: Sponsorship) {
		setIsEditOpen(true);
		setEditSponsorship(s);
	}

	return (
		<div>
			<Table
				aria-label="Sponsorships table"
				classNames={tableCls}
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
							<TableCell className="text-slate-600">
								{s.child_location}
							</TableCell>
							<TableCell className="text-slate-800">{s.amount}</TableCell>
							<TableCell className="text-slate-600">
								{FREQUENCIES[s.frequency]}
							</TableCell>
							<TableCell
								className={
									s.status === "Active" ? "text-success" : "text-warning"
								}
							>
								{s.status}
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
										onPress={() => handleEdit(s)}
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

			<EditSponsorshipDrawer
				sponsorship={editSponsorship as Sponsorship}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				// onSaved={handleSponsorSaved}
			/>
		</div>
	);
}
