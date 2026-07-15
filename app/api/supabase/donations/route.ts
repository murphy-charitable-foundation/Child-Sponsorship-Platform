import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
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

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

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
