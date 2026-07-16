import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextRequest, NextResponse } from "next/server";
import type {
	EditUser,
	Regions,
	Role,
	User,
	UserStatus,
} from "@/components/admin/organizations/type";

type AdminRow = {
	id: string;
	regions: string | null;
	photo_path: string | null;
};
type SuperAdminRow = { id: string; photo_path: string | null };
type PendingAdminRow = { id: string };

const BUCKET = "profiles";
const EXPIRY = 60 * 60;

export async function GET() {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

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
		console.log("e", adminsError, superAdmins, pendingAdminsError);
		return NextResponse.json(
			{ error: "Failed to get admin users data" },
			{ status: 500 },
		);
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
				photo_path: row.photo_path,
				image_url,
				role: row.role,
				status: row.status,
				last_active: authUser?.last_sign_in_at ?? null,
			};
		}),
	);

	return NextResponse.json({ data });
}

function validate(data: EditUser): string | null {
	if (!data.id) return "User id is required.";
	if (!data.first_name?.trim()) return "First name is required.";
	if (!data.last_name?.trim()) return "Last name is required.";
	if (!data.email?.trim()) return "Email is required.";
	if (!data.role) return "Role is required.";
	if (data.role === "Admin" && !data.regions) return "Region is required.";
	if (
		data.role === "Pending Admin" &&
		data.status === "Active" &&
		!data.regions
	)
		return "Region is required.";
	return null;
}

export async function PATCH(req: NextRequest) {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const data: EditUser = await req.json();

	if (!data) {
		return NextResponse.json(
			{ error: "Invalid request data" },
			{ status: 400 },
		);
	}

	const validationError = validate(data);

	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 400 });
	}

	const adminClient = createAdminClient();

	//First update auth.user
	const { error: authUpdateError } =
		await adminClient.auth.admin.updateUserById(data.id, {
			email: data.email,
			user_metadata: {
				first_name: data.first_name,
				last_name: data.last_name,
			},
		});

	if (authUpdateError) {
		return NextResponse.json(
			{ error: authUpdateError.message },
			{ status: 500 },
		);
	}

	const isAdmin = data.role === "Admin";

	if (isAdmin) {
		const { error: updateError } = await adminClient
			.from("admins")
			.update({ regions: data.regions })
			.eq("id", data.id);

		if (updateError) {
			return NextResponse.json({ error: updateError.message }, { status: 500 });
		}
	}

	//Pending admin update the status to active then it will call supabase db rfc trigger function to change pending_admin to admin
	if (data.status === "Active" && data.role === "Pending Admin") {
		const { error: acceptError } = await adminClient.rpc(
			"pending_admin_accept",
			{
				account_email: data.email,
				regions: data.regions,
			},
		);

		if (acceptError) {
			return NextResponse.json({ error: acceptError.message }, { status: 500 });
		}
	}

	return NextResponse.json({ id: data.id });
}
