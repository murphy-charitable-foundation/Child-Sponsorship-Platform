import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { StatusType } from "@/components/admin/children/types";

export async function POST(req: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const isAdmin = await supabase
		.from("admins")
		.select("id")
		.eq("id", user.id)
		.single()
		.then(({ data }) => !!data);

	const isSuperAdmin = await supabase
		.from("super_admins")
		.select("id")
		.eq("id", user.id)
		.single()
		.then(({ data }) => !!data);

	if (!isAdmin && !isSuperAdmin) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const data = await req.json();

	if (!data) {
		return NextResponse.json(
			{ error: "Invalid request data" },
			{ status: 400 },
		);
	}

	const first_name = data.first_name?.trim();
	const last_name = data.last_name?.trim();
	const gender = data.gender;
	const date_of_birth = data.date_of_birth;
	const location = data.location?.trim();

	if (!first_name || !last_name || !gender || !date_of_birth || !location) {
		return NextResponse.json(
			{
				error:
					"First name, last name, gender, date of birth, and country are required.",
			},
			{ status: 400 },
		);
	}

	const adminClient = createAdminClient();

	let guardianId: string | null = null;

	if (data.guardian_name?.trim()) {
		const { data: guardian, error: guardianError } = await adminClient
			.from("guardians")
			.insert({
				full_name: data.guardian_name.trim(),
				phone_number: data.guardian_phone || null,
				nin: data.guardian_nin || null,
				email: data.guardian_email || null,
				address: data.guardian_address || null,
			})
			.select("id")
			.single();

		if (guardianError || !guardian) {
			return NextResponse.json(
				{ error: guardianError?.message ?? "Failed to create guardian" },
				{ status: 500 },
			);
		}

		guardianId = guardian.id;
	}

	const { data: child, error: childError } = await adminClient
		.from("children")
		.insert({
			first_name,
			last_name,
			gender,
			date_of_birth,
			location,
			language: data.language ?? null,
			dream_job: data.dream_job ?? null,
			favorite_activity: data.favorite_activity ?? null,
			biography: data.biography ?? null,
			family_biography: data.family_biography ?? null,
			guardian_id: guardianId,
			guardian_relationship: data.guardian_relationship ?? null,
			status: "Waiting" as StatusType,
			field_officer_id: "02cf43ce-6edb-4adc-b6f9-42dda3de08f9", //TODO: change will require when find out what it is
		})
		.select("id")
		.single();

	if (childError || !child) {
		if (guardianId) {
			await adminClient.from("guardians").delete().eq("id", guardianId);
		}
		return NextResponse.json(
			{ error: childError?.message ?? "Failed to create child" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ id: child.id }, { status: 201 });
}
