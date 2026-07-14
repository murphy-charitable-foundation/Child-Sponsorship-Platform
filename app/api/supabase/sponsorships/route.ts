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
