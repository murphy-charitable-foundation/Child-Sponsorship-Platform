import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextRequest, NextResponse } from "next/server";
import type { EditUser } from "@/components/admin/organizations/type";
import { getAdminUsers } from "@/lib/supabase/queries/users";

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

export async function GET(): Promise<NextResponse> {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (adminResult.error === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	// const { userRole, region } = adminResult;
	try {
		const data = await getAdminUsers();

		return NextResponse.json({ data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{
				error:
					err instanceof Error ? err.message : "Failed to get admin users data",
			},
			{ status: 500 },
		);
	}
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
