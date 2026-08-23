import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

import { Button } from "@/components/ui/button";
import { getSponsorById } from "@/lib/supabase/queries/sponsors";
import SponsorProfilePage from "@/components/admin/sponsors/SponsorProfilePage";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") redirect("/auth/admin-login");
	if (adminResult.error === "forbidden") redirect("/");

	const sponsor = await getSponsorById(id);

	if (!sponsor) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-50">
				<p className="text-xl font-semibold ">Sponsor not found.</p>

				<Button
					variant="outline"
					asChild
				>
					<Link href="/admin/sponsors">← Back to All Sponsors</Link>
				</Button>
			</div>
		);
	}

	return <SponsorProfilePage sponsor={sponsor} />;
}
