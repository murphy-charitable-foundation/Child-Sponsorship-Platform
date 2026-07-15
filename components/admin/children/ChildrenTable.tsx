"use client";
import { useRouter } from "next/navigation";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Link,
	Chip,
} from "@heroui/react";

import { ChildTableData, StatusType } from "./types";
import { tableCls } from "../shared/styleConstants";

export function statusChipColor(status: StatusType) {
	if (status === "Active") return "success";
	if (status === "Waiting") return "warning";
	return "default"; // for Exited
}

type ChildrenTableProps = {
	data: ChildTableData[];
	onEdit: (id: string) => void;
};

export default function ChildrenTable({ data, onEdit }: ChildrenTableProps) {
	const router = useRouter();

	return (
		<div className="w-full">
			<Table
				aria-label="Children table"
				onRowAction={(key) => router.push(`/admin/children/${key}`)}
				classNames={tableCls}
			>
				<TableHeader>
					<TableColumn>LAST NAME</TableColumn>
					<TableColumn>FIRST NAME</TableColumn>
					<TableColumn>ID</TableColumn>
					<TableColumn>AGE</TableColumn>
					<TableColumn>GENDER</TableColumn>
					<TableColumn>LOCATION</TableColumn>
					<TableColumn>STATUS</TableColumn>
					<TableColumn>DATE ENROLLED</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>

				<TableBody
					emptyContent={"No children found"}
					items={data}
				>
					{(r) => (
						<TableRow key={r.id}>
							<TableCell className="text-slate-800">{r.last_name}</TableCell>
							<TableCell className="text-slate-800">{r.first_name}</TableCell>
							<TableCell className="text-slate-600">{r.id}</TableCell>
							<TableCell className="text-slate-600">{r.age}</TableCell>
							<TableCell className="text-slate-600">{r.gender}</TableCell>
							<TableCell className="text-slate-600">{r.location}</TableCell>
							<TableCell>
								<Chip
									size="md"
									radius="full"
									variant="flat"
									color={statusChipColor(r.status)}
									className="px-4 text-base"
								>
									{r.status}
								</Chip>
							</TableCell>
							<TableCell className="text-slate-600">
								{r.created_at.split("T")[0]}
							</TableCell>
							<TableCell>
								<div className="flex items-center whitespace-nowrap">
									<Link
										href={`/admin/children/${r.id}`}
										className="cursor-pointer text-primary hover:underline"
									>
										View
									</Link>
									<span className="mx-1 text-slate-300">|</span>
									<Link
										onPress={() => onEdit(r.id)}
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
		</div>
	);
}
