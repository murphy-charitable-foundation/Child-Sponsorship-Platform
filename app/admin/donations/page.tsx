import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

import DonationsPage from "@/components/admin/donations/DonationsPage";
import { getDonations } from "@/lib/supabase/queries/donations";
import { DonationTableData } from "@/components/admin/donations/types";

export default async function Page() {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") redirect("/auth/admin-login");
	if (adminResult.error === "forbidden") redirect("/");

	let donations: DonationTableData[] = [];
	let error: string | null = null;

	try {
		donations = await getDonations();
	} catch (e) {
		error = e instanceof Error ? e.message : "Failed to load donations.";
	}

	return (
		<DonationsPage
			donations={donations}
			error={error}
		/>
	);
}
