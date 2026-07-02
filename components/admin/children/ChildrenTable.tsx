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
import { ChildBaseData, StatusType } from "./types";

const supabase = createClient();

function statusChipColor(status: StatusType) {
	if (status === "Active") return "success";
	if (status === "Waiting") return "warning";
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
	const [children, setChildren] = useState<ChildBaseData[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setError(null);
		async function fetchChildren() {
			try {
				const { data, error: childrenError } = await supabase
					.from("children_with_ages")
					.select(
						"last_name, first_name, id, age, gender, location, created_at, status",
					);

				if (childrenError) {
					setError("Failed to get children data");
					console.log(childrenError);
					return;
				}
				setChildren(data);
			} catch (err) {
				setError("Failed to get children data");
				console.log("Failed to fetch children:", err);
			}
		}
		fetchChildren();
	}, []);

	// Filter rows based on selection
	const filtered = children.filter((c) => {
		// Status filter
		const statusMatches =
			selectedStatus.has("all") || selectedStatus.has(c.status.toLowerCase());

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
			{error && (
				<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
					{error}
				</div>
			)}
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
									color={statusChipColor(r.status)}
									className="px-4 text-base"
								>
									{r.status}
								</Chip>
							</TableCell>
							<TableCell>{r.created_at.split("T")[0]}</TableCell>
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
