import Title from "@/components/ui/title";
import ErasmusCard from "@/components/erasmus/erasmus-card";
import ErasmusCarousel from "@/components/erasmus/erasmus-carousel";
import erasmus_courses from "@/data/erasmus-courses";
import erasmus_projects from "@/data/erasmus-projects";

interface ErasmusCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ErasmusProject {
  id: number;
  href: string;
  src: string;
  alt: string;
}

export default async function Page() {
  const courses: ErasmusCourse[] = erasmus_courses;
  const projects: ErasmusProject[] = erasmus_projects;

  return (
    <div className="default-p-x py-10 pt-40">
      <Title title="Erasmus +" hn="h1"/>
      <p className="text-base mt-4 mb-12">
        Saiba mais sobre os cursos KA1 e os projectos KA2 oferecidos ao abrigo
        do programa Erasmus+. A página apresenta uma seleção de cursos
        inovadores para professores e educadores, centrados em ferramentas
        digitais, inteligência artificial, gamificação e muito mais. Encontrará
        também uma panorâmica dos projectos europeus de colaboração
        desenvolvidos com parceiros internacionais.
      </p>

      <h2 className="text-title text-3xl font-bold mb-8">
        ERASMUS+ Ka1 Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {courses.map((post, index) => (
          <ErasmusCard key={index} {...post} />
        ))}
      </div>

      <h2 className="text-title text-3xl font-bold my-8">
        ERASMUS+ Ka2 Projects
      </h2>
      <ErasmusCarousel projects={projects} />
    </div>
  );
}
