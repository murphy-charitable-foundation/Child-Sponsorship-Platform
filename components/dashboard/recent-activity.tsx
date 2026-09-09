import Image from "next/image";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

type Payment = [string, string];

type RecentActivityProps = {
  payments?: Payment[];
  sponsorName: string;
  type: "Payment" | "Report";
};

const formatDate = (date?: string) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const RecentActivity = ({
  payments = [],
  sponsorName,
  type,
}: RecentActivityProps) => {
  return (
    <section className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[--blue-500]">
        Recent Activity
      </h2>

      <div className="p-6 rounded-3xl bg-white text-blue-900">
        {payments?.length === 0 ? (
          <p className="text-zinc-600">
            No recent payments or reports to display.
          </p>
        ) : (
          payments.map(([date, frequency], index) => {
            return (
              <article
                key={index}
                className="p-6 flex justify-between border-b border-[#111]/15 last:border-b-0"
              >
                <div>
                  <span
                    className={`rounded-sm py-2 px-3 me-[10px] ${type === "Payment" ? "text-[--text-danger-secondary] bg-[--bg-danger-secondary]" : "text-[--blue-700] bg-[--primary-200]"}`}
                  >
                    {type}
                  </span>
                  <span className="text-lg font-medium">
                    {`${capitalize(frequency)} Report - ${sponsorName}`}
                  </span>
                </div>
                <p className="text-default-700 text-lg">{formatDate(date)}</p>
              </article>
            );
          })
        )}
      </div>

      <Card className="p-6 flex flex-row justify-between items-center bg-white rounded-md mt-10">
        <div>
          <p className="text-2xl leading-8 font-semibold text-[--zic-900] mb-2">
            Settings
          </p>
          <p className="text-[--zinc-800]">
            Manage your account preferences and settings
          </p>
        </div>
        <Button
          variant="secondary"
          className="px-6 py-5 font-bold rounded-md"
          size="lg"
        >
          <Image src="/dashboard/settings.svg" width={16} height={16} alt="" />
          <span>Go to Settings</span>
        </Button>
      </Card>
    </section>
  );
};

export default RecentActivity;
