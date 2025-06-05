"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

interface ErasmusProject {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  imageUrl: string;
}

interface ErasmusCarouselProps {
  projects: ErasmusProject[];
}

export default function ErasmusCarousel({ projects }: ErasmusCarouselProps) {
  return (
    <div className="my-12">
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {projects.map((project) => (
          <Link href={project.url} key={project.id} className="mx-8">
            <div className="w-[300px] h-[170px] flex items-center justify-center">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
