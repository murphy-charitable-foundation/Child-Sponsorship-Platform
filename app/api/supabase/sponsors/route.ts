import { CreateSponsor } from "@/components/admin/sponsors/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

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
