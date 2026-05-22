"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Avatar } from "@heroui/react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChildRow } from "@/components/admin/children/ChildrenPage";
import {
	BookOpen,
	HeartPlus,
	Salad,
	ShieldCheck,
	ArrowLeft,
	ArrowRight,
	ChevronRight,
	Smile,
	Sparkles,
	Heart,
	Plus,
} from "lucide-react";

export default function ChildProfilePageWrapper() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-blue-50">
					<p className="text-zinc-500">Loading...</p>
				</div>
			}
		>
			<ChildProfilePage />
		</Suspense>
	);
}

const sponsorshipItems = [
	{
		title: "Education",
		desc: "School tuition, uniforms, supplies, and books to support their academic journey.",
		icon: <BookOpen className="size-6 text-green-500" />,
	},
	{
		title: "Healthcare",
		desc: "Regular medical check-ups, vaccinations, and treatment when needed.",
		icon: <HeartPlus className="size-6 text-green-500" />,
	},
	{
		title: "Nutritious Meals",
		desc: "Daily meals at school to ensure proper nutrition and healthy development.",
		icon: <Salad className="size-6 text-green-500" />,
	},
	{
		title: "Safe Environment",
		desc: "A secure, nurturing community where they can learn and grow safely.",
		icon: <ShieldCheck className="size-6 text-green-500" />,
	},
];

