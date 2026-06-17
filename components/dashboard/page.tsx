import Overview from "./overview";
import SponsoredChildren from "./sponsored-children";
import RecentActivity from "./recent-activity";

const DashboardComp = () => {
  return (
    <div className="bg-[--blue-50] pt-10 pb-16 ">
      <div className="w-[90%] mx-auto">
        <Overview />
        <SponsoredChildren />
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardComp;
