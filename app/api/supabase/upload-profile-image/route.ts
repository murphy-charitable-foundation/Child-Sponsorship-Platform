import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 45 * 1024;
const BUCKET = "profiles";

//This is child image upload. only admin can upload the children image
export async function POST(req: Request) {
	const supabase = await createClient();
	//First check auth with current user
	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		//Check admin database
		const { data: adminRow, error: adminError } = await supabase
			.from("admins")
			.select("id")
			.eq("id", user.id)
			.single();

		if (adminError) {
			console.log(adminError);
		}
		if (!adminRow) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		//Validate form data
		const formData = await req.formData();
		const file = formData.get("image") as File | null;
		const childId = formData.get("childId") as string | null;

		if (!file || !childId) {
			return NextResponse.json(
				{ error: "Missing image or childId" },
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

		// Path matches RLS policy: children/{child_id}/
		const path = `children/${childId}/profile.jpg`;
		const buffer = new Uint8Array(await file.arrayBuffer());

		const { error: uploadError } = await supabase.storage
			.from(BUCKET)
			.upload(path, buffer, { contentType: "image/jpeg", upsert: true });

		if (uploadError) {
			return NextResponse.json({ error: uploadError.message }, { status: 500 });
		}

		//Signed URL since bucket is private
		const { data: signedData, error: signedError } = await supabase.storage
			.from(BUCKET)
			.createSignedUrl(path, 60 * 60); // 1 hour

		if (signedError || !signedData) {
			return NextResponse.json(
				{ error: "Upload succeeded but could not generate URL" },
				{ status: 500 },
			);
		}

		// Save path to children table
		const { error: dbError } = await supabase
			.from("children")
			.update({ photo_path: path })
			.eq("id", childId);

		if (dbError) {
			return NextResponse.json({ error: dbError.message }, { status: 500 });
		}

		return NextResponse.json({ url: signedData.signedUrl, path });
	} catch {
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
