"use client";

import { useState } from "react";

type TabKey = "child" | "sponsor" | "sponsorship" | "donation" | "report" | "message";

const TABS: { key: TabKey; label: string }[] = [
  { key: "child",       label: "Child" },
  { key: "sponsor",     label: "Sponsor" },
  { key: "sponsorship", label: "Sponsorship" },
  { key: "donation",    label: "Donation" },
  { key: "report",      label: "Report" },
  { key: "message",     label: "Message" },
];

const COUNTRIES = [
  "Select country", "Uganda", "Kenya", "Tanzania", "Rwanda",
  "United States", "United Kingdom", "Canada", "Australia",
];

const COLOR_OPTIONS = [
  { name: "green",  hex: "#22c55e" },
  { name: "teal",   hex: "#14b8a6" },
  { name: "blue",   hex: "#3b82f6" },
  { name: "azure",  hex: "#38bdf8" },
  { name: "purple", hex: "#a855f7" },
  { name: "violet", hex: "#8b5cf6" },
  { name: "pink",   hex: "#ec4899" },
  { name: "cherry", hex: "#e11d48" },
  { name: "orange", hex: "#f97316" },
  { name: "grey",   hex: "#9ca3af" },
];

type StatusType = { id: number; label: string; color: string };

const DEFAULT_STATUSES: StatusType[] = [
  { id: 1, label: "Active",  color: "green"  },
  { id: 2, label: "Waiting", color: "orange" },
  { id: 3, label: "Exited",  color: "grey"   },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("child");

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-semibold text-[#004a99]">Settings</h1>

      {/* Tabs — equal-width grid, active = solid blue, inactive = plain text */}
      <div className="mt-6 grid grid-cols-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2.5 text-center text-sm font-medium transition-colors rounded-md ${
              activeTab === tab.key
                ? "bg-[#004a99] text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "child"       && <ChildSettings />}
        {activeTab === "sponsor"     && <SponsorSettings />}
        {activeTab === "sponsorship" && <SponsorshipSettings />}
        {activeTab === "donation"    && <DonationSettings />}
        {activeTab === "report"      && <ReportSettings />}
        {activeTab === "message"     && <MessageSettings />}
      </div>
    </div>
  );
}

