"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/course/course-card";

interface CourseItem {
  id: string;
  title: string;
  icon: string;
}

export default function Course({ items }: { items: CourseItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getVisibleItems = (): CourseItem[] => {
    if (items.length === 0) return [];
    const visible: CourseItem[] = [];
    const count = Math.min(itemsPerPage, items.length);
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % items.length;
      visible.push(items[index]);
    }
    return visible;
  };

  if (items.length === 0) {
    return (
      <div className="bg-secondary w-full px-0 xl:px-40 default-p-y flex justify-center items-center">
        <div className="max-w-6xl w-full flex justify-center">
          <CourseCard
            icon="/icons/ban.svg"
            title="Lista de formações disponíveis: Brevemente"
          />
        </div>
      </div>
    );
  }

  const visibleItems = getVisibleItems();
  const gridColsClass =
    visibleItems.length === 1
      ? "grid-cols-1 justify-center"
      : visibleItems.length === 2
      ? "grid-cols-2 justify-center"
      : "grid-cols-3";

  const showArrows = items.length >= 4;

  return (
    <div className="bg-secondary w-full px-0 xl:px-40 default-p-y flex justify-center items-center">
      <div className="max-w-6xl w-full flex items-center">
        {showArrows && (
          <button
            className="w-8 h-8 rounded-full mr-4 cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 text-primary" />
          </button>
        )}
        <div
          className={`grid gap-4 w-full transition-transform duration-500 ease-in-out ${gridColsClass}`}
        >
          {visibleItems.map((item, index) => (
            <CourseCard key={index} icon={item.icon} title={item.title} />
          ))}
        </div>
        {showArrows && (
          <button
            className="w-8 h-8 rounded-full ml-4 cursor-pointer"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}
