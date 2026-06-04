"use client";

import { useState } from "react";
import DonationDetailsDrawer, { Donation } from "./DonationDetailsDrawer";

const DONATIONS: Donation[] = [
  { id: "1",  lastName: "Martinez", firstName: "Carlos",   amount: "$250",   date: "2026-04-01", country: "United States",  purpose: "General fund",       phone: "+1-213-985-7722", email: "cmartinez@gmail.com",     frequency: "One-time", paymentMethod: "Card", dateTime: "2026-04-01 at 2:56pm" },
  { id: "2",  lastName: "Leusink",  firstName: "Marta",    amount: "$500",   date: "2026-03-31", country: "New Zealand",    purpose: "General fund",       phone: "+64-21-555-0101", email: "mleusink@email.com",      frequency: "One-time", paymentMethod: "Card", dateTime: "2026-03-31 at 10:12am" },
  { id: "3",  lastName: "Smith",    firstName: "Emily",    amount: "$150",   date: "2026-03-31", country: "United Kingdom", purpose: "Education programs", phone: "+44-7700-900123", email: "emily.smith@email.co.uk", frequency: "Monthly",  paymentMethod: "Bank transfer", dateTime: "2026-03-31 at 9:04am" },
  { id: "4",  lastName: "Davis",    firstName: "Stuart",   amount: "$1,000", date: "2026-03-25", country: "United States",  purpose: "Medical care",       phone: "+1-312-555-0187", email: "sdavis@email.com",        frequency: "One-time", paymentMethod: "Card", dateTime: "2026-03-25 at 3:41pm" },
  { id: "5",  lastName: "Wilson",   firstName: "Steve",    amount: "$300",   date: "2026-03-24", country: "Canada",         purpose: "General fund",       phone: "+1-604-555-0134", email: "swilson@email.ca",        frequency: "Monthly",  paymentMethod: "Card", dateTime: "2026-03-24 at 11:30am" },
  { id: "6",  lastName: "Harris",   firstName: "Dan",      amount: "$275",   date: "2026-03-24", country: "Australia",      purpose: "General fund",       phone: "+61-2-5550-1234", email: "dharris@email.com.au",    frequency: "One-time", paymentMethod: "Card", dateTime: "2026-03-24 at 8:15am" },
  { id: "7",  lastName: "Pedersen", firstName: "Christina",amount: "$500",   date: "2026-03-22", country: "Denmark",        purpose: "Education programs", phone: "+45-55-01-23-45", email: "cpedersen@email.dk",      frequency: "Monthly",  paymentMethod: "Bank transfer", dateTime: "2026-03-22 at 2:00pm" },
  { id: "8",  lastName: "Zenz",     firstName: "Daniel",   amount: "$200",   date: "2026-03-20", country: "United States",  purpose: "Medical care",       phone: "+1-415-555-0199", email: "dzenz@email.com",         frequency: "One-time", paymentMethod: "Card", dateTime: "2026-03-20 at 4:55pm" },
  { id: "9",  lastName: "Perry",    firstName: "Jody",     amount: "$100",   date: "2026-03-20", country: "Canada",         purpose: "General fund",       phone: "+1-416-555-0166", email: "jperry@email.ca",         frequency: "Monthly",  paymentMethod: "Card", dateTime: "2026-03-20 at 1:22pm" },
];

const COUNTRIES = ["All countries", "United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Denmark"];

const totalRaised = DONATIONS.reduce((sum, d) => sum + parseFloat(d.amount.replace(/[$,]/g, "")), 0);

export default function DonationsPage() {
  const [search,  setSearch]  = useState("");
  const [country, setCountry] = useState("All countries");
  const [selected, setSelected] = useState<Donation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = DONATIONS.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch  = !q || d.lastName.toLowerCase().includes(q) || d.firstName.toLowerCase().includes(q);
    const matchCountry = country === "All countries" || d.country === country;
    return matchSearch && matchCountry;
  });

  function openDrawer(donation: Donation) {
    setSelected(donation);
    setDrawerOpen(true);
  }

  return (
    <div className="px-10 py-8">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#004a99]">Donations</h1>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5">
          <p className="text-sm font-medium text-slate-600">Monthly Donations</p>
          <div className="mt-4 flex h-20 items-end gap-1">
            {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-[#004a99]/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">Column chart</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5">
          <p className="text-sm font-medium text-slate-600">Total Raised this Year</p>
          <p className="mt-4 text-3xl font-semibold text-slate-800">
            ${totalRaised.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">Need KPI visualization</p>
        </div>
      </div>

      {/* Two-column layout: table left, recent activity right */}
      <div className="mt-6 flex gap-6 items-start">

        {/* Left — filters + table */}
        <div className="min-w-0 flex-1">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-slate-500">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search donors..."
                  className={inputCls}
                />
              </div>
              <div className="w-44">
                <label className="mb-1 block text-xs text-slate-500">Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputCls}>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button
                onClick={() => { setSearch(""); setCountry("All countries"); }}
                className="pb-1 text-sm text-[#004a99] hover:underline"
              >
                Reset filters
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Last Name", "First Name", "Amount", "Date", "Country", "Purpose", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      No donations match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800">{d.lastName}</td>
                      <td className="px-4 py-3 text-slate-800">{d.firstName}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{d.amount}</td>
                      <td className="px-4 py-3 text-slate-600">{d.date}</td>
                      <td className="px-4 py-3 text-slate-600">{d.country}</td>
                      <td className="px-4 py-3 text-slate-600">{d.purpose}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openDrawer(d)}
                          className="text-[#004a99] hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — Recent Activity */}
        <div className="w-72 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-800">Recent Activity</h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {DONATIONS.slice(0, 6).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => openDrawer(d)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800">
                        {d.firstName} {d.lastName}
                      </span>
                      <span className="text-sm font-semibold text-[#004a99]">{d.amount}</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{d.purpose}</span>
                      <span className="text-xs text-slate-400">{d.date}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <DonationDetailsDrawer
        donation={selected}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-[#004a99] focus:outline-none";
