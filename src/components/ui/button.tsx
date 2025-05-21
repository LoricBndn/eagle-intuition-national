import Link from "next/link";

interface ButtonProps {
  text: string;
  link: string;
  className?: string;
}

export default function Button({ text, link, className = "" }: ButtonProps) {
  return (
    <Link href={link}>
      <button className={`${className} text-white bg-primary cursor-pointer py-2 px-6 rounded-md`}>
        {text}
      </button>
    </Link>
  );
}
