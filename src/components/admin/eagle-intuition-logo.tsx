import Image from 'next/image';

export default function EagleIntuitionLogo() {
  return (
    <Image
      src="/images/Logo_EI.png"
      alt="Eagle Intuition Logo"
      fill
      style={{ objectFit: 'cover' }}
      sizes="(max-width: 768px) 128px, 160px"
      className="rounded-md"
    />
  );
}
