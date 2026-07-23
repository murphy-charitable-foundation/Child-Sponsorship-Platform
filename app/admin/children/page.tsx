import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import ChildrenPage from "../../../components/admin/children/ChildrenPage";
import { getActiveSponsorships } from "@/lib/supabase/queries/sponsorship";
import {
	getChildren,
	getChildrenAwaitingSponsorshipCount,
} from "@/lib/supabase/queries/children";

export default async function Page() {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") redirect("/auth/admin-login");
	if (adminResult.error === "forbidden") redirect("/");

	const [{ activeSponsorships }, childrenAwaitingSponsorship, children] =
		await Promise.all([
			getActiveSponsorships(),
			getChildrenAwaitingSponsorshipCount(),
			getChildren(adminResult.userRole, adminResult.region),
		]);

	return (
		<ChildrenPage
			activeSponsorships={activeSponsorships}
			childrenAwaitingSponsorship={childrenAwaitingSponsorship}
			initialChildren={children}
			region={adminResult.userRole === "admin" ? adminResult.region : null}
		/>
	);
}
