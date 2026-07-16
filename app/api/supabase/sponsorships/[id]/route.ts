import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data, error } = await adminClient
		.from("sponsorships")
		.select(
			"*, sponsors(first_name, last_name, group_name, sponsor_type, address_line1, address_line2, city, state, zip, country, phone_number, email), children(first_name, last_name, location)",
		)
		.eq("sponsorship_id", id)
		.single();

	if (error || !data) {
		return NextResponse.json(
			{ error: "Sponsorship not found" },
			{ status: 404 },
		);
	}

	const { sponsors, children, ...rest } = data;

	const sponsorship = {
		...rest,
		sponsor_name: sponsors
			? sponsors.group_name || `${sponsors.first_name} ${sponsors.last_name}`
			: "",
		sponsor_type: sponsors?.sponsor_type ?? null,
		address_line1: sponsors?.address_line1 ?? null,
		address_line2: sponsors?.address_line2 ?? null,
		city: sponsors?.city ?? "",
		state: sponsors?.state ?? "",
		zip: sponsors?.zip ?? "",
		country: sponsors?.country ?? "",
		phone_number: sponsors?.phone_number ?? null,
		email: sponsors?.email ?? null,
		child_name: children ? `${children.first_name} ${children.last_name}` : "",
		child_location: children?.location ?? "",
	};

	return NextResponse.json({ sponsorship });
}
