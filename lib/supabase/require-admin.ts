import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import type { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export async function requireAdmin(
	supabase: SupabaseServerClient,
): Promise<
	{ user: User; error: null } | { user: null; error: NextResponse }
> {
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return {
			user: null,
			error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
		};
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
		return {
			user: null,
			error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
		};
	}

	return { user, error: null };
}
