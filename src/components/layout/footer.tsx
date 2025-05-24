import Link from "next/link";
import Image from "next/image";

type LinkItem = {
  label: string;
  href?: string;
};

type LinkGroup = {
  title: string;
  items: LinkItem[];
};

const LINKS: LinkGroup[] = [
  {
    title: "Mapa do sítio",
    items: [
      { label: "Home", href: "#" },
      { label: "Formação", href: "#" },
      { label: "Erasmus +", href: "#" },
      { label: "Notícias", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Socials",
    items: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/CF.Eagle.Intuition",
      },
      {
        label: "Linkedin",
        href: "https://www.linkedin.com/in/eagleintuition/",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/eagleintuition/",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/intuitioneagle",
      },
      {
        label: "Youtube (1)",
        href: "https://www.youtube.com/channel/UCfNvmUI9Zi2EjDMDavZqA7A",
      },
      {
        label: "Youtube (2)",
        href: "https://www.youtube.com/channel/UCP_zOP-MIa5U71xI06KGELA",
      },
    ],
  },
  {
    title: "Head Office",
    items: [
      {
        label:
          "Rua Piteira Santos, Lote 30, Loja B 2975-333 Quinta do Conde Portugal",
      },
    ],
  },
];

const currentYear: number = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-[#E7DAED] pb-4 pt-12">
      <div className="w-full default-p-x">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-[1fr_2fr]">
          <div className="w-fit">
            <Link href={"/"}>
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={191}
                height={38}
                priority
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {LINKS.map(({ title, items }) => (
              <ul
                key={title}
                className={
                  title === "Head Office"
                    ? "md:col-span-1 sm:col-span-2 col-span-full"
                    : ""
                }
              >
                <li className="mb-3 text-sm font-semibold text-title">
                  {title}
                </li>
                {items.map(({ label, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-1.5 text-base text-sm hover:underline"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="block py-1.5 text-base text-sm">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
                {title === "Head Office" && (
                  <li className="mt-6">
                    <h4 className="mb-2 text-sm font-semibold text-title">
                      Newsletter
                    </h4>
                    <form className="flex flex-col gap-2">
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm text-white cursor-pointer"
                      >
                        S'inscrire
                      </button>
                    </form>
                  </li>
                )}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-[#E7DAED] py-4 md:flex-row md:justify-between">
          <p className="mb-4 text-center text-base text-sm md:mb-0">
            &copy; {currentYear}{" "}
            <a
              href="https://material-tailwind.com/"
              className="hover:underline"
            >
              Material Tailwind
            </a>
            . All Rights Reserved.
          </p>
          <p className="mb-4 text-center text-base text-sm md:mb-0">
            Livro de Reclamações :&nbsp;
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              className="hover:underline"
            >
              https://www.livroreclamacoes.pt/Inicio/
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
