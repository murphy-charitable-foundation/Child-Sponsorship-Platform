import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = await createClient();

	const { error: authError } = await requireAdmin(supabase);

	if (authError) return authError;

	const adminClient = createAdminClient();

	const { data: donations, error } = await adminClient
		.from("donations")
		.select("*, payment_methods(label)")
		.order("date_time", { ascending: false });

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to get donations data" },
			{ status: 500 },
		);
	}

	const data = donations.map((d) => {
		return {
			id: d.id,
			date_time: d.date_time,
			first_name: d.first_name,
			last_name: d.last_name,
			amount: d.amount,
			purpose: d.purpose ?? "-",
			country: d.country,
			payment_method: d.payment_methods.label,
		};
	});
	return NextResponse.json({ data });
}
