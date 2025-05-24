import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ErasmusCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

export default function ErasmusCard({
  image,
  title,
  description,
  link = "#",
}: ErasmusCardProps) {
  return (
    <div className="max-w-full bg-white border border-gray-200 rounded-sm shadow-sm p-4">
      <Link href={link} passHref>
          <div className="relative w-full h-48 cursor-pointer rounded-sm overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover'}}
              priority={false}
            />
          </div>
      </Link>
      <div className="py-4 flex flex-col gap-2">
        <Link href={link}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-title cursor-pointer">
              {title}
            </h5>
        </Link>
        <p className="mb-3 font-normal text-base">{description}</p>
        <Button text="Read More" link={link} />
      </div>
    </div>
  );
}
