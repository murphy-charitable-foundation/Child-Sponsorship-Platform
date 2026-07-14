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
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChildTableData, ChildProfile, StatusType } from "./types";
import EditChildDrawer from "./EditChildDrawer";

const supabase = createClient();

export function statusChipColor(status: StatusType) {
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
	const [children, setChildren] = useState<ChildTableData[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editChild, setEditChild] = useState<ChildProfile | null>(null);

	useEffect(() => {
		setError(null);
		async function fetchChildren() {
			try {
				const { data, error: childrenError } = await supabase
					.from("children_with_ages")
					.select(
						"last_name, first_name, id, age, gender, location, created_at, status",
					)
					.order("created_at");

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

	async function openEdit(id: string) {
		const res = await fetch(`/api/supabase/children/${id}`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		const { child } = await res.json();

		setEditChild(child);
		setIsEditOpen(true);
	}

	function handleChildSaved(updated: ChildProfile) {
		setChildren((prev) =>
			prev.map((c) =>
				c.id === updated.id
					? {
							...c,
							first_name: updated.first_name,
							last_name: updated.last_name,
							age: updated.age,
							gender: updated.gender,
							location: updated.location,
							status: updated.status,
						}
					: c,
			),
		);
	}

	return (
		<div className="w-full">
			{error && (
				<div className="mb-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
					{error}
				</div>
			)}
			<Table
				aria-label="Children table"
				onRowAction={(key) => router.push(`/admin/children/${key}`)}
				classNames={{
					wrapper:
						"mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-0 shadow-none",
					table: "w-full text-sm",
					thead: "[&>tr]:bg-slate-50",
					th: "!rounded-none border-b border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
					tbody: "divide-y divide-slate-100",
					tr: "cursor-pointer hover:bg-slate-50",
					td: "px-4 py-3",
					emptyWrapper: "px-4 py-8 text-center text-slate-400",
				}}
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
										onPress={() => openEdit(r.id)}
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

			<EditChildDrawer
				child={editChild}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleChildSaved}
			/>
		</div>
	);
}
