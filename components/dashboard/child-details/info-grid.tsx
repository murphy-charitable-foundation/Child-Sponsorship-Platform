import { Card } from "@/components/ui/card";
import SectionTitle from "./shared/section-title";

const basicInformation = [
  { label: "Birthday", value: "June 12, 2018" },
  { label: "Gender", value: "Female" },
  { label: "Education", value: "Grade 2" },
  { label: "Family", value: "Lived with mother and 2 siblings" },
];

const InfoGrid = () => {
  return (
    <Card className="bg-white p-6">
      <SectionTitle
        icon={"/dashboard/child-details/stars.svg"}
        title="Basic Information"
      />

      <dl className="mt-6 grid gap-4 grid-cols-2">
        {basicInformation.map((item) => (
          <div key={item.label} className="px-6 py-4">
            <dt className="text-base font-normal leading-6 text-[--zinc-800]">
              {item.label}
            </dt>
            <dd className="mt-4 text-xl font-semibold leading-7 text-black">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export default InfoGrid;
