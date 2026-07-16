"use client";

import { useState, useEffect } from "react";
import FormDrawer, { Field } from "../shared/FormDrawer";
import { EditSponsorship, Frequencies, Sponsorship } from "./types";
import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { FREQUENCIES } from "@/lib/constants";
import { SPS_EMPTY_FORM } from "./CreateSponsorshipDrawer";
import { formatDate } from "./SponsorshipTable";

type EditSponsorshipDrawerProps = {
	sponsorship: Sponsorship;
	isOpen: boolean;
	onClose: () => void;
};

export default function EditSponsorshipDrawer({
	sponsorship,
	isOpen,
	onClose,
}: EditSponsorshipDrawerProps) {
	const [form, setForm] = useState<EditSponsorship>(
		SPS_EMPTY_FORM as EditSponsorship,
	);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const requiresEndDate =
		form.frequency === "monthly" || form.frequency === "annual";

	useEffect(() => {
		if (!sponsorship) return;
		if (isOpen && sponsorship) {
			setError(null);
			setSuccess(null);
			setForm({
				sponsorship_id: sponsorship.sponsorship_id,
				amount: sponsorship.amount,
				frequency: sponsorship.frequency,
				start_date: formatDate(sponsorship.start_date_time),
				end_date: sponsorship.end_date_time
					? formatDate(sponsorship.end_date_time)
					: "",
			});
		}
	}, [isOpen, sponsorship]);

	function update<K extends keyof EditSponsorship>(
		key: K,
		value: EditSponsorship[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleClose() {
		setError(null);
		setSuccess(null);
		onClose();
		setForm(SPS_EMPTY_FORM as EditSponsorship);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsSaving(true);
		setError(null);
		setSuccess(null);

		try {
			const res = await fetch("/api/supabase/sponsorships", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...form,
					end_date: requiresEndDate ? form.end_date : null,
				}),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to update sponsorship.");
				return;
			}

			setSuccess("Sponsorship updated successfully.");
			setTimeout(handleClose, 1500);
		} finally {
			setIsSaving(false);
		}
	}

	if (!isOpen || !sponsorship) return null;

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={handleClose}
			title="Create Sponsorship"
			formId="create-sponsorship-form"
			onSubmit={handleSubmit}
			isSaving={isSaving}
			error={error}
			success={success}
			saveDisabled={!!success}
			saveLabel="Create sponsorship"
		>
			<section>
				<h3 className="mb-4 text-sm font-semibold text-slate-800">
					Sponsorship Details
				</h3>
				<div className="space-y-4">
					<Field label="Sponsor">
						<Input
							type="text"
							isDisabled
							value={sponsorship.sponsor_name}
							classNames={filterInputCls}
						/>
					</Field>

					<Field label="Child">
						<Input
							type="text"
							isDisabled
							value={sponsorship.child_name}
							classNames={filterInputCls}
						/>
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
								selectedKeys={[form!.frequency]}
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
