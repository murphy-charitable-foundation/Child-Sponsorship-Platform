import { createClient } from "@/lib/supabase/server";
import {
	createSponsor,
	getSponsors,
	updateSponsor,
} from "@/lib/supabase/queries/sponsors";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextRequest, NextResponse } from "next/server";
import { CreateSponsor } from "@/components/admin/sponsors/types";

function validate(data: CreateSponsor): string | null {
	if (!data.first_name?.trim()) return "First name is required.";
	if (!data.last_name?.trim()) return "Last name is required.";
	if (!data.sponsor_type) return "Sponsor Type is required.";
	if (data.sponsor_type !== "individual" && !data.group_name)
		return "Group name is required";
	if (!data.country?.trim()) return "Country is required.";
	if (!data.state?.trim()) return "state is required.";
	if (!data.email?.trim()) return "email is required";
	return null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
	const supabase = await createClient();
	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const isGroupsTab = req.nextUrl.searchParams.get("tab") === "groups";
	const status = req.nextUrl.searchParams.get("status");

	try {
		const data = await getSponsors(isGroupsTab, status);

		return NextResponse.json({ sponsors: data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Failed to get sponsors" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
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

	try {
		const sponsorId = await createSponsor(data);

		return NextResponse.json({ sponsorId }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				error: err instanceof Error ? err.message : "Failed to create sponsor",
			},
			{ status: 500 },
		);
	}
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
	const supabase = await createClient();
	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
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

	try {
		const sponsorId = await updateSponsor(data);
		return NextResponse.json({ sponsorId });
	} catch (err) {
		return NextResponse.json(
			{
				error: err instanceof Error ? err.message : "Failed to update sponsor",
			},
			{ status: 500 },
		);
	}
}
