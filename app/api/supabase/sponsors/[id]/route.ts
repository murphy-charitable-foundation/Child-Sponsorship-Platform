import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getSponsorById } from "@/lib/supabase/queries/sponsors";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (adminResult.error === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { id } = await params;

	try {
		const sponsor = await getSponsorById(id);

		if (!sponsor) {
			return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
		}

		return NextResponse.json({ sponsor });
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Failed to get sponsor" },
			{ status: 500 },
		);
	}
}
