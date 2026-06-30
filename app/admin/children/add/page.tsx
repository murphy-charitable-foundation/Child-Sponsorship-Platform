"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AddChildDrawer from "@/components/admin/children/AddChildDrawer";

export default function AddChildPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  function handleClose() {
    setIsOpen(false);
    router.replace("/admin/children");
  }

  return <AddChildDrawer isOpen={isOpen} onClose={handleClose} />;
}
