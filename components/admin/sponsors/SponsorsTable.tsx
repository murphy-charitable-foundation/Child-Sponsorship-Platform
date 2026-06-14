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
import { Sponsor } from "./SponsorsPage";
import type { Child } from "../children/ChildrenPage";
import { statusChipColor } from "../children/ChildrenTable";
import ProfileEditModal from "@/components/ui/profileEditModal";

//TODO: There is no location column in for the supabase status table. so I just commented out for now,
//Once we find out, we can replace or remove.

interface SponsorsTableProps {
	activeTab: "individuals" | "groups";
	rows: Sponsor[];
	onSponsorUpdate: (update: Sponsor) => void;
}

export function SponsorsTable({
	activeTab,
	rows,
	onSponsorUpdate,
}: SponsorsTableProps) {
	const isGroupsTab = activeTab === "groups";
	const editModal = useDisclosure();
	const [editSponsor, setEditSponsor] = useState<Sponsor | null>(null);

	function openEdit(sponsor: Sponsor) {
		setEditSponsor(sponsor);
		editModal.onOpen();
	}

	function handleSave(updated: Child | Sponsor) {
		onSponsorUpdate(updated as Sponsor);
	}

	return (
		<div className="w-full">
			<Table
				aria-label="Children table"
				removeWrapper
			>
				<TableHeader>
					<TableColumn> </TableColumn>
					{isGroupsTab ? (
						<>
							<TableColumn>GROUP NAME</TableColumn>
							<TableColumn>TYPE</TableColumn>
						</>
					) : (
						<>
							<TableColumn>LAST NAME</TableColumn>
							<TableColumn>FIRST NAME</TableColumn>
						</>
					)}
					<TableColumn>ID</TableColumn>
					<TableColumn>CHILDREN SPONSORED</TableColumn>
					<TableColumn>STATUS</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>
				<TableBody
					emptyContent={"No sponsors found"}
					items={rows}
				>
					{(s) => (
						<TableRow key={s.id}>
							<TableCell>
								<Avatar
									src={s.image_url}
									name={s.first_name}
									size="sm"
									radius="full"
									color="primary"
								/>
							</TableCell>
							<TableCell>
								{isGroupsTab ? `${s.first_name} ${s.last_name}` : s.first_name}
							</TableCell>
							<TableCell>
								{isGroupsTab ? s.sponsor_type : s.last_name}
							</TableCell>
							<TableCell>{s.id}</TableCell>
							<TableCell>{s.children_count ?? 0}</TableCell>
							<TableCell>
								<Chip
									size="md"
									radius="full"
									variant="flat"
									color={statusChipColor(s.active)}
									className="px-4 text-base"
								>
									{s.active ? "Active" : "Inactive"}
								</Chip>
							</TableCell>
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
										onPress={() => openEdit(s)}
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
				type="Sponsor"
				target={editSponsor}
				isOpen={editModal.isOpen}
				onOpenChange={editModal.onOpenChange}
				onSave={handleSave}
			/>
		</div>
	);
}
