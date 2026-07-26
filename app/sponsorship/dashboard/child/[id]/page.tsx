import ChildDetailsPage from "@/components/dashboard/child-details/page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChildPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) return <div>Child record not found</div>;

  return <ChildDetailsPage childId={id} />;
}
