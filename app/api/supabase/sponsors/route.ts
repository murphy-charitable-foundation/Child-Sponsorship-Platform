import { CreateSponsor } from "@/components/admin/sponsors/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

import { NextRequest, NextResponse } from "next/server";

function validate(data: CreateSponsor): string | null {
	if (!data.first_name?.trim()) return "First name is required.";
	if (!data.last_name?.trim()) return "Last name is required.";
	if (!data.sponsor_type) return "Sponsor Type is required.";
	if (data.sponsor_type !== "individual" && !data.group_name)
		return "Group name is required";
	if (!data.country?.trim()) return "Country is required.";
	if (!data.state?.trim()) return "state is required.";
	return null;
}

export async function GET(req: NextRequest) {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const isGroupsTab = req.nextUrl.searchParams.get("tab") === "groups";

	const adminClient = createAdminClient();

	const { data, error: sponsorsError } = isGroupsTab
		? await adminClient
				.from("sponsors")
				.select(
					"id, country, status, sponsor_type, group_name, sponsorships(count)",
				)
				.neq("sponsor_type", "individual")
				.order("created_at")
		: await adminClient
				.from("sponsors")
				.select(
					"last_name, first_name, id, country, status, sponsor_type, sponsorships(count)",
				)
				.eq("sponsor_type", "individual")
				.order("created_at");

	if (sponsorsError) {
		return NextResponse.json(
			{ error: "Failed to get sponsors data" },
			{ status: 500 },
		);
	}

	const sponsors = (data ?? []).map((s) => ({
		...s,
		children_count: s.sponsorships?.[0]?.count ?? 0,
	}));

	return NextResponse.json({ sponsors });
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

	const { data: sponsor, error: sponsorError } = await adminClient
		.from("sponsors")
		.insert({
			first_name: data.first_name.trim(),
			last_name: data.last_name.trim(),
			sponsor_type: data.sponsor_type,
			group_name: data.group_name,
			address_line1: data.address_line1,
			address_line2: data.address_line2,
			city: data.city,
			state: data.state,
			zip: data.zip,
			country: data.country,
			phone_number: data.phone_number,
			email: data.email,
			job_title: data.job_title,
			status: "Active",
		})
		.select("id")
		.single();

	if (sponsorError || !sponsor) {
		return NextResponse.json(
			{ error: sponsorError?.message ?? "Failed to create sponsor" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ id: sponsor.id }, { status: 201 });
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

	const { data: sponsor, error: sponsorError } = await adminClient
		.from("sponsors")
		.update({
			first_name: data.first_name.trim(),
			last_name: data.last_name.trim(),
			sponsor_type: data.sponsor_type,
			group_name: data.group_name,
			address_line1: data.address_line1,
			address_line2: data.address_line2,
			city: data.city,
			state: data.state,
			zip: data.zip,
			country: data.country,
			phone_number: data.phone_number,
			email: data.email,
			job_title: data.job_title,
		})
		.eq("id", data.id)
		.select("id")
		.single();

	if (sponsorError || !sponsor) {
		return NextResponse.json(
			{ error: sponsorError?.message ?? "Failed to update sponsor" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ id: sponsor.id }, { status: 201 });
}