function ChildProfilePage() {
	const { childId } = useParams<{ childId: string }>();
	const [child, setChild] = useState<ChildRow>();
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const [showFullBio, setShowFullBio] = useState(false);

	useEffect(() => {
		if (!childId) return;

		const fetchChild = async () => {
			const supabase = createClient();

			const { data, error } = await supabase
				.from("children")
				.select("*")
				.eq("id", childId)
				.single();

			if (error || !data) {
				setNotFound(true);
				setLoading(false);
				return;
			}

			let signedUrl: string | undefined;

			if (data.photo_path) {
				const res = await fetch(
					`/api/supabase/children-signed-url?path=${data.photo_path}`,
					{ method: "GET" },
				);

				if (res.ok) {
					signedUrl = (await res.json()).signedUrl;
				}
			}

			setChild({
				...data,
				imageUrl: signedUrl,
			});

			setLoading(false);
		};

		fetchChild();
	}, [childId]);

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
				<p className="text-xl font-semibold text-[#2b3039]">Child not found.</p>

				<Button
					as={Link}
					href="/sponsorship/children"
					variant="bordered"
					color="secondary"
					radius="md"
				>
					← Back to All Children
				</Button>
			</div>
		);
	}

	const bioText = `${child.first_name} is ${child.age} years old from ${
		child.location ?? "Uganda"
	}. ${
		child.favorite_activity
			? `They love ${child.favorite_activity.toLowerCase()}.`
			: ""
	} ${
		child.dream_job
			? `${child.first_name} dreams of becoming a ${child.dream_job.toLowerCase()}.`
			: ""
	}`.trim();

	const bioCutoff = 200;
	const bioIsTruncated = bioText.length > bioCutoff;

	return (
		<div className="min-h-screen bg-blue-50">
			<div className="mx-auto max-w-[1272px] px-4 py-6">
				{/* Breadcrumb */}
				<div className="mb-3 flex items-center gap-2 text-sm">
					<Link
						href="/sponsorship/children"
						className="text-zinc-500 hover:text-zinc-700"
					>
						Meet the Children
					</Link>
					<ChevronRight className="size-3" />

					<span className="font-medium text-[#034790]">Child Details</span>
				</div>

				{/* Back button */}
				<Link
					href="/sponsorship/children"
					className="mb-6 inline-flex items-center gap-2 rounded-[12px] bg-blue-50 px-4 py-3 text-sm text-[#2b3039] transition-colors hover:bg-[#e4edf8]"
				>
					<ArrowLeft className="size-6" /> Back to all children
				</Link>

				{/* Main two-column layout */}
				<div className="flex flex-col items-start gap-4 lg:flex-row">
					{/* Left: Child Profile Card */}
					<div className="flex w-full shrink-0 flex-col items-center gap-3 rounded-[12px] border border-[#e4e6e9] bg-white px-4 pb-8 pt-4 lg:w-[408px]">
						{/* Photo */}
						<div className="relative h-[300px] w-full overflow-hidden rounded-[14px] bg-[#e4edf8]">
							{child.imageUrl ? (
								<Image
									src={child.imageUrl}
									alt={child.full_name}
									fill
									className="object-cover object-[center_30%]"
									unoptimized
								/>
							) : (
								<Avatar
									radius="none"
									color="primary"
									className="h-full w-full"
								/>
							)}
						</div>

						{/* Name & info */}
						<div className="flex w-full flex-col items-center gap-2">
							<h2 className="text-center text-2xl font-semibold text-[#2b3039]">
								{child.first_name} {child.last_name}
							</h2>

							<p className="text-sm font-medium text-[#2b3039]">
								{child.age} years old
								{child.location ? ` • ${child.location}` : ""}
							</p>
						</div>

						{/* Buttons */}
						<div className="mt-2 flex w-full flex-col gap-4">
							<button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#4bb32e] text-base font-bold text-white transition-colors hover:bg-[#42972a]">
								<Heart className="size-6 text-white" />
								Sponsor {child.first_name}
							</button>

							<button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] border-2 border-[#4bb32e] text-base font-bold text-[#4bb32e] transition-colors hover:bg-[#f6faf4]">
								<Plus className="size-6 text-green-500" />
								Sponsor More Children
							</button>
						</div>
					</div>

					{/* Right: Content sections */}
					<div className="flex min-w-0 flex-1 flex-col gap-4">
						{/* About */}
						<div className="flex flex-col gap-3 rounded-[12px] border border-[#e4e6e9] bg-white p-6">
							<div className="flex items-center gap-2">
								<Smile className="size-6 text-green-500" />
								<h3 className="text-2xl font-semibold text-[#2b3039]">
									{child.first_name}
								</h3>
							</div>

							<p className="text-base leading-6 text-[#3c424c]">
								{showFullBio || !bioIsTruncated
									? bioText
									: `${bioText.slice(0, bioCutoff)}...`}
							</p>

							{bioIsTruncated && (
								<button
									onClick={() => setShowFullBio((v) => !v)}
									className="flex items-center gap-1 self-end text-sm text-[#2b3039] hover:underline"
								>
									{showFullBio ? "Show less" : "Show more"}

									<ArrowRight className="size-6" />
								</button>
							)}
						</div>

						{/* Dreams & Aspirations */}
						<div className="flex flex-col gap-3 rounded-[12px] border border-[#e4e6e9] bg-white p-6">
							<div className="flex items-center gap-2">
								<Sparkles className="size-6 text-green-500" />
								<h3 className="text-2xl font-semibold text-[#2b3039]">
									Dreams & Aspirations
								</h3>
							</div>

							<p className="text-base leading-6 text-[#3c424c]">
								{child.dream_job
									? `"${child.first_name} dreams of becoming a ${child.dream_job.toLowerCase()}."`
									: "No aspirations listed yet."}
							</p>
						</div>

						{/* Your Sponsorship Provides */}
						<div className="flex flex-col gap-6 rounded-[12px] bg-[#cadbf2] p-6">
							<h3 className="text-2xl font-semibold text-[#2b3039]">
								Your Sponsorship Provides
							</h3>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{sponsorshipItems.map((item) => (
									<div
										key={item.title}
										className="flex flex-col gap-4 rounded-[12px] bg-white/50 p-6"
									>
										<div className="flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-white">
											{item.icon}
										</div>

										<h4 className="text-xl font-semibold text-[#2b3039]">
											{item.title}
										</h4>

										<p className="text-base leading-6 text-[#3c424c]">
											{item.desc}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Sponsor a Group */}
						<div className="flex flex-col items-center gap-8 rounded-[12px] border border-[#e4e6e9] bg-white p-6 pb-8">
							<div className="flex flex-col items-center gap-4">
								<h3 className="text-2xl font-semibold text-[#2b3039]">
									Sponsor a Group of Children
								</h3>

								<p className="text-center text-base text-[#3c424c]">
									Multiply your impact by sponsoring multiple children at once
								</p>
							</div>

							<button className="flex h-12 w-[210px] cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#4bb32e] text-base font-bold text-white transition-colors hover:bg-[#42972a]">
								<Heart className="size-6 text-white" />
								Sponsor a Group
							</button>
						</div>

						{/* Disclaimer */}
						<div className="rounded-[12px] border border-[#e4e6e9] bg-white p-6">
							<p className="text-base text-[#3c424c]">
								Sponsorship starts at just $25/month per child and can be
								cancelled anytime
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
