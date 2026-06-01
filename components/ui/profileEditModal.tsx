"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@heroui/react";
import { useState, useEffect, useMemo } from "react";

import { createClient } from "@/lib/supabase/client";

import ProfileImageUpload from "@/components/profile-image-upload";

import { Sponsor } from "../admin/sponsors/SponsorsPage";
import { Child } from "../admin/children/ChildrenPage";

type Props = {
	type: "Child" | "Sponsor";
	target: Child | Sponsor | null;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (updated: Child | Sponsor) => void;
};

export default function ProfileEditModal({
	type,
	target,
	isOpen,
	onOpenChange,
	onSave,
}: Props) {
	const [form, setForm] = useState<Child | Sponsor | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const supabase = useMemo(() => createClient(), []);

	useEffect(() => {
		if (!target) return;
		setForm({ ...target });
		setImageFile(null);
		setError(null);
	}, [target]);

	function handleChange(field: keyof Child, value: string) {
		setForm((prev) => {
			if (!prev) return prev;
			return { ...prev, [field]: value };
		});
	}

	function validate(): string | null {
		if (!form) return "No form data.";
		if (!form.first_name.trim()) return "First name is required.";
		if (!form.last_name.trim()) return "Last name is required.";
		return null;
	}

	async function handleSave(onClose: () => void) {
		if (!form) return;
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		setIsSaving(true);
		setError(null);

		let updatedForm = { ...form };

		if (imageFile) {
			const body = new FormData();
			body.append("image", imageFile);
			body.append("targetId", form.id);
			body.append("targetType", type === "Child" ? "children" : "sponsors");

			const res = await fetch("/api/supabase/admin-upload-profile-image", {
				method: "POST",
				body,
			});

			if (res.ok) {
				const data = await res.json();
				updatedForm = {
					...updatedForm,
					image_url: data.url,
					photo_path: data.path,
				};
			} else {
				const data = await res.json().catch(() => ({}));
				setError(data.error ?? "Image upload failed");
				setIsSaving(false);
				return;
			}
		}

		const from = type === "Child" ? "children" : "sponsors";

		const { error: dbError } = await supabase
			.from(from)
			.update({
				first_name: updatedForm.first_name,
				last_name: updatedForm.last_name,
			})
			.eq("id", updatedForm.id);

		if (dbError) {
			setError(dbError.message);
			setIsSaving(false);
			return;
		}

		onSave(updatedForm);
		setIsSaving(false);
		onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size="md"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Edit {type}
							<span className="text-sm font-normal text-gray-500">
								{form?.id}
							</span>
						</ModalHeader>

						<ModalBody>
							{form && (
								<div className="flex flex-col gap-4">
									<div className="flex justify-center pt-1">
										<ProfileImageUpload
											currentUrl={form.image_url}
											name={`${form.first_name} ${form.last_name}`}
											onChange={(file) => setImageFile(file)}
											size={96}
										/>
									</div>

									{error && (
										<p className="text-sm text-red-500 text-center">{error}</p>
									)}

									<div className="flex gap-3">
										<Input
											label="First Name"
											value={form.first_name}
											onValueChange={(v) => handleChange("first_name", v)}
											isRequired
										/>
										<Input
											label="Last Name"
											value={form.last_name}
											onValueChange={(v) => handleChange("last_name", v)}
											isRequired
										/>
									</div>
								</div>
							)}
						</ModalBody>

						<ModalFooter>
							<Button
								variant="light"
								onPress={onClose}
								isDisabled={isSaving}
							>
								Cancel
							</Button>
							<Button
								color="primary"
								onPress={() => handleSave(onClose)}
								isLoading={isSaving}
							>
								Save Changes
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
