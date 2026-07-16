"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, SelectItem } from "@heroui/react";
import FormDrawer, { Field } from "../shared/FormDrawer";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { REGIONS } from "@/lib/constants";
import { Role, CreateUser, Regions } from "./type";

export const EMPTY_USER_FORM: CreateUser = {
	first_name: "",
	last_name: "",
	email: "",
	role: null,
	region: null,
};

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export default function AddUserDrawer({ isOpen, onClose }: Props) {
	const router = useRouter();
	const [form, setForm] = useState<CreateUser>(EMPTY_USER_FORM);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function update<K extends keyof CreateUser>(key: K, value: CreateUser[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleClose() {
		setForm(EMPTY_USER_FORM);
		setError(null);
		onClose();
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
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
			title="Add User"
			formId="add-user-form"
			onSubmit={handleSave}
			isSaving={isSaving}
			error={error}
			saveLabel="Add user"
			bodyClassName="space-y-6 py-5 overflow-y-auto"
		>
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

					<Field label="Email">
						<Input
							type="text"
							value={form?.email}
							onChange={(e) => update("email", e.target.value)}
							classNames={filterInputCls}
						/>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Role">
							<Select
								isRequired
								placeholder="Select Role"
								selectedKeys={form.role ? [form.role] : []}
								onSelectionChange={(keys) => {
									const [value] = Array.from(keys as Set<string>);
									const role = (value as Role) ?? "";
									update("role", role);
									if (role !== "Admin") update("region", null);
								}}
								classNames={filterSelectCls}
							>
								{["Admin", "Super Admin"].map((c) => (
									<SelectItem key={c}>{c}</SelectItem>
								))}
							</Select>
						</Field>

						{form.role === "Admin" && (
							<Field label="Region">
								<Select
									isRequired
									placeholder="Select region"
									selectedKeys={form.region ? [form.region] : []}
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
				</div>
			</section>
		</FormDrawer>
	);
}
