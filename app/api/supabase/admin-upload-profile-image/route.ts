import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/require-admin";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 45 * 1024;
const BUCKET = "profiles";
const ALLOWED_TARGETS = [
	"children",
	"sponsors",
	"admins",
	"super_admins",
] as const;
type TargetType = (typeof ALLOWED_TARGETS)[number];

//This endpoint let admin upload the children or sponsors profile image
export async function POST(req: Request) {
	const supabase = await createClient();
	try {
		const { error: authError } = await requireAdmin(supabase);

		if (authError) return authError;

		const adminClient = createAdminClient();

		const formData = await req.formData();
		const file = formData.get("image") as File | null;
		const targetId = formData.get("targetId") as string;
		const targetType = formData.get("targetType") as string;
		const bucketFile = formData.get("bucketFile") as string;

		if (!file || !targetId) {
			return NextResponse.json(
				{ error: "Missing image or targetId" },
				{ status: 400 },
			);
		}

		if (!ALLOWED_TARGETS.includes(targetType as TargetType)) {
			return NextResponse.json(
				{ error: "Invalid targetType" },
				{ status: 400 },
			);
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			return NextResponse.json(
				{ error: "Invalid file type. Use JPEG, PNG and WebP" },
				{ status: 400 },
			);
		}

		if (file.size > MAX_BYTES) {
			return NextResponse.json(
				{ error: "File too large (max 45 kB)" },
				{ status: 400 },
			);
		}

		const path = `${bucketFile}/${targetId}/profile.jpg`;
		const buffer = new Uint8Array(await file.arrayBuffer());

		const { error: uploadError } = await adminClient.storage
			.from(BUCKET)
			.upload(path, buffer, { contentType: "image/jpeg", upsert: true });

		if (uploadError) {
			return NextResponse.json({ error: uploadError.message }, { status: 500 });
		}

		const { data: signedData, error: signedError } = await adminClient.storage
			.from(BUCKET)
			.createSignedUrl(path, 60 * 60);

		if (signedError || !signedData) {
			return NextResponse.json(
				{ error: "Upload succeeded but could not generate URL" },
				{ status: 500 },
			);
		}

		const { error: dbError } = await adminClient
			.from(targetType)
			.update({ photo_path: path })
			.eq("id", targetId);

		if (dbError) {
			return NextResponse.json({ error: dbError.message }, { status: 500 });
		}

		return NextResponse.json({ url: signedData.signedUrl, path });
	} catch {
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
