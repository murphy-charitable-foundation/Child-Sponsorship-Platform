"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import type { ChildProfile } from "./types";

type EditForm = {
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

function toForm(child: ChildProfile): EditForm {
  const nameParts = child.name.trim().split(" ");
  return {
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" ") ?? "",
    gender: child.gender,
    dob: child.dob,
    schoolLevel: child.schoolLevel,
    country: child.country,
    language: child.language,
    biography: child.biography,
    familyBiography: child.familyBiography,
    guardianName: child.guardian.name,
    guardianRelationship: child.guardian.relationship,
    guardianNin: child.guardian.nin,
    guardianPhone: child.guardian.phone,
    guardianEmail: child.guardian.email,
    guardianAddress: child.guardian.address,
  };
}

type EditChildDrawerProps = {
  child: ChildProfile;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditChildDrawer({
  child,
  isOpen,
  onClose,
}: EditChildDrawerProps) {
  const [form, setForm] = useState<EditForm>(() => toForm(child));

  // Reset form to current child data whenever the drawer opens
  useEffect(() => {
    if (isOpen) setForm(toForm(child));
  }, [isOpen, child]);

  function update<K extends keyof EditForm>(key: K, value: EditForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    // TODO: persist to Supabase
    console.log("Saving child edits:", form);
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose} size="md" placement="right">
      <DrawerContent>
        {(closeDrawer) => (
          <>
            <DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
              Edit Child
            </DrawerHeader>

            <DrawerBody className="space-y-6 py-5">
              {/* Photo */}
              <div className="h-40 w-40 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={child.imageUrl}
                  alt={child.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Child Details */}
              <section>
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Child Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="First/given name">
                    <input
                      className={inputCls}
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                    />
                  </Field>
                  <Field label="Last/family name">
                    <input
                      className={inputCls}
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                    />
                  </Field>
                  <Field label="Gender">
                    <select
                      className={inputCls}
                      value={form.gender}
                      onChange={(e) => update("gender", e.target.value)}
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Date of birth">
                    <input
                      type="date"
                      className={inputCls}
                      value={form.dob}
                      onChange={(e) => update("dob", e.target.value)}
                    />
                  </Field>
                  <Field label="School level">
                    <input
                      className={inputCls}
                      value={form.schoolLevel}
                      onChange={(e) => update("schoolLevel", e.target.value)}
                    />
                  </Field>
                  <Field label="Country">
                    <select
                      className={inputCls}
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
                      className={inputCls}
                      value={form.language}
                      onChange={(e) => update("language", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Biography">
                    <textarea
                      rows={5}
                      className={textareaCls}
                      value={form.biography}
                      onChange={(e) => update("biography", e.target.value)}
                    />
                  </Field>
                </div>
              </section>

              {/* Family Details */}
              <section>
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Family Details
                </h3>
                <Field label="Family description">
                  <textarea
                    rows={3}
                    className={textareaCls}
                    value={form.familyBiography}
                    onChange={(e) => update("familyBiography", e.target.value)}
                  />
                </Field>
              </section>

              {/* Guardian */}
              <section>
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Guardian 1
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Guardian name">
                    <input
                      className={inputCls}
                      value={form.guardianName}
                      onChange={(e) => update("guardianName", e.target.value)}
                    />
                  </Field>
                  <Field label="Relationship to child">
                    <input
                      className={inputCls}
                      value={form.guardianRelationship}
                      onChange={(e) =>
                        update("guardianRelationship", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Guardian NIN">
                    <input
                      className={inputCls}
                      value={form.guardianNin}
                      onChange={(e) => update("guardianNin", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone number">
                    <input
                      className={inputCls}
                      value={form.guardianPhone}
                      onChange={(e) => update("guardianPhone", e.target.value)}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      className={inputCls}
                      value={form.guardianEmail}
                      onChange={(e) => update("guardianEmail", e.target.value)}
                    />
                  </Field>
                  <Field label="Address">
                    <textarea
                      rows={2}
                      className={textareaCls}
                      value={form.guardianAddress}
                      onChange={(e) =>
                        update("guardianAddress", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </section>
            </DrawerBody>

            <DrawerFooter className="border-t border-slate-200">
              <Button variant="light" onPress={closeDrawer} className="text-slate-700">
                Cancel
              </Button>
              <Button
                className="bg-primary text-white"
                onPress={handleSave}
              >
                Save changes
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

const textareaCls =
  "w-full resize-vertical rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      {children}
    </label>
  );
}
