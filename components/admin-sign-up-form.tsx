"use client";

import { createClient } from "@/lib/supabase/client";
import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminSignUpForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		try {
			const { error } = await supabase.auth.signUp({
				email: username,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/auth/admin-login`,
					data: {
						role: "admin",
						first_name: firstName,
						last_name: lastName,
						active: true,
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
		<form
			onSubmit={handleSignUp}
			className="mt-10 space-y-6"
		>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<Field label="First name" htmlFor="admin-first-name">
					<input
						id="admin-first-name"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className={inputCls}
						autoComplete="given-name"
						required
					/>
				</Field>
				<Field label="Last name" htmlFor="admin-last-name">
					<input
						id="admin-last-name"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className={inputCls}
						autoComplete="family-name"
						required
					/>
				</Field>
			</div>

			<Field label="Username" htmlFor="admin-sign-up-username">
				<input
					id="admin-sign-up-username"
					type="email"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className={inputCls}
					autoComplete="email"
					required
				/>
			</Field>

			<Field label="Password" htmlFor="admin-sign-up-password">
				<input
					id="admin-sign-up-password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={inputCls}
					autoComplete="new-password"
					required
				/>
			</Field>

			<Field label="Confirm password" htmlFor="admin-confirm-password">
				<input
					id="admin-confirm-password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					className={inputCls}
					autoComplete="new-password"
					required
				/>
			</Field>

			{error ? (
				<p className="rounded-[12px] bg-danger-50 px-3 py-2 text-sm text-danger">
					{error}
				</p>
			) : null}

			<Button
				type="submit"
				color="primary"
				radius="md"
				className="h-12 w-full rounded-[12px] text-base font-semibold"
				isLoading={isLoading}
				isDisabled={isLoading}
			>
				{isLoading ? "Creating account..." : "Create account"}
			</Button>

			<p className="pt-4 text-center text-base text-default-500">
				Already have an account?{" "}
				<Link
					href="/auth/admin-login"
					className="text-base font-semibold text-primary"
				>
					Log in
				</Link>
			</p>
		</form>
	);
}

const inputCls =
	"h-10 w-full rounded-none border border-default-300 bg-content1 px-3 text-sm text-default-900 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

function Field({
	label,
	htmlFor,
	children,
}: {
	label: string;
	htmlFor: string;
	children: React.ReactNode;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="block"
		>
			<span className="mb-2 block text-sm font-medium text-default-700">
				{label}
			</span>
			{children}
		</label>
	);
}
