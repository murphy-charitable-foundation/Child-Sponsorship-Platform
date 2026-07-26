import Link from "next/link";
import Image from "next/image";

import ProfileCard from "./profile-card";
import BioCard from "./bio-card";
import InfoGrid from "./info-grid";
import SummaryCard from "./summary-card";
import DonationHistory from "./donation-history";

type ChildDetailsPageProps = { childId: string };
async function getChild(childId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/child-details/${childId}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch child");
  }
  return response.json();
}

export default async function ChildDetailsPage({
  childId,
}: ChildDetailsPageProps) {
  let child = await getChild(childId);

  const profile = {
    status: child?.status === "Active" ? true : false,
    name: child?.first_name + " " + child?.last_name,
    age: child?.age,
    location: child?.location,
    photo: child?.photo_url,
  };
  const bio = {
    name: child?.first_name,
    note: child?.notes ?? "--",
  };

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";

    return new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const basicInformation = [
    { label: "Birthday", value: formatDate(child?.date_of_birth) },
    { label: "Gender", value: child?.gender },
    { label: "Education", value: `Grade ${child?.school_grade ?? "--"}` },
    { label: "Family", value: child?.family_biography ?? "--" },
  ];

  const sponsorshipSummary = [
    {
      label: "Start Date",
      value: formatDate(child?.sponsorships?.[0]?.start_date_time),
    },
    {
      label:
        child?.sponsorships?.[0]?.frequency_period === 365
          ? "Annual Amount"
          : "Monthly Amount",
      value: child?.sponsorships?.[0]?.amount,
    },
    { label: "Total Donated", value: child?.totalAmount },
  ];

  return (
    <div className="min-h-screen bg-[--blue-50]">
      <div className="mx-auto w-[90%]">
        <Link
          href="/dashboard"
          aria-label="Go back to dashboard"
          className="fixed w-full z-40 h-16 inline-flex items-center gap-2 bg-[--blue-50] px-4 text-sm text-default-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--zinc-800]"
        >
          <Image
            src="/dashboard/child-details/arrow-back.svg"
            width={20}
            height={20}
            alt="Back arrow icon"
          />
          Back to Dashboard
        </Link>

        <div className="flex">
          <aside
            aria-label="Child profile summary"
            className="mt-16 fixed z-40"
          >
            <ProfileCard {...profile} />
          </aside>

          <main className="space-y-4 mt-16 mb-20 w-full ml-[480px]">
            <h1 className="sr-only">Child details page</h1>

            <section aria-label="Child bio">
              <BioCard {...bio} />
            </section>

            <section aria-label="Child info grid">
              <InfoGrid basicInformation={basicInformation} />
            </section>

            <section aria-label="Child summary">
              <SummaryCard sponsorshipSummary={sponsorshipSummary} />
            </section>

            <section aria-label="Donation history">
              <DonationHistory
                donationHistory={child?.donation}
                // frequency={child?.donation?.frequency}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
