import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@heroui/react";

type Donation = {
  id: string;
  date_time: string | null;
  amount: number | null;
  first_name: string | null;
  last_name: string | null;
};

type SponsorshipHistory = {
  frequency_period: string;
  donations: Donation[];
};

type DonationHistoryProps = {
  donationHistory: SponsorshipHistory[];
};

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={icon} width={20} height={20} alt="" aria-hidden="true" />

      <h3 className="text-2xl font-semibold leading-8 text-[--zinc-900]">
        {title}
      </h3>
    </div>
  );
};

const getSponsorshipLabel = (frequencyPeriod: string) => {
  if (frequencyPeriod === "annual") {
    return "Annual Sponsorship";
  }

  if (frequencyPeriod === "monthly") {
    return "Monthly Sponsorship";
  }

  return frequencyPeriod ? `One Time` : "Sponsorship";
};

const formatDate = (date: string | null) => {
  if (!date) {
    return "N/A";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const DonationHistory = ({ donationHistory }: DonationHistoryProps) => {
  return (
    <Card className="bg-white p-6">
      <SectionTitle
        icon="/dashboard/child-details/timer.svg"
        title="Donation History"
      />

      <ul className="mt-3 px-6">
        {donationHistory.map((sponsorship, sponsorshipIndex) =>
          sponsorship.donations.map((donation, donationIndex) => {
            const isLastDonation =
              sponsorshipIndex === donationHistory.length - 1 &&
              donationIndex === sponsorship.donations.length - 1;

            return (
              <li key={donation.id} className="list-none">
                <div className="flex items-center justify-between py-6">
                  <div>
                    <span className="inline-flex rounded-sm bg-[--blue-200] px-3 py-2 text-base font-normal text-[--blue-700]">
                      {getSponsorshipLabel(sponsorship.frequency_period)}
                    </span>

                    <p className="my-2 text-lg font-medium leading-7 text-[--blue-700]">
                      {formatDate(donation.date_time)}
                    </p>

                    <p className="text-base leading-6 text-[--zinc-800]">
                      ${donation.amount ?? 0}
                    </p>
                  </div>

                  <Button asChild className="bg-[--green-500] text-white">
                    <Link
                      href="#"
                      aria-label={`Download invoice ${donation.id}`}
                    >
                      <Image
                        src="/dashboard/child-details/download.svg"
                        width={20}
                        height={20}
                        alt=""
                        aria-hidden="true"
                      />
                      Invoice
                    </Link>
                  </Button>
                </div>

                {!isLastDonation && <Divider role="presentation" />}
              </li>
            );
          }),
        )}
      </ul>
    </Card>
  );
};

export default DonationHistory;
