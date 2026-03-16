import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { PanelCard } from "@/components/admin/dashboard/PanelCard";

export default function SponsorPage() {
  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Sponsors</h1>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <KpiCard
          title="Total Sponsors"
          subtitle="Need KPI visualization"
        />
        <KpiCard
          title="Active Sponsors"
          subtitle="Need KPI visualization"
        />
        <KpiCard
          title="New Sponsors This Month"
          subtitle="Need KPI visualization"
        />
      </div>

      <PanelCard title="" className="w-full">
        <div className="space-y-8">
          <div className="text-center text-default-500 py-8">
            Sponsor filters will go here
          </div>
          <div className="text-center text-default-500 py-8">
            Sponsor table will go here
          </div>
        </div>
      </PanelCard>
    </div>
  );
}