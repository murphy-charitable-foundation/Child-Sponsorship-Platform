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
	Avatar,
	useDisclosure,
} from "@heroui/react";
import { Child } from "./ChildrenPage";
import type { Sponsor } from "../sponsors/SponsorsPage";
import ProfileEditModal from "@/components/ui/profileEditModal";

export function statusChipColor(status: boolean) {
	if (status) return "success";
	if (!status) return "warning";
	return "default"; // for Exited
}

interface Props {
	rows: Child[];
	onChildUpdate: (updated: Child) => void;
}

export default function ChildrenTable({ rows, onChildUpdate }: Props) {
	const editModal = useDisclosure();
	const [editChild, setEditChild] = useState<Child | null>(null);

	function openEdit(child: Child) {
		setEditChild(child);
		editModal.onOpen();
	}

	function handleSave(updated: Child | Sponsor) {
		onChildUpdate(updated as Child);
	}

	return (
		<div className="w-full">
			<Table
				aria-label="Children table"
				removeWrapper
			>
				<TableHeader>
					<TableColumn> </TableColumn>
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
					items={rows}
				>
					{(c) => (
						<TableRow key={c.id}>
							<TableCell>
								<Avatar
									src={c.image_url}
									name={c.first_name}
									size="sm"
									radius="full"
									color="primary"
								/>
							</TableCell>
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
							<TableCell>{new Date(c.created_at).toDateString()}</TableCell>
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

			<ProfileEditModal
				type="Child"
				target={editChild}
				isOpen={editModal.isOpen}
				onOpenChange={editModal.onOpenChange}
				onSave={handleSave}
			/>
		</div>
	);
}
