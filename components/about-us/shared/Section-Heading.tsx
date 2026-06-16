export default function SectionHeading({
  title,
  accent,
  description,
  centered = true,
}: {
  title: string;
  accent: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
        {title} <span className="text-secondary">{accent}</span>
      </h2>
      {description ? <p className="text-[--blue-500] mt-5">{description}</p> : null}
    </div>
  );
}
