import { Globe } from 'lucide-react';

export default function EagleIntuitionLogo() {
  return (
    <div
      className={`flex flex-row items-center gap-2 leading-none text-white`}
    >
      <Globe className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[36px]">Eagle Intuition</p>
    </div>
  );
}
