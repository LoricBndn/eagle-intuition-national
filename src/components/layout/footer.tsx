import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/newsletter/NewsletterForm";


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
    title: "Mapa",
    items: [
      { label: "Home", href: "#" },
      { label: "Formação", href: "#formacoes" },
      { label: "Erasmus +", href: "#" },
      { label: "Notícias", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Redes Sociais",
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
        label: "Youtube",
        href: "https://www.youtube.com/channel/UCfNvmUI9Zi2EjDMDavZqA7A",
      },
    ],
  },
  {
    title: "Sede",
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
                  title === "Sede"
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
                {title === "Sede" && (
                  <li className="mt-6">
                    <p className="mb-2 text-sm font-semibold text-title">
                      Newsletter
                    </p>
                  <NewsletterForm category="national" />
                  </li>
                )}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-[#E7DAED] py-4 md:flex-row md:justify-between">
          <p className="mb-4 text-center text-base text-sm md:mb-0">
            &copy; {currentYear}{" "}
            <Link
              href="/"
              className="hover:underline"
            >
              Eagle Intution
            </Link>
            . Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link
            className="mb-4 text-center text-base text-sm md:mb-0"
              href="/politica-de-privacidade"
            >
              Política de Privacidade
            </Link>
            <Link
            className="mb-4 text-center text-base text-sm md:mb-0"
              href="/mencoes-legais"
            >
              Menções Legais
            </Link>
          </div>
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
