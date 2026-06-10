import SectionHeading from "./Section-Heading";

const Card = ({ text, number }: { text: string; number: string }) => {
  return (
    <div>
      <p className="text-[48px] font-semibold mb-6 text-zinc-800">{number}</p>
      <p className="text-zinc-600 font-medium">{text}</p>
    </div>
  );
};

const FourthChild = () => {
  return (
    <div className="bg-primary-100">
      <div className="w-[90%] mx-auto py-16">
        <div className="mb-20">
          <SectionHeading title="Our Impact in" accent="Numbers" />
        </div>
        <div className="grid grid-cols-4 gap-8 place-items-center text-center">
          <Card text="Children Sponsored" number="15,000+" />
          <Card text="Children Sponsored" number="45" />
          <Card text="Children Sponsored" number="25" />
          <Card text="Children Sponsored" number="98%" />
        </div>
      </div>
    </div>
  );
};

export default FourthChild;
