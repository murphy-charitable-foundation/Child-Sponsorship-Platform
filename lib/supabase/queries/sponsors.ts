import {
	CreateSponsor,
	EditSponsor,
	SponsorGroupTableData,
	SponsorProfile,
	SponsorTableData,
} from "@/components/admin/sponsors/types";
import { createAdminClient } from "@/lib/supabase/admin";

const adminClient = createAdminClient();
const PROFILE_BUCKET = "profiles";
const SIGNED_URL_EXPIRY = 60 * 60;

export async function getSponsors(
	isGroupsTab: boolean,
	status?: string | null,
): Promise<SponsorTableData[] | SponsorGroupTableData[]> {
	if (isGroupsTab) {
		let query = adminClient
			.from("sponsors")
			.select(
				"id, country, status, sponsor_type, group_name, created_at, sponsorships(count)",
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
			"last_name, first_name, id, country, status, sponsor_type, created_at, sponsorships(count)",
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

export async function getSponsorById(
	id: string,
): Promise<SponsorProfile | null> {
	const { data, error } = await adminClient
		.from("sponsors")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw new Error("Failed to get sponsor data");
	if (!data) return null;

	let image_url: string | null = null;

	if (data.photo_path) {
		const { data: signed } = await adminClient.storage
			.from(PROFILE_BUCKET)
			.createSignedUrl(data.photo_path, SIGNED_URL_EXPIRY);

		image_url = signed?.signedUrl ?? null;
	}

	return {
		...data,
		image_url,
	};
}

export async function createSponsor(
	payload: CreateSponsor,
): Promise<{ id: string }> {
	const { data, error } = await adminClient
		.from("sponsors")
		.insert({
			first_name: payload.first_name.trim(),
			last_name: payload.last_name.trim(),
			sponsor_type: payload.sponsor_type,
			group_name: payload.group_name,
			address_line1: payload.address_line1,
			address_line2: payload.address_line2,
			city: payload.city,
			state: payload.state,
			zip: payload.zip,
			country: payload.country,
			phone_number: payload.phone_number,
			email: payload.email,
			job_title: payload.job_title,
			status: "Inactive",
		})
		.select("id")
		.single();

	if (error || !data) throw new Error("Failed to create sponsor");
	return data.id;
}

export async function updateSponsor(
	payload: EditSponsor,
): Promise<{ id: string }> {
	const { data, error } = await adminClient
		.from("sponsors")
		.update({
			first_name: payload.first_name.trim(),
			last_name: payload.last_name.trim(),
			sponsor_type: payload.sponsor_type,
			group_name: payload.group_name,
			address_line1: payload.address_line1,
			address_line2: payload.address_line2,
			city: payload.city,
			state: payload.state,
			zip: payload.zip,
			country: payload.country,
			phone_number: payload.phone_number,
			email: payload.email,
			job_title: payload.job_title,
		})
		.eq("id", payload.id)
		.select("id")
		.single();

	if (error || !data) throw new Error("Failed to create sponsor");
	return data.id;
}
