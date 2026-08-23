import { DonationTableData } from "@/components/admin/donations/types";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getDonations(): Promise<DonationTableData[]> {
	const adminClient = createAdminClient();

	const { data: donations, error } = await adminClient
		.from("donations")
		.select("*, payment_methods(label)")
		.order("date_time", { ascending: false });

	if (error) throw new Error("Failed to get donations data");

	return donations.map((d) => ({
		id: d.id,
		date_time: d.date_time,
		first_name: d.first_name,
		last_name: d.last_name,
		amount: d.amount,
		purpose: d.purpose ?? "-",
		country: d.country,
		payment_method: d.payment_methods.label,
	}));
}
