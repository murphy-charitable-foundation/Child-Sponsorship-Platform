"use client";

import { useState } from "react";
import Image from "next/image";
import { ChildProfileHeader } from "@/components/admin/children/ChildProfileHeader";
import { ProfileTabs, TabKey } from "@/components/admin/children/ProfileTabs";
import { ChildSummaryCard } from "@/components/admin/children/ChildSummaryCard";
import { DetailItem } from "@/components/admin/children/DetailItem";
import { GuardianSection } from "@/components/admin/children/GuardianSection";
import ChildSponsorsTab from "@/components/admin/children/ChildSponsorsTab";
import ChildReportsTab from "@/components/admin/children/ChildReportsTab";
import ChildMessagesTab from "@/components/admin/children/ChildMessagesTab";
import ChildConsentTab from "@/components/admin/children/ChildConsentTab";
import EditChildDrawer from "@/components/admin/children/EditChildDrawer";
import type { ChildProfile } from "@/components/admin/children/types";

// Re-export so page.tsx can still import ChildProfile from here
export type { ChildProfile };

type ChildProfilePageProps = {
  child: ChildProfile;
};

export default function ChildProfilePage({ child }: ChildProfilePageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="px-10 py-8">
      <ChildProfileHeader
        title="Child Profile"
        backLabel="Children"
        backHref="/admin/children"
      />

      <div className="mt-6">
        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "profile" && (
        <div className="mt-8 flex gap-10">
          {/* Left column — photo + summary cards */}
          <div className="w-[320px] shrink-0">
            <Image
              src={child.imageUrl}
              alt={child.name}
              width={320}
              height={340}
              className="h-[340px] w-full rounded-xl object-cover"
            />

            <div className="mt-4 space-y-3">
              <ChildSummaryCard label="Age" value={String(child.age)} />
              <ChildSummaryCard label="ID" value={child.id} />
              <ChildSummaryCard label="Enrolled" value={child.enrolled} />
              <ChildSummaryCard
                label="Sponsorship Status"
                value={child.sponsorshipStatus}
                valueClassName="text-green-600"
              />
            </div>
          </div>

          {/* Right column — detail sections */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-slate-800">
                {child.name}
              </h2>
              <button
                onClick={() => setIsEditOpen(true)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Edit Profile
              </button>
            </div>

            <section className="mt-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Child Details
              </h3>

              <div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-8">
                <DetailItem label="Gender" value={child.gender} />
                <DetailItem label="Date of birth" value={child.dob} />
                <DetailItem label="School level" value={child.schoolLevel} />
                <DetailItem label="Country" value={child.country} />
                <DetailItem label="Language" value={child.language} />
              </div>

              <div className="mt-8">
                <DetailItem
                  label="Biography"
                  value={child.biography}
                  multiline
                />
              </div>
            </section>

            <section className="mt-10">
              <h3 className="text-lg font-semibold text-slate-800">
                Family Details
              </h3>

              <div className="mt-6">
                <DetailItem
                  label="Family biography"
                  value={child.familyBiography}
                />
              </div>
            </section>

            <GuardianSection guardian={child.guardian} />
          </div>
        </div>
      )}

      {activeTab === "sponsors" && (
        <div className="mt-8">
          <ChildSponsorsTab child={child} />
        </div>
      )}

      {activeTab === "reports" && (
        <div className="mt-8">
          <ChildReportsTab child={child} />
        </div>
      )}

      {activeTab === "messages" && (
        <div className="mt-8">
          <ChildMessagesTab child={child} />
        </div>
      )}

      {activeTab === "consent" && (
        <div className="mt-8">
          <ChildConsentTab child={child} />
        </div>
      )}

      <EditChildDrawer
        child={child}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
