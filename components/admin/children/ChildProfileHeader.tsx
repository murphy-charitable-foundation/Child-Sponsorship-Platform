import Link from "next/link";

type ChildProfileHeaderProps = {
  title: string;
  backLabel: string;
  backHref: string;
};

export function ChildProfileHeader({
  title,
  backLabel,
  backHref,
}: ChildProfileHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>

      <Link
        href={backHref}
        className="mt-4 flex w-fit items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <span className="text-xl">←</span>
        <span>{backLabel}</span>
      </Link>
    </div>
  );
}