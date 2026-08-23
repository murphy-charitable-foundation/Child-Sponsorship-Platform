import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getSponsorships } from "@/lib/supabase/queries/sponsorships";
import { getChildrenAwaitingSponsorshipCount } from "@/lib/supabase/queries/children";
import SponsorshipsPage from "@/components/admin/sponsorships/SponsorshipsPage";

export default async function Page() {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") redirect("/auth/admin-login");
	if (adminResult.error === "forbidden") redirect("/");

	const [childrenAwaitingSponsorship, sponsorships] = await Promise.all([
		getChildrenAwaitingSponsorshipCount(),
		getSponsorships(),
	]);

	return (
		<SponsorshipsPage
			childrenAwaitingSponsorship={childrenAwaitingSponsorship}
			initialSponsorships={sponsorships}
		/>
	);
}
