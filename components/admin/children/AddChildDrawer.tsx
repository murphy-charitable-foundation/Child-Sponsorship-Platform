"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

type AddForm = {
  photoFile: File | null;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  schoolLevel: string;
  country: string;
  language: string;
  biography: string;
  familyBiography: string;
  guardianName: string;
  guardianRelationship: string;
  guardianNin: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
};

const COUNTRIES = ["Select country", "Uganda", "Kenya", "Tanzania", "Rwanda"];
const GENDERS = ["Select gender", "Male", "Female"];
const SCHOOL_LEVELS = ["Select school level", "Primary", "Secondary", "University"];

type AddChildDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddChildDrawer({ isOpen, onClose }: AddChildDrawerProps) {
  const router = useRouter();
  const [form, setForm] = useState<AddForm>({
    photoFile: null,
    firstName: "",
    lastName: "",
    gender: "Select gender",
    dob: "",
    schoolLevel: "Select school level",
    country: "Select country",
    language: "",
    biography: "",
    familyBiography: "",
    guardianName: "",
    guardianRelationship: "",
    guardianNin: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianAddress: "",
  });

  function update<K extends keyof AddForm>(key: K, value: AddForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      update("photoFile", file);
    }
  }

  function handleSave() {
    // TODO: persist to Supabase
    console.log("Adding child:", form);
    handleClose();
  }

  function handleClose() {
    onClose();
    router.replace("/admin/children");
  }

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleClose} size="md" placement="right">
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
              Add Child
            </DrawerHeader>

            <DrawerBody className="space-y-6 py-5 overflow-y-auto">
              {/* Photo Upload */}
              <div>
                <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
                  <div className="mb-3 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="8" width="32" height="32" rx="2" stroke="#004a99" strokeWidth="2"/>
                      <path d="M20 28L24 20L28 28" stroke="#004a99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="22" cy="16" r="2" fill="#004a99"/>
                      <circle cx="38" cy="36" r="6" stroke="#004a99" strokeWidth="2"/>
                      <path d="M38 33v6m-3-3h6" stroke="#004a99" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    Drag photo here or{" "}
                    <label className="cursor-pointer text-primary hover:underline">
                      browse
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Supported formats: JPG or PNG formats up to [number]mb
                  </p>
                </div>
              </div>

              {/* Child Details */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Child Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">First/given name</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Last/family name</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Gender</label>
                      <select
                        value={form.gender}
                        onChange={(e) => update("gender", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {GENDERS.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Date of birth</label>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => update("dob", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">School level</label>
                      <select
                        value={form.schoolLevel}
                        onChange={(e) => update("schoolLevel", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {SCHOOL_LEVELS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Country</label>
                      <select
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Language</label>
                      <input
                        type="text"
                        value={form.language}
                        onChange={(e) => update("language", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Luganda"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Biography</label>
                    <textarea
                      value={form.biography}
                      onChange={(e) => update("biography", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Child's biography"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Family Details */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Family Details</h3>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Family description</label>
                  <textarea
                    value={form.familyBiography}
                    onChange={(e) => update("familyBiography", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe the family background"
                    rows={4}
                  />
                </div>
              </div>

              {/* Guardian 1 */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Guardian 1</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Guardian name</label>
                    <input
                      type="text"
                      value={form.guardianName}
                      onChange={(e) => update("guardianName", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Full name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Relationship</label>
                      <input
                        type="text"
                        value={form.guardianRelationship}
                        onChange={(e) => update("guardianRelationship", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Mother"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">NIN/ID</label>
                      <input
                        type="text"
                        value={form.guardianNin}
                        onChange={(e) => update("guardianNin", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="National ID"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Phone</label>
                      <input
                        type="tel"
                        value={form.guardianPhone}
                        onChange={(e) => update("guardianPhone", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Email</label>
                      <input
                        type="email"
                        value={form.guardianEmail}
                        onChange={(e) => update("guardianEmail", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Address</label>
                    <input
                      type="text"
                      value={form.guardianAddress}
                      onChange={(e) => update("guardianAddress", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>
            </DrawerBody>

            <DrawerFooter className="border-t border-slate-200 gap-2">
              <Button
                variant="bordered"
                onPress={handleClose}
                className="border-slate-300 text-slate-700"
              >
                Cancel
              </Button>
              <Button onPress={handleSave} className="bg-primary text-white">
                Add child
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
