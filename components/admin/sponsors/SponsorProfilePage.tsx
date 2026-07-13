"use client";

import { useState } from "react";
import Image from "next/image";
import SponsorSponsorshipsTab from "./SponsorSponsorshipsTab";
import EditSponsorDrawer from "./EditSponsorDrawer";
import { SponsorProfile, SPONSOR_TYPE_LABELS } from "./types";
import { ProfileHeader } from "../shared/ProfileHeader";
import { ProfileTabs } from "../shared/ProfileTabs";
import { Avatar } from "@heroui/react";
import { SquarePen } from "lucide-react";
import { DetailItem } from "../children/DetailItem";

type Props = { sponsor: SponsorProfile };

export type SPTabKey = "profile" | "sponsorships" | "reports" | "messages";

export const SPTabs: { key: SPTabKey; label: string }[] = [
	{ key: "profile", label: "Profile" },
	{ key: "sponsorships", label: "Sponsorships" },
	{ key: "reports", label: "Reports" },
	{ key: "messages", label: "Messages" },
];

export default function SponsorProfilePage({ sponsor: initialSponsor }: Props) {
	const [sponsor, setSponsor] = useState<SponsorProfile>(initialSponsor);
	const [activeTab, setActiveTab] = useState<SPTabKey>("profile");
	const [isEditOpen, setIsEditOpen] = useState(false);

	const sponsorHeaderData = {
		id: sponsor.id,
		full_name:
			sponsor.sponsor_type === "individual"
				? `${sponsor.first_name} ${sponsor.last_name}`
				: (sponsor.group_name ?? ""),
		enrolled: sponsor.created_at,
		status: sponsor.status,
	};

	function handleSponsorSaved(updated: SponsorProfile) {
		setSponsor(updated);
	}

	return (
		<div className="px-10 py-8">
			{/* Header */}
			<ProfileHeader
				data={sponsorHeaderData}
				type="sponsor"
				href="/admin/sponsors"
			/>

			{/* Tabs */}
			<div className="mt-6">
				<ProfileTabs
					tabs={SPTabs}
					activeTab={activeTab}
					onChange={setActiveTab}
				/>
			</div>

			{/* Profile tab */}
			{activeTab === "profile" && (
				<div className="mt-8 flex gap-10">
					{/* Left — summary cards */}
					<div className="w-[320px] shrink-0">
						{sponsor.image_url ? (
							<Image
								src={sponsor.image_url}
								alt={`${sponsor.first_name} ${sponsor.last_name}`}
								className="object-cover object-[center_30%] h-[340px] w-full rounded-xl "
								width={320}
								height={340}
								unoptimized
								loading="eager"
							/>
						) : (
							<Avatar
								radius="none"
								color="primary"
								className="object-cover object-[center_30%] h-[340px] w-full rounded-xl "
							/>
						)}
					</div>

					{/* Right — details */}
					<div className="min-w-0 flex-1 border p-6 rounded-md bg-white">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-primary">
								Sponsor Profile
							</h2>
							<button
								onClick={() => setIsEditOpen(true)}
								className="flex items-center justify-center"
							>
								<SquarePen className="size-5 text-primary" />
							</button>
						</div>

						<section className="mt-6">
							<div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-8">
								<DetailItem
									label="Sponsor type"
									value={SPONSOR_TYPE_LABELS[sponsor.sponsor_type]}
								/>

								{sponsor.sponsor_type == "individual" && (
									<>
										<DetailItem
											label="Phone Number"
											value={sponsor.phone_number ?? ""}
										/>
										<DetailItem
											label="Email"
											value={sponsor.email ?? ""}
										/>
									</>
								)}
								<DetailItem
									label="Country"
									value={sponsor.country}
								/>

								<DetailItem
									label="address"
									value={[
										sponsor.address_line2,
										sponsor.address_line1,
										sponsor.city,
										sponsor.state,
										sponsor.zip,
									]
										.filter(Boolean)
										.join(" ")}
								/>
							</div>
						</section>

						{sponsor.sponsor_type !== "individual" && (
							<section className="mt-6">
								<h3 className="text-lg font-semibold text-slate-800">
									Group Primary Contact Details
								</h3>
								<div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-8">
									<DetailItem
										label="Group name"
										value={sponsor.group_name ?? ""}
									/>
									<DetailItem
										label="First name"
										value={sponsor.first_name ?? ""}
									/>
									<DetailItem
										label="Last name"
										value={sponsor.last_name ?? ""}
									/>
									<DetailItem
										label="Phone number"
										value={sponsor.phone_number ?? ""}
									/>
									<DetailItem
										label="Email"
										value={sponsor.email ?? ""}
									/>
									<DetailItem
										label="Job title"
										value={sponsor.job_title ?? ""}
									/>
								</div>
							</section>
						)}
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
					{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content
					coming soon.
				</div>
			)}

			<EditSponsorDrawer
				sponsor={sponsor}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleSponsorSaved}
			/>
		</div>
	);
}
