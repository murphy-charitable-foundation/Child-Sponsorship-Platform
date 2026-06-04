"use client";

import { useState } from "react";
import Link from "next/link";
import SponsorSponsorshipsTab from "./SponsorSponsorshipsTab";
import EditSponsorDrawer from "./EditSponsorDrawer";

export type SponsoredChild = {
  id: string;
  name: string;
  gender: string;
  dob: string;
  schoolLevel: string;
  country: string;
  language: string;
  biography: string;
  age: number;
  sponsorshipStartDate: string;
  sponsorshipStatus: string;
  imageUrl: string;
};

export type SponsorProfile = {
  id: string;
  firstName: string;
  lastName: string;
  sponsorType: "Individual" | "Group";
  sponsoringSince: string;
  sponsorshipStatus: "Active" | "Inactive";
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  sponsoredChildren: SponsoredChild[];
};

type TabKey = "profile" | "sponsorships" | "reports" | "messages";

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile",      label: "Profile" },
  { key: "sponsorships", label: "Sponsorships" },
  { key: "reports",      label: "Reports" },
  { key: "messages",     label: "Messages" },
];

type Props = { sponsor: SponsorProfile };

export default function SponsorProfilePage({ sponsor }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="px-10 py-8">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#004a99]">Sponsor Profile</h1>
      <Link
        href="/admin/sponsors"
        className="mt-2 flex w-fit items-center gap-1 text-sm font-medium text-[#004a99] hover:underline"
      >
        <span>←</span> Sponsors
      </Link>

      {/* Tabs */}
      <div className="mt-6 grid grid-cols-4 rounded-2xl bg-slate-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl py-2.5 text-center text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-[#004a99] text-white"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === "profile" && (
        <div className="mt-8 flex gap-10">
          {/* Left — summary cards */}
          <div className="w-[260px] shrink-0 space-y-3">
            <SummaryCard label="ID"                      value={sponsor.id} />
            <SummaryCard label="Sponsoring children since" value={sponsor.sponsoringSince} />
            <SummaryCard
              label="Sponsorship status"
              value={sponsor.sponsorshipStatus}
              valueClassName="text-green-600"
            />
          </div>

          {/* Right — details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-slate-800">
                {sponsor.firstName} {sponsor.lastName}
              </h2>
              <button
                onClick={() => setIsEditOpen(true)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Edit Profile
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-6">
              <DetailItem label="Sponsor type" value={sponsor.sponsorType} />
              <DetailItem
                label="Address"
                value={[
                  sponsor.address.line1,
                  sponsor.address.line2,
                  `${sponsor.address.city}, ${sponsor.address.state} ${sponsor.address.zip}`,
                  sponsor.address.country,
                ]
                  .filter(Boolean)
                  .join("\n")}
                multiline
              />
              <DetailItem label="Phone number" value={sponsor.phone} />
              <DetailItem label="Email"         value={sponsor.email} />
            </div>
          </div>
        </div>
      )}

      {/* Sponsorships tab */}
      {activeTab === "sponsorships" && (
        <div className="mt-8">
          <SponsorSponsorshipsTab sponsor={sponsor} />
        </div>
      )}

      {/* Placeholder tabs */}
      {activeTab !== "profile" && activeTab !== "sponsorships" && (
        <div className="mt-10 rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-400">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon.
        </div>
      )}

      <EditSponsorDrawer
        sponsor={sponsor}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-300 px-4 py-3 text-sm">
      <span className="font-semibold uppercase tracking-wide text-slate-700">{label}</span>
      <span className={valueClassName || "text-slate-800"}>{value}</span>
    </div>
  );
}

function DetailItem({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-sm text-slate-800 ${multiline ? "whitespace-pre-line" : ""}`}>
        {value}
      </p>
    </div>
  );
}
