"use client";

import { useState } from "react";
import { ChildProfile } from "./types";
import { ChildTabHeader } from "./ChildTabHeader";

type SponsorTab = {
  id: string;
  name: string;
};

const sponsorTabs: SponsorTab[] = [
  { id: "SP23-0011", name: "Howard & Associates" },
  { id: "SP20-0122", name: "Michelle Smith" },
];

type ChildMessagesTabProps = {
  child: ChildProfile;
};

export default function ChildMessagesTab({ child }: ChildMessagesTabProps) {
  const [activeSponsor, setActiveSponsor] = useState(sponsorTabs[0].id);

  return (
    <div>
      <ChildTabHeader child={child} subtitle="Pending messages: 0" />

      {/* Per-sponsor underline tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {sponsorTabs.map((sponsor) => (
            <button
              key={sponsor.id}
              onClick={() => setActiveSponsor(sponsor.id)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeSponsor === sponsor.id
                  ? "border-[#004a99] text-[#004a99]"
                  : "border-transparent text-slate-600 hover:text-slate-800"
              }`}
            >
              {sponsor.name}
            </button>
          ))}
        </div>
      </div>

      {/* Message area — empty state */}
      <div className="mt-16 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm">No messages yet.</p>
      </div>
    </div>
  );
}
