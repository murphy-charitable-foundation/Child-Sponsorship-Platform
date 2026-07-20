import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextRequest, NextResponse } from "next/server";
import { countryCodeToName } from "../route";
import { faker } from "@faker-js/faker";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data: donation, error } = await adminClient
		.from("donations")
		.select(
			"id, date_time, amount, payment_methods(label), payments(raw, status)",
		)
		.eq("id", id)
		.single();

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to get donation data" },
			{ status: 500 },
		);
	}

	const payment = donation.payments[0];

	const paymentMethod = (
		donation.payment_methods as unknown as { label: string } | null
	)?.label;

	const countryCode = payment?.raw?.payer?.address?.country_code;

	const data = {
		id: donation.id,
		amount: donation.amount,
		date_time: donation.date_time,
		payment_method: paymentMethod,
		purpose: "",
		first_name:
			payment?.raw?.payer?.name?.given_name ?? faker.person.firstName(),
		last_name: payment?.raw?.payer?.name?.surname ?? faker.person.lastName(),
		country: countryCode ? countryCodeToName(countryCode) : null,
		email: payment.raw?.payer?.email_address,
	};

	return NextResponse.json({ data });
}
