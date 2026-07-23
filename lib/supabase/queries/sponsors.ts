import {
	SponsorGroupTableData,
	SponsorTableData,
} from "@/components/admin/sponsors/types";
import { createAdminClient } from "@/lib/supabase/admin";

const adminClient = createAdminClient();

export async function getSponsors(
	isGroupsTab: boolean,
	status?: string | null,
): Promise<SponsorTableData[] | SponsorGroupTableData[]> {
	if (isGroupsTab) {
		let query = adminClient
			.from("sponsors")
			.select(
				"id, country, status, sponsor_type, group_name, sponsorships(count)",
			)
			.neq("sponsor_type", "individual")
			.order("created_at");

		if (status) query = query.eq("status", status);
		const { data, error } = await query;

		if (error) throw new Error("Failed to get Children data");

		return (data ?? []).map((s) => ({
			...s,
			children_count: s.sponsorships?.[0]?.count ?? 0,
		}));
	}

	let query = adminClient
		.from("sponsors")
		.select(
			"last_name, first_name, id, country, status, sponsor_type, sponsorships(count)",
		)
		.eq("sponsor_type", "individual")
		.order("created_at");

	if (status) query = query.eq("status", status);
	const { data, error } = await query;

	if (error) throw new Error("Failed to get Children data");

	return (data ?? []).map((s) => ({
		...s,
		children_count: s.sponsorships?.[0]?.count ?? 0,
	}));
}
