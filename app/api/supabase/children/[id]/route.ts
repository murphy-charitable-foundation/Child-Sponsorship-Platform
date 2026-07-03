import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "profiles";
const EXPIRY = 60 * 60;

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = createAdminClient();

	const { data, error } = await supabase
		.from("children_with_ages")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		return NextResponse.json({ error: "Child not found" }, { status: 404 });
	}

	let guardian: Record<string, unknown> | undefined;

	if (data.guardian_id) {
		const { data: gData } = await supabase
			.from("guardians")
			.select("*")
			.eq("id", data.guardian_id)
			.single();

		if (gData) {
			guardian = {
				name: gData.full_name,
				relationship: data.guardian_relationship ?? "",
				nin: gData.nin ?? "",
				phone: gData.phone_number ?? "",
				email: gData.email ?? "",
				address: gData.address ?? "",
			};
		}
	}

	let signedUrl: string | undefined;

	if (data.photo_path) {
		const { data: urlData } = await supabase.storage
			.from(BUCKET)
			.createSignedUrl(data.photo_path, EXPIRY);

		signedUrl = urlData?.signedUrl;
	}

	const { count } = await supabase
		.from("sponsorships")
		.select("*", { count: "exact", head: true })
		.eq("child_id", id)
		.eq("sponsorship_active", true);

	return NextResponse.json({
		child: {
			...data,
			image_url: signedUrl,
			guardian,
			sponsorship_status: count && count > 0 ? "Active" : "Inactive",
		},
	});
}
