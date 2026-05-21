"use client";

import { useEffect, useState } from "react";
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
import { createClient } from "@/lib/supabase/client";

function statusChipColor(status: boolean) {
	if (status) return "success";
	if (!status) return "warning";
	return "default"; // for Exited
}

const supabase = createClient();

export default function ChildrenTable() {
	const editModal = useDisclosure();
	const [editTarget, setEditTarget] = useState<ChildRow | null>(null);
	const [children, setChildren] = useState<ChildRow[]>([]);

	function openEdit(child: ChildRow) {
		setEditTarget(child);
		editModal.onOpen();
	}

	function handleSave(updated: ChildRow) {
		// TODO: persist updated child to database
		console.log("Saving child:", updated);
	}

	//load the children data from Supabase
	useEffect(() => {
		async function fetchChildren() {
			const { data: newChildren, error: childrenError } = await supabase
				.from("children_with_ages")
				.select("*");

			if (childrenError) {
				console.log(childrenError);
			}

			if (newChildren?.length) {
				setChildren(newChildren);
			}
		}

		fetchChildren();
	}, []);

	console.log(children);

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
					items={children}
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
				child={editTarget}
				isOpen={editModal.isOpen}
				onOpenChange={editModal.onOpenChange}
				onSave={handleSave}
			/>
		</div>
	);
}
