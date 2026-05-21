"use client";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { PanelCard } from "@/components/admin/dashboard/PanelCard";
import ChildrenFilters, {
	type ChildFilters,
} from "@/components/admin/children/ChildrenFilters";
import ChildrenTable from "@/components/admin/children/ChildrenTable";
import { ChildRow } from "./ChildEditModal";

//TODO: Previously the status is has "active", "waiting", "exited". however, in supabase children table doesn't have "status"
//Only has "active" column. so we need to check it. either we add status in the table or just use active column.
//If we use "active" (boolean), we need to identify what is the waiting and exited.
//For now, I use active and set waiting if the active value is false

const supabase = createClient();

export default function ChildrenPage() {
	const [children, setChildren] = useState<ChildRow[]>([]);
	const [filters, setFilters] = useState<ChildFilters>({
		search: "",
		gender: "",
		statuses: new Set(["active", "waiting", "exited"]),
	});

	//Load children data from Supabase
	useEffect(() => {
		async function fetchChildren() {
			const { data, error: childrenError } = await supabase
				.from("children_with_ages")
				.select("*");

			if (childrenError) {
				console.log(childrenError);
			}
			if (data?.length) {
				setChildren(data);
			}
		}
		fetchChildren();
	}, []);

	//Filter children by search, gender, and statuses
	const filtered = useMemo(() => {
		const { search, gender, statuses } = filters;
		return children.filter((c) => {
			const fullName = `${c.first_name} ${c.last_name}`;
			if (search && !fullName.toLowerCase().includes(search.toLowerCase()))
				return false;
			if (
				gender &&
				gender !== "all" &&
				gender.toLowerCase() !== c.gender.toLowerCase()
			)
				return false;
			const statusKey = c.active ? "active" : "waiting";
			if (statuses.size > 0 && !statuses.has(statusKey)) return false;
			return true;
		});
	}, [children, filters]);

	return (
		<div className="space-y-8 w-full">
			{/* header */}
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-bold">Children</h1>
			</div>

			{/* KPI */}
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
				<KpiCard
					title="Children in Program"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Active Sponsorships"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					subtitle="Need KPI visualization"
				/>
			</div>

			{/* BOX containing Filters + Table */}
			<PanelCard
				title=""
				className="w-full"
			>
				<div className="space-y-8">
					<ChildrenFilters onFiltersChange={setFilters} />
					<ChildrenTable rows={filtered} />
				</div>
			</PanelCard>
		</div>
	);
}
