"use client";

import { ChildTabHeader } from "./ChildTabHeader";

type ConsentInfo = {
	decision: "Granted" | "Denied" | "Pending";
	guardian: string;
	date: string;
	method: "In person" | "Phone" | "Email" | "Written";
};

type WebsiteVisibility = {
	photoVisible: "Approved" | "Denied" | "Pending";
	staffMember: string;
	date: string;
};

export default function ChildConsentTab() {
	const consentInfo: ConsentInfo = {
		decision: "Granted",
		guardian: "Grace Namukasa",
		date: "2026-05-05",
		method: "In person",
	};

	const websiteVisibility: WebsiteVisibility = {
		photoVisible: "Approved",
		staffMember: "Harriet Nalwoga",
		date: "2026-06-01",
	};

	return (
		<div className="space-y-8">
			<ChildTabHeader subtitle="Consent & Privacy Settings" />

			{/* Guardian Consent */}
			<section className="rounded-lg border border-slate-200 bg-white p-6">
				<h3 className="mb-6 text-sm font-semibold text-slate-800">
					Guardian Consent
				</h3>
				<p className="mb-6 text-sm text-slate-600">
					A guardian must consent to the publication of this child&apos;s
					profile and photographs on the Murphy Charitable Foundation website.
				</p>

				<div className="grid grid-cols-2 gap-6">
					<div>
						<p className="text-xs uppercase tracking-wide text-slate-500">
							Consent decision
						</p>
						<p className="mt-2 text-sm font-medium text-slate-800">
							{consentInfo.decision}
						</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-slate-500">
							Guardian
						</p>
						<p className="mt-2 text-sm font-medium text-slate-800">
							{consentInfo.guardian}
						</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-slate-500">
							Date
						</p>
						<p className="mt-2 text-sm font-medium text-slate-800">
							{consentInfo.date}
						</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-slate-500">
							Method
						</p>
						<p className="mt-2 text-sm font-medium text-slate-800">
							{consentInfo.method}
						</p>
					</div>
				</div>
			</section>

			{/* Website Settings */}
			<section className="rounded-lg border border-slate-200 bg-white p-6">
				<h3 className="mb-6 text-sm font-semibold text-slate-800">
					Website Settings
				</h3>

				{/* Child Visibility on Home Page */}
				<div className="mb-8">
					<h4 className="mb-4 text-sm font-medium text-slate-700">
						Child Visibility on Home Page
					</h4>
					<p className="mb-4 text-sm text-slate-600">
						Murphy staff must approve the visibility of this child&apos;s
						photograph on the Murphy Charitable Foundation website home page.
						All children with consent from their guardian will appear in the
						Available Children section of the website. Only children approved by
						Murphy staff will appear on the home page.
					</p>

					<div className="grid grid-cols-2 gap-6">
						<div>
							<p className="text-xs uppercase tracking-wide text-slate-500">
								Photo visible on home page
							</p>
							<p className="mt-2 text-sm font-medium text-slate-800">
								{websiteVisibility.photoVisible}
							</p>
						</div>
						<div>
							<p className="text-xs uppercase tracking-wide text-slate-500">
								Staff member
							</p>
							<p className="mt-2 text-sm font-medium text-slate-800">
								{websiteVisibility.staffMember}
							</p>
						</div>
						<div className="col-span-2">
							<p className="text-xs uppercase tracking-wide text-slate-500">
								Date
							</p>
							<p className="mt-2 text-sm font-medium text-slate-800">
								{websiteVisibility.date}
							</p>
						</div>
					</div>
				</div>

				{/* Subsection Title */}
				<div className="border-t border-slate-100 pt-6">
					<h4 className="mb-2 text-sm font-medium text-slate-700">
						Subsection Title
					</h4>
					<p className="text-sm text-slate-600">Explanation goes here.</p>
				</div>
			</section>
		</div>
	);
}
