import FirstChild from "./first-child";
import ThirdChild from "./third-child";
import SecondChild from "./second-child";

const DashboardComp = () => {
  return (
    <div className="bg-primary-50 pt-10 pb-16 ">
      <div className="w-[90%] mx-auto">
        <FirstChild />
        <SecondChild />
        <ThirdChild />
      </div>
    </div>
  );
};

export default DashboardComp;
