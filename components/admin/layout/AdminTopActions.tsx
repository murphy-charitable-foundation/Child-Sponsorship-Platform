"use client";

import React from "react";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";

export default function AdminTopActions() {
  const pathname = usePathname();

  // Show "Add Child" button only on children page
  if (pathname === "/admin/children") {
    return (
      <Button radius="md" color="primary">
        Add Child
      </Button>
    );
  }

  // Show "Add Sponsor" button only on sponsors page
  if (pathname === "/admin/sponsors") {
    return (
      <Button radius="md" color="primary">
        Add Sponsor
      </Button>
    );
  }

  // Return null for other pages
  return null;
}
