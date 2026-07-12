"use client";

import { useEffect, useState } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
} from "@heroui/react";
import type { ChildProfile, EditChild, GenderType } from "./types";
import { COUNTRIES, GENDERS } from "./AddChildDrawer";
import ProfileImageUpload from "@/components/profile-image-upload";

type EditChildDrawerProps = {
	child: ChildProfile | null;
	isOpen: boolean;
	onClose: () => void;
};

export default function EditChildDrawer({
	child,
	isOpen,
	onClose,
}: EditChildDrawerProps) {
	const [form, setForm] = useState<EditChild | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Reset form to current child data whenever the drawer opens
	useEffect(() => {
		if (!child) return;

		console.log(child);
		if (isOpen && child) {
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

	async function handleSave() {
		if (!form) return;
		setIsSaving(true);
		setError(null);

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

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body,
				});

				if (!imgRes.ok) {
					setError(`Photo upload failed for child ${data.id}`);
					return;
				} else {
					setImageUrl(data.image_url);
				}
			}

			setIsSaving(false);
			onClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={onClose}
			size="2xl"
			placement="right"
		>
			<DrawerContent>
				{(closeDrawer) => (
					<>
						<DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
							Edit Child
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
											<input
												type="text"
												required
												value={form?.first_name ?? ""}
												onChange={(e) => update("first_name", e.target.value)}
												className={inputCls}
												placeholder="First name"
											/>
										</Field>

										<Field label="Last/family name">
											<input
												type="text"
												required
												value={form?.last_name ?? ""}
												onChange={(e) => update("last_name", e.target.value)}
												className={inputCls}
												placeholder="Last name"
											/>
										</Field>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<Field label="Gender">
											<select
												required
												value={form?.gender ?? ""}
												onChange={(e) =>
													update("gender", e.target.value as GenderType)
												}
												className={inputCls}
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
											</select>{" "}
										</Field>

										<Field label="Date of birth">
											<input
												type="date"
												required
												value={form?.date_of_birth ?? ""}
												onChange={(e) =>
													update("date_of_birth", e.target.value)
												}
												className={inputCls}
											/>
										</Field>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<Field label="Country">
											<select
												required
												value={form?.location ?? ""}
												onChange={(e) => update("location", e.target.value)}
												className={inputCls}
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
										</Field>
										<Field label="Language">
											<input
												type="text"
												value={form?.language ?? ""}
												onChange={(e) => update("language", e.target.value)}
												className={inputCls}
												placeholder="e.g. Luganda"
											/>
										</Field>
									</div>

									<Field label="Dream job">
										<input
											type="text"
											value={form?.dream_job ?? ""}
											onChange={(e) => update("dream_job", e.target.value)}
											className={inputCls}
										/>
									</Field>
									<Field label="Favorite activities">
										<input
											type="text"
											value={form?.favorite_activity ?? ""}
											onChange={(e) =>
												update("favorite_activity", e.target.value)
											}
											className={inputCls}
										/>
									</Field>

									<Field label="Biography">
										<textarea
											value={form?.biography ?? ""}
											onChange={(e) => update("biography", e.target.value)}
											className={textareaCls}
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
									<textarea
										value={form?.family_biography ?? ""}
										onChange={(e) => update("family_biography", e.target.value)}
										className={textareaCls}
										placeholder="Describe the family background"
										rows={4}
									/>
								</Field>
							</div>

							{/* Guardian */}
							<div>
								<h3 className="mb-4 text-sm font-semibold text-slate-800">
									Guardian
								</h3>
								<div className="space-y-4">
									<Field label="Guardian name">
										<input
											value={form?.guardian_name ?? ""}
											onChange={(e) => update("guardian_name", e.target.value)}
											className={inputCls}
											placeholder="Full name"
										/>
									</Field>

									<div className="grid grid-cols-2 gap-4">
										<Field label="Relationship">
											<input
												type="text"
												value={form?.guardian_relationship ?? ""}
												onChange={(e) =>
													update("guardian_relationship", e.target.value)
												}
												className={inputCls}
												placeholder="e.g. Mother"
											/>
										</Field>
										<Field label="NIN/ID">
											<input
												type="text"
												value={form?.guardian_nin ?? ""}
												onChange={(e) => update("guardian_nin", e.target.value)}
												className={inputCls}
												placeholder="National ID"
											/>
										</Field>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<Field label="Phone">
											<input
												type="tel"
												value={form?.guardian_phone ?? ""}
												onChange={(e) =>
													update("guardian_phone", e.target.value)
												}
												className={inputCls}
												placeholder="Phone number"
											/>
										</Field>
										<Field label="Email">
											<input
												type="email"
												value={form?.guardian_email ?? ""}
												onChange={(e) =>
													update("guardian_email", e.target.value)
												}
												className={inputCls}
												placeholder="Email address"
											/>
										</Field>
									</div>

									<Field label="Address">
										<input
											type="text"
											value={form?.guardian_address ?? ""}
											onChange={(e) =>
												update("guardian_address", e.target.value)
											}
											className={textareaCls}
											placeholder="Full address"
										/>
									</Field>
								</div>
							</div>
						</DrawerBody>

						<DrawerFooter className="border-t border-slate-200">
							<Button
								variant="light"
								onPress={closeDrawer}
								className="text-slate-700"
							>
								Cancel
							</Button>
							<Button
								className="bg-primary text-white"
								onPress={handleSave}
								isLoading={isSaving}
							>
								Save changes
							</Button>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}

const inputCls =
	"w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

const textareaCls =
	"w-full resize-vertical rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<label className="block">
			<span className="mb-1 block text-xs text-slate-500">{label}</span>
			{children}
		</label>
	);
}
