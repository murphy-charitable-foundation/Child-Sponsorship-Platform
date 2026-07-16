"use client";

import { useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { CreateSponsorship, EditSponsorship, Frequencies } from "./types";
import FormDrawer, { Field } from "../shared/FormDrawer";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { ChildTableData } from "../children/types";
import { SponsorGroupTableData, SponsorTableData } from "../sponsors/types";
import { FREQUENCIES } from "@/lib/constants";

//TODO: This is not finalized version. we need design team create UI for this.
type Option = { id: string; name: string };

type CreateSponsorshipDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const SPS_EMPTY_FORM: CreateSponsorship | EditSponsorship = {
	sponsorship_id: "",
	sponsor_id: "",
	child_id: "",
	amount: null,
	frequency: "monthly",
	start_date: "",
	end_date: "",
};

export default function CreateSponsorshipDrawer({
	isOpen,
	onClose,
}: CreateSponsorshipDrawerProps) {
	const [sponsors, setSponsors] = useState<Option[]>([]);
	const [children, setChildren] = useState<Option[]>([]);
	const [form, setForm] = useState<CreateSponsorship>(
		SPS_EMPTY_FORM as CreateSponsorship,
	);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const requiresEndDate =
		form.frequency === "monthly" || form.frequency === "annual";

	useEffect(() => {
		if (!isOpen) return;

		async function fetchSponsors() {
			try {
				const [individualsRes, groupsRes] = await Promise.all([
					fetch("/api/supabase/sponsors?tab=individuals&status=Active"),
					fetch("/api/supabase/sponsors?tab=groups&status=Active"),
				]);

				if (!individualsRes.ok || !groupsRes.ok) {
					setError("Failed to get sponsors data");
					return;
				}

				const { sponsors: individuals } = await individualsRes.json();
				const { sponsors: groups } = await groupsRes.json();

				const individualOptions = (individuals as SponsorTableData[]).map(
					(s) => ({ id: s.id, name: `${s.first_name} ${s.last_name}` }),
				);
				const groupOptions = (groups as SponsorGroupTableData[]).map((s) => ({
					id: s.id,
					name: s.group_name,
				}));

				setSponsors([...individualOptions, ...groupOptions]);
			} catch (err) {
				setError("Failed to get sponsors data");
				console.error("Failed to fetch sponsors:", err);
			}
		}

		async function fetchChildren() {
			try {
				const res = await fetch("/api/supabase/children");

				if (!res.ok) {
					setError("Failed to get children data");
					return;
				}

				const { children: data } = await res.json();

				setChildren(
					data.map((c: ChildTableData) => ({
						id: c.id,
						name: `${c.first_name} ${c.last_name}`,
					})),
				);
			} catch (err) {
				setError("Failed to get children data");
				console.error("Failed to fetch children:", err);
			}
		}

		fetchSponsors();
		fetchChildren();
	}, [isOpen]);

	function update<K extends keyof CreateSponsorship>(
		key: K,
		value: CreateSponsorship[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleClose() {
		setForm(SPS_EMPTY_FORM as CreateSponsorship);
		setError(null);
		onClose();
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		setIsSaving(true);
		setError(null);

		try {
			const res = await fetch("/api/supabase/sponsorships", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...form,
					end_date: requiresEndDate ? form.end_date : null,
				}),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to create sponsorship.");
				return;
			}

			handleClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={handleClose}
			title="Create Sponsorship"
			formId="create-sponsorship-form"
			onSubmit={handleSave}
			isSaving={isSaving}
			error={error}
			saveLabel="Create sponsorship"
		>
			<section>
				<h3 className="mb-4 text-sm font-semibold text-slate-800">
					Sponsorship Details
				</h3>
				<div className="space-y-4">
					<Field label="Sponsor">
						<Select
							isRequired
							placeholder="Select sponsor"
							selectedKeys={form.sponsor_id ? [form.sponsor_id] : []}
							onChange={(e) => update("sponsor_id", e.target.value)}
							classNames={filterSelectCls}
						>
							{sponsors.map((s) => (
								<SelectItem key={s.id}>{s.name}</SelectItem>
							))}
						</Select>
					</Field>

					<Field label="Child">
						<Select
							isRequired
							placeholder="Select child"
							selectedKeys={form.child_id ? [form.child_id] : []}
							onChange={(e) => update("child_id", e.target.value)}
							classNames={filterSelectCls}
						>
							{children.map((c) => (
								<SelectItem key={c.id}>{c.name}</SelectItem>
							))}
						</Select>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Amount ($)">
							<Input
								type="number"
								required
								value={form.amount != null ? String(form.amount) : ""}
								onChange={(e) => update("amount", e.target.value)}
								classNames={filterInputCls}
								placeholder="0"
							/>
						</Field>

						<Field label="Frequency">
							<Select
								isRequired
								selectedKeys={[form.frequency]}
								onSelectionChange={(keys) => {
									const [value] = Array.from(keys as Set<string>);
									const nextFrequency = value as Frequencies;

									update("frequency", nextFrequency);
									if (nextFrequency === "onetime") update("end_date", "");
								}}
								classNames={filterSelectCls}
							>
								{Object.entries(FREQUENCIES).map(([key, value]) => (
									<SelectItem key={key}>{value}</SelectItem>
								))}
							</Select>
						</Field>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Start date">
							<Input
								type="date"
								required
								value={form.start_date}
								onChange={(e) => update("start_date", e.target.value)}
								classNames={filterInputCls}
							/>
						</Field>

						{requiresEndDate && (
							<Field label="End date">
								<Input
									type="date"
									required
									value={form.end_date ?? ""}
									onChange={(e) => update("end_date", e.target.value)}
									classNames={filterInputCls}
								/>
							</Field>
						)}
					</div>
				</div>
			</section>
		</FormDrawer>
	);
}
