import { notFound } from "next/navigation";
import ChildDetailsPage from "@/components/dashboard/child-details/page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChildPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <ChildDetailsPage childId={id} />;
}
