"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function AppNavbar() {
	const router = useRouter();

	const { user, loading } = useAuth();
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
	const [target, setTarget] = useState<string>("");

	const logout = async () => {
		const supabase = createClient();
		//setUserAuthenticated(false);
		await supabase.auth.signOut();
		router.push("/auth/login");
	};

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
		<Navbar
			maxWidth="full"
			className="border-b border-default-200 bg-white"
			isBordered
		>
			<NavbarBrand>
				<Image
					src="/children/logo.png"
					alt="Murphy Charitable Foundation"
					width={48}
					height={48}
				/>
			</NavbarBrand>

			<NavbarContent
				className="hidden sm:flex gap-6"
				justify="center"
			>
				<NavbarItem>
					<NextLink
						href="/"
						className="text-sm text-foreground"
					>
						Home
					</NextLink>
				</NavbarItem>

				<NavbarItem>
					<NextLink
						href="/sponsorship/children"
						className="text-sm text-foreground"
					>
						Meet the Children ▾
					</NextLink>
				</NavbarItem>

				<NavbarItem>
					<NextLink
						href="#"
						className="text-sm text-foreground"
					>
						Who We Are
					</NextLink>
				</NavbarItem>

				<NavbarItem>
					<NextLink
						href="#"
						className="text-sm text-foreground"
					>
						About the Program ▾
					</NextLink>
				</NavbarItem>

				<NavbarItem>
					<NextLink
						href="#"
						className="text-sm text-foreground"
					>
						Contact
					</NextLink>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent
				justify="end"
				className="gap-4 pr-4"
			>
				<NavbarItem>
					{!loading && !user && (
						<Button
							as={NextLink}
							href="/auth/login"
							variant="bordered"
							color="primary"
							radius="md"
							size="sm"
						>
							Login
						</Button>
					)}
					{!loading && user && (
						<Dropdown>
							<DropdownTrigger>
								<Button
									isIconOnly
									radius="full"
									variant="light"
								>
									<Avatar
										name={`${userFirstName} ${userLastName}`}
										src={avatarUrl}
										size="sm"
										color="primary"
									/>
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem
									key="profile"
									onClick={() => router.push("profile")}
								>
									Profile
								</DropdownItem>
								<DropdownItem
									key="logout"
									onClick={logout}
								>
									Logout
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)}
				</NavbarItem>

				<NavbarItem>
					<Button
						as={NextLink}
						href="#"
						color="secondary"
						radius="md"
						size="sm"
					>
						Donate
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
