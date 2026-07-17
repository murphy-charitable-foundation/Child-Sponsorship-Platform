export type TabKey = "profile" | "sponsorships" | "reports" | "messages";

type SponsorshipProfileTabsProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "sponsorships", label: "Sponsorships" },
  { key: "reports", label: "Reports" },
  { key: "messages", label: "Messages" },
];

export function SponsorshipProfileTabs({
  activeTab,
  onChange,
}: SponsorshipProfileTabsProps) {
  return (
    <div className="grid grid-cols-4 rounded-2xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-xl py-2.5 text-center text-sm font-medium ${
            activeTab === tab.key
              ? "bg-primary text-white"
              : "text-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
