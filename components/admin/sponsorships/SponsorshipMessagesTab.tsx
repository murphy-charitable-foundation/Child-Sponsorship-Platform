"use client";

import { SponsorshipProfile } from "./SponsorshipProfilePage";

type SponsorshipMessagesTabProps = {
	sponsorship: SponsorshipProfile;
};

export default function SponsorshipMessagesTab({
	sponsorship,
}: SponsorshipMessagesTabProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-slate-900">Messages</h2>
			<div className="rounded-lg border border-slate-200 bg-white p-6">
				<p className="text-slate-600">
					Communication history for sponsorship
					<span className="font-semibold">{sponsorship.id}</span>
				</p>
			</div>
		</div>
	);
}
