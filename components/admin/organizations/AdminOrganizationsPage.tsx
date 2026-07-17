"use client";

import { useState } from "react";
import AddOrganizationDrawer from "./AddOrganizationDrawer";
import EditOrganizationDrawer from "./EditOrganizationDrawer";
import AddUserDrawer from "./AddUserDrawer";

type Organization = {
  id: string;
  name: string;
  members: number;
  dateCreated: string;
};

type User = {
  id: string;
  lastName: string;
  firstName: string;
  organization: string;
  role: "Admin" | "Editor" | "Viewer" | "Superadmin" | "Pending invitation";
  status: "Active" | "Inactive" | "Pending";
  lastActive: string;
};

const organizations: Organization[] = [
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

const users: User[] = [
  {
    id: "1",
    lastName: "Anderson",
    firstName: "Jessica",
    organization: "United States",
    role: "Editor",
    status: "Active",
    lastActive: "2025-28-12",
  },
  {
    id: "2",
    lastName: "Davidson",
    firstName: "Matt",
    organization: "United States",
    role: "Viewer",
    status: "Active",
    lastActive: "2026-01-13",
  },
  {
    id: "3",
    lastName: "Goetz",
    firstName: "Ramona",
    organization: "United States",
    role: "Admin",
    status: "Active",
    lastActive: "2026-04-31",
  },
  {
    id: "4",
    lastName: "Griffin",
    firstName: "Steve",
    organization: "United States",
    role: "Viewer",
    status: "Inactive",
    lastActive: "2024-11-17",
  },
  {
    id: "5",
    lastName: "Kateregga",
    firstName: "Bbosa",
    organization: "Uganda",
    role: "Admin",
    status: "Active",
    lastActive: "2026-05-01",
  },
  {
    id: "6",
    lastName: "Mutebi",
    firstName: "Samuel",
    organization: "Uganda",
    role: "Superadmin",
    status: "Active",
    lastActive: "2026-05-05",
  },
  {
    id: "7",
    lastName: "Murphy",
    firstName: "Melissa",
    organization: "United States",
    role: "Editor",
    status: "Active",
    lastActive: "2026-02-28",
  },
  {
    id: "8",
    lastName: "Nabukenya",
    firstName: "Flavia",
    organization: "Uganda",
    role: "Editor",
    status: "Inactive",
    lastActive: "2026-02-13",
  },
  {
    id: "9",
    lastName: "Nagel",
    firstName: "Mike",
    organization: "United States",
    role: "Editor",
    status: "Active",
    lastActive: "2026-01-08",
  },
  {
    id: "10",
    lastName: "Nakigozi",
    firstName: "Amina",
    organization: "Uganda",
    role: "Pending invitation",
    status: "Pending",
    lastActive: "2026-04-26",
  },
];


export default function AdminOrganizationsPage() {
  const [activeTab, setActiveTab] = useState<"organizations" | "users">(
    "organizations"
  );
  const [search, setSearch] = useState("");
  const [organization, setOrganization] = useState("All organizations");
  const [status, setStatus] = useState("All statuses");
  const [isAddOrgDrawerOpen, setIsAddOrgDrawerOpen] = useState(false);
  const [isEditOrgDrawerOpen, setIsEditOrgDrawerOpen] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [orgDrawerMode, setOrgDrawerMode] = useState<"view" | "edit">("edit");
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      user.firstName.toLowerCase().includes(q) ||
      user.lastName.toLowerCase().includes(q);
    const matchOrg =
      organization === "All organizations" || user.organization === organization;
    const matchStatus =
      status === "All statuses" || user.status === status;
    return matchSearch && matchOrg && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-700";
      case "Inactive":
        return "text-slate-800/60";
      case "Pending":
        return "text-orange-700";
      default:
        return "text-slate-800";
    }
  };

  return (
    <div className="px-10 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-primary mb-6">Admin</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("organizations")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "organizations"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-800 hover:bg-slate-100/70"
            }`}
          >
            Organizations
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "users"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-800 hover:bg-slate-100/70"
            }`}
          >
            Users
          </button>
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
                    <tr key={org.id} className="hover:bg-slate-100">
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
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Users</h2>
              <button
                onClick={() => setIsAddUserDrawerOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90"
              >
                Create user
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs text-slate-800/60 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by first or last name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="w-48">
                  <label className="block text-xs text-slate-800/60 mb-1">
                    Organization
                  </label>
                  <select
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option>All organizations</option>
                    {organizations.map((org) => (
                      <option key={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-40">
                  <label className="block text-xs text-slate-800/60 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option>All statuses</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    setSearch("");
                    setOrganization("All organizations");
                    setStatus("All statuses");
                  }}
                  className="text-sm text-primary hover:underline pb-1"
                >
                  Reset filters
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    {[
                      "Last Name",
                      "First Name",
                      "Organization",
                      "Role",
                      "Status",
                      "Last Active",
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-100">
                      <td className="px-4 py-3 text-slate-800">
                        {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {user.firstName}
                      </td>
                      <td className="px-4 py-3 text-slate-800/70">
                        {user.organization}
                      </td>
                      <td className="px-4 py-3">
                        <select className="rounded border border-slate-200 px-2 py-1 text-sm">
                          <option>{user.role}</option>
                          <option>Admin</option>
                          <option>Editor</option>
                          <option>Viewer</option>
                        </select>
                      </td>
                      <td className={`px-4 py-3 font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </td>
                      <td className="px-4 py-3 text-slate-800/70">
                        {user.lastActive}
                      </td>
                      <td className="px-4 py-3">
                        <span className="cursor-pointer text-primary hover:underline">
                          View
                        </span>
                        <span className="mx-1 text-slate-800/30">|</span>
                        <span className="cursor-pointer text-primary hover:underline">
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
        <AddUserDrawer
          isOpen={isAddUserDrawerOpen}
          onClose={() => setIsAddUserDrawerOpen(false)}
        />
    </div>
  );
}
