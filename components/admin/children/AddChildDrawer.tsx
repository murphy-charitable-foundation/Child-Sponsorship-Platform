"use client";

import { useState } from "react";
import { ChildProfile, CreateChild, GenderType } from "./types";
import ProfileImageUpload from "@/components/profile-image-upload";
import { CHILD_COUNTRIES, GENDERS } from "@/lib/constants";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import FormDrawer, { Field } from "../shared/FormDrawer";
import {
	filterInputCls,
	filterSelectCls,
	filterTextareaCls,
} from "../shared/styleConstants";

export const EMPTY_FORM: CreateChild = {
	photo_file: null,
	first_name: "",
	last_name: "",
	gender: "",
	date_of_birth: "",
	location: "",
	language: "",
	dream_job: "",
	favorite_activity: "",
	biography: "",
	family_biography: "",
	guardian_relationship: "",
	guardian_name: "",
	guardian_nin: "",
	guardian_phone: "",
	guardian_email: "",
	guardian_address: "",
};

type AddChildDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	onSaved: (child: ChildProfile) => void;
};

export default function AddChildDrawer({
	isOpen,
	onClose,
	onSaved,
}: AddChildDrawerProps) {
	const [form, setForm] = useState<CreateChild>(EMPTY_FORM);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	function update<K extends keyof CreateChild>(key: K, value: CreateChild[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		setIsSaving(true);
		setError(null);
		setSuccess(null);

		try {
			const res = await fetch("/api/supabase/children", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to create child.");
				return;
			}

			if (form.photo_file) {
				const body = new FormData();
				body.append("image", form.photo_file);
				body.append("targetId", data.childId);
				body.append("targetType", "children");
				body.append("bucketFile", "children");

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body,
				});

				if (!imgRes.ok) {
					setError(`Photo upload failed for new child ${data.childId}`);
					return;
				}
			}

			const refreshRes = await fetch(`/api/supabase/children/${data.childId}`);

			if (refreshRes.ok) {
				const { child: createdChild } = await refreshRes.json();
				onSaved?.(createdChild);
			}

			setSuccess("Child added successfully.");
			setTimeout(onClose, 1500);
		} finally {
			setIsSaving(false);
		}
	}

	function handleClose() {
		setForm(EMPTY_FORM);
		setError(null);
		setSuccess(null);
		onClose();
	}

	const todayStr = new Date().toISOString().split("T")[0];

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={handleClose}
			title="Add Child"
			formId="add-child-form"
			onSubmit={handleSave}
			isSaving={isSaving}
			error={error}
			success={success}
			saveDisabled={!!success}
			saveLabel="Add child"
			bodyClassName="space-y-6 py-5 overflow-y-auto"
		>
			{/* Photo Upload */}
			<div>
				<ProfileImageUpload
					name={`${form.first_name} ${form.last_name}`.trim()}
					onChange={(file) => update("photo_file", file)}
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
								value={form.first_name}
								onChange={(e) => update("first_name", e.target.value)}
								classNames={filterInputCls}
								placeholder="First name"
							/>
						</Field>

						<Field label="Last/family name">
							<Input
								type="text"
								required
								value={form.last_name}
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
								value={form?.date_of_birth}
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
								value={form?.language}
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
