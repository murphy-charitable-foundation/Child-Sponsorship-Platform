"use client";

import { AdminSignUpForm } from "@/components/admin-sign-up-form";
import Image from "next/image";

export default function Page() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-primary px-5 py-16">
			<div className="relative w-full max-w-[520px] rounded-[12px] bg-content1 px-8 pb-10 pt-28 shadow-xl sm:px-11">
				<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
					<Image
						src="/children/logo.png"
						alt="Murphy Charitable Foundation"
						width={132}
						height={132}
						priority
					/>
				</div>

				<h1 className="text-center text-3xl font-semibold text-primary">
					Admin Portal Create Account
				</h1>

				<AdminSignUpForm />
			</div>
		</div>
	);
}
