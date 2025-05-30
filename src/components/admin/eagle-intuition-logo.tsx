import Image from 'next/image';

export default function EagleIntuitionLogo() {
  return (
    <Image
      src="/images/Logo_EI.png"
      alt="Eagle Intuition Logo"
      fill // pour que l'image remplisse le conteneur parent (qui doit être positionné)
      style={{ objectFit: 'cover' }} // ou 'contain' selon rendu souhaité
      sizes="(max-width: 768px) 128px, 160px" // responsive
      className="rounded-md"
    />
  );
}
