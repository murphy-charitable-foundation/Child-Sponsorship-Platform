import Image from "next/image";
import { ChildTabHeader } from "../children/ChildTabHeader";
import { useEffect, useState } from "react";
import { SponsorSponsorship } from "./types";
import { Avatar } from "@heroui/react";
import CreateSponsorshipDrawer from "../sponsorships/CreateSponsorshipDrawer";

type Props = { sponsorId: string };

export default function SponsorSponsorshipsTab({ sponsorId }: Props) {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [sponsorships, setSponsorships] = useState<SponsorSponsorship[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchChildren() {
			setLoading(true);

			try {
				const res = await fetch(
					`/api/supabase/sponsorships/sponsor/${sponsorId}`,
				);

				if (!res.ok) {
					setSponsorships([]);
					return;
				}

				const { sponsorships } = await res.json();
				setSponsorships(sponsorships ?? []);
			} catch {
				setSponsorships([]);
			} finally {
				setLoading(false);
			}
		}

		fetchChildren();
	}, [sponsorId]);

	return (
		<div className="space-y-6">
			<ChildTabHeader
				subtitle={`Active sponsorships: ${sponsorships.filter((c) => c.status === "Active").length}`}
				actionLabel="Create sponsorship"
				onActionClick={() => setIsCreateOpen(true)}
			/>

			{loading && <p className="text-sm text-gray-500">Loading sponsors...</p>}

			{!loading && sponsorships.length === 0 && (
				<p className="text-sm text-gray-500">No sponsorship yet.</p>
			)}

			{sponsorships.map((s) => {
				const freq =
					s.frequency == "annual"
						? "year"
						: s.frequency === "monthly"
							? "month"
							: "one-time";

				return (
					<div
						key={s.id}
						className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6"
					>
						<div className="flex">
							{/* Left section */}
							<div className="pr-6">
								{s.child.image_url ? (
									<Image
										src={s.child.image_url}
										alt={`${s.child.first_name} ${s.child.last_name}`}
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
											{s.child.last_name} {s.child.first_name}
										</h3>
										<div className="text-sm text-slate-600 flex gap-2 pt-1">
											<p>{s.child.id}</p>
											<span>•</span>
											<p>{s.child.age} years old</p>
											<span>•</span>
											<p>enrolled {s.child.created_at.split("T")[0]}</p>
											<span>•</span>
											<p className="text-green-600 uppercase">
												{s.child.status}
											</p>
										</div>
									</div>

									{/* Right section */}
									<div>
										<p className="text-lg font-semibold">
											$ {s.amount} / {freq}
										</p>
										<p className="text-sm text-gray-400">
											Since {new Date(s.start_date_time).toLocaleDateString()}
										</p>
									</div>
								</div>

								<h3 className="mb-4  font-semibold text-slate-800 mt-6">
									Child Details
								</h3>
								<div className="mt-8 grid grid-cols-1 gap-10 text-sm text-gray-700 md:grid-cols-3">
									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Gender
										</p>
										<p>{s.child.gender}</p>
									</div>

									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Date of birth
										</p>
										<p>{s.child.date_of_birth || "-"}</p>
									</div>
									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Country
										</p>
										<p>{s.child.location || "-"}</p>
									</div>
								</div>

								<div className="mt-6 grid grid-cols-1 gap-10 text-sm text-gray-700 md:grid-cols-3">
									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Language
										</p>
										<p>{s.child.language || "-"}</p>
									</div>
									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Favorite activity
										</p>
										<p>{s.child.favorite_activity || "-"}</p>
									</div>
									<div>
										<p className="mb-1 text-xs tracking-wide text-gray-400">
											Dream job
										</p>
										<p>{s.child.dream_job || "-"}</p>
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
