"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
} from "@heroui/react";

import { CreateChild, GenderType } from "./types";
import ProfileImageUpload from "@/components/profile-image-upload";

const COUNTRIES = ["Uganda", "Kenya", "Tanzania", "Rwanda"];
const GENDERS: GenderType[] = ["Male", "Female", "Other"];

const EMPTY_FORM: CreateChild = {
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
};

export default function AddChildDrawer({
	isOpen,
	onClose,
}: AddChildDrawerProps) {
	const router = useRouter();
	const [form, setForm] = useState<CreateChild>(EMPTY_FORM);

	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function update<K extends keyof CreateChild>(key: K, value: CreateChild[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function validate(): string | null {
		if (!form.first_name.trim()) return "First name is required.";
		if (!form.last_name.trim()) return "Last name is required.";
		if (!form.gender) return "Gender is required.";
		if (!form.date_of_birth) return "Date of birth is required.";
		if (!form.location) return "Country is required.";
		return null;
	}

	function handleClose() {
		setForm(EMPTY_FORM);
		setError(null);
		onClose();
		router.replace("/admin/children");
	}

	async function handleSave() {
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		setIsSaving(true);
		setError(null);

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
				const uploadBody = new FormData();
				uploadBody.append("image", form.photo_file);
				uploadBody.append("targetId", data.id);
				uploadBody.append("targetType", "children");

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body: uploadBody,
				});

				if (!imgRes.ok) {
					console.error("Photo upload failed for new child", data.id);
				}
			}

			router.refresh();
			handleClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={handleClose}
			size="2xl"
			placement="right"
		>
			<DrawerContent>
				{() => (
					<>
						<DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
							Add Child
						</DrawerHeader>

						<DrawerBody className="space-y-6 py-5 overflow-y-auto">
							{error && (
								<div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
									{error}
								</div>
							)}

							{/* Photo Upload */}
							<div>
								<ProfileImageUpload
									name={`${form.first_name} ${form.last_name}`.trim()}
									onChange={(file) => update("photo_file", file)}
									size={200}
								/>
							</div>

							{/* Child Details */}
							<div>
								<h3 className="mb-4 text-sm font-semibold text-slate-800">
									Child Details
								</h3>
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												First/given name
											</label>
											<input
												type="text"
												required
												value={form.first_name}
												onChange={(e) => update("first_name", e.target.value)}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="First name"
											/>
										</div>
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Last/family name
											</label>
											<input
												type="text"
												required
												value={form.last_name}
												onChange={(e) => update("last_name", e.target.value)}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="Last name"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Gender
											</label>
											<select
												required
												value={form.gender}
												onChange={(e) =>
													update("gender", e.target.value as GenderType)
												}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
											>
												<option value="">Select gender</option>
												{GENDERS.map((g) => (
													<option
														key={g}
														value={g}
													>
														{g}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Date of birth
											</label>
											<input
												type="date"
												required
												value={form.date_of_birth}
												onChange={(e) =>
													update("date_of_birth", e.target.value)
												}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Country
											</label>
											<select
												required
												value={form.location}
												onChange={(e) => update("location", e.target.value)}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
											>
												<option value="">Select country</option>
												{COUNTRIES.map((c) => (
													<option
														key={c}
														value={c}
													>
														{c}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Language
											</label>
											<input
												type="text"
												value={form.language ?? ""}
												onChange={(e) => update("language", e.target.value)}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="e.g. Luganda"
											/>
										</div>
									</div>

									<div>
										<label className="mb-1 block text-xs text-slate-500">
											Dream job
										</label>
										<input
											type="text"
											value={form.dream_job ?? ""}
											onChange={(e) => update("dream_job", e.target.value)}
											className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
										/>
									</div>
									<div>
										<label className="mb-1 block text-xs text-slate-500">
											Favorite activities
										</label>
										<input
											type="text"
											value={form.favorite_activity ?? ""}
											onChange={(e) =>
												update("favorite_activity", e.target.value)
											}
											className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
										/>
									</div>

									<div>
										<label className="mb-1 block text-xs text-slate-500">
											Biography
										</label>
										<textarea
											value={form.biography ?? ""}
											onChange={(e) => update("biography", e.target.value)}
											className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="Child's biography"
											rows={4}
										/>
									</div>
								</div>
							</div>

							{/* Family Details */}
							<div>
								<h3 className="mb-4 text-sm font-semibold text-slate-800">
									Family Details
								</h3>
								<div>
									<label className="mb-1 block text-xs text-slate-500">
										Family description
									</label>
									<textarea
										value={form.family_biography ?? ""}
										onChange={(e) => update("family_biography", e.target.value)}
										className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Describe the family background"
										rows={4}
									/>
								</div>
							</div>

							{/* Guardian */}
							<div>
								<h3 className="mb-4 text-sm font-semibold text-slate-800">
									Guardian
								</h3>
								<div className="space-y-4">
									<div>
										<label className="mb-1 block text-xs text-slate-500">
											Guardian name
										</label>
										<input
											value={form.guardian_name ?? ""}
											onChange={(e) => update("guardian_name", e.target.value)}
											className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="Full name"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Relationship
											</label>
											<input
												type="text"
												value={form.guardian_relationship ?? ""}
												onChange={(e) =>
													update("guardian_relationship", e.target.value)
												}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="e.g. Mother"
											/>
										</div>
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												NIN/ID
											</label>
											<input
												type="text"
												value={form.guardian_nin ?? ""}
												onChange={(e) => update("guardian_nin", e.target.value)}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="National ID"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Phone
											</label>
											<input
												type="tel"
												value={form.guardian_phone}
												onChange={(e) =>
													update("guardian_phone", e.target.value)
												}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="Phone number"
											/>
										</div>
										<div>
											<label className="mb-1 block text-xs text-slate-500">
												Email
											</label>
											<input
												type="email"
												value={form.guardian_email ?? ""}
												onChange={(e) =>
													update("guardian_email", e.target.value)
												}
												className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="Email address"
											/>
										</div>
									</div>

									<div>
										<label className="mb-1 block text-xs text-slate-500">
											Address
										</label>
										<input
											type="text"
											value={form.guardian_address ?? ""}
											onChange={(e) =>
												update("guardian_address", e.target.value)
											}
											className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="Full address"
										/>
									</div>
								</div>
							</div>
						</DrawerBody>

						<DrawerFooter className="border-t border-slate-200 gap-2">
							<Button
								variant="bordered"
								onPress={handleClose}
								isDisabled={isSaving}
								className="border-slate-300 text-slate-700"
							>
								Cancel
							</Button>
							<Button
								onPress={handleSave}
								isLoading={isSaving}
								className="bg-primary text-white"
							>
								Add child
							</Button>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}
