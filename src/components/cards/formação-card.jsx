import Image from "next/image";

export default function FormaçãoCard({ icon, title }) {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-white rounded-xl shadow border-primary border-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-full border-primary border-2 text-white text-2xl">
        <Image src={icon} width={20} height={20} alt={title} />
      </div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
    </div>
  );
}