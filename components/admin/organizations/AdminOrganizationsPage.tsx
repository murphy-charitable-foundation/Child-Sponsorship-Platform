"use client";

import { useState } from "react";

type Organization = {
  id: string;
  name: string;
  members: number;
  dateCreated: string;
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

export default function AdminOrganizationsPage() {
  const [activeTab, setActiveTab] = useState<"organizations" | "users">(
    "organizations"
  );

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
            <button className="bg-[#004a99] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#003d7a]">
              Create organization
            </button>
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
              Add user
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No users yet
          </div>
        </div>
      )}
    </div>
  );
}
