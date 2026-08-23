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
		<div className="flex items-center justify-between gap-3 rounded-md border border-slate-300 px-4 py-3">
			<span className="shrink-0 text-sm font-semibold uppercase tracking-wide text-slate-700">
				{label}
			</span>
			<span
				className={`min-w-0 truncate text-right text-base ${valueClassName}`}
				title={value}
			>
				{value}
			</span>
		</div>
	);
}
