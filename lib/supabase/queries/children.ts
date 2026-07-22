import { createAdminClient } from "@/lib/supabase/admin";

export async function getChildrenAwaitingSponsorshipCount(): Promise<number> {
	const adminClient = createAdminClient();

	const { data, error } = await adminClient
		.from("children")
		.select("id, sponsorships(status)");

	if (error) throw new Error("Failed to get children data");

	return (data ?? []).filter(
		(c) => !c.sponsorships?.some((s) => s.status === "Active"),
	).length;
}
