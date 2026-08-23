"use client";

import { SponsorshipProfile } from "./SponsorshipProfilePage";

type SponsorshipSponsorshipsTabProps = {
	sponsorship: SponsorshipProfile;
};

export default function SponsorshipSponsorshipsTab({
	sponsorship,
}: SponsorshipSponsorshipsTabProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-slate-900">Sponsorships</h2>
			<div className="rounded-lg border border-slate-200 bg-white p-6">
				<p className="text-slate-600">
					Sponsorship details and history for{" "}
					<span className="font-semibold">{sponsorship.sponsorName}</span>
				</p>
			</div>
		</div>
	);
}
