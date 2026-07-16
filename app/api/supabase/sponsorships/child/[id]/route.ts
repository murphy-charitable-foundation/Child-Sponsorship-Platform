import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

import { NextResponse } from "next/server";

const BUCKET = "profiles";
const EXPIRY = 60 * 60;

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data, error: sponsorshipsError } = await adminClient
		.from("sponsorships")
		.select("status, amount, frequency, start_date_time, sponsors(*)")
		.eq("child_id", id);

	if (sponsorshipsError) {
		return NextResponse.json(
			{ error: "Failed to get sponsorships data" },
			{ status: 500 },
		);
	}

	const sponsors = await Promise.all(
		(data ?? [])
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

	return NextResponse.json({ sponsors });
}
