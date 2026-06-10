import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
};

const Card = ({ title, description, imageSrc }: CardProps) => {
  return (
    <article
      aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
      className="w-1/2 mx-auto box-border border bg-white/50 rounded-md p-6"
    >
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
        <Image src={imageSrc} alt="" width={24} height={24} />
      </div>

      <h3
        id={title.replace(/\s+/g, "-").toLowerCase()}
        className="my-6 text-2xl font-semibold"
      >
        {title}
      </h3>
      <p className="text-default-700 leading-6 text-base">{description}</p>
    </article>
  );
};
const SecondChild = () => {
  return (
    <section
      aria-label="Mission and Vision section"
      className="w-full bg-[--blue-200] flex items-center justify-center"
    >
      <div className="w-[90%] mx-auto flex flex-row py-16 gap-10 ">
        <Card
          title="Our Mission"
          description="To empower children living in poverty by connecting them with compassionate sponsors who provide essential resources for education, healthcare, nutrition, and opportunities for a brighter future. We believe that every child deserves the chance to reach their full potential."
          imageSrc="/about-us/Target.svg"
        />
        <Card
          title="Our Vision"
          description="Our Vision A world where all children, regardless of their circumstances, have access to quality education, healthcare, and the support they need to break the cycle of poverty. We envision thriving communities where children grow up to become leaders and change-makers."
          imageSrc="/about-us/Target.svg"
        />
      </div>
    </section>
  );
};

export default SecondChild;
