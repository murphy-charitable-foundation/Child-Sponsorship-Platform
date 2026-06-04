'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { KpiCard } from "@/components/admin/dashboard/KpiCard";
import { SponsorsFilter } from "./SponsorsFilter";
import { SponsorsTable, Sponsor, SponsorGroup } from "./SponsorsTable";
import { TabSelection } from "./TabSelection";
import AddSponsorDrawer from "./AddSponsorDrawer";
import EditSponsorDrawer from "./EditSponsorDrawer";
import type { SponsorProfile } from "./SponsorProfilePage";

function toSponsorProfile(row: Sponsor | SponsorGroup): SponsorProfile {
  const isGroup = "groupName" in row;
  return {
    id:               isGroup ? row.groupId  : row.sponsorId,
    firstName:        isGroup ? row.groupName : row.firstName,
    lastName:         isGroup ? ""            : row.lastName,
    sponsorType:      isGroup ? "Group"       : "Individual",
    sponsoringSince:  "",
    sponsorshipStatus: row.status,
    address: { line1: "", line2: "", city: "", state: "", zip: "", country: row.location },
    phone:   "",
    email:   "",
    sponsoredChildren: [],
  };
}

export default function SponsorPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const [activeTab,      setActiveTab]      = useState<'individuals' | 'groups'>('individuals');
  const [isAddOpen,      setIsAddOpen]      = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<SponsorProfile | null>(null);

  // Open drawer when AdminTopActions pushes ?add=1
  useEffect(() => {
    if (searchParams.get("add") === "1") setIsAddOpen(true);
  }, [searchParams]);

  function handleCloseAdd() {
    setIsAddOpen(false);
    router.replace("/admin/sponsors");
  }

  function handleEdit(row: Sponsor | SponsorGroup) {
    setEditingSponsor(toSponsorProfile(row));
  }

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-semibold text-[#004a99]">Sponsors</h1>

      <div className="mt-6 grid w-full grid-cols-3 gap-4">
        <KpiCard title="Active Sponsorships"           subtitle="Need KPI visualization" />
        <KpiCard title="Unique Sponsors"               subtitle="Need KPI visualization" />
        <KpiCard title="Children Awaiting Sponsorship" subtitle="Need KPI visualization" />
      </div>

      <div className="mt-6">
        <TabSelection activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mt-4 space-y-4">
        <SponsorsFilter activeTab={activeTab} />
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <SponsorsTable activeTab={activeTab} onEdit={handleEdit} />
        </div>
      </div>

      <AddSponsorDrawer isOpen={isAddOpen} onClose={handleCloseAdd} />

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
