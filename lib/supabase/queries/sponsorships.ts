import {
	CreateSponsorship,
	EditSponsorship,
} from "@/components/admin/sponsorships/types";
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

export async function getSponsorships() {
	const { data, error } = await adminClient
		.from("sponsorships")
		.select(
			"*, sponsors(first_name, last_name, group_name), children(first_name, last_name, location)",
		)
		.order("start_date_time");

	if (error) throw new Error("Failed to get Sponsorships data");

	const sponsorships = (data ?? []).map((s) => ({
		...s,
		sponsor_name: s.sponsors
			? s.sponsors.group_name ||
				`${s.sponsors.first_name} ${s.sponsors.last_name}`
			: "",
		child_name: s.children
			? `${s.children.first_name} ${s.children.last_name}`
			: "",
		child_location: s.children?.location ?? "",
	}));

	return sponsorships;
}

export async function getSponsorshipById(id: string) {
	const { data, error } = await adminClient
		.from("sponsorships")
		.select(
			"*, sponsors(first_name, last_name, group_name, sponsor_type, address_line1, address_line2, city, state, zip, country, phone_number, email), children(first_name, last_name, location)",
		)
		.eq("sponsorship_id", id)
		.single();

	if (error || !data) throw new Error("Sponsorship not found");

	const { sponsors, children, ...rest } = data;

	return {
		...rest,
		sponsor_name: sponsors
			? sponsors.group_name || `${sponsors.first_name} ${sponsors.last_name}`
			: "",
		sponsor_type: sponsors?.sponsor_type ?? null,
		address_line1: sponsors?.address_line1 ?? null,
		address_line2: sponsors?.address_line2 ?? null,
		city: sponsors?.city ?? "",
		state: sponsors?.state ?? "",
		zip: sponsors?.zip ?? "",
		country: sponsors?.country ?? "",
		phone_number: sponsors?.phone_number ?? null,
		email: sponsors?.email ?? null,
		child_name: children ? `${children.first_name} ${children.last_name}` : "",
		child_location: children?.location ?? "",
	};
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

export async function getSponsorshipsBySponsorId(sponsorId: string) {
	const { data, error } = await adminClient
		.from("sponsorships")
		.select(
			"sponsorship_id, status, amount, frequency, start_date_time, children(*)",
		)
		.eq("sponsor_id", sponsorId);

	if (error) throw new Error("Failed to get sponsorships data");

	const childIds = (data ?? [])
		.filter((s) => s.children)
		.map((s) => (s.children as unknown as { id: string }).id);

	const ageById = new Map<string, number>();

	if (childIds.length > 0) {
		const { data: agesData } = await adminClient
			.from("children_with_ages")
			.select("id, age")
			.in("id", childIds);

		for (const c of agesData ?? []) {
			ageById.set(c.id, c.age);
		}
	}

	for (const s of data ?? []) {
		if (!s.children) continue;
		const child = s.children as unknown as { id: string; age?: number };
		child.age = ageById.get(child.id);
	}

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

export async function updateSponsorship(
	payload: EditSponsorship,
): Promise<{ id: string }> {
	const { data, error } = await adminClient
		.from("sponsorships")
		.update({
			amount: Number(payload.amount),
			frequency: payload.frequency,
			start_date_time: payload.start_date,
			end_date_time: payload.end_date ?? null,
			is_recurring: payload.frequency === "onetime" ? false : true,
		})
		.eq("sponsorship_id", payload.sponsorship_id)
		.select("sponsorship_id")
		.single();

	if (error || !data) throw new Error("Failed to create sponsorship");

	return data.sponsorship_id;
}
