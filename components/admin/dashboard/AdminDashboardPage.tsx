import { PanelCard } from "../../../components/admin/dashboard/PanelCard";
import { KpiCard } from "../shared/KpiCard";
import { ChartPlaceholder } from "../../../components/admin/dashboard/ChartPlaceholder";
import { ActivityPlaceholder } from "../../../components/admin/dashboard/ActivityPlaceholder";
import RecentDonationsTable from "../../../components/admin/dashboard/RecentDonationsTable";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
	const [activeSponsorships, setActiveSponsorships] = useState<number>(0);
	const [childrenAwaitingSponsorship, setChildrenAwaitingSponsorship] =
		useState<number>(0);
	useEffect(() => {
		async function fetchActiveSponsorships() {
			try {
				const res = await fetch("/api/supabase/sponsorships/active-count");

				if (!res.ok) {
					console.error(
						"Error fetching active sponsorships:",
						await res.text(),
					);
					return;
				}

				const { activeSponsorships } = await res.json();

				setActiveSponsorships(activeSponsorships ?? 0);
			} catch (err) {
				console.error("Failed to fetch active sponsorships:", err);
			}
		}

		fetchActiveSponsorships();
	}, []);

	useEffect(() => {
		async function fetchChildrenAwaitingSponsorship() {
			try {
				const res = await fetch("/api/supabase/children/awaiting-count");

				if (!res.ok) {
					console.error(
						"Error fetching children awaiting sponsorship:",
						await res.text(),
					);
					return;
				}

				const { childrenAwaitingSponsorship } = await res.json();

				setChildrenAwaitingSponsorship(childrenAwaitingSponsorship ?? 0);
			} catch (err) {
				console.error("Failed to fetch children awaiting sponsorship:", err);
			}
		}

		fetchChildrenAwaitingSponsorship();
	}, []);
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
						<ChartPlaceholder label="Column Chart" />
					</PanelCard>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
				<PanelCard
					title="Sponsorships by Region"
					className="lg:col-span-2"
				>
					<ChartPlaceholder label="Donut / Bars" />
				</PanelCard>

				<PanelCard
					title="Recent Donations"
					className="lg:col-span-3"
				>
					<RecentDonationsTable />
				</PanelCard>
			</div>
		</div>
	);
}
