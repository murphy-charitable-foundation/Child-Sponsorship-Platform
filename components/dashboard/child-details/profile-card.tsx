import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ProfileCard = () => {
  return (
    <Card className="relative bg-white px-4 pt-4 pb-8">
      <div className="relative aspect-[4/3] rounded-[--rounded-large]">
        <Image
          src="/children/Kid1.png"
          alt="Amara smiling in a portrait photo"
          className="h-full w-full object-cover object-center"
          fill
          sizes="(min-width: 1250px) 100vw, 45vw"
          priority
        />
      </div>
      <div
        role="status"
        className="absolute right-2 top-2 rounded-sm bg-[--secondary-500-flat] px-4 py-1 font-medium text-white"
      >
        Sponsoring
      </div>

      <div className="pt-3 pb-8 text-center text-[--zinc-900]">
        <h2 className="text-2xl font-semibold leading-8">Amara</h2>
        <p className="mt-4 text-sm">
          <span className="sr-only">Age and location: </span>7 years old •
          Guatemala
        </p>
      </div>

      <div className="mx-auto w-[80%] space-y-4">
        <Button
          asChild
          className="w-full h-12 rounded-xl bg-[--green-500] px-6 text-base font-normal text-white"
        >
          <Link
            href="#donation-history"
            aria-label="Increase donation for Amara"
          >
            <Image
              src="/dashboard/child-details/dollar-sign.svg"
              width={20}
              height={20}
              alt=""
              aria-hidden="true"
            />
            Increase Donation
          </Link>
        </Button>

        <Button
          variant="outline"
          aria-label="Stop sponsoring Amara"
          className="w-full h-12 rounded-xl border-[--default-300-flat] bg-white px-6 text-base font-normal text-[--default-foreground]"
        >
          Stop Sponsorship
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;
