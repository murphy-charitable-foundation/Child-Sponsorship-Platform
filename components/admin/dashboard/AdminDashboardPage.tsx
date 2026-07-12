import { PanelCard } from "../../../components/admin/dashboard/PanelCard";
import { KpiCard } from "../../../components/admin/dashboard/KpiCard";
import { ChartPlaceholder } from "../../../components/admin/dashboard/ChartPlaceholder";
import { ActivityPlaceholder } from "../../../components/admin/dashboard/ActivityPlaceholder";
import RecentDonationsTable from "../../../components/admin/dashboard/RecentDonationsTable";

export default function AdminDashboardPage() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="text-2xl font-semibold text-primary">Home</h1>
			</div>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
						<KpiCard title="Children in Program" />
						<KpiCard title="Active Sponsorships" />
						<KpiCard title="Children Awaiting Sponsorship" />
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
						<ChartPlaceholder label="Column Chart" />
					</PanelCard>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
				<PanelCard title="Sponsorships by Region">
					<ChartPlaceholder label="Donut / Bars" />
				</PanelCard>

				<PanelCard title="Recent Donations">
					<RecentDonationsTable />
				</PanelCard>
			</div>
		</div>
	);
}
