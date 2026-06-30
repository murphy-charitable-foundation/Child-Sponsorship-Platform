import { cache } from "react";
import SponsorProfilePage, {
  SponsorProfile,
} from "@/components/admin/sponsors/SponsorProfilePage";

// TODO: accept id: string, replace body with Supabase fetch
const getSponsor = cache(async (): Promise<SponsorProfile> => {
  return {
    id: "SI24-0008",
    firstName: "Carlos",
    lastName: "Martinez",
    sponsorType: "Individual",
    sponsoringSince: "2019-02-16",
    sponsorshipStatus: "Active",
    address: {
      line1: "1001 Tennessee Street",
      line2: "Apt 400",
      city: "Anytown",
      state: "IL",
      zip: "60131",
      country: "United States",
    },
    phone: "1-213-985-7722",
    email: "cmartinez@gmail.com",
    sponsoredChildren: [
      {
        id: "CH20-0034",
        name: "Agnes Katende",
        gender: "Female",
        dob: "2014-03-15",
        schoolLevel: "Primary 6",
        country: "Uganda",
        language: "Swahili",
        biography:
          "Agnes is a thoughtful and determined girl who lives with her mother, grandmother, and three younger brothers in a village near Kampala. Known for her kind heart and helpful nature, she often assists her mother with household chores and loves caring for her younger brothers, especially helping them with their schoolwork.\n\nAgnes likes to read and dreams of becoming a nurse one day so she can help people in her community stay healthy. In her free time, she sings in the church choir and tends to the small flower garden she planted outside their home.",
        age: 12,
        sponsorshipStartDate: "2025-12-01",
        sponsorshipStatus: "Active",
        imageUrl: "/children/girl2.jpg",
      },
      {
        id: "CH20-0041",
        name: "Joseph Okello",
        gender: "Male",
        dob: "2007-08-22",
        schoolLevel: "Senior 4",
        country: "Uganda",
        language: "Swahili",
        biography:
          "Joseph is a hardworking and ambitious young man who excels in science subjects at school. He dreams of studying engineering and helping to build infrastructure in his community.",
        age: 17,
        sponsorshipStartDate: "2024-06-10",
        sponsorshipStatus: "Active",
        imageUrl: "/children/boy1.png",
      },
    ],
  };
});

export default async function Page() {
  const sponsor = await getSponsor();
  return <SponsorProfilePage sponsor={sponsor} />;
}
