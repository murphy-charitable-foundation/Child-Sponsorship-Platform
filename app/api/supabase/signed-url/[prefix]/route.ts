import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "profiles";
const EXPIRY = 60 * 60;
export const ALLOWED_PREFIXES = [
	"children",
	"sponsors",
	"super_admins",
	"admins",
] as const;
type AllowedPrefix = (typeof ALLOWED_PREFIXES)[number];

export function isAllowed(prefix: string): prefix is AllowedPrefix {
	return ALLOWED_PREFIXES.includes(prefix as AllowedPrefix);
}

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ prefix: string }> },
) {
	const { prefix } = await params;

	if (!isAllowed(prefix)) {
		return NextResponse.json({ error: "Invalid prefix" }, { status: 400 });
	}

	const { paths } = await req.json();

	if (!Array.isArray(paths) || paths.length === 0) {
		return NextResponse.json({ signedUrls: {} });
	}

	const safePaths = paths.filter(
		(p): p is string => typeof p === "string" && p.startsWith(`${prefix}/`),
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

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ prefix: string }> },
) {
	const { prefix } = await params;

	if (!isAllowed(prefix)) {
		return NextResponse.json({ error: "Invalid prefix" }, { status: 400 });
	}

	const path = req.nextUrl.searchParams.get("path");

	if (!path || !path.startsWith(`${prefix}/`)) {
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
