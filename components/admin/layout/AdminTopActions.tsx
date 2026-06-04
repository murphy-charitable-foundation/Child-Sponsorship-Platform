"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function AdminTopActions() {
  const pathname = usePathname();

  // Hide the Add button on the Add page
  if (pathname === "/admin/children/add") return null;

  return (
    <Button as={Link} href="/admin/children/add" radius="md" color="primary">
      Add Child
    </Button>
  );
}
