"use client";

import { useRouter } from "next/navigation";
import AddChildModal from "./AddChild";

export default function AddChildPage() {
  const router = useRouter();

  return (
    <AddChildModal
      open={true}
      onClose={() => router.push("/admin/children")}
    />
  );
}
