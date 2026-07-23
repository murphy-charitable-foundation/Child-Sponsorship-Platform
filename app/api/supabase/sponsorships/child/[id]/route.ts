import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getSponsorshipsByChildId } from "@/lib/supabase/queries/sponsorships";

import { NextRequest, NextResponse } from "next/server";

const BUCKET = "profiles";
const EXPIRY = 60 * 60;

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = await createClient();
	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const adminClient = createAdminClient();

	try {
		const data = await getSponsorshipsByChildId(id);

		const sponsors = await Promise.all(
			data
				.filter((s) => s.sponsors)
				.map(async (s) => {
					const sponsor = s.sponsors as unknown as Record<string, unknown> & {
						photo_path?: string;
					};

					let signedUrl: string | undefined;

					if (sponsor.photo_path) {
						const { data: urlData } = await adminClient.storage
							.from(BUCKET)
							.createSignedUrl(sponsor.photo_path, EXPIRY);

						signedUrl = urlData?.signedUrl;
					}

					return {
						...sponsor,
						image_url: signedUrl,
						status: s.status,
						start_date_time: s.start_date_time,
						amount: s.amount,
						frequency: s.frequency,
					};
				}),
		);

		return NextResponse.json({ sponsors }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{
				error:
					err instanceof Error ? err.message : "Failed to get sponsorships data",
			},
			{ status: 500 },
		);
	}
}
