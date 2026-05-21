"use client";

import { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Chip,
	useDisclosure,
} from "@heroui/react";
import ChildEditModal, { type ChildRow } from "./ChildEditModal";

function statusChipColor(status: boolean) {
	if (status) return "success";
	if (!status) return "warning";
	return "default"; // for Exited
}

type Props = {
	rows: ChildRow[];
};

export default function ChildrenTable({ rows }: Props) {
	const editModal = useDisclosure();
	const [editChild, setEditChild] = useState<ChildRow | null>(null);

	//This open the EditModal for the child
	function openEdit(child: ChildRow) {
		setEditChild(child);
		editModal.onOpen();
	}

	function handleSave(updated: ChildRow) {
		// TODO: persist updated child to database
		console.log("Saving child:", updated);
	}

	return (
		<div className="w-full">
			<Table
				aria-label="Children table"
				removeWrapper
			>
				<TableHeader>
					<TableColumn>LAST NAME</TableColumn>
					<TableColumn>FIRST NAME</TableColumn>
					<TableColumn>ID</TableColumn>
					<TableColumn>AGE</TableColumn>
					<TableColumn>GENDER</TableColumn>
					<TableColumn>LOCATION</TableColumn>
					<TableColumn>STATUS</TableColumn>
					{/* <TableColumn>DATE ENROLLED</TableColumn> */}
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>

				<TableBody
					emptyContent={"No children found"}
					items={rows}
				>
					{(c) => (
						<TableRow key={c.id}>
							<TableCell>{c.last_name}</TableCell>
							<TableCell>{c.first_name}</TableCell>
							<TableCell>{c.id}</TableCell>
							<TableCell>{c.age}</TableCell>
							<TableCell>{c.gender}</TableCell>
							<TableCell>{c.location}</TableCell>
							<TableCell>
								<Chip
									size="md"
									radius="full"
									variant="flat"
									color={statusChipColor(c.active)}
									className="px-4 text-base"
								>
									{c.active ? "Active" : "Waiting"}
								</Chip>
							</TableCell>
							{/* <TableCell>{c.dateEnrolled}</TableCell> */}
							<TableCell>
								<div className="flex gap-2">
									<Button
										size="sm"
										radius="md"
										color="primary"
									>
										View
									</Button>
									<Button
										size="sm"
										radius="md"
										variant="bordered"
										color="primary"
										onPress={() => openEdit(c)}
									>
										Edit
									</Button>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<ChildEditModal
				child={editChild}
				isOpen={editModal.isOpen}
				onOpenChange={editModal.onOpenChange}
				onSave={handleSave}
			/>
		</div>
	);
}
