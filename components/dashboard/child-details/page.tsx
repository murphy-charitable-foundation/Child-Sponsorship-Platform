import Link from "next/link";
import Image from "next/image";

import ProfileCard from "./profile-card";
import BioCard from "./bio-card";
import InfoGrid from "./info-grid";
import SummaryCard from "./summary-card";
import DonationHistory from "./donation-history";

type ChildDetailsPageProps = {
  childId?: string;
};

export default function ChildDetailsPage({ childId }: ChildDetailsPageProps) {
  // console.log("childId", childId); //use this id to fetch data from the server
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
            <ProfileCard />
          </aside>

          <main className="space-y-4 mt-16 mb-20 w-full ml-[480px]">
            <h1 className="sr-only">Child details page</h1>

            <section aria-label="Child bio">
              <BioCard />
            </section>

            <section aria-label="Child info grid">
              <InfoGrid />
            </section>

            <section aria-label="Child summary">
              <SummaryCard />
            </section>

            <section aria-label="Donation history">
              <DonationHistory />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
