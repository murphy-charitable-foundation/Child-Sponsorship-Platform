import Image from "next/image";
import { ChildProfile } from "./types";

type ChildTabHeaderProps = {
  child: ChildProfile;
  subtitle: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function ChildTabHeader({
  child,
  subtitle,
  actionLabel,
  onActionClick,
}: ChildTabHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={child.imageUrl}
          alt={child.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div>
          <p className="text-xl font-semibold text-slate-800">{child.name}</p>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      {actionLabel && (
        <button
          onClick={onActionClick}
          className="rounded-lg bg-[#004a99] px-4 py-2 text-sm font-medium text-white hover:bg-[#003d7a]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
