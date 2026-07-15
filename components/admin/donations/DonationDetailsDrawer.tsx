"use client";

import { Donation } from "./types";
import { formatDate } from "../sponsorships/SponsorshipTable";
import FormDrawer from "../shared/FormDrawer";
import { Frequencies } from "../sponsorships/types";
import { FREQUENCIES } from "@/lib/constants";

type Props = {
	donation: Donation | null;
	isOpen: boolean;
	onClose: () => void;
};

export default function DonationDetailsDrawer({
	donation,
	isOpen,
	onClose,
}: Props) {
	if (!donation) return null;

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={onClose}
			title="Donation Details"
			formId="donation_details"
			saveLabel="Add sponsor"
			bodyClassName="space-y-6 py-5 overflow-y-auto"
		>
			{/* Donor */}
			<section>
				<h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
					Donor
				</h3>
				<div className="grid grid-cols-2 gap-x-8 gap-y-4">
					<Detail
						label="Name"
						value={`${donation.first_name} ${donation.last_name}`}
					/>
					<Detail
						label="Country"
						value={donation.country ?? ""}
					/>
					<Detail
						label="Phone number"
						value={donation.phone_number ?? ""}
					/>
					<Detail
						label="Email"
						value={donation.email ?? ""}
					/>
				</div>
			</section>

			{/* Donation */}
			<section>
				<h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
					Donation
				</h3>
				<div className="grid grid-cols-2 gap-x-8 gap-y-4">
					<Detail
						label="Amount"
						value={donation.amount.toString()}
					/>
					<Detail
						label="Frequency"
						value={
							donation.frequency
								? FREQUENCIES[donation.frequency as Frequencies]
								: ""
						}
					/>
					<Detail
						label="Payment method"
						value={donation.payment_method}
					/>
					<Detail
						label="Date and time of donation"
						value={formatDate(donation.date_time)}
					/>
				</div>
			</section>

			<hr className="border-slate-100" />

			{/* Donation History */}
			<section>
				<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
					Donation History
				</h3>
				<p className="text-sm text-slate-400">
					No previous donations on record.
				</p>
			</section>

			<hr className="border-slate-100" />

			{/* Dedication */}
			<section>
				<p className="text-xs font-medium text-slate-500">
					Optional (but valuable)
				</p>
				<p className="mt-1 text-sm text-slate-600">
					Option to dedicate the donation (in honor or memory of someone)
				</p>
				<input
					type="text"
					placeholder="e.g. In memory of Jane Doe"
					className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
			</section>
		</FormDrawer>
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
