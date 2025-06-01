import { ElementType } from "react";

interface TitleProps {
  title: string;
  className?: string;
  hn?: keyof JSX.IntrinsicElements; // 'h1' | 'h2' | etc.
}

export default function Title({ title, className = "", hn = "h2" }: TitleProps) {
  const Heading = hn as ElementType;

  return (
    <div className={`${className} flex flex-col items-start gap-1`}>
      <span className="w-[15%] h-1 bg-primary"></span>
      <Heading className="section-title">{title}</Heading>
    </div>
  );
}
