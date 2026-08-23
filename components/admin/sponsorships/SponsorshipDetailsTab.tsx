"use client";

import { SponsorshipProfile } from "./SponsorshipProfilePage";

type DetailItemProps = {
	label: string;
	value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
	return (
		<div>
			<p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
				{label}
			</p>
			<p className="text-sm font-medium text-slate-800">{value}</p>
		</div>
	);
}

type SponsorshipDetailsTabProps = {
	sponsorship: SponsorshipProfile;
};

export default function SponsorshipDetailsTab({
	sponsorship,
}: SponsorshipDetailsTabProps) {
	const address = `${sponsorship.address}\n${sponsorship.city}, ${sponsorship.state} ${sponsorship.zipCode}`;

	return (
		<div className="space-y-6">
			{/* Title */}
			<div>
				<h3 className="text-2xl font-bold text-slate-900 mb-6">Title</h3>
			</div>

			{/* Details Grid */}
			<div className="grid grid-cols-2 gap-8 rounded-lg border border-slate-200 bg-white p-6">
				<DetailItem
					label="Sponsor type"
					value={sponsorship.sponsorType}
				/>
				<DetailItem
					label="Sponsor name"
					value={sponsorship.sponsorName}
				/>
				<DetailItem
					label="Child name"
					value={sponsorship.childName}
				/>
				<DetailItem
					label="Status"
					value={sponsorship.status}
				/>
				<DetailItem
					label="Start date"
					value={sponsorship.startDate}
				/>
				<DetailItem
					label="Sponsorship ID"
					value={sponsorship.id}
				/>
			</div>

			{/* Address Section */}
			<div className="rounded-lg border border-slate-200 bg-white p-6">
				<h3 className="text-sm font-semibold text-slate-800 mb-4">Address</h3>
				<DetailItem
					label="Full address"
					value={address}
				/>
			</div>

			{/* Contact Section */}
			<div className="rounded-lg border border-slate-200 bg-white p-6">
				<h3 className="text-sm font-semibold text-slate-800 mb-4">
					Contact Information
				</h3>
				<div className="grid grid-cols-2 gap-6">
					<DetailItem
						label="Phone number"
						value={sponsorship.phoneNumber}
					/>
					<DetailItem
						label="Email"
						value={sponsorship.email}
					/>
				</div>
			</div>
		</div>
	);
}
