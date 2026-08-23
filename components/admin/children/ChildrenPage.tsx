"use client";

import { useEffect, useState } from "react";
import { KpiCard } from "@/components/admin/shared/KpiCard";
import ChildrenFilters from "@/components/admin/children/ChildrenFilters";
import ChildrenTable from "@/components/admin/children/ChildrenTable";
import { ChildProfile, ChildTableData } from "./types";
import EditChildDrawer from "./EditChildDrawer";
import TablePagination from "../shared/TablePagination";
import AddChildDrawer from "./AddChildDrawer";

type Props = {
	activeSponsorships: number;
	childrenAwaitingSponsorship: number;
	initialChildren: ChildTableData[];
	region: string | null;
};

export default function ChildrenPage({
	activeSponsorships,
	childrenAwaitingSponsorship,
	initialChildren,
	region,
}: Props) {
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [selectedGender, setSelectedGender] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [children, setChildren] = useState<ChildTableData[]>(initialChildren);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [editChild, setEditChild] = useState<ChildProfile | null>(null);
	const [selectedPageCapacity, setPageCapacity] = useState(10);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [selectedStatus, selectedGender, searchQuery]);

	// Filter rows based on selection
	const filtered = children.filter((c) => {
		// Status filter
		const statusMatches =
			selectedStatus === "all" ||
			selectedStatus.toLowerCase() === c.status.toLowerCase();

		// Gender filter
		const genderMatches =
			selectedGender === "all" ||
			selectedGender.toLowerCase() === c.gender.toLowerCase();

		// Search filter
		const searchMatches =
			!searchQuery ||
			c.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.last_name.toLowerCase().includes(searchQuery.toLowerCase());

		return statusMatches && genderMatches && searchMatches;
	});

	const sorted = [...filtered].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
	);

	async function handleEdit(id: string) {
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

	function handleChildSaved(newData: ChildProfile) {
		//If the region value is not null (which means admin role) and the updated child's location and region is not same, then remove from the children.
		//Because admin only can see the same associated region's child
		if (region && newData.location !== region) {
			setChildren((prev) => prev.filter((c) => c.id !== newData.id));
			return;
		}

		const tableRow: ChildTableData = {
			id: newData.id,
			first_name: newData.first_name,
			last_name: newData.last_name,
			age: newData.age,
			gender: newData.gender,
			location: newData.location,
			status: newData.status,
			created_at: newData.created_at,
		};

		//Add the new child if it's not in "Children" otherwise just update the data
		setChildren((prev) => {
			const exists = prev.some((c) => c.id === newData.id);

			if (!exists) {
				return [tableRow, ...prev];
			}

			return prev.map((c) => (c.id === newData.id ? tableRow : c));
		});
	}

	//Pagination//
	const totalPage = Math.max(
		1,
		Math.ceil(sorted.length / selectedPageCapacity),
	);
	const paginated = sorted.slice(
		(page - 1) * selectedPageCapacity,
		page * selectedPageCapacity,
	);

	return (
		<div>
			{/* header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-primary">Children</h1>
				<button
					onClick={() => setIsAddOpen(true)}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Add Child
				</button>
			</div>

			{/* KPI */}
			<div className="mt-6 grid grid-cols-3 gap-10">
				<KpiCard
					title="Children in Program"
					value="Need KPI visualization"
				/>
				<KpiCard
					title="Active Sponsorships"
					value={activeSponsorships}
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					value={childrenAwaitingSponsorship}
				/>
			</div>

			{/* Filters */}
			<div className="mt-10">
				<ChildrenFilters
					selectedStatus={selectedStatus}
					setSelectedStatus={setSelectedStatus}
					selectedGender={selectedGender}
					setSelectedGender={setSelectedGender}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>

				{/* Table */}
				<ChildrenTable
					data={paginated}
					onEdit={handleEdit}
				/>
				<TablePagination
					page={page}
					onSetPage={setPage}
					totalPage={totalPage}
					selectedPageCapacity={selectedPageCapacity}
					onSetPageCapacity={setPageCapacity}
				/>
			</div>

			<AddChildDrawer
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
				onSaved={handleChildSaved}
			/>

			<EditChildDrawer
				child={editChild}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleChildSaved}
			/>
		</div>
	);
}
