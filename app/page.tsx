"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";

// Replace with real data from Supabase once backend is ready
const featuredChildren = [
  {
    name: "Apio Hellen",
    meta: "10 years old, Guatemala",
    description: "A cheerful girl who enjoys football and reading.",
    image: "/children/Kid3.png",
  },
  {
    name: "Okiror Daniel",
    meta: "10 years old, Guatemala",
    description: "A cheerful boy who enjoys football and reading.",
    image: "/children/Kid1.png",
  },
  {
    name: "Samuel",
    meta: "9 years old",
    description: "A cheerful boy who enjoys football and reading.",
    image: "/children/Kid2.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-default-50">
      <main>
        <section
          className="relative min-h-[70vh] flex items-center justify-center text-center px-6 py-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/children/image.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/65" />

          <div className="relative max-w-[900px] z-10">
            <h1 className="text-5xl font-bold leading-tight text-white mb-8">
              Change a Child’s Story,
              <br />
              Sponsor from as Little as $25 a Month
            </h1>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                as={Link}
                href="#sponsor-now"
                color="secondary"
                radius="md"
                className="px-14 py-8 text-[18px] shadow-md hover:opacity-90 font-semibold"
              >
                Sponsor a Child
              </Button>

              <Button
                as={Link}
                href="#how-it-works"
                variant="flat"
                radius="md"
                className="bg-white/85 px-14 py-8 text-[18px] font-semibold shadow-md hover:bg-white text-secondary"
              >
                How It Works
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 bg-default-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold">
                <span className="text-primary">Meet the </span>
                <span className="text-secondary">Children</span>
              </h2>
              <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
                Each child is verified and profiled by our field officers. You
                can browse their stories and choose the one you wish to sponsor.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {featuredChildren.map((child) => (
                <Card
                  key={child.name}
                  shadow="md"
                  className="rounded-[32px] border-none bg-white"
                >
                  <CardBody className="p-0">
                    <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
                      <Image
                        src={child.image}
                        alt={child.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="px-8 pt-6 pb-2 text-center">
                      <h3 className="text-lg font-extrabold text-gray-900">
                        {child.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{child.meta}</p>
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                        {child.description}
                      </p>
                    </div>
                  </CardBody>

                  <CardFooter className="pb-8 flex justify-center">
                    <Link href="/child-profile">
                      <Button
                        color="secondary"
                        radius="md"
                        className="px-8 py-2 text-[14px] shadow-md hover:opacity-90"
                      >
                        Sponsor Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                variant="bordered"
                color="secondary"
                radius="md"
                className="bg-white/90 px-14 py-8 text-[18px] font-semibold shadow-md hover:bg-white"
              >
                View All Children
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-default-50">
          <div className="relative max-w-6xl mx-auto h-[380px] rounded-[20px] overflow-hidden">
            <Image
              src="/children/group.jpg"
              alt="Our story"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <section className="py-16 bg-default-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold">
                <span className="text-primary">Our </span>
                <span className="text-secondary">Story</span>
              </h2>

              <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
                How your sponsorship supports each child and keeps you
                connected.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="relative h-[420px] w-full rounded-[28px] overflow-hidden shadow-sm">
                <Image
                  src="/children/Rectangle 6.png"
                  alt="Children"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
                    For the child, your support provides
                  </h3>

                  <ul className="space-y-4">
                    {[
                      "School fees, uniforms and essential supplies",
                      "Daily meals and basic healthcare",
                      "Safe after-school programs, mentoring and community activities",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-gray-800"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-green-600 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
                    As a sponsor, you’ll receive
                  </h3>

                  <ul className="space-y-4">
                    {[
                      "A welcome profile and photo of your sponsored child",
                      "Regular letters, photos and progress updates",
                      "An annual impact report showing how your support changes lives",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-gray-800"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-green-600 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative bg-primary-50 py-16 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold">
                <span className="text-primary">How It </span>
                <span className="text-secondary">Works</span>
              </h2>
              <p className="mt-3 text-sm text-primary max-w-2xl mx-auto">
                At Murphy Charitable Foundation, we believe every child deserves
                a chance to learn, dream, and succeed.
              </p>
            </div>

            <div className="hidden md:block absolute left-0 right-0 top-[160px] pointer-events-none">
              <svg
                viewBox="0 0 1200 260"
                className="w-full h-[260px] text-primary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,200 C80,60 100,270 320,110 C370,40 620,220 740,120 C860,40 920,100 1050,100"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 10"
                  fill="none"
                  transform="translate(0,-60)"
                />

                {[
                  { cx: 70, cy: 90 },
                  { cx: 363, cy: 30 },
                  { cx: 655, cy: 90 },
                  { cx: 950, cy: 30 },
                ].map((p, i) => (
                  <circle
                    key={i}
                    cx={p.cx}
                    cy={p.cy}
                    r="10"
                    fill="white"
                    className="text-secondary"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                ))}
              </svg>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mt-8 md:mt-20">
              <div className="text-center md:text-left md:mt-14">
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 1
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-default-900">
                  Choose a Child
                </h3>
                <p className="mt-2 text-sm text-default-600">
                  Browse profiles and select a child to sponsor
                </p>
              </div>

              <div className="text-center md:text-left md:mt-0">
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 2
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-default-900">
                  Start Sponsorship
                </h3>
                <p className="mt-2 text-sm text-default-600">
                  Complete your sponsorship setup and payment
                </p>
              </div>

              <div className="text-center md:text-left md:mt-14">
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 3
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-default-900">
                  Connect &amp; Communicate
                </h3>
                <p className="mt-2 text-sm text-default-600">
                  Exchange letters and updates with your child
                </p>
              </div>

              <div className="text-center md:text-left md:mt-0">
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 4
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-default-900">
                  Track Progress
                </h3>
                <p className="mt-2 text-sm text-default-600">
                  See the impact of your support over time
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute top-10 right-10 text-primary opacity-20 pointer-events-none">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.5 2.5L2.5 10.5L10.5 13.5L13.5 21.5L21.5 2.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M21.5 2.5L10.5 13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>

        <section className="py-14 bg-default-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold">
              <span className="text-primary">Sponsor a Child </span>
              <span className="text-secondary">Today</span>
            </h2>
            <p className="mt-2 text-sm text-primary">
              Be the Reason a Child Stays in School
            </p>

            <div className="mt-10 flex justify-center gap-8">
              <div className="flex flex-col gap-6">
                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white  mt-11">
                  <Image
                    src="/children/image1.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white  mt-3">
                  <Image
                    src="/children/image2.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-6">
                  <div className="relative w-[180px] h-[180px] rounded-[22px] overflow-hidden shadow-md bg-white">
                    <Image
                      src="/children/image3.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative w-[180px] h-[180px] rounded-[22px] overflow-hidden shadow-md bg-white">
                    <Image
                      src="/children/image4.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-6">
                  <div className="relative w-[190px] h-[350px] rounded-[26px] overflow-hidden shadow-md bg-white mt-14">
                    <Image
                      src="/children/image5.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-6 ">
                <div className="relative w-[190px] h-[350px] rounded-[26px] overflow-hidden shadow-md bg-white mt-14">
                  <Image
                    src="/children/image6.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <div className="relative w-[180px] h-[180px] rounded-[22px] overflow-hidden shadow-md bg-white">
                    <Image
                      src="/children/image7.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-[180px] h-[180px] rounded-[22px] overflow-hidden shadow-md bg-white">
                  <Image
                    src="/children/group.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white mt-11">
                  <Image
                    src="/children/image1.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white mt-3">
                  <Image
                    src="/children/image.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="mt-10 text-gray-700 max-w-xl mx-auto font-semibold text-lg">
              Your support gives children safe classrooms, warm meals,
              <br />
              and a chance to dream.
            </p>

            <div className="mt-8 flex justify-center gap-6">
              <button className="px-8 py-3 rounded-[12px] bg-secondary text-white font-semibold shadow-md">
                Sponsor a Child
              </button>

              <button className="px-11 py-3 rounded-[12px] border-2 border-secondary text-secondary font-semibold bg-transparent">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
