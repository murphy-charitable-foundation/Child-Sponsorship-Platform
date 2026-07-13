type TabItem<T extends string> = {
	key: T;
	label: string;
};

type ProfileTabsProps<T extends string> = {
	tabs: TabItem<T>[];
	activeTab: T;
	onChange: (tab: T) => void;
};

export function ProfileTabs<T extends string>({
	tabs,
	activeTab,
	onChange,
}: ProfileTabsProps<T>) {
	return (
		<div className="grid grid-cols-5 rounded-2xl bg-slate-100 p-1">
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
