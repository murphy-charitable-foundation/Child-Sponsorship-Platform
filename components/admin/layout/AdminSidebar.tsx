"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Avatar } from "@heroui/react";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
	{ label: "Home", href: "/admin/dashboard" },
	{ label: "Children", href: "/admin/children" },
	{ label: "Sponsors", href: "/admin/sponsors" },
	{ label: "Sponsorship", href: "/admin/sponsorships" },
	{ label: "Donations", href: "/admin/donations" },
	{ label: "Reports", href: "/admin/reports" },
	{ label: "Messages", href: "/admin/messages" },
	{ label: "Settings", href: "/admin/settings" },
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
		//setUserAuthenticated(false);
		await supabase.auth.signOut();
		router.push("/auth/login");
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		//get the sponsors data from db
		if (!user) return;
		const role = user.user_metadata.role;

		if (role === "sponsor") {
			setTarget("sponsors");
		} else if (role === "admin") {
			setTarget("admins");
		} else if (role === "super_admin") {
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
					`/api/supabase/signed-url/${target}?path=${data.photo_path}`,
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

	const userFirstName =
		user?.user_metadata.first_name || user?.email?.split("@")[0] || "User";
	const userLastName = user?.user_metadata.last_name || "";

	return (
		<aside className="w-80 bg-primary text-white h-screen">
			<nav className="h-full flex flex-col">
				{/* Logo (fixed) */}
				<div className="flex justify-center pt-6 pb-4">
					<Image
						src="/children/logo.png"
						alt="Murphy Charitable"
						width={160}
						height={160}
						priority
					/>
				</div>

				{/* Menu (scrolls if it gets too tall) */}
				<div className="flex-1 min-h-0 overflow-auto px-6 pb-10">
					<ul className="space-y-3">
						{NAV_ITEMS.map((item) => {
							const isActive =
								pathname === item.href || pathname.startsWith(item.href + "/");

							return (
								<li key={item.href}>
									<Link
										href={item.href}
										className={[
											"block px-4 py-3 text-base text-left transition-colors rounded-sm",
											isActive
												? "bg-primary-200 text-primary-900 font-semibold"
												: "text-white hover:bg-primary-200/50",
										].join(" ")}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				{/* Profile (ALWAYS visible) */}

				{mounted && !loading && user && (
					<div className="mt-auto px-6 pb-6 pt-6">
						<div className="mb-4 border-t border-white/30" />

						<div className="flex items-center gap-3 mb-4">
							<Avatar
								name={`${userFirstName} ${userLastName}`}
								src={avatarUrl}
								size="sm"
								color="primary"
								className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-lg font-semibold text-primary"
							/>

							<div className="min-w-0">
								<div className="text-base font-medium truncate">
									{`${userFirstName} ${userLastName}`}
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
