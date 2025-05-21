"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FormaçãoCard from "@/components/cards/formação-card";

interface FormaçãoItem {
  icon: string;
  title: string;
}

export default function Formação() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  const formacoes: FormaçãoItem[] = [
    { icon: "/icons/language.svg", title: "Cursos de Línguas" },
    { icon: "/icons/tech.svg", title: "Tecnologia & Inovação" },
    { icon: "/icons/teacher.svg", title: "Formação Pedagógica" },
    { icon: "/icons/leadership.svg", title: "Gestão e Liderança" },
    { icon: "/icons/marketing.svg", title: "Marketing Digital" },
    { icon: "/icons/accounting.svg", title: "Contabilidade" },
    { icon: "/icons/soft-skills.svg", title: "Soft Skills" },
    { icon: "/icons/web-dev.svg", title: "Desenvolvimento Web" },
    { icon: "/icons/business-language.svg", title: "Idiomas para Negócios" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % formacoes.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + formacoes.length) % formacoes.length
    );
  };

  const getVisibleItems = (): FormaçãoItem[] => {
    const items: FormaçãoItem[] = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % formacoes.length;
      items.push(formacoes[index]);
    }
    return items;
  };

  return (
    <div className="bg-secondary w-full default-p-x default-p-y flex justify-center items-center">
      <div className="max-w-6xl w-full flex items-center">
        <button
          className="w-8 h-8 rounded-full mr-4 cursor-pointer"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8 text-primary" />
        </button>
        <div
          className={`grid gap-4 w-full transition-transform duration-500 ease-in-out ${
            itemsPerPage === 1 ? "grid-cols-1" : "grid-cols-3"
          }`}
        >
          {getVisibleItems().map((item, index) => (
            <FormaçãoCard key={index} icon={item.icon} title={item.title} />
          ))}
        </div>
        <button
          className="w-8 h-8 rounded-full ml-4 cursor-pointer"
          onClick={handleNext}
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8 text-primary" />
        </button>
      </div>
    </div>
  );
}
