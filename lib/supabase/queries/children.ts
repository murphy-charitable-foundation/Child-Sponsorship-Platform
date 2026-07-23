import {
	ChildProfile,
	ChildStatus,
	ChildTableData,
	CreateChild,
	EditChild,
} from "@/components/admin/children/types";
import { createAdminClient } from "@/lib/supabase/admin";

const adminClient = createAdminClient();
const PROFILE_BUCKET = "profiles";
const SIGNED_URL_EXPIRY = 60 * 60;

export async function getChildren(
	role: string,
	region: string | null,
	statuses?: string[],
): Promise<ChildTableData[]> {
	let query = adminClient
		.from("children_with_ages")
		.select(
			"last_name, first_name, id, age, gender, location, created_at, status",
		)
		.order("created_at", { ascending: false });

	if (role === "admin" && region) {
		query = query.eq("location", region);
	}

	if (statuses?.length) {
		query = query.in("status", statuses);
	}

	const { data, error } = await query;

	if (error) throw new Error("Failed to get Children data");

	return data;
}

export async function getChildById(id: string): Promise<ChildProfile | null> {
	const { data, error } = await adminClient
		.from("children_with_ages")
		.select("*, guardian:guardians(*)")
		.eq("id", id)
		.maybeSingle();

	if (error) throw new Error("Failed to get child data");
	if (!data) return null;

	const { data: sponsorships, error: sponsorshipsError } = await adminClient
		.from("sponsorships")
		.select("status")
		.eq("child_id", id);

	if (sponsorshipsError) throw new Error("Failed to get child sponsorships");

	const sponsorship_status = sponsorships?.some((s) => s.status === "Active")
		? "Active"
		: "Inactive";

	let image_url: string | null = null;

	if (data.photo_path) {
		const { data: signed } = await adminClient.storage
			.from(PROFILE_BUCKET)
			.createSignedUrl(data.photo_path, SIGNED_URL_EXPIRY);

		image_url = signed?.signedUrl ?? null;
	}

	return {
		id: data.id,
		first_name: data.first_name,
		last_name: data.last_name,
		full_name: data.full_name,
		age: data.age,
		date_of_birth: data.date_of_birth,
		gender: data.gender,
		location: data.location,
		status: data.status,
		created_at: data.created_at,
		favorite_activity: data.favorite_activity,
		dream_job: data.dream_job,
		biography: data.biography,
		family_biography: data.family_biography,
		language: data.language,
		image_url,
		guardian: data.guardian
			? {
					id: data.guardian.id,
					full_name: data.guardian.full_name,
					relationship: data.guardian_relationship,
					nin: data.guardian.nin,
					phone: data.guardian.phone_number,
					email: data.guardian.email,
					address: data.guardian.address,
				}
			: undefined,
		sponsorship_status,
		school_grade: data.school_grade,
		homepage_visibility: data.homepage_visibility,
		photo_path: data.photo_path,
	};
}

export async function updateChild(payload: EditChild): Promise<{ id: string }> {
	let guardianId: string | null = payload.guardian_id || null;

	const hasGuardianInput = !!(
		payload.guardian_name ||
		payload.guardian_phone ||
		payload.guardian_email ||
		payload.guardian_nin ||
		payload.guardian_address
	);

	const guardianFields = {
		full_name: payload.guardian_name || null,
		phone_number: payload.guardian_phone || null,
		nin: payload.guardian_nin || null,
		email: payload.guardian_email || null,
		address: payload.guardian_address || null,
	};

	if (guardianId) {
		const { error: guardianError } = await adminClient
			.from("guardians")
			.update(guardianFields)
			.eq("id", guardianId);

		if (guardianError) throw new Error("Failed to update guardian");
	} else if (hasGuardianInput) {
		const { data: newGuardian, error: guardianInsertError } = await adminClient
			.from("guardians")
			.insert(guardianFields)
			.select("id")
			.single();

		if (guardianInsertError || !newGuardian)
			throw new Error("Failed to create guardian");

		guardianId = newGuardian.id;
	}

	const { data, error: childError } = await adminClient
		.from("children")
		.update({
			first_name: payload.first_name,
			last_name: payload.last_name,
			gender: payload.gender,
			date_of_birth: payload.date_of_birth,
			location: payload.location,
			language: payload.language || null,
			dream_job: payload.dream_job || null,
			favorite_activity: payload.favorite_activity || null,
			biography: payload.biography || null,
			family_biography: payload.family_biography || null,
			guardian_relationship: payload.guardian_relationship || null,
			guardian_id: guardianId,
		})
		.eq("id", payload.id)
		.select("id")
		.single();

	if (childError) throw new Error("Failed to update child");

	return data.id;
}

export async function createChild(
	payload: CreateChild,
): Promise<{ id: string }> {
	let guardianId: string | null = null;

	if (payload.guardian_name) {
		const { data: guardian, error } = await adminClient
			.from("guardians")
			.insert({
				full_name: payload.guardian_name.trim(),
				phone_number: payload.guardian_phone || null,
				nin: payload.guardian_nin || null,
				email: payload.guardian_email || null,
				address: payload.guardian_address || null,
			})
			.select("id")
			.single();

		if (error || !guardian) throw new Error("Failed to create guardian");

		guardianId = guardian.id;
	}

	const { data, error: childError } = await adminClient
		.from("children")
		.insert({
			first_name: payload.first_name.trim(),
			last_name: payload.last_name.trim(),
			gender: payload.gender,
			date_of_birth: payload.date_of_birth,
			location: payload.location,
			language: payload.language ?? null,
			dream_job: payload.dream_job ?? null,
			favorite_activity: payload.favorite_activity ?? null,
			biography: payload.biography ?? null,
			family_biography: payload.family_biography ?? null,
			guardian_id: guardianId,
			guardian_relationship: payload.guardian_relationship ?? null,
			status: "Waiting" as ChildStatus,
			field_officer_id: "02cf43ce-6edb-4adc-b6f9-42dda3de08f9", //TODO: change will require when find out what it is
		})
		.select("id")
		.single();

	if (childError || !data) throw new Error("Failed to create child");

	return data.id;
}

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
