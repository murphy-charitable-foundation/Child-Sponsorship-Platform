export type ChildProfile = {
  name: string;
  gender: string;
  dob: string;
  schoolLevel: string;
  country: string;
  language: string;
  biography: string;
  familyBiography: string;
  age: number;
  id: string;
  enrolled: string;
  sponsorshipStatus: string;
  imageUrl: string;
  guardian: {
    name: string;
    relationship: string;
    nin: string;
    phone: string;
    email: string;
    address: string;
  };
};
