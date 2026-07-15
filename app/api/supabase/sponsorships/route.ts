import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { CreateSponsorship } from "@/components/admin/sponsorships/types";
import { FREQUENCIES } from "@/lib/constants";

import { NextRequest, NextResponse } from "next/server";

function validate(data: CreateSponsorship): string | null {
	if (!data.sponsorId) return "Sponsor is required.";
	if (!data.childId) return "Child is required.";
	if (!data.amount || Number(data.amount) <= 0)
		return "A valid amount is required.";
	if (!data.frequency || !Object.keys(FREQUENCIES).includes(data.frequency))
		return "A valid frequency is required.";
	if (!data.startDate) return "Start date is required.";
	if (data.frequency !== "onetime" && !data.endDate)
		return "End date is required for monthly and annual sponsorships.";
	return null;
}

export async function GET() {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data, error: sponsorshipsError } = await adminClient
		.from("sponsorships")
		.select(
			"*, sponsors(first_name, last_name, group_name), children(first_name, last_name, location)",
		)
		.order("start_date_time");

	if (sponsorshipsError) {
		return NextResponse.json(
			{ error: "Failed to get sponsorships data" },
			{ status: 500 },
		);
	}

	const sponsorships = (data ?? []).map((s) => ({
		...s,
		sponsor_name: s.sponsors
			? s.sponsors.group_name ||
				`${s.sponsors.first_name} ${s.sponsors.last_name}`
			: "",
		child_name: s.children
			? `${s.children.first_name} ${s.children.last_name}`
			: "",
		child_location: s.children?.location ?? "",
	}));

	return NextResponse.json({ sponsorships });
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

	const { data: sponsorship, error: sponsorshipError } = await adminClient
		.from("sponsorships")
		.insert({
			sponsor_id: data.sponsorId,
			child_id: data.childId,
			amount: Number(data.amount),
			frequency: data.frequency,
			start_date_time: data.startDate,
			end_date_time: data.endDate ?? null,
			sponsorship_active: true,
		})
		.select("sponsorship_id")
		.single();

	if (sponsorshipError || !sponsorship) {
		return NextResponse.json(
			{ error: sponsorshipError?.message ?? "Failed to create sponsorship" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ id: sponsorship.sponsorship_id }, { status: 201 });
}
