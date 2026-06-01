"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chip } from "@heroui/react";
import { Mail, User, Calendar } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import ProfileImageUpload from "@/components/profile-image-upload";
import { useUserProfile } from "@/components/UserProfileContext";

const SPONSOR_TYPE_LABELS: Record<string, string> = {
	individual: "Individual",
	family: "Family",
	company: "Company / Business",
	ngo: "Organization / NGO",
	religious: "Religious Institution",
};
const ROLE_LABELS: Record<string, string> = {
	admin: "Admin",
	super_admin: "Super Admin",
};

export default function ProfilePage() {
	const { user, loading } = useAuth();
	const { avatarUrl, refreshAvatar, saveAvatar } = useUserProfile();
	const router = useRouter();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [target, setTarget] = useState<string>("");

	useEffect(() => {
		if (!loading && !user) {
			router.push("/auth/login");
		}
	}, [loading, user, router]);

	useEffect(() => {
		if (!user) return;
		const role = user.user_metadata.role;

		let convertedRole = "";
		if (role === "sponsor") {
			convertedRole = "sponsors";
		} else if (role === "admin") {
			convertedRole = "admins";
		} else if (role === "super_admin") {
			convertedRole = "super_admins";
		}

		if (!convertedRole) return;

		setTarget(convertedRole);
		refreshAvatar(convertedRole, user.id);
	}, [user, refreshAvatar]);

	async function handleSave() {
		if (!user || !imageFile) return;
		setIsSaving(true);
		setError(null);

		const { error: uploadError } = await saveAvatar(imageFile, target);

		if (uploadError) {
			setError(uploadError);
			setIsSaving(false);
			return;
		}

		setImageFile(null);
		setIsSaving(false);
		setIsEditing(false);
	}

	function handleCancel() {
		if (!user) return;
		setImageFile(null);
		setError(null);
		setIsEditing(false);
	}

	function handleUploadImage(file: File) {
		setImageFile(file);
		setError(null);
		setIsEditing(true);
	}

	if (loading || !user) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-blue-50">
				<p className="text-zinc-500">Loading...</p>
			</div>
		);
	}

	const fullName =
		`${user.user_metadata.first_name ?? ""} ${user.user_metadata.last_name ?? ""}`.trim();
	const sponsorType = user.user_metadata.sponsor_type;
	const isActive = user.user_metadata.active ?? true;
	const role = user.user_metadata.role;
	const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="min-h-screen bg-blue-50">
			<div className="mx-auto max-w-[640px] px-4 py-8">
				<h1 className="mb-6 text-3xl font-bold">My Profile</h1>

				<div className="flex flex-col gap-6 rounded-[12px] border border-zinc-100 bg-white p-6">
					{/* Avatar + Name row */}
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
						<ProfileImageUpload
							currentUrl={avatarUrl}
							name={fullName || user.email}
							onChange={(file) => handleUploadImage(file)}
							size={96}
						/>

						<div className="flex min-w-0 flex-1 flex-col gap-2">
							<h2 className="text-xl font-semibold">
								{fullName || user.email?.split("@")[0]}
							</h2>
							<Chip
								size="sm"
								radius="full"
								variant="flat"
								color={isActive ? "success" : "default"}
								className="mt-1 w-fit"
							>
								{isActive ? "Active" : "Inactive"}
							</Chip>

							{isEditing && (
								<div className="mt-3 flex flex-col gap-2">
									{error && <p className="text-xs text-red-500">{error}</p>}
									<div className="flex gap-2">
										<button
											onClick={handleSave}
											disabled={isSaving}
											className="rounded-lg bg-green-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
										>
											{isSaving ? "Saving…" : "Save"}
										</button>
										<button
											onClick={() => {
												handleCancel();
											}}
											disabled={isSaving}
											className="rounded-lg border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
										>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					<hr className="border-zinc-100" />

					{/* Info rows */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3">
							<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
								<Mail className="size-4 text-blue-600" />
							</div>
							<div>
								<p className="text-xs text-zinc-400">Email</p>
								<p className="text-sm font-medium">{user.email}</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
								<User className="size-4 text-blue-600" />
							</div>
							<div>
								<p className="text-xs text-zinc-400">
									{sponsorType ? "Sponsor Type" : "Role"}
								</p>
								<p className="text-sm font-medium">
									{SPONSOR_TYPE_LABELS[sponsorType]
										? SPONSOR_TYPE_LABELS[sponsorType]
										: ROLE_LABELS[role]}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
								<Calendar className="size-4 text-blue-600" />
							</div>
							<div>
								<p className="text-xs text-zinc-400">Member Since</p>
								<p className="text-sm font-medium">{memberSince}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
