import { cache } from "react";
import SponsorshipProfilePage from "@/components/admin/sponsorships/SponsorshipProfilePage";
import type { SponsorshipProfile } from "@/components/admin/sponsorships/SponsorshipProfilePage";

const getSponsorshipData = cache(async (id: string) => {
  // TODO: Replace with Supabase query
  const sponsorships: { [key: string]: SponsorshipProfile } = {
    "1": {
      id: "1",
      sponsorId: "SP-100",
      sponsorType: "Individual",
      sponsorName: "Amanda Thomas",
      childName: "Faith Babirye",
      address: "1001 Tennessee Street",
      city: "Anytown",
      state: "IL",
      zipCode: "60131",
      phoneNumber: "1-213-985-7722",
      email: "amanda@example.com",
      startDate: "2024-03-20",
      status: "Active",
    },
    "2": {
      id: "2",
      sponsorId: "SP-101",
      sponsorType: "Individual",
      sponsorName: "Amanda Thomas",
      childName: "Agnes Namubuga",
      address: "500 Innovation Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phoneNumber: "1-415-555-0123",
      email: "amanda@example.com",
      startDate: "2024-11-01",
      status: "Active",
    },
    "3": {
      id: "3",
      sponsorId: "SP-102",
      sponsorType: "Individual",
      sponsorName: "Christopher White",
      childName: "Joy Nakalembe",
      address: "789 Oak Street",
      city: "Boston",
      state: "MA",
      zipCode: "02101",
      phoneNumber: "1-617-555-0456",
      email: "christopher@example.com",
      startDate: "2023-11-11",
      status: "Active",
    },
    "4": {
      id: "4",
      sponsorId: "SP-103",
      sponsorType: "Group",
      sponsorName: "Community Foundation",
      childName: "Brian Catered",
      address: "321 Foundation Way",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      phoneNumber: "1-206-555-0789",
      email: "contact@communityfoundation.org",
      startDate: "2021-06-15",
      status: "Active",
    },
  };

  return sponsorships[id];
});

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sponsorship = await getSponsorshipData(id);

  if (!sponsorship) {
    return <div className="p-8">Sponsorship not found</div>;
  }

  return <SponsorshipProfilePage sponsorship={sponsorship} />;
}
