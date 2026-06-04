"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

export type Donation = {
  id: string;
  lastName: string;
  firstName: string;
  amount: string;
  date: string;
  country: string;
  purpose: string;
  phone: string;
  email: string;
  frequency: string;
  paymentMethod: string;
  dateTime: string;
};

type Props = {
  donation: Donation | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function DonationDetailsDrawer({ donation, isOpen, onClose }: Props) {
  if (!donation) return null;

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose} size="md" placement="right">
      <DrawerContent>
        {(closeDrawer) => (
          <>
            <DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
              Donation Details
            </DrawerHeader>

            <DrawerBody className="space-y-6 py-6">
              {/* Donor */}
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Donor
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <Detail label="Name"         value={`${donation.firstName} ${donation.lastName}`} />
                  <Detail label="Country"       value={donation.country} />
                  <Detail label="Phone number"  value={donation.phone} />
                  <Detail label="Email"         value={donation.email} />
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Donation */}
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Donation
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <Detail label="Amount"                  value={donation.amount} />
                  <Detail label="Frequency"               value={donation.frequency} />
                  <Detail label="Payment method"          value={donation.paymentMethod} />
                  <Detail label="Date and time of donation" value={donation.dateTime} />
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Donation History */}
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Donation History
                </h3>
                <p className="text-sm text-slate-400">No previous donations on record.</p>
              </section>

              <hr className="border-slate-100" />

              {/* Dedication */}
              <section>
                <p className="text-xs font-medium text-slate-500">Optional (but valuable)</p>
                <p className="mt-1 text-sm text-slate-600">
                  Option to dedicate the donation (in honor or memory of someone)
                </p>
                <input
                  type="text"
                  placeholder="e.g. In memory of Jane Doe"
                  className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-[#004a99] focus:outline-none focus:ring-2 focus:ring-[#004a99]/20"
                />
              </section>
            </DrawerBody>

            <DrawerFooter className="border-t border-slate-200">
              <Button variant="light" onPress={closeDrawer} className="text-slate-700">
                Cancel
              </Button>
              <Button className="bg-[#004a99] text-white" onPress={closeDrawer}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-800">{value}</p>
    </div>
  );
}
