"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	Home,
	Users,
	Heart,
	Handshake,
	Gift,
	FileText,
	MessageSquare,
	Settings,
	Shield,
	type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@heroui/react";

type NavItem = {
	label: string;
	href: string;
	icon: LucideIcon;
};

type NavSection = {
	title: string;
	items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
	{
		title: "MAIN",
		items: [
			{ label: "Home", href: "/admin/dashboard", icon: Home },
			{ label: "Children", href: "/admin/children", icon: Users },
			{ label: "Sponsors", href: "/admin/sponsors", icon: Heart },
			{ label: "Sponsorships", href: "/admin/sponsorships", icon: Handshake },
			{ label: "Donations", href: "/admin/donations", icon: Gift },
		],
	},
	{
		title: "COMMUNICATIONS",
		items: [
			{ label: "Reports", href: "/admin/reports", icon: FileText },
			{ label: "Messages", href: "/admin/messages", icon: MessageSquare },
		],
	},
	{
		title: "SYSTEM",
		items: [
			{ label: "Settings", href: "/admin/settings", icon: Settings },
			{ label: "Admin", href: "/admin/organizations", icon: Shield },
		],
	},
];

export function AdminSidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const { user, loading } = useAuth();
	const [mounted, setMounted] = useState(false);
	const [target, setTarget] = useState<string>("");
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth/admin-login");
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		//get the sponsors data from db
		if (!user) return;
		const role = user.app_metadata.role;

		if (role === "admin") {
			setTarget("admins");
		} else {
			setTarget("super_admins");
		}

		const fetchProfileImage = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from(target)
				.select("*")
				.eq("id", user.id)
				.single();

			if (error || !data) {
				return;
			}

			let signedUrl: string | undefined;

			if (data.photo_path && target) {
				const res = await fetch(
					`/api/supabase/signed-url/admins?path=${data.photo_path}`,
					{ method: "GET" },
				);

				if (res.ok) {
					signedUrl = (await res.json()).signedUrl;
				}
			}

			setAvatarUrl(signedUrl);
		};

		if (user && target) {
			fetchProfileImage();
		}
	}, [user, target]);

	return (
		<aside className="w-80 bg-primary text-white h-screen flex flex-col">
			{/* Logo (fixed) */}
			<div className="flex justify-center pt-6 pb-4 shrink-0">
				<Image
					src="/children/logo.png"
					alt="Murphy Charitable"
					width={160}
					height={160}
					priority
				/>
			</div>

			<nav className="flex-1 flex flex-col overflow-hidden">
				{/* Menu — scrollable */}
				<div className="px-6 mt-2 overflow-y-auto flex-1">
					{NAV_SECTIONS.map((section, sectionIndex) => (
						<div key={section.title}>
							{sectionIndex > 0 && <div className="my-4" />}
							<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
								{section.title}
							</p>
							<ul className="space-y-1">
								{section.items.map((item) => {
									const isActive =
										pathname === item.href ||
										pathname.startsWith(item.href + "/");

									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={[
													"flex items-center gap-3 px-4 py-3 text-base text-left transition-colors rounded-sm",
													isActive
														? "bg-primary-200 text-primary-900 font-semibold"
														: "text-white hover:bg-primary-200/50",
												].join(" ")}
											>
												<item.icon
													size={18}
													className="shrink-0"
												/>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>

				{/* Profile (fixed at bottom) */}
				{mounted && !loading && user && (
					<div className="mt-auto px-6 pb-6 pt-6">
						<div className="mb-4 border-t border-white/30" />

						<div className="flex items-center gap-3 mb-4">
							<Avatar
								name={`${user.user_metadata.first_name} ${user.user_metadata.last_name}`}
								src={avatarUrl}
								size="sm"
								color="primary"
								className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-lg font-semibold text-primary"
							/>

							<div className="min-w-0">
								<div className="text-base truncate font-semibold text-blue-300">
									{`${user.user_metadata.first_name} ${user.user_metadata.last_name}`}
								</div>
							</div>
						</div>

						<button
							className="w-full rounded-sm border border-white/70 py-3 text-center font-medium text-white hover:bg-white/10 transition"
							onClick={logout}
						>
							Sign out
						</button>
					</div>
				)}
			</nav>
		</aside>
	);
}
