"use client";

import { useState } from "react";
import Image from "next/image";
import { SquarePen } from "lucide-react";
import { DetailItem } from "@/components/admin/children/DetailItem";
import { GuardianSection } from "@/components/admin/children/GuardianSection";
import ChildSponsorsTab from "@/components/admin/children/ChildSponsorsTab";
import ChildReportsTab from "@/components/admin/children/ChildReportsTab";
import ChildMessagesTab from "@/components/admin/children/ChildMessagesTab";
import ChildConsentTab from "@/components/admin/children/ChildConsentTab";
import EditChildDrawer from "@/components/admin/children/EditChildDrawer";
import { ChildProfile } from "./types";
import { Avatar } from "@heroui/react";
import { TabSwitcher } from "../shared/TabSwitcher";
import { ProfileHeader } from "../shared/ProfileHeader";
import GuardianConsentDrawer from "./GuardianConsentDrawer";

type ChildProfilePageProps = {
	child: ChildProfile;
};

export type ChildTabKey =
	| "profile"
	| "sponsors"
	| "reports"
	| "messages"
	| "consent";

export const ChildTabs: { key: ChildTabKey; label: string }[] = [
	{ key: "profile", label: "Profile" },
	{ key: "sponsors", label: "Sponsors" },
	{ key: "reports", label: "Reports" },
	{ key: "messages", label: "Messages" },
	{ key: "consent", label: "Consent" },
];

export default function ChildProfilePage({
	child: initialChild,
}: ChildProfilePageProps) {
	const [child, setChild] = useState<ChildProfile>(initialChild);
	const [activeTab, setActiveTab] = useState<ChildTabKey>("profile");
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isConsentOpen, setIsConsentOpen] = useState(false);

	const childHeaderData = {
		id: child.id,
		full_name: child.full_name,
		enrolled: child.created_at,
		age: child.age,
		status: child.status,
	};

	const consentData = {
		id: child.id,
		full_name: child.guardian?.full_name,
		status: null,
		consent_date: null,
		consent_method: null,
		homepage_visibility: child.homepage_visibility,
	};

	function handleChildSaved(updated: ChildProfile) {
		setChild(updated);
	}

	return (
		<div>
			<ProfileHeader
				data={childHeaderData}
				type="Children"
				href="/admin/children"
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
					{/* Left column — photo + summary cards */}
					<div className="w-[320px] shrink-0">
						{child.image_url ? (
							<Image
								src={child.image_url}
								alt={`${child.first_name} ${child.last_name}`}
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

						<div className="min-w-0 flex-1 border p-6 rounded-md  mt-6 space-y-3  border-slate-300 bg-white">
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-semibold text-primary">
									Website visibility
								</h2>
								<button
									onClick={() => setIsConsentOpen(true)}
									className="flex items-center justify-center"
								>
									<SquarePen className="size-5 text-primary" />
								</button>
							</div>

							<section className="mt-6">
								<h3 className="text-lg font-semibold text-slate-800">
									Guardian Consent
								</h3>
							</section>
						</div>
					</div>

					{/* Right column — detail sections */}
					<div className="min-w-0 flex-1 border p-6 rounded-md bg-white">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-primary">
								Child Profile
							</h2>
							<button
								onClick={() => setIsEditOpen(true)}
								className="flex items-center justify-center"
							>
								<SquarePen className="size-5 text-primary" />
							</button>
						</div>

						<section className="mt-6">
							<h3 className="text-lg font-semibold text-slate-800">
								Child Details
							</h3>

							<div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-8">
								<DetailItem
									label="Gender"
									value={child.gender}
								/>
								<DetailItem
									label="Date of birth"
									value={child.date_of_birth}
								/>
								<DetailItem
									label="Country"
									value={child.location}
								/>
								<DetailItem
									label="Language"
									value={child.language ?? ""}
								/>
								<DetailItem
									label="Favorite activity"
									value={child.favorite_activity ?? ""}
								/>
								<DetailItem
									label="Dream job"
									value={child.dream_job ?? ""}
								/>
							</div>

							<div className="mt-8">
								<DetailItem
									label="Biography"
									value={child.biography ?? ""}
									multiline
								/>
							</div>
						</section>

						<section className="mt-10">
							<h3 className="text-lg font-semibold text-slate-800">
								Family Details
							</h3>

							<div className="mt-6">
								<DetailItem
									label="Family biography"
									value={child.family_biography ?? ""}
								/>
							</div>
						</section>

						{child.guardian && <GuardianSection guardian={child.guardian} />}
					</div>
				</div>
			)}

			{activeTab === "sponsors" && (
				<div className="mt-8">
					<ChildSponsorsTab child={child} />
				</div>
			)}

			{activeTab === "reports" && (
				<div className="mt-8">
					<ChildReportsTab />
				</div>
			)}

			{activeTab === "messages" && (
				<div className="mt-8">
					<ChildMessagesTab />
				</div>
			)}

			{activeTab === "consent" && (
				<div className="mt-8">
					<ChildConsentTab />
				</div>
			)}

			<EditChildDrawer
				child={child}
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				onSaved={handleChildSaved}
			/>

			<GuardianConsentDrawer
				data={consentData}
				isOpen={isConsentOpen}
				onClose={() => setIsConsentOpen(false)}
				onSaved={handleChildSaved}
			/>
		</div>
	);
}
