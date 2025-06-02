"use client"
import { useState } from "react";
import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ZoomableImage({ src, alt, width = 400, height = 300 }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="cursor-pointer rounded-md object-cover"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={width * 2}  // image zoomée 2x
            height={height * 2}
            className="rounded-md object-contain "
          />
        </div>
      )}
    </>
  );
}
