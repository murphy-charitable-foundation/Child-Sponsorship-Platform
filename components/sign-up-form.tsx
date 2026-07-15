"use client";

import { createClient } from "@/lib/supabase/client";
import {
	Checkbox,
	Input,
	Select,
	SelectItem,
	Button,
	Link,
	Divider,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SponsorType } from "./admin/sponsors/types";
import { SPONSOR_TYPE_LABELS } from "@/lib/constants";

export function SignUpForm({}: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [sponsorType, setSponsorType] = useState<SponsorType>("individual");
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		if (password !== repeatPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (!agreedToTerms) {
			setError("You must agree to the Terms of Use and Privacy Policy");
			setIsLoading(false);
			return;
		}

		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/protected`,
					data: {
						role: "sponsor",
						sponsor_type: sponsorType,
						first_name: firstName,
						last_name: lastName,
						active: true,
						phone_number: phone,
					},
				},
			});
			if (error) throw error;
			router.push("/auth/sign-up-success");
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="">
			<form onSubmit={handleSignUp}>
				<Select
					label="Sponsor Type*"
					labelPlacement="outside"
					placeholder="Select sponsor type"
					variant="bordered"
					radius="md"
					selectedKeys={[sponsorType]}
					onSelectionChange={(keys) => {
						if (keys === "all") return; // satisfy TS
						setSponsorType(keys as unknown as SponsorType);
					}}
					classNames={{
						trigger: "rounded-[12px]",
					}}
					defaultSelectedKeys={["individual"]}
				>
					{Object.entries(SPONSOR_TYPE_LABELS).map(([key, label]) => (
						<SelectItem
							key={key}
							classNames={{
								selectedIcon: "hidden",
							}}
						>
							{label}
						</SelectItem>
					))}
				</Select>

				<div className="flex flex-col gap-6">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input
							id="first-name"
							label="First Name*"
							labelPlacement="outside"
							variant="bordered"
							radius="md"
							required
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							classNames={{ inputWrapper: "rounded-[12px]" }}
						/>
						<Input
							id="last-name"
							label="Last Name*"
							labelPlacement="outside"
							variant="bordered"
							radius="md"
							required
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
							classNames={{ inputWrapper: "rounded-[12px]" }}
						/>
					</div>
					<div className="grid gap-2">
						<Input
							id="email"
							type="email"
							label="Email*"
							labelPlacement="outside"
							variant="bordered"
							radius="md"
							required
							value={email}
							classNames={{ inputWrapper: "rounded-[12px]" }}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Input
							id="phone-number"
							type="tel"
							label="Phone Number*"
							labelPlacement="outside"
							variant="bordered"
							radius="md"
							required
							value={phone}
							classNames={{ inputWrapper: "rounded-[12px]" }}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Divider />
						<Input
							id="password"
							type="password"
							label="Password*"
							labelPlacement="outside"
							variant="bordered"
							radius="md"
							required
							value={password}
							classNames={{ inputWrapper: "rounded-[12px]" }}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Input
							id="repeat-password"
							type="password"
							label="Repeat Password*"
							labelPlacement="outside"
							variant="bordered"
							radius="md"
							required
							value={repeatPassword}
							classNames={{ inputWrapper: "rounded-[12px]" }}
							onChange={(e) => setRepeatPassword(e.target.value)}
						/>
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
					<div className="flex">
						<Checkbox
							id="terms"
							isSelected={agreedToTerms}
							onValueChange={setAgreedToTerms}
						></Checkbox>
						<p className="text-sm">
							I agree to the{" "}
							<Link
								href="/terms"
								className="text-sm"
							>
								Terms of Use
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="text-sm"
							>
								Privacy Policy
							</Link>
						</p>
					</div>

					<Button
						type="submit"
						color="primary"
						radius="md"
						className="rounded-[12px]"
						disabled={isLoading}
					>
						{isLoading ? "Creating an account..." : "Sign up"}
					</Button>
				</div>
			</form>
		</div>
	);
}
