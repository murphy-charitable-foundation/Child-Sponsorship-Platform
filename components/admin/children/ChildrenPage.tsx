import Link from "next/link";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { PanelCard } from "@/components/admin/dashboard/PanelCard";
import ChildrenFilters from "@/components/admin/children/ChildrenFilters";
import ChildrenTable from "@/components/admin/children/ChildrenTable";

export default function ChildrenPage() {
  return (
    <div className="space-y-8 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#004a99]">Children</h1>
        <Link
          href="/admin/children/add"
          className="rounded-lg bg-[#004a99] px-4 py-2 text-sm font-medium text-white hover:bg-[#003d7a]"
        >
          Add Child
        </Link>
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
      <PanelCard title="" className="w-full">
        <div className="space-y-8">
          <ChildrenFilters />
          <ChildrenTable />
        </div>
      </PanelCard>
    </div>
  );
}
