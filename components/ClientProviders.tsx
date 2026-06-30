"use client";

import Link from "next/link";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { AppNavbar } from "@/components/AppNavbar";
import Image from "next/image";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      <AppNavbar />
      {children}

      <footer
        className="py-20 text-sm text-primary-50 bg-primary"
        role="contentinfo"
      >
        {/* move your existing footer JSX here */}

        <div className="w-[90%] mx-auto">
          <header>
            <h2 className="text-2xl font-normal leading-8">
              MURPHY CHARITY FOUNDATION
            </h2>
            <p className="text-2xl font-normal">UGANDA </p>
          </header>

          <article
            aria-label="Footer information sections"
            className="flex flex-row justify-between my-4 text-[--blue-300]"
          >
            <section
              aria-label="Organization registration details"
              aria-labelledby="org-details"
            >
              <h3 id="org-details" className="sr-only">
                Organization registration details
              </h3>
              <div className="font-thin leading-8">
                <p>REGISTERED UNDER THE UGANDA NATIONAL NGO BUREAU</p>
                <p> Number: INDR16321565NB</p>
                <p>Permit Number: INDP0005654NB</p>
              </div>
              <div
                aria-label="Certification badges"
                className="flex flex-row gap-x-2 mt-4"
              >
                <Image
                  src="/footer/badge1.png"
                  alt=""
                  width={120}
                  height={100}
                  className="box-border"
                />
                <Image
                  src="/footer/badge2.png"
                  alt="s"
                  width={120}
                  height={100}
                  className="box-border"
                />
              </div>
            </section>

            <nav aria-label="Footer navigation links">
              <ul className="space-y-4 text-primary-50">
                <li>
                  <Link href="/" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <section
              className="flex flex-col items-center text-primary-50"
              aria-label="Social media and search"
            >
              <h3 className="font-semibold text-4xl"> Follow Us</h3>
              <div
                className="flex flex-row gap-5 my-9"
                aria-label="Social media links"
              >
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Image
                    src="/footer/linkedin.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Image
                    src="/footer/facebook.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Image
                    src="/footer/instagram.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href="https://x.com" aria-label="X (Twitter)">
                  <Image src="/footer/x.svg" alt="" width={20} height={20} />
                </Link>
              </div>

              <form
                className="flex flex-row gap-4 justify-center"
                role="search"
                aria-label="Site search"
              >
                <label htmlFor="footer-search" className="sr-only">
                  Search the site
                </label>

                <input
                  id="footer-search"
                  name="search"
                  placeholder="Search for..."
                  className="p-2 w-[70%] rounded-md text-base text-[#11181C]
                placeholder:text-[#11181C] box-border"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-white rounded-md w-[30%] box-border flex items-center justify-center"
                  aria-label="Submit search"
                >
                  <Image
                    src="/footer/search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </button>
              </form>
            </section>
          </article>
        </div>
      </footer>
    </HeroUIProvider>
  );
}
