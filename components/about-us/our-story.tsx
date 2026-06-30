import Image from "next/image";
import SectionHeading from "./shared/Section-Heading";

const sections = [
  {
    id: 1,
    year: "2010",
    title: "The Beginning",
    text: "To empower children living in poverty by connecting them with compassionate sponsors who provide essential resources for education, healthcare, nutrition, and opportunities for a brighter future. We believe that every child deserves the chance to reach their full potential.",
    image: "/about-us/image2.png",
  },
  {
    id: 2,
    year: "2013",
    title: "Expanding Our Reach",
    text: "By 2013, we had grown to support over 1,500 children across 5 countries. We introduced new partnerships with local schools and community leaders to ensure sustainable impact.",
    image: "/about-us/image3.png",
  },
  {
    id: 3,
    year: "2018",
    title: "Building Infrastructure",
    text: "A major milestone year, we constructed 12 new school buildings and learning centers, providing safe, modern facilities for children to learn, play, and grow. This marked a turning point in our ability to create lasting change.",
    image: "/about-us/image4.png",
  },
  {
    id: 4,
    year: "2019",
    title: "Reaching 5,000 Children",
    text: "A proud achievement, we reached our goal of supporting 5,000 children worldwide. Our programs expanded to include not only education and health support but also skills development.",
    image: "/about-us/image5.png",
  },
  {
    id: 5,
    year: "2022",
    title: "Digital Innovation",
    text: "Launched our digital platforms connecting sponsors directly with children through letters, photos, and progress updates. Technology helped to build stronger relationships.",
    image: "/about-us/image6.png",
  },
  {
    id: 6,
    year: "2026",
    title: "Looking Forward",
    text: "Today, we support over 15,000 children and their families. Our vision continues to grow as we work towards a world where every child has access to education and opportunity.",
    image: "/about-us/image7.png",
  },
];

type TimelineItemProps = {
  year: string;
  title: string;
  text: string;
  image: string;
  reverse: boolean;
};

const TimelineItem = ({
  year,
  title,
  text,
  image,
  reverse,
}: TimelineItemProps) => {
  const TextContent = (
    <div className="py-6">
      <span
        aria-label={`Year ${year}`}
        className="text-black w-fit px-4 py-1 font-semibold rounded-[8px] bg-[--green-500]"
      >
        {year}
      </span>

      <h3 className="text-3xl font-semibold text-zinc-900 my-6">{title}</h3>

      <p className="text-zinc-600 leading-7">{text}</p>
    </div>
  );

  const ImageContent = (
    <div className="relative h-[350px] w-full">
      <Image
        src={image}
        alt={`Timeline image for ${title} (${year})`}
        fill
        className="object-cover rounded-2xl"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  return (
    <article
      aria-label={`Timeline event: ${title} in ${year}`}
      className="grid grid-cols-[1fr_120px_1fr] items-center py-16"
    >
      {/* Left */}
      <div>{reverse ? ImageContent : TextContent}</div>

      {/* Center circle */}
      <div aria-hidden="true" className="flex justify-center">
        <div className="relative z-10 h-5 w-5 rounded-full border-[3px] border-green-500 bg-white shadow-md" />
      </div>

      {/* Right */}
      <div>{reverse ? TextContent : ImageContent}</div>
    </article>
  );
};

const OurStory = () => {
  return (
    <section
      className="w-[90%] mx-auto py-20"
      aria-labelledby="our-story-heading"
    >
      <div className="text-center mb-20" id="our-story-heading">
        <SectionHeading title="Our" accent="Story" />
      </div>

      <div role="list" aria-label="Organization timeline" className="relative">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-60 bottom-60 -translate-x-1/2 z-0 
          border-l-2 border-dashed border-primary-500"
        />

        {sections.map((item, index) => (
          <TimelineItem
            key={item.id}
            year={item.year}
            title={item.title}
            text={item.text}
            image={item.image}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default OurStory;
