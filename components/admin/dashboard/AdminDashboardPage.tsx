import { PanelCard } from "../../../components/admin/dashboard/PanelCard";
import { KpiCard } from "../../../components/admin/dashboard/KpiCard";
import { ChartPlaceholder } from "../../../components/admin/dashboard/ChartPlaceholder";
import { ActivityPlaceholder } from "../../../components/admin/dashboard/ActivityPlaceholder";
import RecentDonationsTable from "../../../components/admin/dashboard/RecentDonationsTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#004a99]">Overview</h1>
        <p className="text-default-500 mt-1">
          Overview of sponsorships, donations, and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <KpiCard title="Children in Program" />
            <KpiCard title="Active Sponsorships" />
            <KpiCard title="Children Awaiting Sponsorship" />
          </div>
        </div>

        <div className="lg:row-span-2">
          <PanelCard title="Activity" className="h-full">
            <ActivityPlaceholder />
          </PanelCard>
        </div>

        <div className="lg:col-span-2">
          <PanelCard title="Monthly Donations">
            <ChartPlaceholder label="Column Chart" />
          </PanelCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
