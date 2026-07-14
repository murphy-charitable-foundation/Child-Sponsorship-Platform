import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type PayPalCaptureRaw = {
	payer?: {
		name?: {
			given_name?: string;
			surname?: string;
		};
		address?: {
			country_code?: string;
		};
		email_address?: string;
	};
};

export type SponsorshipSponsorEmbed = {
	sponsors: {
		first_name: string;
		last_name: string;
		country: string | null;
		phone_number: string | null;
		email: string | null;
	} | null;
} | null;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function countryCodeToName(code: string): string | null {
	try {
		return regionNames.of(code) ?? null;
	} catch {
		return null;
	}
}

export async function GET() {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const adminClient = createAdminClient();

	const { data: payments, error } = await adminClient
		.from("payments")
		.select(
			"payment_id, user_id, amount_value, created_at, raw, status, sponsorships(sponsors(first_name, last_name, country, phone_number, email))",
		)
		.order("created_at", { ascending: false });

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to get donations data" },
			{ status: 500 },
		);
	}

	const data = payments.map((d) => {
		const raw = d.raw as PayPalCaptureRaw | null;
		const sponsor = (d.sponsorships as unknown as SponsorshipSponsorEmbed)
			?.sponsors;

		return {
			id: d.payment_id,
			user_id: d.user_id,
			first_name: raw?.payer?.name?.given_name ?? sponsor?.first_name ?? "",
			last_name: raw?.payer?.name?.surname ?? sponsor?.last_name ?? "",
			amount: Number(d.amount_value),
			date_time: d.created_at,
			status: d.status,
			purpose: "", // we need to add this either donation or payment table
			country:
				(raw?.payer?.address?.country_code
					? countryCodeToName(raw.payer.address.country_code)
					: null) ??
				sponsor?.country ??
				null,
		};
	});

	return NextResponse.json({ data });
}
