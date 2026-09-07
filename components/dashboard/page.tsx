import { cookies } from "next/headers";

import Overview from "./overview";
import SponsoredChildren from "./sponsored-children";
import RecentActivity from "./recent-activity";

const DashboardComp = async () => {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/sponsored-children`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const body = await res.json();

  const sponsorData = {
    ...body?.sponsorData,
    children: body?.children?.length,
  };
  const childrenLastPayments = body?.childrenLastPayments;
  const sponsoredChildren = body?.children;
  const activities = body?.activities;

  return (
    <div className="bg-[--blue-50] pt-10 pb-16">
      <div className="w-[90%] mx-auto">
        <Overview {...sponsorData} />
        <SponsoredChildren
          sponsoredChildren={sponsoredChildren}
          childrenLastPayments={childrenLastPayments}
        />
        <RecentActivity {...activities} />
      </div>
    </div>
  );
};

export default DashboardComp;
