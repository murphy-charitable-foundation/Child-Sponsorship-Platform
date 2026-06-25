import Image from "next/image";

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={icon} width={20} height={20} alt="" aria-hidden="true" />
      <h3 className="text-2xl font-semibold leading-8 text-[--zinc-900]">
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
