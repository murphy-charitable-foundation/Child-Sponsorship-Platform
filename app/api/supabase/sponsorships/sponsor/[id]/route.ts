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
			"sponsorship_id, sponsorship_active, amount, frequency, start_date_time, children(*)",
		)
		.eq("sponsor_id", id);

	if (sponsorshipsError) {
		return NextResponse.json(
			{ error: "Failed to get sponsorships data" },
			{ status: 500 },
		);
	}

	const childIds = (data ?? [])
		.filter((s) => s.children)
		.map((s) => (s.children as unknown as { id: string }).id);

	const ageById = new Map<string, number>();

	if (childIds.length > 0) {
		const { data: agesData } = await adminClient
			.from("children_with_ages")
			.select("id, age")
			.in("id", childIds);

		for (const c of agesData ?? []) {
			ageById.set(c.id, c.age);
		}
	}

	const sponsorships = await Promise.all(
		(data ?? [])
			.filter((s) => s.children)
			.map(async (s) => {
				const child = s.children as unknown as Record<string, unknown> & {
					id: string;
					photo_path?: string;
				};

				child.age = ageById.get(child.id);

				let signedUrl: string | undefined;

				if (child.photo_path) {
					const { data: urlData } = await adminClient.storage
						.from(BUCKET)
						.createSignedUrl(child.photo_path, EXPIRY);

					signedUrl = urlData?.signedUrl;
				}

				return {
					id: s.sponsorship_id,
					image_url: signedUrl,
					sponsorship_active: s.sponsorship_active,
					start_date_time: s.start_date_time,
					amount: s.amount,
					frequency: s.frequency,
					child: child,
				};
			}),
	);

	return NextResponse.json({ sponsorships });
}
