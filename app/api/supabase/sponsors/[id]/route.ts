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
		.from("sponsors")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
	}

	let signedUrl: string | undefined;

	if (data.photo_path) {
		const { data: urlData } = await supabase.storage
			.from(BUCKET)
			.createSignedUrl(data.photo_path, EXPIRY);

		signedUrl = urlData?.signedUrl;
	}

	return NextResponse.json({
		sponsor: {
			...data,
			image_url: signedUrl,
		},
	});
}
