import { createClient } from "@/lib/supabase/server";
import { getSponsors } from "@/lib/supabase/queries/sponsor";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextRequest, NextResponse } from "next/server";

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
