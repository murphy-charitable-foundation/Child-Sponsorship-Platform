import { Card } from "@/components/ui/card";
import Image from "next/image";

type BasicInfoItem = {
  label: string;
  value: string;
};

type BasicInfoProps = {
  basicInformation: BasicInfoItem[];
};

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={icon} width={20} height={20} alt="" aria-hidden="true" />
      <h3 className="text-2xl font-semibold leading-8 text-[--zinc-900]">
        {title}
      </h3>
    </div>
  );
};

const InfoGrid = ({ basicInformation }: BasicInfoProps) => {
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
