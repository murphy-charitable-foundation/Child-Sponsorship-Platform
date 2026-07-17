"use client";

import React from "react";

type Child = {
  firstName: string;
  lastName: string;
  gender: "Female" | "Male" | "Other";
  dateOfBirth: string;
  schoolLevel: string;
  country: string;
  language: string;
  biography: string;
  familyDescription: string;
  photoUrl?: string;
};

const initialChild: Child = {
  firstName: "Amina",
  lastName: "N.",
  gender: "Female",
  dateOfBirth: "2014-06-15",
  schoolLevel: "Primary 4",
  country: "Uganda",
  language: "English",
  biography: "Amina is a bright and curious child who enjoys reading and drawing.",
  familyDescription: "She lives with her mother and two siblings in a small village.",
  photoUrl: "/placeholder-child.jpg",
};

export default function EditChild() {
  const [form, setForm] = React.useState<Child>(initialChild);

  const update = <K extends keyof Child>(key: K, value: Child[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated child:", form);
    alert("Child details saved");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">Edit Child</h2>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {/* Image */}
          <div className="mb-6">
            <div className="h-36 w-36 overflow-hidden rounded-xl bg-slate-100">
              <img
                src={form.photoUrl || "/placeholder-child.jpg"}
                alt="Child"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Child Details */}
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Child Details</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="First/given name">
              <input
                className="input"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
            </Field>

            <Field label="Last/family name">
              <input
                className="input"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
            </Field>

            <Field label="Gender">
              <select
                className="input"
                value={form.gender}
                onChange={(e) => update("gender", e.target.value as Child["gender"])}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Date of birth">
              <input
                type="date"
                className="input"
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
              />
            </Field>

            <Field label="School level">
              <input
                className="input"
                value={form.schoolLevel}
                onChange={(e) => update("schoolLevel", e.target.value)}
              />
            </Field>

            <Field label="Country">
              <select
                className="input"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              >
                <option>Uganda</option>
                <option>Kenya</option>
                <option>Tanzania</option>
                <option>Rwanda</option>
              </select>
            </Field>

            <Field label="Language">
              <input
                className="input"
                value={form.language}
                onChange={(e) => update("language", e.target.value)}
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Biography">
              <textarea
                className="textarea"
                rows={5}
                value={form.biography}
                onChange={(e) => update("biography", e.target.value)}
              />
            </Field>
          </div>

          {/* Family Details */}
          <h3 className="mt-8 mb-3 text-lg font-semibold text-slate-900">Family Details</h3>

          <Field label="Family description">
            <textarea
              className="textarea"
              rows={3}
              value={form.familyDescription}
              onChange={(e) => update("familyDescription", e.target.value)}
            />
          </Field>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">Guardian 1</h3>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          padding: 0.6rem 0.75rem;
          font-size: 0.95rem;
          outline: none;
        }
        .input:focus {
          border-color: rgb(148 163 184);
          box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.25);
        }
        .textarea {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          padding: 0.75rem;
          font-size: 0.95rem;
          outline: none;
          resize: vertical;
        }
        .textarea:focus {
          border-color: rgb(148 163 184);
          box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.25);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-slate-700">{label}</div>
      {children}
    </label>
  );
}