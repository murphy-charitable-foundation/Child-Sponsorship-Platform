import { Card } from "@/components/ui/card";

const sponsorshipSummary = [
  { label: "Start Date", value: "December 15, 2025" },
  { label: "Monthly Amount", value: "$30" },
  { label: "Total Donated", value: "$90" },
];

const SummaryCard = () => {
  return (
    <Card className="bg-[--blue-200] p-6">
      <h3 className="text-2xl font-semibold leading-8 text-black">
        Sponsorship Summary
      </h3>

      <dl className="mt-6 grid gap-4 grid-cols-3">
        {sponsorshipSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-[--rounded-medium] bg-[rgba(255,255,255,0.5)] p-6"
          >
            <dt className="text-base font-normal leading-6 text-[--zinc-800]">
              {item.label}
            </dt>
            <dd className="mt-2 text-xl font-semibold leading-7 text-black">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export default SummaryCard;
