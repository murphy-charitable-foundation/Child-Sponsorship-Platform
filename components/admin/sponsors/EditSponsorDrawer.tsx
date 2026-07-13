"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { EditSponsor, SponsorProfile, SponsorType } from "./types";
import { SP_COUNTRIES } from "./AddIndividualForm";
import ProfileImageUpload from "@/components/profile-image-upload";
import { GROUP_TYPES } from "./AddGroupForm";
import FormDrawer, { Field, inputCls } from "../shared/FormDrawer";

type EditSponsorDrawerProps = {
	sponsor: SponsorProfile | null;
	isOpen: boolean;
	onClose: () => void;
	onSaved?: (sponsor: SponsorProfile) => void;
};

export default function EditSponsorDrawer({
	sponsor,
	isOpen,
	onClose,
	onSaved,
}: EditSponsorDrawerProps) {
	const [form, setForm] = useState<EditSponsor | null>(null);
	const [sponsorType, setSponsorType] = useState<"individual" | "group">(
		"individual",
	);
	const [isSaving, setIsSaving] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!sponsor) return;
		if (isOpen && sponsor) {
			setForm({
				id: sponsor.id,
				first_name: sponsor.first_name,
				last_name: sponsor.last_name,
				sponsor_type: sponsor.sponsor_type,
				group_name: sponsor.group_name,
				address_line1: sponsor.address_line1,
				address_line2: sponsor.address_line2,
				city: sponsor.city,
				state: sponsor.state,
				zip: sponsor.zip,
				country: sponsor.country,
				phone_number: sponsor.phone_number,
				email: sponsor.email,
				job_title: sponsor.job_title,
			});
			setSponsorType(
				sponsor.sponsor_type === "individual" ? "individual" : "group",
			);

			if (sponsor.image_url) {
				setImageUrl(sponsor.image_url);
			}
		}
	}, [isOpen, sponsor]);

	function update<K extends keyof EditSponsor>(key: K, value: EditSponsor[K]) {
		setForm((prev) => {
			if (!prev) return prev;
			return { ...prev, [key]: value };
		});
	}

	function handleClose() {
		setError(null);
		onClose();
	}

	function handleSponsorTypeUpdate(type: "individual" | "group") {
		setSponsorType(type);

		if (type === "individual") {
			update("sponsor_type", type);
		}
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		if (!form) return;
		setIsSaving(true);
		setError(null);

		try {
			const res = await fetch("/api/supabase/sponsors", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to update sponsor.");
				return;
			}

			if (imageFile) {
				const body = new FormData();
				body.append("image", imageFile);
				body.append("targetId", form.id);
				body.append("targetType", "sponsors");

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body,
				});

				if (!imgRes.ok) {
					setError(`Photo upload failed for child ${data.id}`);
					return;
				}
			}

			const refreshRes = await fetch(`/api/supabase/sponsor/${form.id}`);

			if (refreshRes.ok) {
				const { sponsor: updatedSponsor } = await refreshRes.json();
				setImageUrl(updatedSponsor.image_url ?? null);
				onSaved?.(updatedSponsor);
			}

			onClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={handleClose}
			title="Edit Sponsor"
			formId="edit-sponsor-form"
			onSubmit={handleSave}
			isSaving={isSaving}
			error={error}
			saveLabel="Save changes"
		>
			{/* Sponsor Type */}
			<div>
				<p className="mb-3 text-xs font-semibold tracking-wide text-slate-500">
					Sponsor Type
				</p>
				<div className="flex w-full">
					<button
						type="button"
						onClick={() => handleSponsorTypeUpdate("individual")}
						className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-l-md border px-5 text-sm font-medium transition-colors ${
							sponsorType === "individual"
								? "border-primary bg-primary text-white"
								: "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
						}`}
					>
						<span>
							<Image
								src="/individual.svg"
								alt=""
								width={10}
								height={18}
								className="h-[18px] w-[10px]"
							/>
						</span>
						Individual
					</button>
					<button
						type="button"
						onClick={() => handleSponsorTypeUpdate("group")}
						className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-r-md border px-5 text-sm font-medium transition-colors ${
							sponsorType === "group"
								? "border-primary bg-primary text-white"
								: "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
						}`}
					>
						<span>
							<Image
								src="/groups.svg"
								alt=""
								width={25}
								height={18}
								className="h-[18px] w-[25px]"
							/>
						</span>
						Group
					</button>
				</div>
			</div>

			{/* Photo Upload */}
			<div>
				<ProfileImageUpload
					currentUrl={imageUrl ?? undefined}
					name={`${form?.first_name} ${form?.last_name}`.trim()}
					onChange={(file) => setImageFile(file)}
					size={200}
				/>
			</div>

			{/* Group type — only when Group selected */}
			{sponsorType === "group" && (
				<section>
					<h3 className="mb-4 text-base font-semibold text-slate-900">
						Group Details
					</h3>
					<div className="space-y-3">
						<Field label="Group type">
							<select
								className={inputCls}
								value={form?.sponsor_type ?? ""}
								onChange={(e) =>
									update("sponsor_type", e.target.value as SponsorType)
								}
							>
								<option value="">Select group description</option>
								{GROUP_TYPES.map((t) => (
									<option
										key={t.key}
										value={t.key}
									>
										{t.label}
									</option>
								))}
							</select>
						</Field>
						<Field label="Group name">
							<input
								className={inputCls}
								value={form?.group_name ?? ""}
								onChange={(e) => update("group_name", e.target.value)}
							/>
						</Field>
					</div>
				</section>
			)}

			{/* Name and Address */}
			<section>
				<h3 className="mb-4 text-base font-semibold text-slate-900">
					Name and Address
				</h3>
				<div className="space-y-3">
					<div className="grid grid-cols-2 gap-3">
						<Field label="First name">
							<input
								className={inputCls}
								value={form?.first_name ?? ""}
								onChange={(e) => update("first_name", e.target.value)}
							/>
						</Field>
						<Field label="Last name">
							<input
								className={inputCls}
								value={form?.last_name ?? ""}
								onChange={(e) => update("last_name", e.target.value)}
							/>
						</Field>
					</div>
					<Field label="Address line 1">
						<input
							className={inputCls}
							value={form?.address_line1 ?? ""}
							onChange={(e) => update("address_line1", e.target.value)}
						/>
					</Field>
					<Field label="Address line 2">
						<input
							className={inputCls}
							value={form?.address_line2 ?? ""}
							onChange={(e) => update("address_line2", e.target.value)}
						/>
					</Field>
					<div className="grid grid-cols-2 gap-3">
						<Field label="City">
							<input
								className={inputCls}
								value={form?.city ?? ""}
								onChange={(e) => update("city", e.target.value)}
							/>
						</Field>
						<Field label="State/Province">
							<input
								className={inputCls}
								value={form?.state ?? ""}
								onChange={(e) => update("state", e.target.value)}
							/>
						</Field>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<Field label="Zip/postal code">
							<input
								className={inputCls}
								value={form?.zip ?? ""}
								onChange={(e) => update("zip", e.target.value)}
							/>
						</Field>
						<Field label="Country">
							<select
								className={inputCls}
								value={form?.country ?? ""}
								onChange={(e) => update("country", e.target.value)}
							>
								<option value="">Select country</option>
								{SP_COUNTRIES.map((c) => (
									<option key={c}>{c}</option>
								))}
							</select>
						</Field>
					</div>
				</div>
			</section>

			{/* Contact Information */}
			<section>
				<h3 className="mb-4 text-base font-semibold text-slate-900">
					Contact Information
				</h3>
				<div className="grid grid-cols-2 gap-3 mb-4">
					<Field label="Phone number">
						<input
							type="tel"
							className={inputCls}
							value={form?.phone_number ?? ""}
							onChange={(e) => update("phone_number", e.target.value)}
						/>
					</Field>
					<Field label="Email">
						<input
							type="email"
							className={inputCls}
							value={form?.email ?? ""}
							onChange={(e) => update("email", e.target.value)}
						/>
					</Field>
				</div>

				{sponsorType === "group" && (
					<Field label="Job title">
						<input
							className={inputCls}
							value={form?.job_title ?? ""}
							onChange={(e) => update("job_title", e.target.value)}
						/>
					</Field>
				)}
			</section>
		</FormDrawer>
	);
}
