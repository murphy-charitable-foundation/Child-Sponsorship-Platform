"use client";

import { useEffect, useState } from "react";
import {
	Radio,
	RadioGroup,
	Switch,
	Input,
	Select,
	SelectItem,
} from "@heroui/react";

import {
	ChildProfile,
	ConsentMethod,
	GuardianConsent,
	ChildStatus,
} from "./types";

import FormDrawer, { Field } from "../shared/FormDrawer";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { CONSENT_METHOD } from "@/lib/constants";

type GuardianConsentDrawerProps = {
	data: GuardianConsent;
	isOpen: boolean;
	onClose: () => void;
	onSaved?: (child: ChildProfile) => void;
};

export default function GuardianConsentDrawer({
	data,
	isOpen,
	onClose,
}: GuardianConsentDrawerProps) {
	const [form, setForm] = useState<GuardianConsent | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Reset form to current consent data whenever the drawer opens
	useEffect(() => {
		if (!data) return;
		if (isOpen && data) {
			setForm({
				id: data.id,
				full_name: data.full_name,
				status: data.status,
				consent_date: data.consent_date,
				consent_method: data.consent_method,
				homepage_visibility: data.homepage_visibility,
			});
		}
	}, [isOpen, data]);

	function update<K extends keyof GuardianConsent>(
		key: K,
		value: GuardianConsent[K],
	) {
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
			// TODO: We need to upsert consent data. we need to determine consent DB table

			onClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<FormDrawer
			isOpen={isOpen}
			onClose={onClose}
			title="Website Visibility"
			formId="website-visibility"
			isSaving={isSaving}
			error={error}
			onSubmit={handleSave}
			saveLabel="Save changes"
			bodyClassName="space-y-6 py-5 overflow-y-auto"
		>
			{/* Consent details */}
			<section>
				<h3 className="mb-4 text-lg font-semibold text-slate-800">
					Guardian Consent
				</h3>
				<p className="text-sm">
					A guardian must consent to the publication of this child’s profile and
					photographs on the Murphy Charitable Foundation website.
				</p>

				<div className="space-y-4 pt-5">
					<RadioGroup
						value={form?.status ?? ""}
						onValueChange={(value) => update("status", value as ChildStatus)}
						name="status"
					>
						<Radio
							className="gap-3 mb-4"
							value="Active"
							description="The guardian named below consents to displaying the
													child’s profile and photographs on the website."
						>
							Consent granted
						</Radio>
						<Radio
							className="gap-3 mb-4"
							value="Exited"
							description="The guardian named below does not consent to
													displaying the child’s profile and photographs on the
													website."
						>
							Consent denied
						</Radio>
						<Radio
							className="gap-3 mb-4"
							value="Waiting"
							description="Guardian has not yet granted or denied consent."
						>
							Awaiting consent decision
						</Radio>
					</RadioGroup>

					<Field label="Guardian Full Name">
						<Input
							type="text"
							isDisabled
							value={form?.full_name ?? ""}
							classNames={filterInputCls}
						/>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<Field label="Date of consent decision">
							<Input
								type="date"
								required
								value={form?.consent_date ?? ""}
								onChange={(e) => update("consent_date", e.target.value)}
								classNames={filterInputCls}
								placeholder="First name"
							/>
						</Field>

						<Field label="Consent decision method">
							<Select
								required
								placeholder="Select Method"
								selectedKeys={
									form?.consent_method
										? new Set([form.consent_method])
										: new Set()
								}
								onSelectionChange={(keys) => {
									const key = Array.from(keys as Set<string>)[0];
									if (key) update("consent_method", key as ConsentMethod);
								}}
								classNames={filterSelectCls}
							>
								{Object.entries(CONSENT_METHOD).map(([key, value]) => (
									<SelectItem key={key}>{value}</SelectItem>
								))}
							</Select>
						</Field>
					</div>
				</div>
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-slate-800">
					Home Page Visibility
				</h3>
				<p className="text-sm">
					Foundation staff must indicate whether this child’s photo should be
					displayed on the website home page.
				</p>

				<div className="space-y-4 pt-5 flex items-center justify-between ">
					<p>Show child photo on home page</p>
					<Switch
						isSelected={form?.homepage_visibility ?? false}
						size="sm"
						aria-label="homepage_visibility"
						onValueChange={(isSelected) =>
							update("homepage_visibility", isSelected)
						}
					/>
				</div>
			</section>
		</FormDrawer>
	);
}
