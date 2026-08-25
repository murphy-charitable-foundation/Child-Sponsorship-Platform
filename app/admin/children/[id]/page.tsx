import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getChildById } from "@/lib/supabase/queries/children";
import ChildProfilePage from "@/components/admin/children/ChildProfilePage";
import { Button } from "@/components/ui/button";

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

	const child = await getChildById(id);

	if (!child) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-50">
				<p className="text-xl font-semibold ">Child not found.</p>

				<Button
					variant="outline"
					asChild
				>
					<Link href="/admin/children">← Back to All Children</Link>
				</Button>
			</div>
		);
	}

	return <ChildProfilePage child={child} />;
}
