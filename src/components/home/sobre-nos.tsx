import Image from "next/image";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";

export default function SobreNos() {
  return (
    <div className="bg-white default-p-y w-full default-p-x flex justify-between items-center gap-8 lg:gap-16 max-lg:flex-col">
      {/* Image Section */}
      <div className="w-1/2 max-lg:w-full relative">
        <Image
          src="/images/sobrenos.png"
          alt="Sobre Nos Image"
          width={1200}
          height={675}
          className="w-full h-auto rounded-2xl"
        />
      </div>

      {/* Text Section */}
      <div className="w-1/2 max-lg:w-full relative ">
        <Title title="Sobre nós ?" />
        <p className="text-justify text-base mt-4 mb-12">
          A nossa missão é formar para um futuro melhor, jovens e
          adultos, transmitindo conhecimento, conteúdos distintos e direcionados
          à empregabilidade, atribuindo as melhores competências e certificações
          para que estes iniciem um percurso no mercado de trabalho ou obtenham
          uma boa performance na progressão das suas carreiras profissionais.
          Apresentando e disponibilizando uma metodologia inovadora baseada na
          valorização da aprendizagem e no cumprimento de metas e objetivos
          traçados.
        </p>
        <Button text="Contactos" link="/contactos" />
      </div>
    </div>
  );
}
