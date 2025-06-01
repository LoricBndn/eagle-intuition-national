import Link from "next/link";

interface ButtonProps {
  text: string;
  link?: string;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({ text, link, type = 'button', className = '' }: ButtonProps) {
  const baseClass = `${className} hover:bg-orange-500 text-white bg-primary cursor-pointer py-2 px-6 rounded-md`;

  if (link) {
    return (
      <Link href={link}>
        <button className={baseClass} type="button">
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass}>
      {text}
    </button>
  );
}

