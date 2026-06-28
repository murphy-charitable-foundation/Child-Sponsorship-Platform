import { ReactNode } from "react";
import Image from "next/image";

const Card = ({
  num,
  text,
  icon,
}: {
  num: string;
  text: string;
  icon: ReactNode;
}) => {
  return (
    <article
      aria-label={`${text} card showing value ${num}`}
      className="bg-[#c3d7f9] rounded-3xl pt-8 pb-6 px-8 flex flex-col justify-between"
    >
      <p aria-label={`Value: ${num}`} className="text-4xl text-primary-500">
        {num}
      </p>
      <p className="text-zinc-800 py-6" aria-label={`Description: ${text}`}>
        {text}
      </p>
      <div
        aria-hidden="true"
        className="h-12 w-12 rounded-full bg-white flex items-center justify-center"
      >
        {icon}
      </div>
    </article>
  );
};

const FirstChild = () => {
  return (
    <section className="bg-[linear-gradient(86deg,var(--primary-500)_0%,_var(--primary-700)_99.7%)] text-white px-8 py-6  rounded-3xl w-full mx-auto grid grid-cols-4 gap-16">
      <article>
        <h2 className="text-xl font-semibold mb-4">Hi John</h2>
        <p className="text-3xl font-semibold mb-10">
          You have sponsored 3 children!
        </p>
        <button className="bg-white text-primary-500 px-6 py-2 rounded-lg mt-2 font-medium">
          Sponsore More
        </button>
      </article>
      <Card
        num="3"
        text="Sponsored Children"
        icon={<Image src="/dashboard/user.svg" alt="" width={28} height={28} />}
      />
      <Card
        num="$90"
        text="Sponsored Children"
        icon={
          <Image
            src="/dashboard/blue-Dollar.svg"
            alt=""
            width={28}
            height={28}
          />
        }
      />
      <Card
        num="3"
        text="Sponsored Children"
        icon={
          <Image
            src="/dashboard/blue-Calendar.svg"
            alt=""
            width={28}
            height={28}
          />
        }
      />
    </section>
  );
};

export default FirstChild;
