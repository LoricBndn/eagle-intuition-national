import Button from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-secondary w-full default-p-x flex justify-between items-center gap-16 -z-20 h-[100vh]">
      {/* Text Section */}
      <div className="lg:max-w-2xl">
        <p className="text-title text-xl font-medium mt-4">
          Centro de Formação
        </p>
        <h1 className="grand-title">Eagle Intuition</h1>
        <p className="text-base mt-4 mb-12">
          Centro de Formação certificado pela DGERT, com reconhecimento nacional
          e internacional pela excelência dos seus programas.
        </p>
        <Button text="Ver as formações" link="#formacoes" />
      </div>

      {/* Image Section */}
      <div className="max-lg:hidden w-full min-w-[300px] max-w-[600px] relative">
        <div
          className="absolute w-md bg-primary z-0 mt-10"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "calc(100vh - 80px)",
          }}
        ></div>

        <Image
            src="/images/hero.png"
            alt="Hero Image"
            width={1200}
            height={675}
            className="w-full h-auto rounded-2xl relative z-10"
            priority
        />
      </div>
    </div>
  );
}
