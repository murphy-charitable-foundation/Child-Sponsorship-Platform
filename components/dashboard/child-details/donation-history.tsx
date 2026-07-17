import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@heroui/react";

import SectionTitle from "./shared/section-title";

type HistoryItem = {
  label: string;
  date: string;
  invoice: string;
};

const donationHistory: HistoryItem[] = [
  {
    label: "Monthly Sponsorship",
    date: "February 15, 2026",
    invoice: "INV-202602-9081",
  },
  {
    label: "Monthly Sponsorship",
    date: "February 15, 2026",
    invoice: "INV-202602-7375",
  },
  {
    label: "Monthly Sponsorship",
    date: "February 15, 2026",
    invoice: "INV-202602-6035",
  },
  {
    label: "Monthly Sponsorship",
    date: "February 15, 2026",
    invoice: "INV-202602-2893",
  },
];

const DonationHistoryItem = ({ item }: { item: HistoryItem }) => {
  return (
    <div className="flex py-6 justify-between items-center">
      <div>
        <span className="inline-flex rounded-sm bg-[--blue-200] px-3 py-2 text-base font-normal text-[--blue-700]">
          {item.label}
        </span>
        <p className="my-2 text-lg font-medium leading-7 text-[--blue-700]">
          {item.date}
        </p>
        <p className="leading-6 text-base text-[--zinc-800]">{item.invoice}</p>
      </div>

      <Button asChild className="bg-[--green-500] text-white">
        <Link href="#" aria-label={`Download invoice ${item.invoice}`}>
          <Image
            src={"/dashboard/child-details/download.svg"}
            width={20}
            height={20}
            alt=""
            aria-hidden="true"
          />
          Invoice
        </Link>
      </Button>
    </div>
  );
};

const DonationHistory = () => {
  return (
    <Card className="bg-white p-6">
      <SectionTitle
        icon={"/dashboard/child-details/timer.svg"}
        title="Donation History"
      />

      <ul className="mt-3 px-6">
        {donationHistory.map((item, index) => {
          return (
            <li key={item.invoice} className="list-none">
              <DonationHistoryItem item={item} />
              {index !== donationHistory.length - 1 && (
                <Divider role="presentation" />
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default DonationHistory;
