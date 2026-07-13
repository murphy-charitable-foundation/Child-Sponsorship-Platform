"use client";

import { useEffect, useState } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
	Radio,
	RadioGroup,
	Switch,
} from "@heroui/react";

import {
	ChildProfile,
	ConsentMethod,
	GuardianConsent,
	StatusType,
} from "./types";

import { Field, inputCls } from "../shared/FormDrawer";

export const CONSENT_METHOD: ConsentMethod[] = ["InPerson", "Phone"];

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
			// TODO: We need to upsert consent data

			onClose();
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={onClose}
			size="lg"
			placement="right"
		>
			<DrawerContent>
				{(closeDrawer) => (
					<>
						<DrawerHeader className="border-b border-slate-200 text-2xl font-semibold text-primary">
							Website Visibility
						</DrawerHeader>

						<DrawerBody className="space-y-6 py-5 overflow-y-auto">
							{error && (
								<div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
									{error}
								</div>
							)}

							{/* Consent details */}
							<section>
								<h3 className="mb-4 text-lg font-semibold text-slate-800">
									Guardian Consent
								</h3>
								<p className="text-sm">
									A guardian must consent to the publication of this child’s
									profile and photographs on the Murphy Charitable Foundation
									website.
								</p>

								<div className="space-y-4 pt-5">
									<RadioGroup
										value={form?.status ?? ""}
										onValueChange={(value) =>
											update("status", value as StatusType)
										}
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
										<input
											type="text"
											disabled
											value={form?.full_name ?? ""}
											className={inputCls}
										/>
									</Field>

									<div className="grid grid-cols-2 gap-4">
										<Field label="Date of consent decision">
											<input
												type="date"
												required
												value={form?.consent_date ?? ""}
												onChange={(e) => update("consent_date", e.target.value)}
												className={inputCls}
												placeholder="First name"
											/>
										</Field>

										<Field label="Consent decision method">
											<select
												required
												value={form?.consent_method ?? ""}
												onChange={(e) =>
													update(
														"consent_method",
														e.target.value as ConsentMethod,
													)
												}
												className={inputCls}
											>
												<option value="">Select Method</option>
												{CONSENT_METHOD.map((g) => (
													<option
														key={g}
														value={g}
													>
														{g}
													</option>
												))}
											</select>
										</Field>
									</div>
								</div>
							</section>

							<section>
								<h3 className="mb-4 text-lg font-semibold text-slate-800">
									Home Page Visibility
								</h3>
								<p className="text-sm">
									Foundation staff must indicate whether this child’s photo
									should be displayed on the website home page.
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
						</DrawerBody>

						<DrawerFooter className="border-t border-slate-200">
							<Button
								variant="bordered"
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
