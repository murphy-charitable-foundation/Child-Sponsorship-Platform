import Image from "next/image";
import SectionHeading from "./shared/Section-Heading";

const columns = [
  [
    { src: "/about-us/photo (2).png", height: 200 },
    { src: "/about-us/photo (3).png", height: 300 },
    { src: "/about-us/photo (4).png", height: 300 },
  ],
  [
    { src: "/about-us/photo (5).png", height: 280 },
    { src: "/about-us/photo (6).png", height: 280 },
    { src: "/about-us/photo (7).png", height: 240 },
  ],
  [
    { src: "/about-us/photo (8).png", height: 180 },
    { src: "/about-us/photo (9).png", height: 270 },
    { src: "/about-us/photo (10).png", height: 270 },
  ],
  [
    { src: "/about-us/photo (11).png", height: 290 },
    { src: "/about-us/photo (12).png", height: 290 },
    { src: "/about-us/photo (13).png", height: 220 },
  ],
  [
    { src: "/about-us/photo (14).png", height: 180 },
    { src: "/about-us/photo (15).png", height: 280 },
    { src: "/about-us/photo (16).png", height: 260 },
  ],
  [
    { src: "/about-us/photo (17).png", height: 260 },
    { src: "/about-us/photo (18).png", height: 260 },
    { src: "/about-us/photo (1).png", height: 240 },
  ],
];

const ImpactInPhotos = () => {
  return (
    <section className="my-20" aria-labelledby="impact-gallery-title">
      <div className="w-[90%] mx-auto py-16">
        <div className="mb-20" id="impact-gallery-title">
          <SectionHeading
            title="Our Impact in"
            accent="Photos"
            description="Moments that capture the joy, hope, and transformation happening every day"
          />
        </div>

        <section
          aria-label="Photo gallery of organizational impact"
          className="mx-auto max-w-7xl p-6"
        >
          <div className="grid grid-cols-6 gap-4">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="relative overflow-hidden rounded-xl"
                    style={{ height: `${image.height}px` }}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ImpactInPhotos;
