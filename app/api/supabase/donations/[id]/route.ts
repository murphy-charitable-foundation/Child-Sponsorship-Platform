import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { countryCodeToName, SponsorshipSponsorEmbed } from "../route";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

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

	const { data: donation, error } = await adminClient
		.from("payments")
		.select(
			"payment_id, user_id, amount_value, created_at, plan_type, raw, payment_methods(label), sponsorships(sponsors(first_name, last_name, country, email, phone_number))",
		)
		.eq("payment_id", id)
		.single();

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to get donation data" },
			{ status: 500 },
		);
	}

	const sponsor = (donation.sponsorships as unknown as SponsorshipSponsorEmbed)
		?.sponsors;
	const paymentMethod = (
		donation.payment_methods as unknown as { label: string } | null
	)?.label;

	const data = {
		id: donation.payment_id,
		amount: Number(donation.amount_value),
		date_time: donation.created_at,
		payment_method: paymentMethod,
		purpose: "",
		frequency: donation.plan_type,
		user_id: donation.user_id,
		first_name:
			donation.raw?.payer?.name?.given_name ?? sponsor?.first_name ?? "",
		last_name: donation.raw?.payer?.name?.surname ?? sponsor?.last_name ?? "",
		country:
			(donation.raw?.payer?.address?.country_code
				? countryCodeToName(donation.raw.payer.address.country_code)
				: null) ??
			sponsor?.country ??
			null,
		email: donation.raw?.payer?.email_address ?? sponsor?.email ?? "",
		phone_number: sponsor?.phone_number ?? "",
	};

	console.log(data);

	return NextResponse.json({ data });
}
