import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "profiles";
const EXPIRY = 60 * 60;

export async function POST(req: NextRequest) {
	const { paths } = await req.json();

	if (!Array.isArray(paths) || paths.length === 0) {
		return NextResponse.json({ signedUrls: {} });
	}

	// Restrict to children/ prefix only
	const safePaths = paths.filter(
		(p): p is string => typeof p === "string" && p.startsWith("children/"),
	);

	const supabase = await createClient();

	const { data, error } = await supabase.storage
		.from(BUCKET)
		.createSignedUrls(safePaths, EXPIRY);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const signedUrls: Record<string, string> = {};
	for (const entry of data ?? []) {
		if (entry.path && entry.signedUrl) {
			signedUrls[entry.path] = entry.signedUrl;
		}
	}

	return NextResponse.json({ signedUrls });
}

export async function GET(req: NextRequest) {
	const path = req.nextUrl.searchParams.get("path");

	if (!path || !path.startsWith("children/")) {
		return NextResponse.json({ error: "Invalid path" }, { status: 400 });
	}

	const supabase = await createClient();

	const { data, error } = await supabase.storage
		.from(BUCKET)
		.createSignedUrl(path, EXPIRY);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ signedUrl: data.signedUrl });
}
