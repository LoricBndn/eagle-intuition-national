import Link from "next/link";
import Button from "@/components/ui/button";

interface ErasmusCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

export default function ErasmusCard({
  title,
  link = "#",
}: ErasmusCardProps) {
  return (
    <Link href={link}>
      <div className="max-w-full bg-white border border-gray-200 rounded-sm shadow-sm p-4">
        <div className="py-4 flex flex-col gap-2">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-title cursor-pointer">
            {title}
          </h3>
          <Button text="Ver mais" link={link} />
        </div>
      </div>
    </Link>
  );
}
