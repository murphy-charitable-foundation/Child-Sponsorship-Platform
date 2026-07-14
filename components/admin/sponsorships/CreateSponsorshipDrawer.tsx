"use client";

import { useEffect, useState } from "react";
import { Frequencies } from "./types";
import FormDrawer, { Field, inputCls } from "../shared/FormDrawer";
import { ChildTableData } from "../children/types";
import { SponsorGroupTableData, SponsorTableData } from "../sponsors/types";

const FREQUENCIES: { value: Frequencies; label: string }[] = [
	{ value: "monthly", label: "Monthly" },
	{ value: "annual", label: "Annual" },
		{ value: "onetime", label: "One-time" },
];

type Option = { id: string; name: string };

type CreateSponsorshipDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function CreateSponsorshipDrawer({
	isOpen,
	onClose,
}: CreateSponsorshipDrawerProps) {
	const [sponsors, setSponsors] = useState<Option[]>([]);
	const [children, setChildren] = useState<Option[]>([]);
	const [sponsorId, setSponsorId] = useState("");
	const [childId, setChildId] = useState("");
	const [amount, setAmount] = useState("");
	const [frequency, setFrequency] = useState<Frequencies>("monthly");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const requiresEndDate = frequency === "monthly" || frequency === "annual";

	useEffect(() => {
		if (!isOpen) return;

		async function fetchSponsors() {
			try {
				const [individualsRes, groupsRes] = await Promise.all([
					fetch("/api/supabase/sponsors?tab=individuals"),
					fetch("/api/supabase/sponsors?tab=groups"),
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

	function handleClose() {
		setSponsorId("");
		setChildId("");
		setAmount("");
		setFrequency("monthly");
		setStartDate("");
		setEndDate("");
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
					sponsorId,
					childId,
					amount,
					frequency,
					startDate,
					endDate: requiresEndDate ? endDate : null,
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
						<select
							required
							value={sponsorId}
							onChange={(e) => setSponsorId(e.target.value)}
							className={inputCls}
						>
							<option value="">Select sponsor</option>
							{sponsors.map((s) => (
								<option
									key={s.id}
									value={s.id}
								>
									{s.name}
								</option>
							))}
						</select>
					</Field>

					<Field label="Child">
						<select
							required
							value={childId}
							onChange={(e) => setChildId(e.target.value)}
							className={inputCls}
						>
							<option value="">Select child</option>
							{children.map((c) => (
								<option
									key={c.id}
									value={c.id}
								>
									{c.name}
								</option>
							))}
						</select>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Amount ($)">
							<input
								type="number"
								required
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className={inputCls}
								placeholder="0"
							/>
						</Field>

						<Field label="Frequency">
							<select
								required
								value={frequency}
								onChange={(e) => {
									const value = e.target.value as Frequencies;

									setFrequency(value);
									if (value === "onetime") setEndDate("");
								}}
								className={inputCls}
							>
								{FREQUENCIES.map((f) => (
									<option
										key={f.value}
										value={f.value}
									>
										{f.label}
									</option>
								))}
							</select>
						</Field>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Start date">
							<input
								type="date"
								required
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className={inputCls}
							/>
						</Field>

						{requiresEndDate && (
							<Field label="End date">
								<input
									type="date"
									required
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className={inputCls}
								/>
							</Field>
						)}
					</div>
				</div>
			</section>
		</FormDrawer>
	);
}
