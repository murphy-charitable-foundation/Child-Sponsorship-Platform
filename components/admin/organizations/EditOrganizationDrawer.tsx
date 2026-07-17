"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type EditOrganizationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string | null;
  mode?: "view" | "edit";
};

type Organization = {
  id: string;
  name: string;
  logoUrl?: string;
  contactLastName: string;
  contactFirstName: string;
  contactEmail: string;
  currency: string;
  timeZone: string;
};

const organizations: { [key: string]: Organization } = {
  "1": {
    id: "1",
    name: "Uganda",
    contactLastName: "Doe",
    contactFirstName: "John",
    contactEmail: "john.doe@uganda.org",
    currency: "UGX",
    timeZone: "EAT",
  },
  "2": {
    id: "2",
    name: "United States",
    contactLastName: "Smith",
    contactFirstName: "Jane",
    contactEmail: "jane.smith@us.org",
    currency: "USD",
    timeZone: "EST",
  },
};

export default function EditOrganizationDrawer({
  isOpen,
  onClose,
  organizationId,
  mode = "edit",
}: EditOrganizationDrawerProps) {
  const org =
    organizationId && organizations[organizationId]
      ? organizations[organizationId]
      : null;

  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("Select country");
  const [timeZone, setTimeZone] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (org) {
      setOrgName(org.name);
      setLastName(org.contactLastName);
      setFirstName(org.contactFirstName);
      setEmail(org.contactEmail);
      setCurrency(org.currency);
      setTimeZone(org.timeZone);
    }
  }, [org, organizationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      organizationId,
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setLogo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen || !org) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "view" ? "View Organization" : "Edit Organization"}
          </h2>
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

            {/* Logo Preview / Upload */}
            <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border border-slate-200 p-6">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-slate-200">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    src="/children/logo.png"
                    alt="Murphy Charitable Foundation Logo"
                    width={96}
                    height={96}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
              {mode === "edit" && (
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90"
                  >
                    Replace image
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
                  >
                    Delete image
                  </button>
                </div>
              )}
            </div>

            {/* Organization Name */}
            <div className="mb-4">
              <label className="mb-1 block text-xs text-slate-500">Organization name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                disabled={mode === "view"}
                className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                  mode === "view" ? "bg-slate-50 cursor-not-allowed" : ""
                }`}
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
                  disabled={mode === "view"}
                  className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                    mode === "view" ? "bg-slate-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Last/family name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={mode === "view"}
                  className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                    mode === "view" ? "bg-slate-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={mode === "view"}
                className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                  mode === "view" ? "bg-slate-50 cursor-not-allowed" : ""
                }`}
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
                  disabled={mode === "view"}
                  className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                    mode === "view" ? "bg-slate-50 cursor-not-allowed" : ""
                  }`}
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
                  disabled={mode === "view"}
                  placeholder="e.g. EAT"
                  className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                    mode === "view" ? "bg-slate-50 cursor-not-allowed" : ""
                  }`}
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
            {mode === "edit" && (
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Save changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
