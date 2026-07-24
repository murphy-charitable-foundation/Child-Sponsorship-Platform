import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { Button } from "@/components/ui/button";
import { getDonorByDonationId } from "@/lib/supabase/queries/donations";
import DonorProfilePage from "@/components/admin/donations/DonorProfilePage";

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

	const donor = await getDonorByDonationId(id);

	if (!donor) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-50">
				<p className="text-xl font-semibold ">Donor not found.</p>

				<Button
					variant="outline"
					asChild
				>
					<Link href="/admin/children">← Back to All Donations</Link>
				</Button>
			</div>
		);
	}

	return <DonorProfilePage donor={donor} />;
}
