import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import { NextResponse } from "next/server";

const BUCKET = "profiles";
const EXPIRY = 60 * 60;

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

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
			"sponsorship_active, amount, frequency, start_date_time, sponsors(*)",
		)
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
					sponsorship_active: s.sponsorship_active,
					start_date_time: s.start_date_time,
					amount: s.amount,
					frequency: s.frequency,
				};
			}),
	);

	return NextResponse.json({ sponsors });
}
