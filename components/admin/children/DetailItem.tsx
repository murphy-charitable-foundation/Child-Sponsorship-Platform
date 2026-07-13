type DetailItemProps = {
	label: string;
	value: string;
	multiline?: boolean;
};

export function DetailItem({
	label,
	value,
	multiline = false,
}: DetailItemProps) {
	return (
		<div>
			<p className="text-xs  tracking-wide text-slate-500">{label}</p>
			<p
				className={`mt-1 text-sm text-slate-800 break-words ${
					multiline ? "whitespace-pre-line" : ""
				}`}
			>
				{value}
			</p>
		</div>
	);
}
