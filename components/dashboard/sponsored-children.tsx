"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
type Child = {
  id: string;
  name: string;
  age: number;
  date: string | null;
  costs: number;
  frequency: string;
  img: string | null;
  status: string;
  location?: string | null;
  school_grade?: number | null;
  date_of_birth?: string | null;
};

type ChildrenLastPayments = {
  childId?: string;
  lastPaymentDate?: string;
};

type DashboardProps = {
  sponsoredChildren: Child[];
  childrenLastPayments: ChildrenLastPayments[];
};

type CardProps = {
  id: string;
  name: string;
  age: number;
  costs: number;
  img: string | null;
  status: string;
  lastPaymentDate?: string;
  frequency: string;
};

const formatDate = (date: string | null) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const Card = ({
  id,
  name,
  age,
  costs,
  img,
  status,
  lastPaymentDate,
  frequency,
}: CardProps) => {
  const router = useRouter();

  const imageSrc = img ?? "/children/kid1.png";

  return (
    <article
      aria-label={`Child card for ${name}, status ${status}`}
      className="relative border border-zinc-100 bg-white rounded-xl p-4 flex flex-col justify-between"
    >
      <span
        role="status"
        aria-label={`Status: ${status}`}
        className={`${status === "Sponsoring" ? "bg-[--green-500]" : "bg-[--zinc-600]"}
        text-white py-1.5 px-4 rounded-sm text-base font-semibold absolute top-2 right-2`}
      >
        {status}
      </span>
      <Image
        src={imageSrc}
        alt={`Photo of sponsored child ${name}`}
        width={0}
        height={164}
        sizes="100vw"
        preload
        unoptimized={imageSrc.startsWith("http")}
        className="w-full h-[164px] rounded-xl object-cover"
      />

      <h3 className="text-2xl font-semibold text-zinc-900 mt-3">{name}</h3>
      <p className="text-zinc-900 mt-2 font-normal">{age} years old</p>
      <section
        aria-label="Sponsorship details"
        className="bg-[--blue-50] rounded-xl text-[--zinc-800] p-4 my-4"
      >
        <div className="flex flex-row items-center">
          <Image
            src="/dashboard/green-Calendar.svg"
            alt=""
            width={24}
            height={24}
          />
          <span className="font-bold ps-3 pe-1">Last:</span>
          <span className="font-normal">
            {formatDate(lastPaymentDate ?? null)}
          </span>
        </div>
        <div className="mt-4 flex flex-row items-center">
          <Image
            src="/dashboard/green-Dollar.svg"
            alt=""
            width={24}
            height={24}
          />

          <span className="font-bold ps-3">
            <span className="pr-1">${costs}</span>
            <span>
              {frequency === "monthly"
                ? "/ Month"
                : frequency === "annual"
                  ? "/ Yearly"
                  : ""}
            </span>
          </span>
        </div>
      </section>
      <button
        className="border-2 flex flex-row items-center
        justify-center border-secondary text-secondary rounded-xl py-2"
        aria-label={`View details for ${name}`}
        onClick={() => router.push(`/dashboard/child/${id}`)}
      >
        <Image src="/dashboard/heart.svg" alt="" width={20} height={20} />
        <span className="ps-2 font-semibold">View Details</span>
      </button>
    </article>
  );
};

const SponsoredChildren = ({
  sponsoredChildren,
  childrenLastPayments,
}: DashboardProps) => {
  const [showMore, setShowMore] = useState<number>(4);

  const numberOfChildren: number = sponsoredChildren?.length || 0;

  const lastPaymentMap = useMemo(
    () =>
      new Map(
        childrenLastPayments.map(({ childId, lastPaymentDate }) => [
          childId,
          lastPaymentDate,
        ]),
      ),
    [childrenLastPayments],
  );

  return (
    <section className="rounded-3xl w-full mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-6 text-[--blue-500]">
        My Sponsored Children
      </h2>

      {numberOfChildren === 0 && (
        <p className="rounded-xl bg-white p-4 text-zinc-600">
          No sponsored children found.
        </p>
      )}

      <div className={`grid grid-cols-4 gap-6 `}>
        {sponsoredChildren
          ?.slice(0, showMore)
          ?.map((child: Child, index: number) => {
            return (
              <Card
                key={index}
                id={child.id}
                name={child.name}
                age={child.age}
                costs={child.costs}
                img={child.img}
                status={child.status}
                lastPaymentDate={lastPaymentMap.get(child.id)}
                frequency={child?.frequency}
              />
            );
          })}
      </div>

      {numberOfChildren > 4 && (
        <button
          onClick={() => {
            setShowMore((prev) => (prev >= numberOfChildren ? 4 : prev + 4));
          }}
          className="border-2 border-secondary text-secondary rounded-xl
          py-2 px-10 my-10 flex items-center justify-center mx-auto"
        >
          <span className="pe-2 font-semibold">
            {showMore >= numberOfChildren ? "Collapse" : "Load More Children"}
          </span>
          <Image
            src="/dashboard/arrow.svg"
            alt="Heart Icon"
            width={20}
            height={20}
          />
        </button>
      )}
    </section>
  );
};

export default SponsoredChildren;
