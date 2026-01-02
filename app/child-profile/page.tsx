"use client";

import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import Image from "next/image";

export default function ChildProfilePage() {
  const child = {
    name: "Maria Rodriguez",
    gender: "Female",
    age: 8,
    country: "Guatemala",
    grade: 3,
    bio: "Maria loves going to school and dreams of becoming a teacher. She lives with her mother and two younger siblings. More details will be added once the final design is ready.",
  };

  const provides = [
    {
      title: "School Fees",
      desc: "Educational support including tuition, books, and learning materials.",
    },
    {
      title: "Healthcare",
      desc: "Regular checkups, immunizations, and access to healthcare services.",
    },
    {
      title: "Mentorship",
      desc: "Guidance and support from caring adults who nurture potential.",
    },
    {
      title: "Safe Environment",
      desc: "Protected spaces for learning, growth, and community development.",
    },
  ];

  return (
    <div className="bg-default-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <Button
            as={Link}
            href="/"
            variant="bordered"
            color="secondary"
            radius="md"
          >
            ← Back
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-medium border border-default-300 bg-default-100 flex items-center justify-center">
              <div className="text-default-500 font-semibold">
                <Image
                  src="/children/Kid2.png"
                  alt="Children"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                fullWidth
                variant="bordered"
                color="secondary"
                radius="md"
              >
                Choose Another Child
              </Button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground text-primary">
              {child.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              <Chip variant="bordered" radius="md">
                {child.gender}
              </Chip>
              <Chip variant="bordered" radius="md">
                Age: {child.age}
              </Chip>
              <Chip variant="bordered" radius="md">
                {child.country}
              </Chip>
              <Chip variant="bordered" radius="md">
                Grade: {child.grade}
              </Chip>
            </div>

            <p className="mt-5 text-default-600 leading-relaxed">
              {child.bio}{" "}
              <span className="underline cursor-pointer">Show More</span>
            </p>

            <div className="mt-8 space-y-4">
              <Button fullWidth color="secondary" radius="md" size="lg">
                Sponsor This Child
              </Button>

              <Button
                fullWidth
                variant="bordered"
                color="secondary"
                radius="md"
                size="lg"
              >
                Add Another Child
              </Button>
            </div>
          </div>
        </div>

        <div className="my-14 h-px w-full bg-default-200" />

        <h2 className="text-center text-3xl font-bold text-foreground">
          <span className="text-primary"> Your Sponsorship </span>
          <span className="text-secondary">Provides</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          {provides.map((item) => (
            <div
              key={item.title}
              className="rounded-medium border border-default-300 bg-default-100 p-7 text-center"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-medium border-2 border-default-900 text-default-900 font-semibold">
                [ICON]
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 text-default-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
