"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, SelectItem, Switch } from "@heroui/react";
import FormDrawer, { Field } from "../shared/FormDrawer";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { REGIONS } from "@/lib/constants";
import { Regions, EditUser, User } from "./type";
import ProfileImageUpload from "@/components/profile-image-upload";

type Props = {
	user: User | null;
	isOpen: boolean;
	onClose: () => void;
};

export default function EditUserDrawer({ user, isOpen, onClose }: Props) {
	const router = useRouter();
	const [form, setForm] = useState<EditUser | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!user) return;
		if (isOpen && user) {
			setForm({
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				role: user.role,
				region: user.organization,
				status: user.status,
				is_pending: user.status === "Pending",
			});

			setImageUrl(user.image_url ?? null);
		}
	}, [isOpen, user]);

	if (!user) return null;

	function update<K extends keyof EditUser>(key: K, value: EditUser[K]) {
		setForm((prev) => {
			if (!prev) return prev;
			return { ...prev, [key]: value };
		});
	}

	function handleClose() {
		setError(null);
		onClose();
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		if (!form) return;
		setIsSaving(true);
		setError(null);

		try {
			const res = await fetch("/api/supabase/users", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to update user.");
				return;
			}

			if (imageFile) {
				const body = new FormData();
				body.append("image", imageFile);
				body.append("targetId", form.id);
				body.append(
					"targetType",
					form.role === "Super Admin" ? "super_admins" : "admins",
				);

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body,
				});

				if (!imgRes.ok) {
					setError(`Photo upload failed for user ${form.id}`);
					return;
				}
			}

			router.refresh();
			handleClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={handleClose}
			title="Edit User"
			formId="edit-user-form"
			onSubmit={handleSave}
			isSaving={isSaving}
			error={error}
			saveLabel="Save changes"
			bodyClassName="space-y-6 py-5 overflow-y-auto"
		>
			{/* Photo Upload */}
			{user.status !== "Pending" && (
				<div>
					<ProfileImageUpload
						currentUrl={imageUrl ?? undefined}
						name={`${form?.first_name} ${form?.last_name}`.trim()}
						onChange={(file) => setImageFile(file)}
						size={200}
					/>
				</div>
			)}

			{/* User Details */}
			<section>
				<h3 className="mb-4 text-sm font-semibold text-slate-800">
					User Details
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
								classNames={filterInputCls}
								placeholder="Last name"
							/>
						</Field>
					</div>

					<Field label="Email">
						<Input
							type="text"
							value={form?.email ?? ""}
							onChange={(e) => update("email", e.target.value)}
							classNames={filterInputCls}
						/>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Role">
							<Input
								isDisabled
								type="text"
								value={form?.role ?? ""}
								classNames={filterInputCls}
							/>
						</Field>

						{(form?.role === "Admin" ||
							(form?.role === "Pending Admin" &&
								form?.status === "Active")) && (
							<Field label="Region">
								<Select
									isRequired
									placeholder="Select region"
									selectedKeys={form?.region ? [form.region] : []}
									onSelectionChange={(keys) => {
										const [value] = Array.from(keys as Set<string>);
										update("region", (value as Regions) ?? "");
									}}
									classNames={filterSelectCls}
								>
									{REGIONS.map((r) => (
										<SelectItem key={r}>{r}</SelectItem>
									))}
								</Select>
							</Field>
						)}
					</div>
					{user.status === "Pending" && (
						<div className="space-y-4 pt-5 flex items-center justify-between ">
							<p>Activate Pending Admin</p>
							<Switch
								isSelected={form?.status === "Active" ? true : false}
								size="sm"
								aria-label="homepage_visibility"
								onValueChange={(isSelected) =>
									update("status", isSelected ? "Active" : "Pending")
								}
							/>
						</div>
					)}
				</div>
			</section>
		</FormDrawer>
	);
}
