import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type {
	CreateChild,
	ChildStatus,
} from "@/components/admin/children/types";

function validate(data: CreateChild): string | null {
	if (!data.first_name?.trim()) return "First name is required.";
	if (!data.last_name?.trim()) return "Last name is required.";
	if (!data.gender) return "Gender is required.";
	if (!data.date_of_birth) return "Date of birth is required.";
	if (!data.location?.trim()) return "Country is required.";
	return null;
}

export async function GET(req: NextRequest) {
	const supabase = await createClient();

	const adminResult = await requireAdmin(supabase);

	if (adminResult.error) return adminResult.error;

	const { userRole, region } = adminResult;

	const statuses = req.nextUrl.searchParams.get("status")?.split(",");

	let query = supabase
		.from("children_with_ages")
		.select(
			"last_name, first_name, id, age, gender, location, created_at, status",
		)
		.order("created_at");

	if (userRole === "admin" && region) {
		query = query.eq("location", region);
	}

	if (statuses?.length) {
		query = query.in("status", statuses);
	}

	const { data, error: childrenError } = await query;

	if (childrenError) {
		return NextResponse.json(
			{ error: "Failed to get sponsors data" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ children: data });
}

export async function POST(req: NextRequest) {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const data = await req.json();

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
			first_name: data.first_name.trim(),
			last_name: data.last_name.trim(),
			gender: data.gender,
			date_of_birth: data.date_of_birth,
			location: data.location,
			language: data.language ?? null,
			dream_job: data.dream_job ?? null,
			favorite_activity: data.favorite_activity ?? null,
			biography: data.biography ?? null,
			family_biography: data.family_biography ?? null,
			guardian_id: guardianId,
			guardian_relationship: data.guardian_relationship ?? null,
			status: "Waiting" as ChildStatus,
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

export async function PATCH(req: NextRequest) {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const data = await req.json();

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

	let guardianId: string | null = null;

	if (data.guardian_name?.trim()) {
		const { data: guardian, error: guardianError } = await adminClient
			.from("guardians")
			.upsert({
				id: data.guardian_id,
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
				{ error: guardianError?.message ?? "Failed to update guardian" },
				{ status: 500 },
			);
		}

		guardianId = guardian.id;
	}

	const { data: child, error: childError } = await adminClient
		.from("children")
		.update({
			first_name: data.first_name.trim(),
			last_name: data.last_name.trim(),
			gender: data.gender,
			date_of_birth: data.date_of_birth,
			location: data.location,
			language: data.language ?? null,
			dream_job: data.dream_job ?? null,
			favorite_activity: data.favorite_activity ?? null,
			biography: data.biography ?? null,
			family_biography: data.family_biography ?? null,
			guardian_id: guardianId,
			guardian_relationship: data.guardian_relationship ?? null,
			status: "Waiting" as ChildStatus,
			field_officer_id: "02cf43ce-6edb-4adc-b6f9-42dda3de08f9", //TODO: change will require when find out what it is
		})
		.eq("id", data.id)
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
