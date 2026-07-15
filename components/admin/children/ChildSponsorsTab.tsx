"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "@heroui/react";
import { ChildTabHeader } from "./ChildTabHeader";
import CreateSponsorshipDrawer from "@/components/admin/sponsorships/CreateSponsorshipDrawer";

import { ChildSponsor } from "./types";
import { SPONSOR_TYPE_LABELS } from "@/lib/constants";

type ChildSponsorsTabProps = {
	childId: string;
};

export function formatSinceDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default function ChildSponsorsTab({ childId }: ChildSponsorsTabProps) {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [sponsors, setSponsors] = useState<ChildSponsor[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchSponsors() {
			setLoading(true);

			try {
				const res = await fetch(`/api/supabase/sponsorships/child/${childId}`);

				if (!res.ok) {
					setSponsors([]);
					return;
				}

				const { sponsors } = await res.json();
				setSponsors(sponsors ?? []);
			} catch {
				setSponsors([]);
			} finally {
				setLoading(false);
			}
		}

		fetchSponsors();
	}, [childId]);

	return (
		<div className="space-y-6">
			<ChildTabHeader
				subtitle={`Active sponsors: ${sponsors.filter((s) => s.sponsorship_active).length}`}
				actionLabel="Create sponsorship"
				onActionClick={() => setIsCreateOpen(true)}
			/>

			{loading && <p className="text-sm text-gray-500">Loading sponsors...</p>}

			{!loading && sponsors.length === 0 && (
				<p className="text-sm text-gray-500">No sponsors yet.</p>
			)}

			{sponsors.map((sponsor) => {
				const address = [
					sponsor.address_line1,
					sponsor.address_line2,
					[sponsor.city, sponsor.state, sponsor.zip].filter(Boolean).join(", "),
				].filter(Boolean) as string[];

				const isGroupSponsor = sponsor.sponsor_type !== "individual";

				const freq =
					sponsor.frequency == "annual"
						? "year"
						: sponsor.frequency === "monthly"
							? "month"
							: "one-time";

				return (
					<div
						key={sponsor.id}
						className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6"
					>
						<div className="flex">
							{/* Left section */}
							<div className="pr-6">
								{sponsor.image_url ? (
									<Image
										src={sponsor.image_url}
										alt={`${sponsor.first_name} ${sponsor.last_name}`}
										className="object-cover object-[center_30%] h-[120px] w-[120px] rounded-xl "
										width={120}
										height={120}
										unoptimized
										loading="eager"
									/>
								) : (
									<Avatar
										radius="none"
										color="primary"
										className="object-cover object-[center_30%] h-[120px] w-[120px] rounded-xl "
									/>
								)}
							</div>

							<div className="flex-1">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="text-2xl font-semibold text-gray-800">
											{!isGroupSponsor
												? `${sponsor.first_name} ${sponsor.last_name}`
												: sponsor.group_name}
										</h3>
										<div className="text-sm text-slate-600 flex gap-2 pt-1">
											<p>{SPONSOR_TYPE_LABELS[sponsor.sponsor_type]}</p>
											<span>•</span>
											<p>{sponsor.id}</p>
											<span>•</span>
											<p className="text-green-600 uppercase">
												{sponsor.sponsorship_active ? "active" : "inactive"}
											</p>
										</div>
									</div>

									{/* Right section */}
									<div>
										<p className="text-lg font-semibold">
											$ {sponsor.amount} / {freq}
										</p>
										<p className="text-sm text-gray-400">
											Since {formatSinceDate(sponsor.start_date_time)}
										</p>
									</div>
								</div>

								<div className="mt-8 grid grid-cols-1 gap-10 text-sm text-gray-700 md:grid-cols-3">
									{isGroupSponsor && (
										<div>
											<p className="mb-1 text-xs tracking-wide text-gray-400">
												Primary contact
											</p>
											<p>
												{sponsor.first_name} {sponsor.last_name}
											</p>
										</div>
									)}

									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Phone number
										</p>
										<p>{sponsor.phone_number || "-"}</p>
									</div>

									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Email
										</p>
										<p>{sponsor.email || "-"}</p>
									</div>
								</div>

								<div className="mt-6 grid grid-cols-1 gap-10 text-sm text-gray-700 md:grid-cols-3">
									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Country
										</p>
										<p>{sponsor.country || "-"}</p>
									</div>

									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Address
										</p>
										<div className="space-y-1">
											{address.length > 0 ? (
												address.map((line, index) => <p key={index}>{line}</p>)
											) : (
												<p>-</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}

			<CreateSponsorshipDrawer
				isOpen={isCreateOpen}
				onClose={() => setIsCreateOpen(false)}
			/>
		</div>
	);
}
