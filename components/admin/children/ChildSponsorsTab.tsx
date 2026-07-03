"use client";

import { useEffect, useState } from "react";
import { ChildTabHeader } from "./ChildTabHeader";
import CreateSponsorshipDrawer from "@/components/admin/sponsorships/CreateSponsorshipDrawer";
import { createClient } from "@/lib/supabase/client";

type Sponsor = {
	id: string;
	first_name: string;
	last_name: string;
	sponsor_type: string;
	photo_path?: string;
	image_url?: string;
	status: string;
	phone_number: string | null;
	email: string | null;
	address_line1: string | null;
	address_line2: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
	country: string | null;
	sponsorship_active: boolean;
	start_date_time: string;
};

type ChildSponsorsTabProps = {
	child: {
		id: string;
		full_name: string;
		image_url?: string | null;
	};
};

const supabase = createClient();

export default function ChildSponsorsTab({ child }: ChildSponsorsTabProps) {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [sponsors, setSponsors] = useState<Sponsor[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchSponsors() {
			setLoading(true);

			// embed the related sponsor row via the sponsor_id foreign key
			const { data: sponsorships, error } = await supabase
				.from("sponsorships")
				.select("sponsorship_active, start_date_time, sponsors(*)")
				.eq("child_id", child.id);

			if (error || !sponsorships) {
				setSponsors([]);
				setLoading(false);
				return;
			}

			setSponsors(
				sponsorships
					.filter((s) => s.sponsors)
					.map((s) => ({
						...(s.sponsors as unknown as Omit<
							Sponsor,
							"sponsorship_active" | "start_date_time"
						>),
						sponsorship_active: s.sponsorship_active,
						start_date_time: s.start_date_time,
					})),
			);
			setLoading(false);
		}

		fetchSponsors();
	}, [child.id]);

	return (
		<div className="space-y-6">
			<ChildTabHeader
				child={child}
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
					sponsor.country,
				].filter(Boolean) as string[];

				return (
					<div
						key={sponsor.id}
						className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
					>
						<div className="grid grid-cols-1 md:grid-cols-3">
							{/* Left section */}
							<div className="md:col-span-2 border-b md:border-b-0 md:border-r border-gray-200 p-6">
								<h3 className="text-2xl font-semibold text-gray-800">
									{sponsor.first_name} {sponsor.last_name}
								</h3>

								<div className="mt-8 grid grid-cols-1 gap-6 text-sm text-gray-700 md:grid-cols-3">
									<div>
										<p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
											Sponsor type
										</p>
										<p>{sponsor.sponsor_type}</p>
									</div>

									<div>
										<p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
											Phone number
										</p>
										<p>{sponsor.phone_number || "-"}</p>
									</div>

									<div>
										<p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
											Email
										</p>
										<p>{sponsor.email || "-"}</p>
									</div>

									<div>
										<p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
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

								<button className="mt-8 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
									Go to full profile
								</button>
							</div>

							{/* Right section */}
							<div className="p-6">
								<div className="space-y-3">
									<InfoRow
										label="ID"
										value={sponsor.id}
									/>
									<InfoRow
										label="Sponsorship start date"
										value={sponsor.start_date_time?.split("T")[0] ?? "-"}
									/>
									<InfoRow
										label="Sponsorship status"
										value={sponsor.sponsorship_active ? "Active" : "Inactive"}
										valueClassName="text-green-600"
									/>
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

function InfoRow({
	label,
	value,
	valueClassName = "text-gray-700",
}: {
	label: string;
	value: string;
	valueClassName?: string;
}) {
	return (
		<div className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-sm">
			<span className="font-semibold uppercase text-gray-500">{label}</span>
			<span className={valueClassName}>{value}</span>
		</div>
	);
}
