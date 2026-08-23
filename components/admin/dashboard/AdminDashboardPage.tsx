"use client";

import { PanelCard } from "../../../components/admin/dashboard/PanelCard";
import { KpiCard } from "../shared/KpiCard";
import RecentDonationsTable from "../../../components/admin/dashboard/RecentDonationsTable";
import { DonationTableData } from "../donations/types";
import MonthlyDonationChart from "./MonthlyDonationChart";
import SponsorshipChart from "./SponsorshipChart";
import { ActivityPlaceholder } from "./ActivityPlaceholder";

type Props = {
	activeSponsorships: number;
	childrenAwaitingSponsorship: number;
	donations: DonationTableData[];
	sponsorshipsByCountry: { name: string; value: number }[];
};

export default function AdminDashboardPage({
	activeSponsorships,
	childrenAwaitingSponsorship,
	donations,
	sponsorshipsByCountry,
}: Props) {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="text-2xl font-semibold text-primary">Home</h1>
			</div>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
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
				</div>

				<div className="lg:row-span-2">
					<PanelCard
						title="Activity"
						className="h-full"
					>
						<ActivityPlaceholder />
					</PanelCard>
				</div>

				<div className="lg:col-span-2">
					<PanelCard title="Monthly Donations">
						<MonthlyDonationChart donations={donations} />
					</PanelCard>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
				<PanelCard
					title="Sponsorships by Country"
					className="lg:col-span-2"
				>
					<SponsorshipChart data={sponsorshipsByCountry} />
				</PanelCard>

				<PanelCard
					title="Recent Donations"
					className="lg:col-span-3"
				>
					<RecentDonationsTable donations={donations.slice(0, 8)} />
				</PanelCard>
			</div>
		</div>
	);
}
