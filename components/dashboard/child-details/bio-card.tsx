"use client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import SectionTitle from "./shared/section-title";

const BioCard = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <Card className="bg-white p-6">
      <div>
        <SectionTitle icon="/dashboard/child-details/smile.svg" title="Amara" />
        <p
          id="amara-bio"
          className={` text-base leading-6 text-[--zinc-800] pe-1
          ${showMore ? "line-clamp-none" : "line-clamp-2"}`}
        >
          Amara is a bright and enthusiastic 9-year-old girl from Kenya. She
          loves spending time reading books and helping her younger siblings
          with their homework. Despite the challenges her family faces, Amara
          maintains a positive attitude and dreams of becoming a teacher one day
          to help other children in her community.
        </p>

        <div className="ml-auto mt-3 w-fit">
          <Button
            className="p-0"
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            variant="ghost"
            aria-expanded={showMore}
            aria-controls="amara-bio"
          >
            <span>{showMore ? "Show less" : "Show more"}</span>
            <Image
              src="/dashboard/child-details/arrow-back.svg"
              width={20}
              height={20}
              alt=""
              aria-hidden="true"
              className="scale-x-[-1]"
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BioCard;
