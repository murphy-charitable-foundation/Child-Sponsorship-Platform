import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextRequest, NextResponse } from "next/server";

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
		.select("*, payment_methods(label)")
		.eq("id", id)
		.single();

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to get donation data" },
			{ status: 500 },
		);
	}

	const data = {
		id: donation.id,
		amount: donation.amount,
		date_time: donation.date_time,
		payment_method: donation.payment_methods.label,
		purpose: donation.purpose ?? "-",
		first_name: donation.first_name,
		last_name: donation.last_name,
		country: donation.country,
		email: donation.email,
	};

	return NextResponse.json({ data });
}
