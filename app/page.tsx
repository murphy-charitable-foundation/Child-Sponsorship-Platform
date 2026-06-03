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

const steps = [
  {
    step: "Step 1",
    title: "Choose a Child",
    description: "Browse profiles and select a child to sponsor",
    positioning:
      "top-[calc(50%+4.9vw)] left-4  md:w-1/4 2xl:top-[176px] 2xl:left-0",
  },
  {
    step: "Step 2",
    title: "Start Sponsorship",
    description: "Complete your sponsorship setup and payment",
    positioning: "top-[calc(50%-3.7vw)] left-1/4 md:w-1/4 2xl:top-[46px]",
  },
  {
    step: "Step 3",
    title: "Connect & Communicate",
    description: "Exchange letters and updates with your child",
    positioning: "top-[calc(50%+4.9vw)] left-1/2 md:w-1/4 2xl:top-[176px]",
  },
  {
    step: "Step 4",
    title: "Track Progress",
    description: "See the impact of your support over time",
    positioning:
      "top-[calc(50%-6.4vw)]  md:right-4 md:w-1/4 xl:right-0 2xl:top-[2px]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-default-50">
      <main>
        <section
          className="relative min-h-[70vh] flex items-center justify-center text-center px-6 py-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/public-images/PXL_20250408_135756972-cropped.jpg')",
          }}
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
          <div className="relative max-w-6xl mx-auto h-[500px] rounded-[20px] overflow-hidden">
            <Image
              src="/public-images/PXL_20250411_144950068.jpg"
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
                  src="/public-images/PXL_20250408_133752400.MP.jpg"
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
        <section className="bg-primary-50 relative flex flex-col gap-10 overflow-x-hidden py-16 md:h-[720px] md:gap-16">
          <div className="mx-auto flex w-fit flex-col items-center gap-3 px-4 text-center">
            <h2 className="text-4xl font-extrabold">
              <span className="text-primary">How It </span>
              <span className="text-secondary">Works</span>
            </h2>
            <p className="text-primary text-sm">
              At Murphy Charitable Foundation, we believe every child deserves a
              chance to learn, dream, and succeed.
            </p>
          </div>
          <div className="relative mx-auto">
            {/*  Timeline Icon */}
            <svg
              className="hidden w-full max-w-[1516px] md:relative md:block lg:top-0 lg:left-1/2 lg:-translate-x-1/2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1516 200"
              width="1516px"
              height="200px"
            >
              <title>Timeline</title>
              <path
                d="M 0,100 C 91,153 136,187 227,187 C 318,187 364,53 531,53 C 697,53 743,187 910,187 C 1076,187 1122,13 1289,13 C 1410,13 1455,40 1516,60"
                fill="none"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray="3, 6"
                strokeLinecap="round"
              />
            </svg>
            {/*  Envelope Icon */}
            <svg
              className="absolute bottom-[-200px] left-2 hidden -rotate-[22.5deg] md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
            >
              <title>Envelope</title>
              <rect width="100" height="100" className="fill-primary-50" />
              <rect
                x="5"
                y="20"
                width="90"
                height="60"
                fill="none"
                stroke="#B0C7EB"
                strokeWidth="4"
              />
              <path
                d="M5,20 L50,60 L95,20"
                fill="none"
                stroke="#B0C7EB"
                strokeWidth="4"
              />
            </svg>
            {/*  Heart Icon */}
            <svg
              className="absolute top-[50px] left-[18.75%] hidden md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 120"
              width="50"
              height="50"
            >
              <title>Heart</title>
              <rect width="100" height="120" className="fill-primary-50" />
              <path
                d="M 50 102 
                C 43 85, 23 64, 18 47 
                C 13 31, 23 15, 39 17 
                C 51 18, 51 32, 53 32 
                C 55 31, 59 19, 71 19 
                C 84 19, 91 30, 83 48 
                C 75 66, 56 86, 50 102 Z"
                fill="none"
                stroke="#B0C7EB"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/*  Rotated Star Icon */}
            <svg
              className="absolute bottom-[-100px] left-1/2 hidden -rotate-[22.5deg] md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
            >
              <title>Star</title>
              <rect width="100" height="100" className="fill-primary-50" />
              <path
                d="M 50 12 
                Q 50 50, 88 50 
                Q 50 50, 50 88 
                Q 50 50, 12 50 
                Q 50 50, 50 12 Z"
                fill="none"
                stroke="#B0C7EB"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/*  Star Icon */}
            <svg
              className="absolute top-0 right-1/4 hidden md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
            >
              <title>Star</title>
              <rect width="100" height="100" className="fill-primary-50" />
              <path
                d="M 50 12 
                Q 50 50, 88 50 
                Q 50 50, 50 88 
                Q 50 50, 12 50 
                Q 50 50, 50 12 Z"
                fill="none"
                stroke="#B0C7EB"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/*  Paper Airplane Icon */}
            <svg
              className="absolute top-[-100px] right-2 hidden md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
            >
              <title>Paper Airplane</title>
              <rect width="100" height="100" className="fill-primary-50" />
              <g
                fill="none"
                stroke="#B0C7EB"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 3 38 L 96 18 L 31 54 Z" />
                <path d="M 96 18 L 41 62" />
                <path d="M 96 18 L 74 83 L 41 62" />
                <path d="M 31 54 L 35 84 L 41 62" />
              </g>
            </svg>
            {/*  Step  Items */}
            <ul className="flex flex-col justify-center gap-8 md:block">
              {steps.map((step) => (
                <li
                  className={`md:absolute ${step.positioning}`}
                  key={step.step}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-secondary bg-primary-50 hidden h-5 w-5 rounded-full border-[3px] md:block"></div>
                    <span className="bg-secondary mt-6 inline-block rounded-md px-4 py-2 text-xs font-semibold">
                      {step.step}
                    </span>
                    <h3 className="mt-2 text-lg font-extrabold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-default-600 max-w-[176px] text-center text-sm">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
                    src="/public-images/IMG_20230228_175853_171.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white  mt-3">
                  <Image
                    src="/public-images/DSC_1362.jpg"
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
                      src="/public-images/PXL_20250719_153910398.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative w-[180px] h-[180px] rounded-[22px] overflow-hidden shadow-md bg-white">
                    <Image
                      src="/public-images/PXL_20240911_131444972.MP.jpg"
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
                      src="/public-images/PXL_20250409_141347137.jpg"
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
                    src="/public-images/PXL_20250406_151810493.jpg"
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
                      src="/public-images/PXL_20240910_143742078.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-[180px] h-[180px] rounded-[22px] overflow-hidden shadow-md bg-white">
                  <Image
                    src="/public-images/PXL_20240911_125937252.MP.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white mt-11">
                  <Image
                    src="/public-images/PXL_20240910_113753245.MP.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative w-[180px] h-[250px] rounded-[22px] overflow-hidden shadow-md bg-white mt-3">
                  <Image
                    src="/public-images/DSC_1627 (1).jpg"
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
