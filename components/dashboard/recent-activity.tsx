const Card = ({
  type,
  text,
  date,
}: {
  type: string;
  text: string;
  date: string;
}) => {
  return (
    <article className="p-6 flex justify-between border-b border-[#111]/15">
      <div>
        <span
          className={`rounded-sm py-2 px-3 me-[10px] ${type === "Payment" ? "text-[--text-danger-secondary] bg-[--bg-danger-secondary]" : "text-[--blue-700] bg-[--primary-200]"}`}
        >
          {type}
        </span>
        <span className="text-lg font-medium">{text}</span>
      </div>
      <p className="text-default-700 text-lg">{date}</p>
    </article>
  );
};

const RecentActivity = () => {
  return (
    <section className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[--blue-500]">
        Recent Activity
      </h2>
      <div className="p-6 rounded-3xl bg-white text-blue-900">
        <Card type="Report" text="Monthly Report - David" date="Mar 15, 2026" />
        <Card
          type="Payment"
          text="Payment Invoice - March 2016"
          date="Apr 20, 2026"
        />
        <Card type="Report" text="Monthly Report - John" date="May 10, 2026" />
        <Card type="Report" text="Monthly Report - Alex" date="Jun 5, 2026" />
      </div>
    </section>
  );
};

export default RecentActivity;
