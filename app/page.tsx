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
    <div style={styles.page}>
      <main>
        <section style={styles.heroSection}>
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Change a Child’s Story,
              <br />
              Sponsor from as Little as $25 a Month
            </h1>

            <div style={styles.heroButtonsRow}>
              <Button
                as={Link}
                href="#sponsor"
                className="bg-[#00C853] text-white px-14 py-8 rounded-[14px] text-[18px] font-semibold shadow-md hover:opacity-90"
              >
                Sponsor a Child
              </Button>

              <Button
                as={Link}
                href="#how-it-works"
                variant="flat"
                className="bg-white/90 text-[#00C853] px-14 py-8 rounded-[14px] text-[18px] font-semibold shadow-md hover:bg-white"
              >
                How It Works
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 bg-[#f4f7fb]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold">
                <span className="text-[#0070F3]">Meet the </span>
                <span className="text-[#16A34A]">Children</span>
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
                    <Button
                      color="success"
                      radius="full"
                      className="bg-[#00C853] text-white px-8 py-2 rounded-[14px] text-[14px] shadow-md hover:opacity-90"
                    >
                      Sponsor Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                variant="bordered"
                color="success"
                radius="full"
                className="bg-white/90 text-[#00C853] px-14 py-8 rounded-[14px] text-[18px] font-semibold shadow-md hover:bg-white"
              >
                View All Children
              </Button>
            </div>
          </div>
        </section>

        <section style={styles.storySection}>
          <div style={styles.storyImageWrapper}>
            <Image
              src="/children/group.jpg"
              alt="Our story"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <section className="py-16 bg-[#f4f7fb]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold">
                <span className="text-[#0070F3]">Our </span>
                <span className="text-[#16A34A]">Story</span>
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
        <section className="relative bg-[#cfe0f5] py-16 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold">
                <span className="text-[#0b3b6f]">How It </span>
                <span className="text-[#16A34A]">Works</span>
              </h2>
              <p className="mt-3 text-sm text-[#0b3b6f] max-w-2xl mx-auto">
                At Murphy Charitable Foundation, we believe every child deserves
                a chance to learn, dream, and succeed.
              </p>
            </div>

            <div className="hidden md:block absolute left-0 right-0 top-[160px] pointer-events-none">
              <svg
                viewBox="0 0 1200 260"
                className="w-full h-[260px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,200 C80,60 100,270 320,110 C370,40 620,220 740,120 C860,40 920,100 1050,100"
                  stroke="#0B3D74"
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
                    fill="#cfe0f5"
                    stroke="#16A34A"
                    strokeWidth="4"
                  />
                ))}
              </svg>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mt-8 md:mt-20">
              <div className="text-center md:text-left md:mt-14">
                <span className="inline-block bg-[#16A34A] text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 1
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[#1f2937]">
                  Choose a Child
                </h3>
                <p className="mt-2 text-sm text-[#4b5563]">
                  Browse profiles and select a child to sponsor
                </p>
              </div>

              <div className="text-center md:text-left md:mt-0">
                <span className="inline-block bg-[#16A34A] text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 2
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[#1f2937]">
                  Start Sponsorship
                </h3>
                <p className="mt-2 text-sm text-[#4b5563]">
                  Complete your sponsorship setup and payment
                </p>
              </div>

              <div className="text-center md:text-left md:mt-14">
                <span className="inline-block bg-[#16A34A] text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 3
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[#1f2937]">
                  Connect &amp; Communicate
                </h3>
                <p className="mt-2 text-sm text-[#4b5563]">
                  Exchange letters and updates with your child
                </p>
              </div>

              <div className="text-center md:text-left md:mt-0">
                <span className="inline-block bg-[#16A34A] text-white text-xs font-semibold px-4 py-2 rounded-md">
                  Step 4
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[#1f2937]">
                  Track Progress
                </h3>
                <p className="mt-2 text-sm text-[#4b5563]">
                  See the impact of your support over time
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute top-10 right-10 text-[#0b3b6f] opacity-20 pointer-events-none">
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

        <section className="py-14 bg-[#f4f7fb]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold">
              <span className="text-[#0B3D74]">Sponsor a Child </span>
              <span className="text-[#16A34A]">Today</span>
            </h2>
            <p className="mt-2 text-sm text-[#0B3D74]">
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
              <button className="px-8 py-3 rounded-[12px] bg-[#16A34A] text-white font-semibold shadow-md">
                Sponsor a Child
              </button>
              <button className="px-11 py-3 rounded-[12px] border-2 border-[#16A34A] text-[#16A34A] font-semibold bg-transparent">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    borderBottom: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
  },

  logo: {
    fontWeight: 600,
    color: "#111827",
  },

  nav: {
    display: "flex",
    gap: "24px",
    fontSize: "0.95rem",
  },

  navLink: {
    textDecoration: "none",
    color: "#111827",
    cursor: "pointer",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
  },

  heroContent: {
    position: "relative",
    maxWidth: "900px",
    zIndex: 1,
  },

  heroTitle: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: "32px",
  },

  heroButtonsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  hero: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 24px",
    gap: "24px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heroSection: {
    position: "relative",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "80px 24px",
    backgroundImage: "url('/children/image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
  },

  storySection: {
    position: "relative",
    maxWidth: "2500px",
    margin: "0 auto",

    textAlign: "left",
    alignItems: "center",
    gap: "32px",
    padding: "0",
    backgroundColor: "#f3f4f6",
  },

  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#111827",
    textAlign: "center",
  },

  sectionUnderline: {
    border: "none",
    borderTop: "2px solid #111827",
    margin: "0 auto 24px",
  },
  storyImageWrapper: {
    position: "relative",
    maxWidth: "1120px",
    margin: "0 auto",

    width: "2500px",
    height: "380px",
    borderRadius: "20px",
    overflow: "hidden",
  },

  videoPlaceholder: {
    height: "320px",
    backgroundColor: "#d1d5db",
    border: "2px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    position: "relative",
    overflow: "hidden",
  },

  childrenSection: {
    maxWidth: "1100px",
    margin: "40px auto 60px",
    padding: "0 40px",
  },

  childrenGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },

  childCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  childPhoto: {
    backgroundColor: "#d1d5db",
    height: "230px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    position: "relative",
    overflow: "hidden",
  },

  childBody: {
    padding: "12px 16px 16px",
  },

  childName: {
    fontWeight: 600,
    marginBottom: "4px",
  },

  childMeta: {
    fontSize: "0.9rem",
    color: "#4b5563",
  },

  childButton: {
    marginTop: "12px",
    width: "100%",
    padding: "10px 0",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "2px",
    fontSize: "0.95rem",
    cursor: "pointer",
  },

  viewAllButton: {
    marginTop: "28px",
    padding: "10px 24px",
    border: "1px solid #111827",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "0.95rem",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },

  howItWorksSection: {
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #d1d5db",
    borderBottom: "1px solid #d1d5db",
    padding: "40px 40px 60px",
  },

  stepsGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "32px",
    marginTop: "32px",
  },

  stepCard: {
    textAlign: "center",
    padding: "16px",
  },

  stepNumber: {
    width: "80px",
    height: "80px",
    border: "2px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    margin: "0 auto 16px",
  },

  stepTitle: {
    fontWeight: 600,
    marginBottom: "8px",
  },

  stepText: {
    fontSize: "0.95rem",
    color: "#4b5563",
  },

  main: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 40px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "8px",
    color: "#111827",
  },
  titleUnderline: {
    border: "none",
    borderTop: "2px solid #111827",
    marginTop: "8px",
    marginBottom: "16px",
  },
  card: {
    backgroundColor: "#f9fafb",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    padding: "20px",
    color: "#111827",
    marginBottom: "16px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  cardBody: {
    margin: 0,
    color: "#4b5563",
    fontSize: "0.95rem",
  },

  childrenFooter: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
  },
};
