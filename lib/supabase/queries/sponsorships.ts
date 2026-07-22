import { createAdminClient } from "@/lib/supabase/admin";

export async function getActiveSponsorships(): Promise<{
	activeSponsorships: number;
	byCountry: {
		name: string;
		value: number;
	}[];
}> {
	const adminClient = createAdminClient();

	const {
		data: sponsorships,
		count,
		error,
	} = await adminClient
		.from("sponsorships")
		.select("sponsors(country)", { count: "exact" })
		.eq("status", "Active");

	if (error) throw new Error("Failed to get active sponsorships count");

	const countryCounts: Record<string, number> = {};

	for (const row of sponsorships ?? []) {
		const sponsor = Array.isArray(row.sponsors)
			? row.sponsors[0]
			: row.sponsors;
		const country = sponsor?.country ?? "Unknown";
		countryCounts[country] = (countryCounts[country] ?? 0) + 1;
	}

	const byCountry = Object.entries(countryCounts).map(([name, value]) => ({
		name,
		value,
	}));

	return { activeSponsorships: count ?? 0, byCountry };
}
