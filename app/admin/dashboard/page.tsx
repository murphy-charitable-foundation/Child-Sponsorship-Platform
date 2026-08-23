import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getActiveSponsorships } from "@/lib/supabase/queries/sponsorships";
import { getChildrenAwaitingSponsorshipCount } from "@/lib/supabase/queries/children";
import { getDonations } from "@/lib/supabase/queries/donations";
import AdminDashboardPage from "@/components/admin/dashboard/AdminDashboardPage";

export default async function Page() {
	const supabase = await createClient();
	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") redirect("/auth/admin-login");
	if (authError === "forbidden") redirect("/");

	const [
		{ activeSponsorships, byCountry },
		childrenAwaitingSponsorship,
		donations,
	] = await Promise.all([
		getActiveSponsorships(),
		getChildrenAwaitingSponsorshipCount(),
		getDonations(),
	]);

	return (
		<AdminDashboardPage
			activeSponsorships={activeSponsorships}
			childrenAwaitingSponsorship={childrenAwaitingSponsorship}
			donations={donations}
			sponsorshipsByCountry={byCountry}
		/>
	);
}
