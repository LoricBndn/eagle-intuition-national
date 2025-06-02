import ContactForm from "@/components/contact/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacte-nos | Eagle Intuition - Centro de Formação",
  description: "Entre em contacto com a Eagle Intuition para informações, dúvidas ou apoio. Estamos aqui para ajudar com os nossos cursos e serviços.",
};

export default function Page() {
  return (
    <div className="pt-20">
      <ContactForm hn="h1" />
    </div>
  );
}
