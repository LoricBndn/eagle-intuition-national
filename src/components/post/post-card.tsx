"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";

interface PostCardProps {
  slug: string;
  category: string;
  content: string;
  createdAt: Date;
  imagesUrl: string[];
}

export default function PostCard({
  slug,
  category,
  content,
  createdAt,
  imagesUrl,
}: PostCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link href={`/noticias/${slug}`}>
        <Image
          src={imagesUrl[0]}
          alt=""
          width={300}
          height={200}
          className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
        />
      </Link>
      <div className="p-5">
        <p className="text-sm font-semibold text-primary mb-1">{category}</p>
        <p className="mb-3 font-normal text-gray-700 whitespace-pre-line">
          {content.length > 200 ? content.slice(0, 200) + "..." : content}
        </p>
        <p className="text-xs text-gray-500 mb-3">{formattedDate}</p>
        <Button text="Ler mais" link={`/noticias/${slug}`} />
      </div>
    </div>
  );
}
