"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type BioProps = {
  name: string;
  note: string;
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

const BioCard = ({ name, note }: BioProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isLong, setIsLong] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    // line-height is 24px (text-base + leading-6)
    const twoLinesHeight = 24 * 2;

    setIsLong(element.scrollHeight > twoLinesHeight);
  }, [note]);

  return (
    <Card className="bg-white p-6">
      <div>
        <SectionTitle icon="/dashboard/child-details/smile.svg" title={name} />

        <p
          ref={textRef}
          id="amara-bio"
          className={`pe-1 text-base leading-6 text-[--zinc-800] ${
            showMore ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {note}
        </p>

        {isLong && (
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
        )}
      </div>
    </Card>
  );
};

export default BioCard;
