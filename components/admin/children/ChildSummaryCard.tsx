type ChildSummaryCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

export function ChildSummaryCard({
  label,
  value,
  valueClassName = "",
}: ChildSummaryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-300 px-4 py-3">
      <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">
        {label}
      </span>
      <span className={`text-base ${valueClassName}`}>{value}</span>
    </div>
  );
}