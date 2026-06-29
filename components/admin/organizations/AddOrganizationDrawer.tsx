"use client";

import { useState } from "react";
import { X } from "lucide-react";

type AddOrganizationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddOrganizationDrawer({
  isOpen,
  onClose,
}: AddOrganizationDrawerProps) {
  const [logo, setLogo] = useState<File | null>(null);
  const [orgName, setOrgName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("Select country");
  const [timeZone, setTimeZone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      logo,
      orgName,
      lastName,
      firstName,
      email,
      currency,
      timeZone,
    });
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setLogo(files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Add Organization</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              General
            </h3>

            {/* Logo Upload */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="mb-6 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="h-12 w-12 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20m-8-12v12m0 0l-3-3m3 3l3-3"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-sm text-slate-700">
                  Drag logo or browse
                </div>
                <div className="text-xs text-slate-500">
                  Supported formats: JPG or PNG formats up to 5mb/10mb
                </div>
              </div>
            </div>

            {/* Organization Name */}
            <div className="mb-4">
              <label className="mb-1 block text-xs text-slate-500">Organization name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Contact Details Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Contact Details
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="mb-1 block text-xs text-slate-500">First/given name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Last/family name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* System Defaults Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              System Defaults
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs text-slate-500">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Select country</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>UGX</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Time zone</label>
                <input
                  type="text"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  placeholder="e.g. EAT"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Add organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
