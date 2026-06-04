"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

type SponsorType = "none" | "individual" | "group";

const GROUP_TYPES = [
  "Company",
  "Organization",
  "Religious",
  "Non-profit",
  "Other",
];

const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Spain", "Uganda", "Kenya", "Other"];

type AddSponsorDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddSponsorDrawer({ isOpen, onClose }: AddSponsorDrawerProps) {
  const [sponsorType, setSponsorType] = useState<SponsorType>("none");

  function handleClose() {
    setSponsorType("none");
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleClose} size="md" placement="right">
      <DrawerContent>
        {(closeDrawer) => (
          <>
            <DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
              Add Sponsor
            </DrawerHeader>

            <DrawerBody className="py-6">
              {/* Sponsor type selector — always visible */}
              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sponsor Type
                </p>
                <div className="flex gap-3">
                  <TypeButton
                    label="Individual"
                    icon="👤"
                    selected={sponsorType === "individual"}
                    onSelect={() => setSponsorType("individual")}
                  />
                  <TypeButton
                    label="Group"
                    icon="👥"
                    selected={sponsorType === "group"}
                    onSelect={() => setSponsorType("group")}
                  />
                </div>
              </div>

              {/* Default state */}
              {sponsorType === "none" && (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <p className="text-sm">Select sponsor type to get started</p>
                </div>
              )}

              {/* Individual form */}
              {sponsorType === "individual" && <IndividualForm />}

              {/* Group form */}
              {sponsorType === "group" && <GroupForm />}
            </DrawerBody>

            <DrawerFooter className="border-t border-slate-200">
              <Button variant="light" onPress={closeDrawer} className="text-slate-700">
                Cancel
              </Button>
              <Button
                className="bg-[#004a99] text-white"
                isDisabled={sponsorType === "none"}
                onPress={closeDrawer}
              >
                Add sponsor
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function TypeButton({
  label,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
        selected
          ? "border-[#004a99] bg-[#004a99] text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-[#004a99] hover:text-[#004a99]"
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function IndividualForm() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          Name and Address
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name"><input className={inputCls} /></Field>
            <Field label="Last name"><input className={inputCls} /></Field>
          </div>
          <Field label="Address line 1"><input className={inputCls} /></Field>
          <Field label="Address line 2"><input className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="City"><input className={inputCls} /></Field>
            <Field label="State/Province"><input className={inputCls} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Zip/postal code"><input className={inputCls} /></Field>
            <Field label="Country">
              <select className={inputCls}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone number"><input type="tel" className={inputCls} /></Field>
          <Field label="Email"><input type="email" className={inputCls} /></Field>
        </div>
      </section>
    </div>
  );
}

function GroupForm() {
  return (
    <div className="space-y-6">
      <Field label="Group type">
        <select className={inputCls}>
          <option value="">Select group description</option>
          {GROUP_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>

      <section>
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          Name and Address
        </h3>
        <div className="space-y-3">
          <Field label="Address line 1"><input className={inputCls} /></Field>
          <Field label="Address line 2"><input className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="City"><input className={inputCls} /></Field>
            <Field label="State/Province"><input className={inputCls} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Zip/postal code"><input className={inputCls} /></Field>
            <Field label="Country">
              <select className={inputCls}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          Primary Contact
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name"><input className={inputCls} /></Field>
            <Field label="Last name"><input className={inputCls} /></Field>
          </div>
          <Field label="Job title"><input className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone number"><input type="tel" className={inputCls} /></Field>
            <Field label="Email"><input type="email" className={inputCls} /></Field>
          </div>
        </div>
      </section>
    </div>
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

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-[#004a99] focus:outline-none focus:ring-2 focus:ring-[#004a99]/20";
