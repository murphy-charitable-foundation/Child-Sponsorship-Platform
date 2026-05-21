import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;
const BUCKET = "children";

export async function POST(req: Request) {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await req.formData();
		const file = formData.get("image") as File | null;
		const childId = formData.get("childId") as string | null;

		if (!file || !childId) {
			return NextResponse.json({ error: "Missing image or childId" }, { status: 400 });
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			return NextResponse.json(
				{ error: "Invalid file type. Use JPEG, PNG, or WebP." },
				{ status: 400 }
			);
		}

		if (file.size > MAX_BYTES) {
			return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 400 });
		}

		const ext = file.type === "image/png" ? "png" : "jpg";
		const path = `${childId}/profile.${ext}`;
		const buffer = new Uint8Array(await file.arrayBuffer());

		const { error: uploadError } = await supabase.storage
			.from(BUCKET)
			.upload(path, buffer, { contentType: file.type, upsert: true });

		if (uploadError) {
			return NextResponse.json({ error: uploadError.message }, { status: 500 });
		}

		const {
			data: { publicUrl },
		} = supabase.storage.from(BUCKET).getPublicUrl(path);

		return NextResponse.json({ url: `${publicUrl}?t=${Date.now()}` });
	} catch {
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
