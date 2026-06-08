"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";

export default function CreateOrganizationPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    lastName: "",
    firstName: "",
    email: "",
    currency: "",
    timezone: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="px-10 py-8">
      {/* Back button */}
      <Link
        href="/admin/organizations"
        className="inline-flex items-center gap-2 text-[#004a99] hover:underline mb-6"
      >
        <ChevronLeft size={20} />
        Back to Organizations
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold text-[#004a99] mb-6">Admin</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <div className="px-6 py-2 font-semibold rounded-lg bg-[#004a99] text-white">
          Organization
        </div>
        <div className="px-6 py-2 font-semibold rounded-lg bg-gray-200 text-gray-700">
          Users
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {/* General Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">General</h2>

          {/* Logo Upload */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center bg-gray-50 hover:bg-gray-100 transition"
          >
            {logoPreview ? (
              <div className="flex flex-col items-center">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-24 w-24 object-contain mb-4"
                />
                <label className="text-[#004a99] hover:underline cursor-pointer font-medium">
                  Change logo
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="text-[#004a99] mb-3" size={40} />
                <p className="text-gray-700 font-medium mb-2">
                  Drag logo or{" "}
                  <label className="text-[#004a99] hover:underline cursor-pointer">
                    browse
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG or PNG formats up to {"{number}"}mb
                </p>
              </div>
            )}
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization name
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[#004a99] focus:outline-none"
              placeholder="Enter organization name"
            />
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Contact Details
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[#004a99] focus:outline-none"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[#004a99] focus:outline-none"
                placeholder="Enter first name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[#004a99] focus:outline-none"
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* System Defaults Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            System Defaults
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[#004a99] focus:outline-none"
              >
                <option value="">Select country</option>
                <option value="USD">USD - United States</option>
                <option value="UGX">UGX - Uganda</option>
                <option value="EUR">EUR - Europe</option>
                <option value="GBP">GBP - United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time zone
              </label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-[#004a99] focus:outline-none"
                placeholder="Select time zone"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#004a99] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#003d7a]"
          >
            Create Organization
          </button>
          <Link
            href="/admin/organizations"
            className="px-6 py-2 rounded-lg font-semibold border border-slate-300 text-gray-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
