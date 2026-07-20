import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function countryCodeToName(code: string): string | null {
	try {
		return regionNames.of(code) ?? null;
	} catch {
		return null;
	}
}

//TODO: Once we determine donation table creation flow and connect donation and payment, then we will store country, purpose and user name into donation table
//and we don't need to get the associated payment raw data.

export async function GET() {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data: donations, error } = await adminClient
		.from("donations")
		.select(
			"id, date_time, amount, payment_methods(label), payments(raw, status)",
		)
		.order("date_time", { ascending: false });

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to get donations data" },
			{ status: 500 },
		);
	}

	const data = donations.map((d) => {
		const payment = d.payments[0];
		const countryCode = payment?.raw?.payer?.address?.country_code;

		return {
			id: d.id,
			date_time: d.date_time,
			first_name:
				payment?.raw?.payer?.name?.given_name ?? faker.person.firstName(),
			last_name: payment?.raw?.payer?.name?.surname ?? faker.person.lastName(),
			amount: d.amount,
			status: payment?.status ?? "",
			purpose: "", // we need to add this either donation or payment table
			country: countryCode ? countryCodeToName(countryCode) : null,
		};
	});

	return NextResponse.json({ data });
}
