import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

import { NextResponse } from "next/server";

export async function GET() {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data, error: childrenError } = await adminClient
		.from("children")
		.select("id, sponsorships(status)");

	if (childrenError) {
		return NextResponse.json(
			{ error: "Failed to get children data" },
			{ status: 500 },
		);
	}

	const childrenAwaitingSponsorship = (data ?? []).filter(
		(c) => !c.sponsorships?.some((s) => s.status === "Active"),
	).length;

	return NextResponse.json({ childrenAwaitingSponsorship });
}
