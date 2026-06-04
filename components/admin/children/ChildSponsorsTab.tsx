import { ChildProfile } from "./types";
import { ChildTabHeader } from "./ChildTabHeader";

type Sponsor = {
  id: string;
  name: string;
  sponsorType: string;
  address: string[];
  primaryContact?: string;
  phoneNumber?: string;
  email?: string;
  startDate: string;
  status: string;
};

const sponsors: Sponsor[] = [
  {
    id: "SP23-0011",
    name: "Howard & Associates",
    sponsorType: "Business",
    address: ["1001 Tennessee Street", "Suite 400", "Anytown, IL 60131"],
    primaryContact: "Daniel Howard",
    phoneNumber: "1-312-321-7654 ext 180",
    email: "daniel.howard@howard.com",
    startDate: "2023-01-30",
    status: "Active",
  },
  {
    id: "SP20-0122",
    name: "Michelle Smith",
    sponsorType: "Individual",
    address: ["598 40th Avenue", "Apt 1212", "Anytown, CA 60265"],
    primaryContact: "",
    phoneNumber: "",
    email: "",
    startDate: "2020-12-06",
    status: "Active",
  },
];

type ChildSponsorsTabProps = {
  child: ChildProfile;
};

export default function ChildSponsorsTab({ child }: ChildSponsorsTabProps) {
  return (
    <div className="space-y-6">
      <ChildTabHeader
        child={child}
        subtitle={`Active sponsors: ${sponsors.length}`}
        actionLabel="Create sponsorship"
      />

      {sponsors.map((sponsor) => (
        <div
          key={sponsor.id}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left section */}
            <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {sponsor.name}
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-6 text-sm text-gray-700 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
                    Sponsor type
                  </p>
                  <p>{sponsor.sponsorType}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
                    Primary contact
                  </p>
                  <p>{sponsor.primaryContact || "-"}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
                    Phone number
                  </p>
                  <p>{sponsor.phoneNumber || "-"}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
                    Address
                  </p>
                  <div className="space-y-1">
                    {sponsor.address.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
                    Email
                  </p>
                  <p>{sponsor.email || "-"}</p>
                </div>
              </div>

              <button className="mt-8 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                Go to full profile
              </button>
            </div>

            {/* Right section */}
            <div className="p-6">
              <div className="space-y-3">
                <InfoRow label="ID" value={sponsor.id} />
                <InfoRow label="Sponsorship start date" value={sponsor.startDate} />
                <InfoRow
                  label="Sponsorship status"
                  value={sponsor.status}
                  valueClassName="text-green-600"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoRow({
  label,
  value,
  valueClassName = "text-gray-700",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-sm">
      <span className="font-semibold uppercase text-gray-500">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
