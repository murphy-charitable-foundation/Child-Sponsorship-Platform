import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Link,
} from "@heroui/react";
import { DonationTableData } from "./types";
import { tableCls } from "../shared/styleConstants";

type Props = {
	data: DonationTableData[];
};

export default function DonorsTable({ data }: Props) {
	return (
		<div>
			<Table
				aria-label="Donations table"
				classNames={tableCls}
			>
				<TableHeader>
					<TableColumn>Last Name</TableColumn>
					<TableColumn>First Name</TableColumn>
					<TableColumn>Amount</TableColumn>
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
							<TableCell className="text-slate-800">{d.country}</TableCell>
							<TableCell className="text-slate-800">{d.purpose}</TableCell>
							<TableCell>
								<Link
									href={`/admin/donations/${d.id}`}
									className="cursor-pointer text-primary hover:underline"
								>
									View
								</Link>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
