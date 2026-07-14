"use client";

import { useState } from "react";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { SponsorsFilter } from "./SponsorsFilter";

import { TabSelection } from "./TabSelection";
import AddSponsorDrawer from "./AddSponsorDrawer";
import { SponsorsTable } from "./SponsorsTable";

export default function SponsorPage() {
	const [activeTab, setActiveTab] = useState<"individuals" | "groups">(
		"individuals",
	);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [locationValue, setLocationValue] = useState("all");
	const [statusValue, setStatusValue] = useState("all");
	const [typeValue, setTypeValue] = useState("all");

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
				<SponsorsTable
					activeTab={activeTab}
					searchValue={searchValue}
					locationValue={locationValue}
					statusValue={statusValue}
					typeValue={typeValue}
				/>
			</div>

			<AddSponsorDrawer
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
			/>
		</div>
	);
}
