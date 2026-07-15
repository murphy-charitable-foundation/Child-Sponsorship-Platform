import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import { NextResponse } from "next/server";

export async function GET() {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { data: adminRow } = await supabase
		.from("admins")
		.select("id")
		.eq("id", user.id)
		.maybeSingle();

	const { data: superAdminRow } = await supabase
		.from("super_admins")
		.select("id")
		.eq("id", user.id)
		.maybeSingle();

	if (!adminRow && !superAdminRow) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const adminClient = createAdminClient();

	const {
		data: sponsorships,
		count,
		error: sponsorshipsError,
	} = await adminClient
		.from("sponsorships")
		.select("sponsors(country)", { count: "exact" })
		.eq("sponsorship_active", true);

	if (sponsorshipsError) {
		return NextResponse.json(
			{ error: "Failed to get active sponsorships count" },
			{ status: 500 },
		);
	}

	const countryCounts: Record<string, number> = {};

	for (const row of sponsorships ?? []) {
		const sponsor = Array.isArray(row.sponsors)
			? row.sponsors[0]
			: row.sponsors;
		const country = sponsor?.country ?? "Unknown";
		countryCounts[country] = (countryCounts[country] ?? 0) + 1;
	}

	const byCountry = Object.entries(countryCounts).map(([name, value]) => ({
		name,
		value,
	}));

	return NextResponse.json({ activeSponsorships: count ?? 0, byCountry });
}
