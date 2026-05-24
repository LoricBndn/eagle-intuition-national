"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages === 0) return null;

  const updatePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        onClick={() => updatePage(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="cursor-pointer flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "middle" | "single" | undefined;
          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              page={page}
              onClick={() => typeof page === "number" && updatePage(page)}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        onClick={() => updatePage(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: () => void;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    "cursor-pointer flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-[var(--color-primary)] border-[var(--color-primary)] text-white":
        isActive,
      "hover:bg-[var(--color-secondary)] text-[var(--color-title)] border-gray-300":
        !isActive && position !== "middle",
      "text-gray-400 cursor-default": position === "middle",
    }
  );

  return position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={onClick} className={className}>
      {page}
    </button>
  );
}

interface PaginationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  isDisabled: boolean;
}

function PaginationArrow({
  direction,
  onClick,
  isDisabled,
}: PaginationArrowProps) {
  const className = clsx(
    "cursor-pointer flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-[var(--color-secondary)] text-[var(--color-title)] border-gray-300":
        !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon = direction === "left" ? <ArrowLeft /> : <ArrowRight />;

  return (
    <button onClick={onClick} disabled={isDisabled} className={className}>
      {icon}
    </button>
  );
}
