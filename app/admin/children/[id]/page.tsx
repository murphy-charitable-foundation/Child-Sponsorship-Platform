import { cache } from "react";
import ChildProfilePage, {
  ChildProfile,
} from "@/components/admin/children/ChildProfilePage";

// TODO: accept id: string, replace body with:
// const { data } = await supabase.from("children").select("*").eq("id", id).single();
const getChild = cache(async (): Promise<ChildProfile> => {
  return {
    name: "Rebecca Akello",
    gender: "Female",
    dob: "2017-01-14",
    schoolLevel: "Primary 3",
    country: "Uganda",
    language: "Swahili",
    biography:
      "Rebecca is a cheerful 9-year-old girl who loves dancing and singing with her friends after school, and she is known in her village for her bright smile and kind heart.\n\nRebecca helps her grandmother tend their small vegetable garden in the mornings before walking to the local primary school, where her favorite subject is mathematics. In the evenings, she enjoys listening to her grandmother tell traditional stories by the fire and dreams of one day becoming a teacher so she can help other children in her community learn to read and write.",
    familyBiography:
      "Rebecca lives with her grandmother, two younger brothers, and her uncle's family in a small village near Mbale.",
    age: 9,
    id: "CH22-0018",
    enrolled: "2022-04-29",
    sponsorshipStatus: "Active",
    imageUrl: "/children/girl1.jpg",
    guardian: {
      name: "Grace Namukasa",
      relationship: "Grandmother",
      nin: "CM78045129846PE",
      phone: "+256 772 845 193",
      email: "childguardiannumber1@email.com",
      address: "House 47, Naboa Road\nMbale",
    },
  };
});

export default async function Page() {
  const child = await getChild();
  return <ChildProfilePage child={child} />;
}
