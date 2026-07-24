"use client";

import { useState } from "react";
import AddOrganizationDrawer from "./AddOrganizationDrawer";
import EditOrganizationDrawer from "./EditOrganizationDrawer";
import { TabSwitcher } from "../shared/TabSwitcher";

import AdminUsersTab from "./AdminUsersTab";

type Organization = {
	id: string;
	name: string;
	members: number;
	dateCreated: string;
};

export const organizations: Organization[] = [
	{
		id: "1",
		name: "Uganda",
		members: 10,
		dateCreated: "2025-30-12",
	},
	{
		id: "2",
		name: "United States",
		members: 5,
		dateCreated: "2026-03-19",
	},
];

export type AdminTabKey = "organizations" | "users";

export const AdminTabs: { key: AdminTabKey; label: string }[] = [
	{ key: "organizations", label: "Organizations" },
	{ key: "users", label: "Users" },
];

export default function AdminOrganizationsPage() {
	const [activeTab, setActiveTab] = useState<AdminTabKey>("organizations");

	const [isAddOrgDrawerOpen, setIsAddOrgDrawerOpen] = useState(false);
	const [isEditOrgDrawerOpen, setIsEditOrgDrawerOpen] = useState(false);
	const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
	const [orgDrawerMode, setOrgDrawerMode] = useState<"view" | "edit">("edit");

	return (
		<div>
			{/* Header */}
			<h1 className="text-3xl font-bold text-primary mb-6">Admin</h1>

			{/* Tabs */}
			<div className="mt-6 mb-10">
				<TabSwitcher
					tabs={AdminTabs}
					activeTab={activeTab}
					onChange={setActiveTab}
				/>
			</div>

			{/* Organizations Tab */}
			{activeTab === "organizations" && (
				<div>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-semibold text-slate-800">
							Organizations
						</h2>
						<button
							onClick={() => setIsAddOrgDrawerOpen(true)}
							className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90"
						>
							Add organization
						</button>
					</div>

					{/* Table */}
					<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-slate-200 bg-slate-100">
									{[
										"Organization Name",
										"Members",
										"Date Created",
										"Actions",
									].map((h) => (
										<th
											key={h}
											className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-800/60"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{organizations.map((org) => (
									<tr
										key={org.id}
										className="hover:bg-slate-100"
									>
										<td className="px-4 py-3 text-slate-800">{org.name}</td>
										<td className="px-4 py-3 text-slate-800">{org.members}</td>
										<td className="px-4 py-3 text-slate-800/70">
											{org.dateCreated}
										</td>
										<td className="px-4 py-3">
											<span
												onClick={() => {
													setSelectedOrgId(org.id);
													setOrgDrawerMode("view");
													setIsEditOrgDrawerOpen(true);
												}}
												className="cursor-pointer text-primary hover:underline"
											>
												View
											</span>
											<span className="mx-1 text-slate-800/30">|</span>
											<span
												onClick={() => {
													setSelectedOrgId(org.id);
													setOrgDrawerMode("edit");
													setIsEditOrgDrawerOpen(true);
												}}
												className="cursor-pointer text-primary hover:underline"
											>
												Edit
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Users Tab */}
			{activeTab === "users" && (
				<div className="mt-8">
					<AdminUsersTab />
				</div>
			)}

			{/* Drawers */}
			<AddOrganizationDrawer
				isOpen={isAddOrgDrawerOpen}
				onClose={() => setIsAddOrgDrawerOpen(false)}
			/>
			<EditOrganizationDrawer
				isOpen={isEditOrgDrawerOpen}
				onClose={() => setIsEditOrgDrawerOpen(false)}
				organizationId={selectedOrgId}
				mode={orgDrawerMode}
			/>
		</div>
	);
}