function ChildSettings() {
  const [prefix,    setPrefix]    = useState("");
  const [startId,   setStartId]   = useState("");
  const [country,   setCountry]   = useState("Select country");
  const [statuses,  setStatuses]  = useState<StatusType[]>(DEFAULT_STATUSES);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editColor, setEditColor] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [newLabel,  setNewLabel]  = useState("");
  const [newColor,  setNewColor]  = useState("green");

  const exampleId = prefix || startId
    ? `${prefix || "CH"}${startId || "24-0001"}`
    : null;

  function startEdit(s: StatusType) {
    setEditingId(s.id);
    setEditLabel(s.label);
    setEditColor(s.color);
  }

  function saveEdit() {
    setStatuses((prev) =>
      prev.map((s) => s.id === editingId ? { ...s, label: editLabel, color: editColor } : s)
    );
    setEditingId(null);
  }

  function deleteStatus(id: number) {
    setStatuses((prev) => prev.filter((s) => s.id !== id));
  }

  function addStatus() {
    if (!newLabel.trim()) return;
    setStatuses((prev) => [...prev, { id: Date.now(), label: newLabel, color: newColor }]);
    setNewLabel("");
    setNewColor("green");
    setAddingNew(false);
  }

  function colorHex(name: string) {
    return COLOR_OPTIONS.find((c) => c.name === name)?.hex ?? "#9ca3af";
  }

  return (
    <div className="max-w-2xl space-y-10">
      <h2 className="text-lg font-semibold text-slate-800">Child Settings</h2>

      {/* Auto ID Format */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Auto ID Format</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-slate-500">Child ID Prefix</label>
            <input
              className={inputCls}
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Starting ID number</label>
            <input
              className={inputCls}
              value={startId}
              onChange={(e) => setStartId(e.target.value)}
            />
          </div>
        </div>
        {exampleId && (
          <p className="mt-2 text-xs text-slate-400">
            Example ID: <span className="font-medium text-slate-600">{exampleId}</span>
          </p>
        )}
      </section>

      {/* Location */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Location</h3>
        <div>
          <label className="mb-1 block text-xs text-slate-500">Default child country</label>
          <select
            className={inputCls + " max-w-sm"}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </section>

      {/* Status Types */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Status Types</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 w-1/3">Status Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 w-1/3">Display Color</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statuses.map((s) =>
                editingId === s.id ? (
                  <tr key={s.id} className="bg-slate-50">
                    <td className="px-4 py-2">
                      <input
                        className={inputCls}
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        autoFocus
                      />
                    </td>
                    <td className="px-4 py-2">
                      <ColorSelect value={editColor} onChange={setEditColor} />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={saveEdit}
                          className="rounded-md bg-[#004a99] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#003d7a]"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs text-slate-400 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800">{s.label}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: colorHex(s.color) }} />
                        <span className="text-slate-600">{s.color}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(s)}
                          className="text-xs font-medium text-[#004a99] hover:underline"
                        >
                          Edit
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => deleteStatus(s.id)}
                          className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}

              {addingNew && (
                <tr className="bg-slate-50">
                  <td className="px-4 py-2">
                    <input
                      className={inputCls}
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Status name"
                      autoFocus
                    />
                  </td>
                  <td className="px-4 py-2">
                    <ColorSelect value={newColor} onChange={setNewColor} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={addStatus}
                        className="rounded-md bg-[#004a99] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#003d7a]"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddingNew(false)}
                        className="text-xs text-slate-400 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {!addingNew && (
            <div className="border-t border-slate-100 px-4 py-2">
              <button
                onClick={() => setAddingNew(true)}
                className="text-sm text-[#004a99] hover:underline"
              >
                + Add status type
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Sponsor Settings ────────────────────────────────────────────────────────

type GroupType = { id: number; label: string };
const DEFAULT_GROUP_TYPES: GroupType[] = [
  { id: 1, label: "Company" },
  { id: 2, label: "Organization" },
  { id: 3, label: "Family" },
  { id: 4, label: "Religious" },
];
const DEFAULT_SPONSOR_STATUSES: StatusType[] = [
  { id: 1, label: "Active",   color: "green" },
  { id: 2, label: "Inactive", color: "grey"  },
];

function SponsorSettings() {
  const [country,     setCountry]     = useState("Select country");
  const [groupTypes,  setGroupTypes]  = useState<GroupType[]>(DEFAULT_GROUP_TYPES);
  const [statuses,    setStatuses]    = useState<StatusType[]>(DEFAULT_SPONSOR_STATUSES);
  const [editGId,     setEditGId]     = useState<number | null>(null);
  const [editGLabel,  setEditGLabel]  = useState("");
  const [editSId,     setEditSId]     = useState<number | null>(null);
  const [editSLabel,  setEditSLabel]  = useState("");
  const [editSColor,  setEditSColor]  = useState("");
  const [addingGroup, setAddingGroup] = useState(false);
  const [newGroup,    setNewGroup]    = useState("");
  const [addingStatus,setAddingStatus]= useState(false);
  const [newSLabel,   setNewSLabel]   = useState("");
  const [newSColor,   setNewSColor]   = useState("green");

  function colorHex(name: string) {
    return COLOR_OPTIONS.find((c) => c.name === name)?.hex ?? "#9ca3af";
  }

  return (
    <div className="max-w-2xl space-y-10">
      <h2 className="text-lg font-semibold text-slate-800">Sponsor Settings</h2>

      {/* Location */}
      <section>
        <h3 className="mb-1 text-sm font-semibold text-slate-700">Location</h3>
        <p className="mb-3 text-xs text-slate-400">Explanatory text</p>
        <div>
          <label className="mb-1 block text-xs text-slate-500">Default sponsor country</label>
          <select className={inputCls + " max-w-sm"} value={country} onChange={(e) => setCountry(e.target.value)}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </section>

      {/* Group Types */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Group Types</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Group Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {groupTypes.map((g) =>
                editGId === g.id ? (
                  <tr key={g.id} className="bg-slate-50">
                    <td className="px-4 py-2">
                      <input className={inputCls} value={editGLabel} onChange={(e) => setEditGLabel(e.target.value)} autoFocus />
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button onClick={() => { setGroupTypes((p) => p.map((x) => x.id === g.id ? { ...x, label: editGLabel } : x)); setEditGId(null); }} className="rounded-md bg-[#004a99] px-3 py-1.5 text-xs text-white">Save</button>
                      <button onClick={() => setEditGId(null)} className="text-xs text-slate-400 hover:underline">Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800">{g.label}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditGId(g.id); setEditGLabel(g.label); }} className="text-xs font-medium text-[#004a99] hover:underline">Edit</button>
                        <span className="text-slate-300">|</span>
                        <button onClick={() => setGroupTypes((p) => p.filter((x) => x.id !== g.id))} className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              {addingGroup && (
                <tr className="bg-slate-50">
                  <td className="px-4 py-2">
                    <input className={inputCls} value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="Group type name" autoFocus />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => { if (newGroup.trim()) { setGroupTypes((p) => [...p, { id: Date.now(), label: newGroup }]); setNewGroup(""); setAddingGroup(false); } }} className="rounded-md bg-[#004a99] px-3 py-1.5 text-xs text-white">Add</button>
                    <button onClick={() => setAddingGroup(false)} className="text-xs text-slate-400 hover:underline">Cancel</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!addingGroup && (
            <div className="border-t border-slate-100 px-4 py-2">
              <button onClick={() => setAddingGroup(true)} className="text-sm text-[#004a99] hover:underline">+ Add group type</button>
            </div>
          )}
        </div>
      </section>

      {/* Status Types */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Status Types</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 w-1/3">Status Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 w-1/3">Display Color</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statuses.map((s) =>
                editSId === s.id ? (
                  <tr key={s.id} className="bg-slate-50">
                    <td className="px-4 py-2"><input className={inputCls} value={editSLabel} onChange={(e) => setEditSLabel(e.target.value)} autoFocus /></td>
                    <td className="px-4 py-2"><ColorSelect value={editSColor} onChange={setEditSColor} /></td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setStatuses((p) => p.map((x) => x.id === s.id ? { ...x, label: editSLabel, color: editSColor } : x)); setEditSId(null); }} className="rounded-md bg-[#004a99] px-3 py-1.5 text-xs text-white">Save</button>
                        <button onClick={() => setEditSId(null)} className="text-xs text-slate-400 hover:underline">Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800">{s.label}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: colorHex(s.color) }} /><span className="text-slate-600">{s.color}</span></div></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditSId(s.id); setEditSLabel(s.label); setEditSColor(s.color); }} className="text-xs font-medium text-[#004a99] hover:underline">Edit</button>
                        <span className="text-slate-300">|</span>
                        <button onClick={() => setStatuses((p) => p.filter((x) => x.id !== s.id))} className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              {addingStatus && (
                <tr className="bg-slate-50">
                  <td className="px-4 py-2"><input className={inputCls} value={newSLabel} onChange={(e) => setNewSLabel(e.target.value)} placeholder="Status name" autoFocus /></td>
                  <td className="px-4 py-2"><ColorSelect value={newSColor} onChange={setNewSColor} /></td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { if (newSLabel.trim()) { setStatuses((p) => [...p, { id: Date.now(), label: newSLabel, color: newSColor }]); setNewSLabel(""); setNewSColor("green"); setAddingStatus(false); } }} className="rounded-md bg-[#004a99] px-3 py-1.5 text-xs text-white">Add</button>
                      <button onClick={() => setAddingStatus(false)} className="text-xs text-slate-400 hover:underline">Cancel</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!addingStatus && (
            <div className="border-t border-slate-100 px-4 py-2">
              <button onClick={() => setAddingStatus(true)} className="text-sm text-[#004a99] hover:underline">+ Add status type</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Sponsorship Settings ─────────────────────────────────────────────────────

const CURRENCIES = ["Select currency type", "USD", "EUR", "GBP", "CAD", "AUD", "UGX"];

function SponsorshipSettings() {
  const [defaultAmount,  setDefaultAmount]  = useState("");
  const [currency,       setCurrency]       = useState("Select currency type");
  const [country,        setCountry]        = useState("Select country");
  const [allowMultiple,  setAllowMultiple]  = useState(true);
  const [autoAssign,     setAutoAssign]     = useState(false);

  return (
    <div className="max-w-2xl space-y-10">
      <h2 className="text-lg font-semibold text-slate-800">Sponsorship Settings</h2>

      {/* Currency */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Currency</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-slate-500">Default sponsorship amount</label>
            <input className={inputCls} value={defaultAmount} onChange={(e) => setDefaultAmount(e.target.value)} placeholder="e.g. 50" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Currency type</label>
            <select className={inputCls} value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        {defaultAmount && currency !== "Select currency type" && (
          <p className="mt-2 text-xs text-slate-400">Example ID: <span className="font-medium text-slate-600">{currency} {defaultAmount}</span></p>
        )}
      </section>

      {/* Location */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Location</h3>
        <div>
          <label className="mb-1 block text-xs text-slate-500">Default sponsorship country</label>
          <select className={inputCls + " max-w-sm"} value={country} onChange={(e) => setCountry(e.target.value)}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </section>

      {/* Matching Rules */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Matching Rules</h3>
        <div className="space-y-4">
          <Toggle
            label="Allow multiple sponsors per child"
            description="Sponsoring children can receive sponsorship from multiple sponsors."
            value={allowMultiple}
            onChange={setAllowMultiple}
          />
          <Toggle
            label="Auto-assign sponsor to child"
            description="Automatically assign sponsors to available children."
            value={autoAssign}
            onChange={setAutoAssign}
          />
        </div>
      </section>
    </div>
  );
}

function Toggle({ label, description, value, onChange }: {
  label: string; description: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="text-sm text-slate-800">{label}</p>
        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${value ? "bg-[#004a99]" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

// ─── Donation Settings ────────────────────────────────────────────────────────

const PAYMENT_TYPES = ["Manual Entry", "Bank", "Mobile Money", "Card"];
const DONATION_TYPE_OPTIONS = ["Sponsorship-linked", "General", "Medical care", "Education"];

function DonationSettings() {
  const [paymentTypes,   setPaymentTypes]   = useState<string[]>(PAYMENT_TYPES);
  const [donationType1,  setDonationType1]  = useState("Sponsorship-linked");
  const [donationType2,  setDonationType2]  = useState("Sponsorship-linked");
  const [minDonation,    setMinDonation]    = useState(true);
  const [enableReceipts, setEnableReceipts] = useState(false);

  function togglePayment(type: string) {
    setPaymentTypes((p) => p.includes(type) ? p.filter((x) => x !== type) : [...p, type]);
  }

  return (
    <div className="max-w-lg">
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        <h2 className="text-base font-semibold text-slate-800">Donations Settings</h2>

        {/* Allowed Payment Types */}
        <section>
          <h3 className="mb-3 text-sm font-medium text-slate-700">Allowed Payment Types</h3>
          <div className="space-y-2">
            {PAYMENT_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentTypes.includes(type)}
                  onChange={() => togglePayment(type)}
                  className="h-4 w-4 rounded accent-[#004a99]"
                />
                <span className="text-sm text-slate-700">{type}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Donation Types */}
        <section>
          <h3 className="mb-3 text-sm font-medium text-slate-700">Donation Types</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#004a99]" />
                <select className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none" value={donationType1} onChange={(e) => setDonationType1(e.target.value)}>
                  {DONATION_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <p className="mt-1 text-xs text-slate-400">Children can have more than one sponsor</p>
            </div>
            <div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#004a99]" />
                <select className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none" value={donationType2} onChange={(e) => setDonationType2(e.target.value)}>
                  {DONATION_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <p className="mt-1 text-xs text-slate-400">Automatically assign sponsors to available children</p>
            </div>
          </div>
        </section>

        {/* Minimum Donation Amount */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Minimum Donation Amount</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setMinDonation(!minDonation)} className={`relative h-6 w-11 rounded-full transition-colors ${minDonation ? "bg-[#004a99]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${minDonation ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className="text-xs font-medium text-slate-500">{minDonation ? "ON" : "OFF"}</span>
          </div>
        </div>

        {/* Enable Receipts */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={enableReceipts} onChange={() => setEnableReceipts(!enableReceipts)} className="h-4 w-4 rounded accent-[#004a99]" />
          <span className="text-sm text-slate-700">Enable Receipts</span>
        </label>
      </div>
    </div>
  );
}

// ─── Report Settings ──────────────────────────────────────────────────────────

const DATE_RANGES    = ["Last 30 Days", "Last 7 Days", "Last 90 Days", "This Year", "Custom"];
const CURRENCIES_RPT = ["UGX - Ugandan Shilling", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"];
const STATUS_OPTS    = ["All", "Active", "Inactive"];
const SPONSOR_TYPES  = ["All", "Individual", "Group"];
const AVAILABLE_REPORTS = ["Sponsorship Report", "Donation Report", "Child Report", "Sponsor Report", "Email & SMS Logs", "Custom Date Range"];

function ReportSettings() {
  const [dateRange,      setDateRange]      = useState("Last 30 Days");
  const [currency,       setCurrency]       = useState("UGX - Ugandan Shilling");
  const [statusType,     setStatusType]     = useState("All");
  const [sponsorType,    setSponsorType]    = useState("All");
  const [pdfExport,      setPdfExport]      = useState(true);
  const [activeReports,  setActiveReports]  = useState<string[]>(AVAILABLE_REPORTS);

  function toggleReport(r: string) {
    setActiveReports((p) => p.includes(r) ? p.filter((x) => x !== r) : [...p, r]);
  }

  return (
    <div className="max-w-lg">
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        <h2 className="text-base font-semibold text-slate-800">Reports Settings</h2>

        {/* Default Filters */}
        <section>
          <h3 className="mb-3 text-sm font-medium text-slate-700">Default Filters</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Standard Date Range</label>
              <select className={inputCls} value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                {DATE_RANGES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Currency</label>
              <select className={inputCls} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES_RPT.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Status Type</label>
              <select className={inputCls} value={statusType} onChange={(e) => setStatusType(e.target.value)}>
                {STATUS_OPTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Sponsorship Type</label>
              <select className={inputCls} value={sponsorType} onChange={(e) => setSponsorType(e.target.value)}>
                {SPONSOR_TYPES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={() => setPdfExport(!pdfExport)} className={`relative h-6 w-11 rounded-full transition-colors ${pdfExport ? "bg-[#004a99]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${pdfExport ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className="text-sm text-slate-700">Enable PDF Export</span>
            <span className="text-xs font-medium text-slate-500">{pdfExport ? "ON" : "OFF"}</span>
          </div>
        </section>

        {/* Available Reports */}
        <section>
          <h3 className="mb-3 text-sm font-medium text-slate-700">Available Reports</h3>
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_REPORTS.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={activeReports.includes(r)} onChange={() => toggleReport(r)} className="h-4 w-4 rounded accent-[#004a99]" />
                <span className="text-sm text-slate-700">{r}</span>
              </label>
            ))}
          </div>
          <button className="mt-4 rounded-lg bg-[#004a99] px-4 py-2 text-sm font-medium text-white hover:bg-[#003d7a]">
            + Add Report
          </button>
        </section>
      </div>
    </div>
  );
}

// ─── Message Settings ─────────────────────────────────────────────────────────

function MessageSettings() {
  const [readReceipts,     setReadReceipts]     = useState(true);
  const [typingIndicators, setTypingIndicators] = useState(true);

  const navItems = [
    { label: "Message Requests",     desc: "Choose who can send you requests." },
    { label: "Disappearing Messages",desc: "Set messages to disappear after a certain time." },
    { label: "Blocked Contacts",     desc: "Manage your blocked users." },
    { label: "Muted Chats",          desc: "View chats you've muted." },
  ];

  return (
    <div className="max-w-lg">
      <div className="overflow-hidden rounded-xl bg-slate-800 text-white">
        {/* Toggles */}
        <div className="divide-y divide-slate-700">
          {[
            { label: "Show Read Receipts",     desc: "Allow others to see when you've read their messages.", value: readReceipts,     set: setReadReceipts },
            { label: "Show Typing Indicators", desc: "Allow others to see when you're typing.",              value: typingIndicators, set: setTypingIndicators },
          ].map(({ label, desc, value, set }) => (
            <div key={label} className="flex items-start justify-between gap-6 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
              </div>
              <button onClick={() => set(!value)} className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${value ? "bg-green-500" : "bg-slate-600"}`}>
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Nav items */}
        <div className="divide-y divide-slate-700">
          {navItems.map(({ label, desc }) => (
            <button key={label} className="flex w-full items-center justify-between px-5 py-4 hover:bg-slate-700 transition-colors text-left">
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
              </div>
              <span className="text-slate-400 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function ColorSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const hex = COLOR_OPTIONS.find((c) => c.name === value)?.hex ?? "#9ca3af";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-44 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:border-slate-300"
      >
        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: hex }} />
        <span className="flex-1 text-left">{value || "Select color"}</span>
        <span className="text-slate-400 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-44 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => { onChange(c.name); setOpen(false); }}
              className={`flex w-full items-center gap-3 px-3 py-1.5 text-sm hover:bg-slate-50 ${
                value === c.name ? "font-medium" : ""
              }`}
            >
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-[#004a99] focus:outline-none focus:ring-2 focus:ring-[#004a99]/20";
