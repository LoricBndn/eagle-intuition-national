import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  text?: string;
  link?: string;
  type?: "button" | "submit";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function Button({
  text,
  link,
  type = "button",
  className = "",
  children,
  onClick,
}: ButtonProps) {

  const baseClass = `${className} hover:bg-[#e3791e] text-white bg-primary cursor-pointer py-2 px-6 rounded-md flex items-center gap-2`;

  const content = children || text;

  if (link) {
    return (
      <Link href={link}>
        <button className={baseClass} type="button" onClick={onClick}>
          {content}
        </button>
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} onClick={onClick}>
      {content}
    </button>
  );
}
