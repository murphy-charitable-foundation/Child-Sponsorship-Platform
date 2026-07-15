import Overview from "./overview";
import SponsoredChildren from "./sponsored-children";
import RecentActivity from "./recent-activity";

const DashboardComp = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/sponsored-children`,
    {
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
  const children = body?.children;
  const activities = body?.activities;

  return (
    <div className="bg-[--blue-50] pt-10 pb-16">
      <div className="w-[90%] mx-auto">
        <Overview {...sponsorData} />
        <SponsoredChildren
          children={children}
          childrenLastPayments={childrenLastPayments}
        />
        <RecentActivity {...activities} />
      </div>
    </div>
  );
};

export default DashboardComp;
