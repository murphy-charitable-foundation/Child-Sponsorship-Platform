"use client";

import { Suspense, useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SponsorProfile } from "@/components/admin/sponsors/types";
import SponsorProfilePage from "@/components/admin/sponsors/SponsorProfilePage";

export default function SponsorEditPageWrapper() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-blue-50">
					<p className="text-zinc-500">Loading...</p>
				</div>
			}
		>
			<SponsorEditPage />
		</Suspense>
	);
}
function SponsorEditPage() {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const [sponsor, setSponsor] = useState<SponsorProfile>();

	useEffect(() => {
		if (!id) return;

		const fetchSponsor = async () => {
			const res = await fetch(`/api/supabase/sponsors/${id}`, {
				method: "GET",
			});

			if (!res.ok) {
				setNotFound(true);
				setLoading(false);
				return;
			}

			const { sponsor } = await res.json();

			setSponsor(sponsor);
			setLoading(false);
		};

		fetchSponsor();
	}, [id]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-blue-50">
				<p className="text-zinc-500">Loading...</p>
			</div>
		);
	}

	if (notFound || !sponsor) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-50">
				<p className="text-xl font-semibold ">Sponsor not found.</p>

				<Button variant="outline">
					<Link href="/sponsorship/sponsors">← Back to All Sponsors</Link>
				</Button>
			</div>
		);
	}

	return <SponsorProfilePage sponsor={sponsor} />;
}
