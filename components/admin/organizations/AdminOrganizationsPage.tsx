"use client";

import { useState } from "react";
import Link from "next/link";

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
        return "text-green-600";
      case "Inactive":
        return "text-gray-500";
      case "Pending":
        return "text-orange-500";
      default:
        return "text-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="px-10 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#004a99] mb-6">Admin</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("organizations")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "organizations"
                ? "bg-[#004a99] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Organizations
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "users"
                ? "bg-[#004a99] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Users
          </button>
        </div>

        {/* Organizations Tab */}
        {activeTab === "organizations" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Organizations
              </h2>
              <Link
                href="/admin/organizations/create"
                className="bg-[#004a99] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#003d7a]"
              >
                Create organization
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {[
                      "Organization Name",
                      "Members",
                      "Date Created",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800">{org.name}</td>
                      <td className="px-4 py-3 text-slate-800">{org.members}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {org.dateCreated}
                      </td>
                      <td className="px-4 py-3">
                        <span className="cursor-pointer text-[#004a99] hover:underline">
                          View
                        </span>
                        <span className="mx-1 text-slate-300">|</span>
                        <span className="cursor-pointer text-[#004a99] hover:underline">
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
              <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
              <button className="bg-[#004a99] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#003d7a]">
                Create user
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by first or last name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#004a99] focus:outline-none"
                  />
                </div>
                <div className="w-48">
                  <label className="block text-xs text-slate-500 mb-1">
                    Organization
                  </label>
                  <select
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#004a99] focus:outline-none"
                  >
                    <option>All organizations</option>
                    {organizations.map((org) => (
                      <option key={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-40">
                  <label className="block text-xs text-slate-500 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#004a99] focus:outline-none"
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
                  className="text-sm text-[#004a99] hover:underline pb-1"
                >
                  Reset filters
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
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
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800">
                        {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {user.firstName}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
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
                      <td className="px-4 py-3 text-slate-600">
                        {user.lastActive}
                      </td>
                      <td className="px-4 py-3">
                        <span className="cursor-pointer text-[#004a99] hover:underline">
                          View
                        </span>
                        <span className="mx-1 text-slate-300">|</span>
                        <span className="cursor-pointer text-[#004a99] hover:underline">
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
    </div>
  );
}
