"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

interface Project {
  id: number;
  href: string;
  src: string;
  alt: string;
}

interface ErasmusCarouselProps {
  projects: Project[];
}

export default function ErasmusCarousel({ projects }: ErasmusCarouselProps) {
  return (
    <div className="my-12">
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {projects.map((project) => (
          <Link href={project.href} key={project.id} className="mx-8">
            <div className="w-[300px] h-[170px] flex items-center justify-center">
              <Image
                src={project.src}
                alt={project.alt}
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
