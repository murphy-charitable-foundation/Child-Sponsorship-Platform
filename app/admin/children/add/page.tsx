"use client";

import { useRouter } from "next/navigation";
import AddChildDrawer from "@/components/admin/children/AddChildDrawer";

export default function AddChildPage() {
  const router = useRouter();

  function handleClose() {
    router.replace("/admin/children");
  }

  return <AddChildDrawer isOpen={true} onClose={handleClose} />;
}
