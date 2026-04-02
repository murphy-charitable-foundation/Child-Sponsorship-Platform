'use client';

import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { SponsorsFilter } from "./SponsorsFilter";
import { SponsorsTable } from "./SponsorsTable";
import { TabSelection } from "./TabSelection";
import { useState } from "react";

export default function SponsorPage() {
  const [activeTab, setActiveTab] = useState<'individuals' | 'groups'>('individuals');

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Sponsors</h1>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
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

      <TabSelection activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="space-y-6">
        <SponsorsFilter activeTab={activeTab} />
        <SponsorsTable activeTab={activeTab} />
      </div>
    </div>
  );
}