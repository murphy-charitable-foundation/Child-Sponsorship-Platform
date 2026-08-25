import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getSponsorshipById } from "@/lib/supabase/queries/sponsorships";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { id } = await params;

	try {
		const sponsorship = await getSponsorshipById(id);

		return NextResponse.json({ sponsorship }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{
				error:
					err instanceof Error ? err.message : "Failed to get sponsorship",
			},
			{ status: 404 },
		);
	}
}
