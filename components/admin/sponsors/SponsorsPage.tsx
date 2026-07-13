"use client";

import { useState } from "react";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { SponsorsFilter } from "./SponsorsFilter";

import { TabSelection } from "./TabSelection";
import AddSponsorDrawer from "./AddSponsorDrawer";
import EditSponsorDrawer from "./EditSponsorDrawer";
import type { SponsorProfile } from "./SponsorProfilePage";
import { Sponsor, SponsorGroup } from "./types";
import { SponsorsTable } from "./SponsorsTable";

function toSponsorProfile(row: Sponsor | SponsorGroup): SponsorProfile {
	const isGroup = "group_name" in row;
	return {
		id: isGroup ? row.group_id : row.id,
		firstName: isGroup ? row.group_name : row.first_name,
		lastName: isGroup ? "" : row.last_name,
		sponsorType: isGroup ? "Group" : "Individual",
		sponsoringSince: "",
		sponsorshipStatus: row.active ? "Active" : "Inactive",
		address: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			zip: "",
			country: "",
		},
		phone: "",
		email: "",
		sponsoredChildren: [],
	};
}

export default function SponsorPage() {
	const [activeTab, setActiveTab] = useState<"individuals" | "groups">(
		"individuals",
	);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [editingSponsor, setEditingSponsor] = useState<SponsorProfile | null>(
		null,
	);
	const [searchValue, setSearchValue] = useState("");
	const [locationValue, setLocationValue] = useState("all");
	const [statusValue, setStatusValue] = useState("all");
	const [typeValue, setTypeValue] = useState("all");

	function handleEdit(row: Sponsor | SponsorGroup) {
		setEditingSponsor(toSponsorProfile(row));
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-primary">Sponsors</h1>
				<button
					onClick={() => setIsAddOpen(true)}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Add Sponsor
				</button>
			</div>

			<div className="mt-6 grid w-full grid-cols-3 gap-10">
				<KpiCard
					title="Active Sponsorships"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Unique Sponsors"
					subtitle="Need KPI visualization"
				/>
				<KpiCard
					title="Children Awaiting Sponsorship"
					subtitle="Need KPI visualization"
				/>
			</div>

			<div className="mt-6">
				<TabSelection
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
			</div>

			<div className="mt-4 space-y-4">
				<SponsorsFilter
					activeTab={activeTab}
					searchValue={searchValue}
					onSearchChange={setSearchValue}
					locationValue={locationValue}
					onLocationChange={setLocationValue}
					statusValue={statusValue}
					onStatusChange={setStatusValue}
					typeValue={typeValue}
					onTypeChange={setTypeValue}
					onResetFilters={() => {
						setSearchValue("");
						setLocationValue("all");
						setStatusValue("all");
						setTypeValue("all");
					}}
				/>
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<SponsorsTable
						activeTab={activeTab}
						onEdit={handleEdit}
						searchValue={searchValue}
						locationValue={locationValue}
						statusValue={statusValue}
						typeValue={typeValue}
					/>
				</div>
			</div>

			<AddSponsorDrawer
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
			/>

			{editingSponsor && (
				<EditSponsorDrawer
					sponsor={editingSponsor}
					isOpen={!!editingSponsor}
					onClose={() => setEditingSponsor(null)}
				/>
			)}
		</div>
	);
}
