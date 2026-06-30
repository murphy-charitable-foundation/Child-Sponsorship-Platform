"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import type { SponsorProfile } from "./SponsorProfilePage";

const COUNTRIES = ["United States", "UK", "Canada", "Australia", "Spain", "Uganda", "Kenya", "Other"];
const GROUP_TYPES = ["Company", "Organization", "Religious", "Non-profit", "Other"];

type EditSponsorDrawerProps = {
  sponsor: SponsorProfile;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditSponsorDrawer({ sponsor, isOpen, onClose }: EditSponsorDrawerProps) {
  const [type, setType]           = useState(sponsor.sponsorType);
  const [firstName, setFirstName] = useState(sponsor.firstName);
  const [lastName, setLastName]   = useState(sponsor.lastName);
  const [line1, setLine1]         = useState(sponsor.address.line1);
  const [line2, setLine2]         = useState(sponsor.address.line2 ?? "");
  const [city, setCity]           = useState(sponsor.address.city);
  const [state, setState]         = useState(sponsor.address.state);
  const [zip, setZip]             = useState(sponsor.address.zip);
  const [country, setCountry]     = useState(sponsor.address.country);
  const [phone, setPhone]         = useState(sponsor.phone);
  const [email, setEmail]         = useState(sponsor.email);

  useEffect(() => {
    if (isOpen) {
      setType(sponsor.sponsorType);
      setFirstName(sponsor.firstName);
      setLastName(sponsor.lastName);
      setLine1(sponsor.address.line1);
      setLine2(sponsor.address.line2 ?? "");
      setCity(sponsor.address.city);
      setState(sponsor.address.state);
      setZip(sponsor.address.zip);
      setCountry(sponsor.address.country);
      setPhone(sponsor.phone);
      setEmail(sponsor.email);
    }
  }, [isOpen, sponsor]);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose} size="md" placement="right">
      <DrawerContent>
        {(closeDrawer) => (
          <>
            <DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
              Edit Sponsor
            </DrawerHeader>

            <DrawerBody className="space-y-6 py-5">
              {/* Sponsor Type */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sponsor Type
                </p>
                <div className="flex gap-3">
                  {(["Individual", "Group"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
                        type === t
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:border-primary"
                      }`}
                    >
                      {t === "Individual" ? "👤" : "👥"} {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Address */}
              <section>
                <h3 className="mb-4 text-base font-semibold text-slate-900">Name and Address</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="First name">
                      <input className={cls} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Field>
                    <Field label="Last name">
                      <input className={cls} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Address line 1">
                    <input className={cls} value={line1} onChange={(e) => setLine1(e.target.value)} />
                  </Field>
                  <Field label="Address line 2">
                    <input className={cls} value={line2} onChange={(e) => setLine2(e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="City">
                      <input className={cls} value={city} onChange={(e) => setCity(e.target.value)} />
                    </Field>
                    <Field label="State/Province">
                      <input className={cls} value={state} onChange={(e) => setState(e.target.value)} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Zip/postal code">
                      <input className={cls} value={zip} onChange={(e) => setZip(e.target.value)} />
                    </Field>
                    <Field label="Country">
                      <select className={cls} value={country} onChange={(e) => setCountry(e.target.value)}>
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h3 className="mb-4 text-base font-semibold text-slate-900">Contact Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Phone number">
                    <input type="tel" className={cls} value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={cls} value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Field>
                </div>
              </section>

              {/* Group type — only when Group selected */}
              {type === "Group" && (
                <section>
                  <h3 className="mb-4 text-base font-semibold text-slate-900">Group Details</h3>
                  <Field label="Group type">
                    <select className={cls}>
                      <option value="">Select group description</option>
                      {GROUP_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                </section>
              )}
            </DrawerBody>

            <DrawerFooter className="border-t border-slate-200">
              <Button variant="light" onPress={closeDrawer} className="text-slate-700">
                Cancel
              </Button>
              <Button className="bg-primary text-white" onPress={closeDrawer}>
                Save changes
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      {children}
    </label>
  );
}

const cls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
