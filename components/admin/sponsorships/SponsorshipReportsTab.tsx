"use client";

import { SponsorshipProfile } from "./SponsorshipProfilePage";

type SponsorshipReportsTabProps = {
  sponsorship: SponsorshipProfile;
};

export default function SponsorshipReportsTab({
  sponsorship,
}: SponsorshipReportsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-slate-600">
          Reports and documentation for sponsorship{" "}
          <span className="font-semibold">{sponsorship.id}</span>
        </p>
      </div>
    </div>
  );
}
