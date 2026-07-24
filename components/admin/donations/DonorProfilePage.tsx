"use client";

import { useState } from "react";
import { DetailItem } from "@/components/admin/children/DetailItem";
import { TabSwitcher } from "../shared/TabSwitcher";
import { ProfileHeader } from "../shared/ProfileHeader";
import { Donation } from "./types";

type Props = {
	donor: Donation;
};

export type DonorTabKey = "profile" | "donation_history";

export const ChildTabs: { key: DonorTabKey; label: string }[] = [
	{ key: "profile", label: "Profile" },
	{ key: "donation_history", label: "Donation History" },
];

export default function DonorProfilePage({ donor }: Props) {
	const [activeTab, setActiveTab] = useState<DonorTabKey>("profile");

	const donorHeaderData = {
		full_name: `${donor.first_name} ${donor.last_name}`,
		country: donor.country,
	};

	return (
		<div>
			<ProfileHeader
				data={donorHeaderData}
				type="Donors"
				href="/admin/donations"
			/>

			<div className="mt-6">
				<TabSwitcher
					tabs={ChildTabs}
					activeTab={activeTab}
					onChange={setActiveTab}
				/>
			</div>

			{activeTab === "profile" && (
				<div className="mt-8 flex gap-10">
					{/* Right column — detail sections */}
					<div className="min-w-0 flex-1 border p-6 rounded-md bg-white">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-primary">
								Donor Profile
							</h2>
						</div>

						<section className="mt-6">
							<div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-8">
								<DetailItem
									label="Email"
									value={donor.email ?? ""}
								/>
								<DetailItem
									label="Country"
									value={donor.country ?? ""}
								/>
							</div>
						</section>
					</div>
				</div>
			)}

			{activeTab === "donation_history" && <div className="mt-8"></div>}
		</div>
	);
}
