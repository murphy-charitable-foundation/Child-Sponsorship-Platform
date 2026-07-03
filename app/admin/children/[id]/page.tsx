"use client";

import { Suspense, useEffect, useState } from "react";
import ChildProfilePage from "@/components/admin/children/ChildProfilePage";
import { useParams } from "next/navigation";
import { ChildProfile } from "@/components/admin/children/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChildEditPageWrapper() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-blue-50">
					<p className="text-zinc-500">Loading...</p>
				</div>
			}
		>
			<ChildEditPage />
		</Suspense>
	);
}
function ChildEditPage() {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const [child, setChild] = useState<ChildProfile>();

	useEffect(() => {
		if (!id) return;

		const fetchChild = async () => {
			const res = await fetch(`/api/supabase/children/${id}`, {
				method: "GET",
			});

			if (!res.ok) {
				setNotFound(true);
				setLoading(false);
				return;
			}

			const { child } = await res.json();

			setChild(child);
			setLoading(false);
		};

		fetchChild();
	}, [id]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-blue-50">
				<p className="text-zinc-500">Loading...</p>
			</div>
		);
	}

	if (notFound || !child) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-50">
				<p className="text-xl font-semibold ">Child not found.</p>

				<Button
					variant="outline"
					asChild
				>
					<Link href="/sponsorship/children">← Back to All Children</Link>
				</Button>
			</div>
		);
	}

	return <ChildProfilePage child={child} />;
}
