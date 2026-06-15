import Image from "next/image";
import Link from "next/link";
import type { SponsorProfile, SponsoredChild } from "./SponsorProfilePage";

type Props = { sponsor: SponsorProfile };

export default function SponsorSponsorshipsTab({ sponsor }: Props) {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold text-slate-800">
            {sponsor.firstName} {sponsor.lastName}
          </p>
          <p className="text-sm text-slate-500">
            Active sponsorships: {sponsor.sponsoredChildren.length}
          </p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          Create sponsorship
        </button>
      </div>

      {/* Child cards */}
      <div className="space-y-4">
        {sponsor.sponsoredChildren.map((child) => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
    </div>
  );
}

function ChildCard({ child }: { child: SponsoredChild }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex gap-6 p-6">
        {/* Photo */}
        <div className="shrink-0">
          <Image
            src={child.imageUrl}
            alt={child.name}
            width={160}
            height={160}
            className="h-40 w-40 rounded-xl object-cover"
          />
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-800">{child.name}</h3>

          <div className="mt-3 grid grid-cols-3 gap-x-8 gap-y-3">
            <Detail label="Gender"       value={child.gender} />
            <Detail label="Date of birth" value={child.dob} />
            <Detail label="School level"  value={child.schoolLevel} />
            <Detail label="Country"       value={child.country} />
            <Detail label="Language"      value={child.language} />
          </div>

          <div className="mt-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Biography</p>
            <p className="mt-1 line-clamp-3 text-sm text-slate-700 whitespace-pre-line">
              {child.biography}
            </p>
          </div>

          {/* Summary row */}
          <div className="mt-4 flex flex-wrap gap-3">
            <SummaryChip label="Age"                   value={String(child.age)} />
            <SummaryChip label="ID"                    value={child.id} />
            <SummaryChip label="Sponsorship start date" value={child.sponsorshipStartDate} />
            <SummaryChip
              label="Sponsorship status"
              value={child.sponsorshipStatus}
              green={child.sponsorshipStatus === "Active"}
            />
          </div>

          <Link
            href={`/admin/children/${child.id}`}
            className="mt-4 inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Go to full profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-800">{value}</p>
    </div>
  );
}

function SummaryChip({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-xs">
      <span className="font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <span className={`ml-3 ${green ? "text-green-600" : "text-slate-700"}`}>{value}</span>
    </div>
  );
}
