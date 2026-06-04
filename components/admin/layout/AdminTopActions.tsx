"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function AdminTopActions() {
  const pathname = usePathname();
  const router   = useRouter();

  const isChildrenRoute     = pathname?.startsWith("/admin/children");
  const isSponsorshipsRoute = pathname?.startsWith("/admin/sponsorships");
  const isSponsorsRoute     = pathname?.startsWith("/admin/sponsors") && !isSponsorshipsRoute;

  if (isChildrenRoute && pathname !== "/admin/children/add") {
    return (
      <Button as={Link} href="/admin/children/add" radius="md" color="primary">
        Add Child
      </Button>
    );
  }

  if (isSponsorsRoute && !pathname?.includes("/admin/sponsors/")) {
    return (
      <Button
        radius="md"
        color="primary"
        onPress={() => router.push("/admin/sponsors?add=1")}
      >
        Add Sponsor
      </Button>
    );
  }

  if (isSponsorshipsRoute) {
    return (
      <Button
        radius="md"
        color="primary"
        onPress={() => router.push("/admin/sponsorships?create=1")}
      >
        Create Sponsorship
      </Button>
    );
  }

  return null;
}
