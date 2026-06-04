// app/admin/children/components/AddChildModal.tsx
"use client";

import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AddChildModal({ open, onClose, onSubmit }: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">Add Child</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e);
          }}
        >
          <div className="max-h-[78vh] overflow-y-auto px-6 py-5">
            {/* Upload */}
            <div
              className="group rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center"
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) =>
                e.key === "Enter" && fileInputRef.current?.click()
              }
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border bg-white">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-slate-600"
                >
                  <path
                    d="M4 16.2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11.2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 16.2 8.8 12l4.2 3.6 2.2-2 4.8 4.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 21a2.5 2.5 0 0 1-2.5-2.5V18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium text-slate-900">
                Drag photo here or{" "}
                <span className="text-blue-600 underline underline-offset-2">
                  browse
                </span>
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Supported formats: JPG or PNG formats up to{" "}
                <span className="font-medium">[number]</span>mb
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                name="photo"
              />
            </div>

            {/* Child Details */}
            <SectionTitle title="Child Details" />

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="First/given name" name="firstName" placeholder="" />
              <Field label="Last/family name" name="lastName" placeholder="" />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <SelectField
                label="Gender"
                name="gender"
                options={[
                  { value: "", label: "Select gender" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <Field label="Date of birth" name="dob" type="date" />
              <Field label="School level" name="schoolLevel" placeholder="" />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectField
                label="Country"
                name="country"
                options={[
                  { value: "", label: "Select country" },
                  { value: "Uganda", label: "Uganda" },
                  { value: "Kenya", label: "Kenya" },
                  { value: "Tanzania", label: "Tanzania" },
                ]}
              />
              <Field label="Language" name="language" placeholder="" />
            </div>

            <div className="mt-4">
              <TextArea label="Biography" name="bio" rows={5} />
            </div>

            {/* Family Details */}
            <SectionTitle title="Family Details" className="mt-8" />
            <div className="mt-4">
              <TextArea
                label="Family description"
                name="familyDescription"
                rows={5}
              />
            </div>

            {/* Guardian 1 header (visible in screenshot bottom) */}
            <SectionTitle title="Guardian 1" className="mt-8" />
            {/* Add Guardian fields later */}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



function SectionTitle({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <h3
      className={`mt-8 text-lg font-semibold text-slate-900 ${className}`.trim()}
    >
      {title}
    </h3>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-blue-600/20 placeholder:text-slate-400 focus:ring-4"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        name={name}
        className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-blue-600/20 focus:ring-4"
      >
        {options.map((o) => (
          <option key={o.label} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
}: {
  label: string;
  name: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none ring-blue-600/20 placeholder:text-slate-400 focus:ring-4"
      />
    </label>
  );
}
