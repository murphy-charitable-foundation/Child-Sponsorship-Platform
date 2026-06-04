import { DetailItem } from "./DetailItem";

type Guardian = {
  name: string;
  relationship: string;
  nin: string;
  phone: string;
  email: string;
  address: string;
};

type GuardianSectionProps = {
  guardian: Guardian;
};

export function GuardianSection({ guardian }: GuardianSectionProps) {
  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold text-slate-800">Guardian 1</h3>

      <div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-8">
        <DetailItem label="Guardian name" value={guardian.name} />
        <DetailItem
          label="Relationship to child"
          value={guardian.relationship}
        />
        <DetailItem label="Guardian NIN" value={guardian.nin} />
        <DetailItem label="Phone number" value={guardian.phone} />
        <DetailItem label="Email" value={guardian.email} />
        <DetailItem label="Address" value={guardian.address} multiline />
      </div>
    </section>
  );
}