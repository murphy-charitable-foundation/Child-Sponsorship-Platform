type ChildTabHeaderProps = {
	subtitle: string;
	actionLabel?: string;
	onActionClick?: () => void;
};

export function ChildTabHeader({
	subtitle,
	actionLabel,
	onActionClick,
}: ChildTabHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div>
					<p className="text-[16px] font-semibold">{subtitle}</p>
				</div>
			</div>
			{actionLabel && (
				<button
					onClick={onActionClick}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					{actionLabel}
				</button>
			)}
		</div>
	);
}
