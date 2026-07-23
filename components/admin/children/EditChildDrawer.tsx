"use client";

import { useEffect, useState } from "react";
import type { ChildProfile, EditChild, GenderType } from "./types";
import ProfileImageUpload from "@/components/profile-image-upload";
import FormDrawer, { Field } from "../shared/FormDrawer";
import { CHILD_COUNTRIES, GENDERS } from "@/lib/constants";
import {
	filterInputCls,
	filterSelectCls,
	filterTextareaCls,
} from "../shared/styleConstants";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";

type EditChildDrawerProps = {
	child: ChildProfile | null;
	isOpen: boolean;
	onClose: () => void;
	onSaved: (child: ChildProfile) => void;
};

export default function EditChildDrawer({
	child,
	isOpen,
	onClose,
	onSaved,
}: EditChildDrawerProps) {
	const [form, setForm] = useState<EditChild | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	// Reset form to current child data whenever the drawer opens
	useEffect(() => {
		if (!child) return;
		if (isOpen && child) {
			setError(null);
			setSuccess(null);
			setForm({
				id: child.id,
				first_name: child.first_name ?? "",
				last_name: child.last_name ?? "",
				gender: child.gender ?? "",
				date_of_birth: child.date_of_birth ?? "",
				location: child.location ?? "",
				language: child.language ?? "",
				biography: child.biography ?? "",
				dream_job: child.dream_job ?? "",
				favorite_activity: child.favorite_activity ?? "",
				family_biography: child.family_biography ?? "",
				guardian_id: child.guardian?.id ?? "",
				guardian_name: child.guardian?.full_name ?? "",
				guardian_relationship: child.guardian?.relationship ?? "",
				guardian_nin: child.guardian?.nin ?? "",
				guardian_phone: child.guardian?.phone ?? "",
				guardian_email: child.guardian?.email ?? "",
				guardian_address: child.guardian?.address ?? "",
			});

			if (child.image_url) {
				setImageUrl(child.image_url);
			}
		}
	}, [isOpen, child]);

	function update<K extends keyof EditChild>(key: K, value: EditChild[K]) {
		setForm((prev) => {
			if (!prev) return prev;
			return { ...prev, [key]: value };
		});
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		if (!form) return;
		setIsSaving(true);
		setError(null);
		setSuccess(null);

		try {
			const res = await fetch("/api/supabase/children", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to update child.");
				return;
			}

			if (imageFile) {
				const body = new FormData();
				body.append("image", imageFile);
				body.append("targetId", form.id);
				body.append("targetType", "children");
				body.append("bucketFile", "children");

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body,
				});

				if (!imgRes.ok) {
					setError(`Photo upload failed for child ${data.id}`);
					return;
				}
			}

			const refreshRes = await fetch(`/api/supabase/children/${data.childId}`);

			if (refreshRes.ok) {
				const { child: updatedChild } = await refreshRes.json();
				setImageUrl(updatedChild.image_url ?? null);
				onSaved?.(updatedChild);
			}

			setSuccess("Child updated successfully.");
			setTimeout(onClose, 1500);
		} finally {
			setIsSaving(false);
		}
	}

	const todayStr = new Date().toISOString().split("T")[0];

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={onClose}
			title="Edit Child"
			formId="edit-child-form"
			onSubmit={handleSave}
			isSaving={isSaving}
			error={error}
			success={success}
			saveDisabled={!!success}
			saveLabel="Save changes"
			bodyClassName="space-y-6 py-5 overflow-y-auto"
		>
			{/* Photo Upload */}
			<div>
				<ProfileImageUpload
					currentUrl={imageUrl ?? undefined}
					name={`${form?.first_name} ${form?.last_name}`.trim()}
					onChange={(file) => setImageFile(file)}
					size={200}
				/>
			</div>

			{/* Child Details */}
			<section>
				<h3 className="mb-4 text-sm font-semibold text-slate-800">
					Child Details
				</h3>
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<Field label="First/given name">
							<Input
								type="text"
								required
								value={form?.first_name ?? ""}
								onChange={(e) => update("first_name", e.target.value)}
								classNames={filterInputCls}
								placeholder="First name"
							/>
						</Field>

						<Field label="Last/family name">
							<Input
								type="text"
								required
								value={form?.last_name ?? ""}
								onChange={(e) => update("last_name", e.target.value)}
								classNames={filterInputCls}
								placeholder="Last name"
							/>
						</Field>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Gender">
							<Select
								isRequired
								aria-label="Gender"
								placeholder="Select gender"
								selectedKeys={form?.gender ? [form.gender] : []}
								onSelectionChange={(keys) => {
									const [value] = Array.from(keys as Set<string>);

									update("gender", (value as GenderType) ?? "");
								}}
								classNames={filterSelectCls}
							>
								{GENDERS.map((g) => (
									<SelectItem key={g}>{g}</SelectItem>
								))}
							</Select>
						</Field>

						<Field label="Date of birth">
							<Input
								type="date"
								required
								max={todayStr}
								value={form?.date_of_birth ?? ""}
								onChange={(e) => update("date_of_birth", e.target.value)}
								classNames={filterInputCls}
							/>
						</Field>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Country">
							<Select
								isRequired
								aria-label="Country"
								placeholder="Select country"
								selectedKeys={form?.location ? [form.location] : []}
								onSelectionChange={(keys) => {
									const [value] = Array.from(keys as Set<string>);

									update("location", value ?? "");
								}}
								classNames={filterSelectCls}
							>
								{CHILD_COUNTRIES.map((c) => (
									<SelectItem key={c}>{c}</SelectItem>
								))}
							</Select>
						</Field>
						<Field label="Language">
							<Input
								type="text"
								value={form?.language ?? ""}
								onChange={(e) => update("language", e.target.value)}
								classNames={filterInputCls}
								placeholder="e.g. Luganda"
							/>
						</Field>
					</div>

					<Field label="Dream job">
						<Input
							type="text"
							value={form?.dream_job ?? ""}
							onChange={(e) => update("dream_job", e.target.value)}
							classNames={filterInputCls}
						/>
					</Field>
					<Field label="Favorite activities">
						<Input
							type="text"
							value={form?.favorite_activity ?? ""}
							onChange={(e) => update("favorite_activity", e.target.value)}
							classNames={filterInputCls}
						/>
					</Field>

					<Field label="Biography">
						<Textarea
							value={form?.biography ?? ""}
							onChange={(e) => update("biography", e.target.value)}
							classNames={filterTextareaCls}
							placeholder="Child's biography"
							rows={4}
						/>
					</Field>
				</div>
			</section>

			{/* Family Details */}
			<div>
				<h3 className="mb-4 text-sm font-semibold text-slate-800">
					Family Details
				</h3>
				<Field label="Family description">
					<Textarea
						value={form?.family_biography ?? ""}
						onChange={(e) => update("family_biography", e.target.value)}
						classNames={filterTextareaCls}
						placeholder="Describe the family background"
						rows={4}
					/>
				</Field>
			</div>

			{/* Guardian */}
			<div>
				<h3 className="mb-4 text-sm font-semibold text-slate-800">Guardian</h3>
				<div className="space-y-4">
					<Field label="Guardian name">
						<Input
							value={form?.guardian_name ?? ""}
							onChange={(e) => update("guardian_name", e.target.value)}
							classNames={filterInputCls}
							placeholder="Full name"
						/>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Relationship">
							<Input
								type="text"
								value={form?.guardian_relationship ?? ""}
								onChange={(e) =>
									update("guardian_relationship", e.target.value)
								}
								classNames={filterInputCls}
								placeholder="e.g. Mother"
							/>
						</Field>
						<Field label="NIN/ID">
							<Input
								type="text"
								value={form?.guardian_nin ?? ""}
								onChange={(e) => update("guardian_nin", e.target.value)}
								classNames={filterInputCls}
								placeholder="National ID"
							/>
						</Field>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Phone">
							<Input
								type="tel"
								value={form?.guardian_phone ?? ""}
								onChange={(e) => update("guardian_phone", e.target.value)}
								classNames={filterInputCls}
								placeholder="Phone number"
							/>
						</Field>
						<Field label="Email">
							<Input
								type="email"
								value={form?.guardian_email ?? ""}
								onChange={(e) => update("guardian_email", e.target.value)}
								classNames={filterInputCls}
								placeholder="Email address"
							/>
						</Field>
					</div>

					<Field label="Address">
						<Input
							type="text"
							value={form?.guardian_address ?? ""}
							onChange={(e) => update("guardian_address", e.target.value)}
							classNames={filterInputCls}
							placeholder="Full address"
						/>
					</Field>
				</div>
			</div>
		</FormDrawer>
	);
}
