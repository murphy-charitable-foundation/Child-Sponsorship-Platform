"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Children", href: "/admin/children" },
  { label: "Sponsors", href: "/admin/sponsors" },
  { label: "Sponsorship", href: "/admin/sponsorships" },
  { label: "Donations", href: "/admin/donations" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-primary text-white min-h-screen">
      <nav className="h-full flex flex-col">
        {/* Logo */}
        <div className="flex justify-center pt-8 pb-6">
          <Image
            src="/children/logo.png"
            alt="Murphy Charitable"
            width={180}
            height={180}
            priority
          />
        </div>

        {/* Menu */}
        <ul className="px-6 space-y-2 text-center">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "block rounded-md px-4 py-3 text-base",
                    isActive
                      ? "bg-content2 text-primary font-semibold"
                      : "text-white font-normal",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>


{/* Bottom section */}
<div className="px-6 pb-6">
  {/* gap + divider (optional) */}
  <div className="pt-10">
    {/* If you don't want the line, delete this next div */}

  </div>
  </div>
        {/* User info pinned to bottom */}
      {/* Spacer pushes profile to bottom */}
<div className="flex-1" />

{/* Profile section */}
<div className="px-6 pb-6">
  {/* spacing + divider */}
  <div className="h-10" />
  <div className="border-t border-white/40 mb-6" />

  {/* User info row */}
  <div className="flex items-center gap-3 mb-6">
    {/* Avatar */}
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-lg font-semibold text-primary">
      SM
    </div>

    {/* Name */}
    <div className="text-base font-medium text-white truncate">
      Stephanie McVanSmithersons
    </div>
  </div>

  {/* Sign out button */}
  <button
    className="w-full rounded-md border border-white/70 py-3 text-center font-medium text-white hover:bg-white/10 transition"
  >
    Sign out
  </button>
</div>

      </nav>
    </aside>
  );
}
