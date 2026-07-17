"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Chip,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Child } from "./types";

const supabase = createClient();

//TODO: Previously the status is has "active", "waiting", "exited". however, in supabase children table doesn't have "status"
//Only has "active" column. so we need to check it. either we add status in the table or just use active column.
//If we use "active" (boolean), we need to identify what is the waiting and exited.
//For now, I use active and set waiting if the active value is false

export function statusChipColor(status: boolean) {
	if (status) return "success";
	if (!status) return "warning";
	return "default"; // for Exited
}

type ChildrenTableProps = {
	selectedStatus: Set<string>;
	selectedGender: Set<string>;
	searchQuery: string;
};

export default function ChildrenTable({
	selectedStatus,
	selectedGender,
	searchQuery,
}: ChildrenTableProps) {
	const router = useRouter();
	const [children, setChildren] = useState<Child[]>([]);

	useEffect(() => {
		async function fetchChildren() {
			try {
				const [{ data, error: childrenError }, { data: ageData }] =
					await Promise.all([
						supabase.from("children").select("*"),
						supabase.from("children_with_ages").select("id, age"),
					]);

				if (childrenError) {
					console.log(childrenError);
				}
				if (data?.length) {
					const ageMap = new Map(
						(ageData ?? []).map((r: { id: string; age: number }) => [
							r.id,
							r.age,
						]),
					);

					const childrenWithAge = data.map((child) => ({
						...child,
						age: ageMap.get(child.id) ?? null,
					}));
					setChildren(childrenWithAge as Child[]);
				}
			} catch (err) {
				console.error("Failed to fetch children:", err);
			}
		}
		fetchChildren();
	}, []);

	// Filter rows based on selection
	const filtered = children.filter((c) => {
		// Status filter
		const statusKey = c.active ? "active" : "waiting";
		const statusMatches =
			selectedStatus.has("all") || selectedStatus.has(statusKey);

		// Gender filter
		const genderMatches =
			selectedGender.size === 0 || selectedGender.has(c.gender.toLowerCase());

		// Search filter
		const searchMatches =
			!searchQuery ||
			c.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.last_name.toLowerCase().includes(searchQuery.toLowerCase());

		return statusMatches && genderMatches && searchMatches;
	});

	return (
		<div className="w-full">
			<Table
				aria-label="Children table"
				removeWrapper
				onRowAction={(key) => router.push(`/admin/children/${key}`)}
				classNames={{ tr: "cursor-pointer" }}
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
					items={filtered}
				>
					{(r) => (
						<TableRow key={r.id}>
							<TableCell>{r.last_name}</TableCell>
							<TableCell>{r.first_name}</TableCell>
							<TableCell>{r.id}</TableCell>
							<TableCell>{r.age}</TableCell>
							<TableCell>{r.gender}</TableCell>
							<TableCell>{r.location}</TableCell>
							<TableCell>
								<Chip
									size="md"
									radius="full"
									variant="flat"
									color={statusChipColor(r.active)}
									className="px-4 text-base"
								>
									{r.active === true ? "Active" : "Waiting"}
								</Chip>
							</TableCell>
							<TableCell>
								{new Date(r.created_at).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</TableCell>
							<TableCell>
								<div className="flex gap-2">
									<Button
										as={Link}
										href={`/admin/children/${r.id}`}
										size="sm"
										radius="md"
										color="primary"
									>
										View
									</Button>
									<Button
										as={Link}
										href="/admin/children/editpage"
										size="sm"
										radius="md"
										color="primary"
									>
										Edit
									</Button>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
