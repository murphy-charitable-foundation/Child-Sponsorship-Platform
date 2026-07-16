type TabItem<T extends string> = {
	key: T;
	label: string;
};

type TabSwitcherProps<T extends string> = {
	tabs: TabItem<T>[];
	activeTab: T;
	onChange: (tab: T) => void;
};

export function TabSwitcher<T extends string>({
	tabs,
	activeTab,
	onChange,
}: TabSwitcherProps<T>) {
	return (
		<div
			className="grid rounded-2xl bg-slate-100 p-1"
			style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
		>
			{tabs.map((tab) => (
				<button
					key={String(tab.key)}
					onClick={() => onChange(tab.key)}
					className={`rounded-xl py-2.5 text-center text-sm font-medium ${
						activeTab === tab.key ? "bg-primary text-white" : "text-slate-700"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
