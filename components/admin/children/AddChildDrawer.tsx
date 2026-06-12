"use client";

import { useState } from "react";
import Image from "next/image";
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
  photoUrl: string;
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
    photoUrl: "/children/placeholder.png",
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
      const reader = new FileReader();
      reader.onload = (event) => {
        update("photoUrl", event.target?.result as string);
      };
      reader.readAsDataURL(file);
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
        {(closeDrawer) => (
          <>
            <DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
              Add Child
            </DrawerHeader>

            <DrawerBody className="space-y-6 py-5 overflow-y-auto">
              {/* Photo Upload */}
              <div>
                <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Photo
                </label>
                <div className="mb-4 h-40 w-40 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={form.photoUrl}
                    alt="Child"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 text-center">
                  <div className="mb-2 text-2xl text-slate-400">📷</div>
                  <p className="text-sm font-medium text-slate-700">
                    Drag photo here or{" "}
                    <label className="cursor-pointer text-[#004a99] hover:underline">
                      browse
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Last/family name</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">School level</label>
                      <select
                        value={form.schoolLevel}
                        onChange={(e) => update("schoolLevel", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
                        placeholder="e.g. Luganda"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Biography</label>
                    <textarea
                      value={form.biography}
                      onChange={(e) => update("biography", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
                        placeholder="e.g. Mother"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">NIN/ID</label>
                      <input
                        type="text"
                        value={form.guardianNin}
                        onChange={(e) => update("guardianNin", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Email</label>
                      <input
                        type="email"
                        value={form.guardianEmail}
                        onChange={(e) => update("guardianEmail", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004a99]"
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
              <Button onPress={handleSave} className="bg-[#004a99] text-white">
                Add child
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
