import Image from "next/image";

import SectionHeading from "./shared/Section-Heading";

const WhoWeAre = () => {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      className="w-[90%] mx-auto flex gap-20 py-20 items-stretch"
    >
      <div className="w-1/2">
        <div id="who-we-are-heading">
          <SectionHeading title="Who We" accent="Are" centered={false} />
        </div>

        <p className="text-[--zinc-900] text-base font-normal leading-6 mt-8">
          Inspired by a life changing event, Murphy charitable foundation Uganda
          is a registered non-profit organisation, established in 2018,
          operating throughout the nation with a primary focus on North Eastern
          Region and its head office located in Bukedea District. We are
          dedicated to alleviating poverty, improving health and education in
          our project areas.
          <br />
          <br />
          Our journey began with a deep understanding of the struggles faced by
          individuals living in extreme poverty. Moved by their pain, we are
          devoted to addressing the needs and rights of vulnerable populations
          in rural communities by tackling critical social and economic issues.
          <br />
          <br />
          Our primary goal is to implement sustainable and impactful projects
          that enhance education, healthcare, empowerment, and community
          development.
        </p>
      </div>
      <section className="w-1/2 relative">
        <Image
          src="/about-us/image1.png"
          alt="Children supported by Murphy Charity Foundation"
          fill
          sizes="(max-width: 1250px) 100vw, 45vw"
        />
      </section>
    </section>
  );
};

export default WhoWeAre;
