"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Heart,
  Handshake,
  Gift,
  FileText,
  MessageSquare,
  Settings,
  Shield,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: any;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: "MAIN",
    items: [
      { label: "Home", href: "/admin/dashboard", icon: Home },
      { label: "Children", href: "/admin/children", icon: Users },
      { label: "Sponsors", href: "/admin/sponsors", icon: Heart },
      { label: "Sponsorships", href: "/admin/sponsorships", icon: Handshake },
      { label: "Donations", href: "/admin/donations", icon: Gift },
    ],
  },
  {
    title: "COMMUNICATIONS",
    items: [
      { label: "Reports", href: "/admin/reports", icon: FileText },
      { label: "Messages", href: "/admin/messages", icon: MessageSquare },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-80 bg-primary text-white h-screen">
      <nav className="h-full flex flex-col">
        {/* Logo (fixed) */}
        <div className="flex justify-center pt-6 pb-4">
          <Image
            src="/children/logo.png"
            alt="Murphy Charitable"
            width={160}
            height={160}
            priority
          />
        </div>

        {/* Menu — natural height, no flex-1 so spacer below creates the gap */}
        <div className="px-6 mt-2">
          {NAV_SECTIONS.map((section, sectionIndex) => (
            <div key={section.title}>
              {sectionIndex > 0 && <div className="my-4" />}
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={[
                          "flex items-center gap-3 px-4 py-3 text-base text-left transition-colors rounded-sm",
                          isActive
                            ? "bg-primary-200 text-primary-900 font-semibold"
                            : "text-white hover:bg-primary-200/50",
                        ].join(" ")}
                      >
                        <item.icon size={18} className="shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Admin button */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href="/admin/organizations"
              className={[
                "flex items-center gap-3 px-4 py-3 text-base text-left transition-colors rounded-sm bg-primary-200 text-primary-900 font-semibold",
              ].join(" ")}
            >
              <Shield size={18} className="shrink-0" />
              Admin
            </Link>
          </div>
        </div>

        {/* Spacer — pushes profile section to the bottom */}
        <div className="flex-1" />

        {/* Profile (ALWAYS visible) */}
        <div className="shrink-0 px-6 pb-6 pt-4">
          <div className="mb-4 border-t border-white/30" />

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-lg font-semibold text-primary">
              SM
            </div>

            <div className="min-w-0">
              <div className="text-base font-medium truncate">
                Stephanie McVanSmithersons
              </div>
              <div className="text-xs text-white/70 truncate">
                stephanie@example.com
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/auth/login")}
            className="w-full rounded-sm border border-white/70 py-3 text-center font-medium text-white hover:bg-white/10 transition"
          >
            Sign out
          </button>
        </div>
      </nav>
    </aside>
  );
}
