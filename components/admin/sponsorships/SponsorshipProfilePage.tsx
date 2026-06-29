"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import { SponsorshipProfileTabs, type TabKey } from "./SponsorshipProfileTabs";
import SponsorshipDetailsTab from "./SponsorshipDetailsTab";
import SponsorshipSponsorshipsTab from "./SponsorshipSponsorshipsTab";
import SponsorshipReportsTab from "./SponsorshipReportsTab";
import SponsorshipMessagesTab from "./SponsorshipMessagesTab";
import EditSponsorshipDrawer from "./EditSponsorshipDrawer";

export type SponsorshipProfile = {
  id: string;
  sponsorId: string;
  sponsorType: "Individual" | "Group";
  sponsorName: string;
  childName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  startDate: string;
  status: "Active" | "Inactive" | "Pending";
};

type SponsorshipProfilePageProps = {
  sponsorship: SponsorshipProfile;
};

export default function SponsorshipProfilePage({
  sponsorship,
}: SponsorshipProfilePageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="px-10 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sponsorship</h1>
          <Link
            href="/admin/sponsorships"
            className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
          >
            ← Back to Sponsorships
          </Link>
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="p-2 text-slate-400 hover:text-slate-600"
        >
          <Edit2 size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <SponsorshipProfileTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="mt-8">
          <SponsorshipDetailsTab sponsorship={sponsorship} />
        </div>
      )}

      {/* Sponsorships Tab */}
      {activeTab === "sponsorships" && (
        <div className="mt-8">
          <SponsorshipSponsorshipsTab sponsorship={sponsorship} />
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="mt-8">
          <SponsorshipReportsTab sponsorship={sponsorship} />
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="mt-8">
          <SponsorshipMessagesTab sponsorship={sponsorship} />
        </div>
      )}

      {/* Edit Drawer */}
      <EditSponsorshipDrawer
        sponsorship={sponsorship}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
