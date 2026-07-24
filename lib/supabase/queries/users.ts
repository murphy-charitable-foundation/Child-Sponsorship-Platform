import {
	Regions,
	Role,
	User,
	UserStatus,
} from "@/components/admin/organizations/type";
import { createAdminClient } from "@/lib/supabase/admin";

const adminClient = createAdminClient();
const BUCKET = "profiles";
const EXPIRY = 60 * 60;

type AdminRow = {
	id: string;
	regions: string | null;
	photo_path: string | null;
};
type SuperAdminRow = { id: string; photo_path: string | null };
type PendingAdminRow = { id: string };

export async function getAdminUsers(): Promise<User[]> {
	const [
		{ data: admins, error: adminsError },
		{ data: superAdmins, error: superAdminsError },
		{ data: pendingAdmins, error: pendingAdminsError },
	]: [
		{ data: AdminRow[] | null; error: unknown },
		{ data: SuperAdminRow[] | null; error: unknown },
		{ data: PendingAdminRow[] | null; error: unknown },
	] = await Promise.all([
		adminClient.from("admins").select("id, regions, photo_path"),
		adminClient.from("super_admins").select("id, photo_path"),
		adminClient.from("pending_admins").select("id"),
	]);

	if (adminsError || superAdminsError || pendingAdminsError) {
		console.log("error", adminsError, superAdmins, pendingAdminsError);
		throw new Error("Failed to get admin users data");
	}

	const rows = [
		...(admins ?? []).map((a) => ({
			id: a.id,
			organization: a.regions ?? "",
			photo_path: a.photo_path,
			role: "Admin" as Role,
			status: "Active" as UserStatus,
		})),
		...(superAdmins ?? []).map((s) => ({
			id: s.id,
			organization: null,
			photo_path: s.photo_path,
			role: "Super Admin" as Role,
			status: "Active" as UserStatus,
		})),
		...(pendingAdmins ?? []).map((p) => ({
			id: p.id,
			organization: null,
			photo_path: null,
			role: "Pending Admin" as Role,
			status: "Pending" as UserStatus,
		})),
	];

	const authResults = await Promise.all(
		rows.map((row) => adminClient.auth.admin.getUserById(row.id)),
	);

	const data: User[] = await Promise.all(
		rows.map(async (row, i) => {
			const authUser = authResults[i].data.user;

			let image_url: string | null = null;

			if (row.photo_path) {
				const { data: urlData } = await adminClient.storage
					.from(BUCKET)
					.createSignedUrl(row.photo_path, EXPIRY);

				image_url = urlData?.signedUrl ?? null;
			}

			return {
				id: row.id,
				first_name: authUser?.user_metadata?.first_name ?? "",
				last_name: authUser?.user_metadata?.last_name ?? "",
				email: authUser?.email ?? "",
				organization: row.organization ? (row.organization as Regions) : null,
				image_url,
				role: row.role,
				status: row.status,
				last_active: authUser?.last_sign_in_at ?? null,
			};
		}),
	);

	return data;
}
