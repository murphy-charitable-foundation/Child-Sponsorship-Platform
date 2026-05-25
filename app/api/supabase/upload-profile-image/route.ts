import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 45 * 1024;
const BUCKET = "profiles";
const ALLOWED_TARGETS = ["sponsors", "super_admins", "admins"] as const;
type TargetType = (typeof ALLOWED_TARGETS)[number];

//This endpoint let sponsor upload their own profile image
//TODO: We might need add admin also enable to upload their image as well. if we add it, we need to add photo_path column into admin's table
export async function POST(req: NextRequest) {
	const supabase = await createClient();

	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await req.formData();
		const file = formData.get("image") as File | null;
		const targetType = formData.get("targetType") as TargetType;

		if (!file) {
			return NextResponse.json({ error: "Missing image" }, { status: 400 });
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			return NextResponse.json(
				{ error: "Invalid file type. Use JPEG, PNG or WebP" },
				{ status: 400 },
			);
		}

		if (file.size > MAX_BYTES) {
			return NextResponse.json(
				{ error: "File too large (max 45 kB)" },
				{ status: 400 },
			);
		}

		if (!ALLOWED_TARGETS.includes(targetType)) {
			return NextResponse.json(
				{ error: "Invalud user type." },
				{ status: 400 },
			);
		}

		const path = `${targetType}/${user.id}/profile.jpg`;
		const buffer = new Uint8Array(await file.arrayBuffer());
		console.log(path);

		const { error: uploadError } = await supabase.storage
			.from(BUCKET)
			.upload(path, buffer, { contentType: "image/jpeg", upsert: true });

		if (uploadError) {
			return NextResponse.json(
				{ error: `[storage] ${uploadError.message}` },
				{ status: 500 },
			);
		}

		const { data: signedData, error: signedError } = await supabase.storage
			.from(BUCKET)
			.createSignedUrl(path, 60 * 60);

		if (signedError || !signedData) {
			return NextResponse.json(
				{ error: `[signed-url] ${signedError?.message ?? "unknown"}` },
				{ status: 500 },
			);
		}

		const { error: dbError } = await supabase
			.from(targetType)
			.update({ photo_path: path })
			.eq("id", user.id);

		if (dbError) {
			return NextResponse.json(
				{ error: `[db] ${dbError.message}` },
				{ status: 500 },
			);
		}

		return NextResponse.json({ url: signedData.signedUrl, path });
	} catch {
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
