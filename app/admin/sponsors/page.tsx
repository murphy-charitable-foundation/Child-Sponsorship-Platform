import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getActiveSponsorships } from "@/lib/supabase/queries/sponsorships";
import { getChildrenAwaitingSponsorshipCount } from "@/lib/supabase/queries/children";
import { getSponsors } from "@/lib/supabase/queries/sponsors";

import SponsorPage from "../../../components/admin/sponsors/SponsorsPage";

export default async function Page() {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") redirect("/auth/admin-login");
	if (adminResult.error === "forbidden") redirect("/");

	const [{ activeSponsorships }, childrenAwaitingSponsorship, sponsors] =
		await Promise.all([
			getActiveSponsorships(),
			getChildrenAwaitingSponsorshipCount(),
			getSponsors(false),
		]);

	return (
		<SponsorPage
			activeSponsorships={activeSponsorships}
			childrenAwaitingSponsorship={childrenAwaitingSponsorship}
			initialSponsors={sponsors}
		/>
	);
}
