"use client";

import { useState } from "react";

import Image from "next/image";
type Child = {
  id: number;
  name: string;
  age: number;
  date: string;
  costs: number;
  img: string;
  status: string;
};
const children: Child[] = [
  {
    id: 1,
    name: "John Doe",
    age: 14,
    date: "Apr 25, 2026",
    costs: 40,
    img: "/children/kid1.png",
    status: "Sponsoring",
  },
  {
    id: 2,
    name: "John Doe",
    age: 10,
    date: "Mar 12, 2026",
    costs: 26,
    img: "/children/kid2.png",
    status: "Stopped",
  },
  {
    id: 3,
    name: "John Doe",
    age: 9,
    date: "Jun 13, 2026",
    costs: 36,
    img: "/children/kid3.png",
    status: "Sponsoring",
  },
  {
    id: 4,
    name: "John Doe",
    age: 12,
    date: "Aug 21, 2026",
    costs: 46,
    img: "/children/kid1.png",
    status: "Sponsoring",
  },
  {
    id: 5,
    name: "John Doe",
    age: 10,
    date: "Mar 18, 2026",
    costs: 26,
    img: "/children/kid3.png",
    status: "Stopped",
  },
  {
    id: 6,
    name: "John Doe",
    age: 7,
    date: "Sep 15, 2026",
    costs: 56,
    img: "/children/kid2.png",
    status: "Stopped",
  },
  {
    id: 7,
    name: "John Doe",
    age: 13,
    date: "Mar 20, 2026",
    costs: 86,
    img: "/children/kid3.png",
    status: "Sponsoring",
  },
  {
    id: 8,
    name: "John Doe",
    age: 10,
    date: "Feb 25, 2026",
    costs: 26,
    img: "/children/kid1.png",
    status: "Stopped",
  },
  {
    id: 9,
    name: "John Doe",
    age: 11,
    date: "Mar 15, 2026",
    costs: 86,
    img: "/children/kid2.png",
    status: "Stopped",
  },
];

const Card = ({
  name,
  age,
  date,
  costs,
  img,
  status,
}: {
  name: string;
  age: number;
  date: string;
  costs: number;
  img: string;
  status: string;
}) => {
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
        src={img}
        alt={`Photo of sponsored child ${name}`}
        width={0}
        height={164}
        sizes="100vw"
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
          <span className="font-normal">{date}</span>
        </div>
        <div className="mt-4 flex flex-row items-center">
          <Image
            src="/dashboard/green-Dollar.svg"
            alt=""
            width={24}
            height={24}
          />

          <span className="font-bold ps-3">${costs} / Month</span>
        </div>
      </section>
      <button
        className="border-2 flex flex-row items-center
        justify-center border-secondary text-secondary rounded-xl py-2"
        aria-label={`View details for ${name}`}
      >
        <Image src="/dashboard/heart.svg" alt="" width={20} height={20} />
        <span className="ps-2 font-semibold">View Details</span>
      </button>
    </article>
  );
};

const SponsoredChildren = () => {
  const [showMore, setShowMore] = useState<number>(4);
  const numberOfChildren: number = children?.length || 0;

  return (
    <section className="rounded-3xl w-full mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-6 text-[--blue-500]">
        My Sponsored Children
      </h2>
      <div className={`grid grid-cols-4 gap-6 `}>
        {children?.slice(0, showMore)?.map((child: Child) => {
          return (
            <Card
              key={child?.id}
              name={child?.name}
              age={child?.age}
              date={child?.date}
              img={child?.img}
              status={child?.status}
              costs={child?.costs}
            />
          );
        })}
      </div>

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
    </section>
  );
};

export default SponsoredChildren;
