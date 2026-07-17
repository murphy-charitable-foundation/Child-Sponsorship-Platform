import { createClient as createSupabaseClient } from "@supabase/supabase-js";

//NEVER USE  below createAdminClient in client component ("use client")
//Because we don't want to service role key to be accessible from browser.
export function createAdminClient() {
	return createSupabaseClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);
}
