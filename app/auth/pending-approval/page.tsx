import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Approval Pending</CardTitle>
							<CardDescription>Your account is under review</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<p className="text-sm text-muted-foreground">
								Your admin account has been created but hasn&apos;t been
								approved yet. A super admin will review your request and grant
								access shortly.
							</p>
							<p className="text-sm text-muted-foreground">
								You&apos;ll be able to access once your account has been
								approved. Please check back later or contact to Super Admin.
							</p>
							<Link
								href="/"
								className="text-sm underline underline-offset-4"
							>
								Back to Home
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
