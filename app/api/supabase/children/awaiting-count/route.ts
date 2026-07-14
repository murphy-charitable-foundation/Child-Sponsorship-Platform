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

	const { data, error: childrenError } = await adminClient
		.from("children")
		.select("id, sponsorships(sponsorship_active)");

	if (childrenError) {
		return NextResponse.json(
			{ error: "Failed to get children data" },
			{ status: 500 },
		);
	}

	const childrenAwaitingSponsorship = (data ?? []).filter(
		(c) => !c.sponsorships?.some((s) => s.sponsorship_active),
	).length;

	return NextResponse.json({ childrenAwaitingSponsorship });
}
