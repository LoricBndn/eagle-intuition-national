import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
  images: { [key: string]: any }[];
  link?: string;
}

export default function PostCard({
  id,
  title,
  category,
  content,
  date,
  images,
  link = "#",
}: PostCardProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link href={link}>
        <img
          className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
          src={images[0]?.url || ""}
          alt={title}
        />
      </Link>
      <div className="p-5">
        <p className="text-sm font-semibold text-primary mb-1">{category}</p>
        <Link href={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">{content.length > 100 ? content.slice(0, 100) + "..." : content}</p>
        <p className="text-xs text-gray-500 mb-3">{date}</p>
        <Button text="Read More" link={link} />
      </div>
    </div>
  );
}
