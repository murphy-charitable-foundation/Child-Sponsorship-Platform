"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	SelectItem,
} from "@heroui/react";
import { useState, useEffect } from "react";
import ProfileImageUpload from "@/components/profile-image-upload";

export type ChildRow = {
	id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	age: number;
	date_of_birth: string;
	gender: "Male" | "Female" | "Other";
	location: string;
	active: boolean;
	photo_path?: string;
	school_grade: number;
	imageUrl?: string;
};

type Props = {
	child: ChildRow | null;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (updated: ChildRow) => void;
};

export default function ChildEditModal({
	child,
	isOpen,
	onOpenChange,
	onSave,
}: Props) {
	const [form, setForm] = useState<ChildRow | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);

	useEffect(() => {
		if (child) {
			setForm({ ...child });
			setImageFile(null);
			setUploadError(null);
		}
	}, [child]);

	function handleChange(field: keyof ChildRow, value: string) {
		setForm((prev) =>
			prev
				? { ...prev, [field]: field === "age" ? Number(value) : value }
				: prev,
		);
	}

	async function handleSave(onClose: () => void) {
		if (!form) return;
		setIsUploading(true);
		setUploadError(null);

		let imageUrl = form.imageUrl;

		if (imageFile) {
			const body = new FormData();
			body.append("image", imageFile);
			body.append("childId", form.id);

			const res = await fetch("/api/supabase/upload-profile-image", {
				method: "POST",
				body,
			});

			if (res.ok) {
				const data = await res.json();
				imageUrl = data.url;
			} else {
				const data = await res.json().catch(() => ({}));
				setUploadError(data.error ?? "Image upload failed");
				setIsUploading(false);
				return;
			}
		}

		onSave({ ...form, imageUrl });
		setIsUploading(false);
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
							Edit Child
							<span className="text-sm font-normal text-gray-500">
								{form?.id}
							</span>
						</ModalHeader>

						<ModalBody>
							{form && (
								<div className="flex flex-col gap-4">
									<div className="flex justify-center pt-1">
										<ProfileImageUpload
											currentUrl={form.imageUrl}
											name={`${form.first_name} ${form.last_name}`}
											onChange={(file) => setImageFile(file)}
											size={96}
										/>
									</div>

									{uploadError && (
										<p className="text-sm text-red-500 text-center">
											{uploadError}
										</p>
									)}

									<div className="flex gap-3">
										<Input
											label="First Name"
											value={form.first_name}
											onValueChange={(v) => handleChange("first_name", v)}
										/>
										<Input
											label="Last Name"
											value={form.last_name}
											onValueChange={(v) => handleChange("last_name", v)}
										/>
									</div>
									<div className="flex gap-3">
										<Input
											label="Age"
											type="number"
											value={String(form.age)}
											onValueChange={(v) => handleChange("age", v)}
										/>
										<Select
											label="Gender"
											selectedKeys={[form.gender]}
											onSelectionChange={(keys) =>
												handleChange("gender", Array.from(keys)[0] as string)
											}
										>
											<SelectItem key="Male">Male</SelectItem>
											<SelectItem key="Female">Female</SelectItem>
											<SelectItem key="Other">Other</SelectItem>
										</Select>
									</div>
									<Input
										label="Location"
										value={form.location}
										onValueChange={(v) => handleChange("location", v)}
									/>
									{/* <Select
										label="Status"
										selectedKeys={[form.active]}
										onSelectionChange={(keys) =>
											handleChange("status", Array.from(keys)[0] as string)
										}
									>
										<SelectItem key="active">Active</SelectItem>
										<SelectItem key="waiting">Waiting</SelectItem>
										<SelectItem key="exited">Exited</SelectItem>
									</Select> */}
								</div>
							)}
						</ModalBody>

						<ModalFooter>
							<Button
								variant="light"
								onPress={onClose}
								isDisabled={isUploading}
							>
								Cancel
							</Button>
							<Button
								color="primary"
								onPress={() => handleSave(onClose)}
								isLoading={isUploading}
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
