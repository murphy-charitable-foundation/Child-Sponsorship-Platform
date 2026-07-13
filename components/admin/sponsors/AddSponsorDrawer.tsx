"use client";

import { useState } from "react";
import Image from "next/image";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
} from "@heroui/react";
import { CreateSponsor } from "./types";
import { useRouter } from "next/navigation";
import AddIndividualForm from "./AddIndividualForm";
import AddGroupForm from "./AddGroupForm";

type SponsorType = "none" | "individual" | "group";

export const SP_EMPTY_FORM: CreateSponsor = {
	photo_file: null,
	first_name: "",
	last_name: "",
	sponsor_type: null,
	group_name: null,
	address_line1: "",
	address_line2: "",
	city: "",
	state: "",
	zip: "",
	country: "",
	phone_number: "",
	email: "",
	job_title: "",
};

type AddSponsorDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function AddSponsorDrawer({
	isOpen,
	onClose,
}: AddSponsorDrawerProps) {
	const router = useRouter();
	const [sponsorType, setSponsorType] = useState<SponsorType>("none");
	const [form, setForm] = useState<CreateSponsor>(SP_EMPTY_FORM);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function update<K extends keyof CreateSponsor>(
		key: K,
		value: CreateSponsor[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleClose() {
		setSponsorType("none");
		setError(null);
		setForm(SP_EMPTY_FORM);
		onClose();
	}

	function handleSponsorTypeUpdate(type: "individual" | "group") {
		setSponsorType(type);

		if (type === "individual") {
			update("sponsor_type", type);
		}
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		setIsSaving(true);
		setError(null);

		try {
			const res = await fetch("/api/supabase/sponsors", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				setError(data.error ?? "Failed to create sponsor.");
				return;
			}

			if (form.photo_file) {
				const body = new FormData();
				body.append("image", form.photo_file);
				body.append("targetId", data.id);
				body.append("targetType", "sponsors");

				const imgRes = await fetch("/api/supabase/admin-upload-profile-image", {
					method: "POST",
					body,
				});

				if (!imgRes.ok) {
					setError(`Photo upload failed for new sponsor ${data.id}`);
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
		<Drawer
			isOpen={isOpen}
			onOpenChange={handleClose}
			size="lg"
			placement="right"
		>
			<DrawerContent>
				{() => (
					<>
						<DrawerHeader className="border-b border-slate-200 text-2xl font-semibold text-primary">
							Add Sponsor
						</DrawerHeader>

						<DrawerBody className="py-6">
							<form
								id="add-sponsor-form"
								onSubmit={handleSave}
							>
								{error && (
									<div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 mb-4">
										{error}
									</div>
								)}

								{/* Sponsor type selector — always visible */}
								<div>
									<p className="mb-3 text-xs font-semibold tracking-wide text-slate-500">
										Sponsor Type
									</p>
									<div className="flex w-full">
										<button
											type="button"
											onClick={() => handleSponsorTypeUpdate("individual")}
											className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-l-md border px-5 text-sm font-medium transition-colors ${
												sponsorType === "individual"
													? "border-primary bg-primary text-white"
													: "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
											}`}
										>
											<span>
												<Image
													src="/individual.svg"
													alt=""
													width={10}
													height={18}
												/>
											</span>
											Individual
										</button>
										<button
											type="button"
											onClick={() => handleSponsorTypeUpdate("group")}
											className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-r-md border px-5 text-sm font-medium transition-colors ${
												sponsorType === "group"
													? "border-primary bg-primary text-white"
													: "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
											}`}
										>
											<span>
												<Image
													src="/groups.svg"
													alt=""
													width={25}
													height={18}
												/>
											</span>
											Group
										</button>
									</div>
								</div>

								{/* Default state */}
								{sponsorType === "none" && (
									<div className="flex flex-col items-center justify-center py-16 mt-20">
										<p>Select sponsor type to get started</p>
									</div>
								)}

								{/* Individual form */}
								{sponsorType === "individual" && (
									<AddIndividualForm
										form={form}
										update={update}
									/>
								)}

								{/* Group form */}
								{sponsorType === "group" && (
									<AddGroupForm
										form={form}
										update={update}
									/>
								)}
							</form>
						</DrawerBody>

						<DrawerFooter className="border-t border-slate-200">
							<Button
								variant="light"
								onPress={handleClose}
								className="border-slate-300 text-slate-700"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								form="add-sponsor-form"
								className="bg-primary text-white"
								isDisabled={sponsorType === "none" || isSaving}
								isLoading={isSaving}
							>
								Add sponsor
							</Button>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}
