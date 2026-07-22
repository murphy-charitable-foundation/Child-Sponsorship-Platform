import { redirect } from "next/navigation";
import type { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export async function requireAdmin(
	supabase: SupabaseServerClient,
): Promise<
	| { userRole: string; region: string | null; error: null }
	| { error: "unauthorized" | "forbidden" }
> {
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return { error: "unauthorized" };
	}

	const { data: adminRow } = await supabase
		.from("admins")
		.select("id ,regions")
		.eq("id", user.id)
		.maybeSingle();

	const { data: superAdminRow } = await supabase
		.from("super_admins")
		.select("id")
		.eq("id", user.id)
		.maybeSingle();

	if (!adminRow && !superAdminRow) {
		return { error: "forbidden" };
	}

	return {
		userRole: user.app_metadata.role,
		region: adminRow ? adminRow.regions : null,
		error: null,
	};
}

export function assertAuthorized<T>(
	result: T | "unauthorized" | "forbidden",
): asserts result is T {
	if (result === "unauthorized") redirect("/auth/admin-login");
	if (result === "forbidden") redirect("/");
}
