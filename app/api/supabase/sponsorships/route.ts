import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { CreateSponsorship } from "@/components/admin/sponsorships/types";
import { FREQUENCIES } from "@/lib/constants";

import { NextRequest, NextResponse } from "next/server";
import {
	createSponsorship,
	getSponsorships,
	updateSponsorship,
} from "@/lib/supabase/queries/sponsorships";

function validate(
	data: CreateSponsorship,
	type: "create" | "update",
): string | null {
	if (type == "create") {
		if (!data.sponsor_id) return "Sponsor is required.";
		if (!data.child_id) return "Child is required.";
	}
	if (!data.amount || Number(data.amount) <= 0)
		return "A valid amount is required.";
	if (!data.frequency || !Object.keys(FREQUENCIES).includes(data.frequency))
		return "A valid frequency is required.";
	if (!data.start_date) return "Start date is required.";
	if (data.frequency !== "onetime" && !data.end_date)
		return "End date is required for monthly and annual sponsorships.";
	return null;
}

export async function GET() {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	try {
		const data = await getSponsorships();

		return NextResponse.json({ sponsorships: data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{
				error:
					err instanceof Error ? err.message : "Failed to get sponsorships",
			},
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

	const validationError = validate(data, "create");

	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 400 });
	}

	try {
		const sponsorshipId = await createSponsorship(data);

		return NextResponse.json({ sponsorshipId }, { status: 201 });
	} catch (err) {
		return NextResponse.json(
			{
				error: err instanceof Error ? err.message : "Failed to create Sponsor",
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

	const validationError = validate(data, "update");

	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 400 });
	}

	try {
		const sponsorshipId = await updateSponsorship(data);

		return NextResponse.json({ sponsorshipId }, { status: 201 });
	} catch (err) {
		return NextResponse.json(
			{
				error: err instanceof Error ? err.message : "Failed to update Sponsor",
			},
			{ status: 500 },
		);
	}
}
