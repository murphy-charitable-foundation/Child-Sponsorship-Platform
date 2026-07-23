import { CreateSponsorship } from "@/components/admin/sponsorships/types";
import { createAdminClient } from "@/lib/supabase/admin";
const adminClient = createAdminClient();

export async function getActiveSponsorships(): Promise<{
	activeSponsorships: number;
	byCountry: {
		name: string;
		value: number;
	}[];
}> {
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

export async function getSponsorshipsByChildId(childId: string) {
	const { data, error } = await adminClient
		.from("sponsorships")
		.select("status, amount, frequency, start_date_time, sponsors(*)")
		.eq("child_id", childId)
		.order("start_date_time");

	if (error) throw new Error("Failed to get sponsorships data");

	return data ?? [];
}

export async function createSponsorship(
	payload: CreateSponsorship,
): Promise<{ id: string }> {
	const { data, error } = await adminClient
		.from("sponsorships")
		.insert({
			sponsor_id: payload.sponsor_id,
			child_id: payload.child_id,
			amount: Number(payload.amount),
			frequency: payload.frequency,
			start_date_time: payload.start_date,
			end_date_time: payload.end_date ?? null,
			status: "Active",
			is_recurring: payload.frequency === "onetime" ? false : true,
		})
		.select("sponsorship_id")
		.single();

	if (error || !data) throw new Error("Failed to create sponsorship");

	return data.sponsorship_id;
}
