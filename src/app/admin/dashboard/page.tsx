import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  robots: "noindex, nofollow",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <main className="p-8 max-w-5xl mx-auto text-gray-800">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-primary tracking-wide">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Bem-vindo, <span className="font-semibold">{session.user?.name}</span>!</p>
      </header>

      <section className="space-y-8">
        {/* Carte de navigation rapide */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">🔵 Navegação rápida</h2>
          <p className="leading-relaxed text-gray-700">
            No canto inferior direito, você verá uma <strong>pastilha flutuante</strong> que permanece visível enquanto estiver conectado.
            Ela permite navegar entre o <strong>site</strong> e o <strong>dashboard</strong>, além de oferecer a opção de <strong>logout</strong>.
          </p>
        </article>

        {/* Menu lateral */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">📂 Menu lateral</h2>
          <p className="leading-relaxed text-gray-700">
            À esquerda, você encontrará uma <strong>barra lateral</strong> com todos os módulos que pode gerenciar.
          </p>
        </article>

        {/* Formaçōes */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">🎓 Formaçōes</h2>
          <p className="leading-relaxed text-gray-700 mb-3">
            Neste módulo, você verá uma <strong>tabela com todas as formações</strong>. É possível:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Adicionar, editar e excluir formações</li>
            <li>As alterações são refletidas diretamente no site</li>
            <li>
              No formulário, adicione um <strong>título</strong> e uma <strong>imagem (ícone com fundo transparente de preferência)</strong> a partir do seu computador
            </li>
          </ul>
        </article>

        {/* Posts */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">📝 Posts</h2>
          <p className="leading-relaxed text-gray-700 mb-3">
            Aqui você encontra uma <strong>tabela com todos os posts</strong>, organizados por data. Existem dois tipos:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700 mb-3">
            <li>Posts para o <strong>Facebook</strong></li>
            <li>Posts para o <strong>site web</strong></li>
          </ul>
          <p className="leading-relaxed text-gray-700 mb-2">No formulário de criação ou edição, você pode:</p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Adicionar um <strong>título</strong> e uma <strong>descrição</strong></li>
            <li>Adicionar e remover <strong>múltiplas imagens</strong></li>
          </ul>
          <p className="mt-3 text-gray-600 italic">
            As mudanças são exibidas automaticamente no site e na tabela com a <strong>data atual</strong>.
          </p>
        </article>

        {/* Newsletter */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">📧 Newsletter</h2>
          <p className="leading-relaxed text-gray-700 mb-3">
            Neste módulo, você verá todos os <strong>e-mails inscritos</strong> na newsletter. Você pode:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Exportar todos os e-mails em um arquivo <strong>.CSV</strong></li>
            <li>Excluir e-mails individualmente</li>
          </ul>
        </article>

        {/* ErasmusCourses */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">📚 Erasmus Courses</h2>
          <p className="leading-relaxed text-gray-700 mb-3">
            Neste módulo, você pode <strong>adicionar, editar ou excluir cursos</strong>. Para cada curso, informe:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Um <strong>título</strong></li>
            <li>Um <strong>link</strong> para o curso em outro site</li>
          </ul>
        </article>

        {/* ErasmusProject */}
        <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-primary mb-3">🌍 Erasmus Project</h2>
          <p className="leading-relaxed text-gray-700 mb-3">
            Aqui você pode gerenciar os <strong>projetos Erasmus</strong>. Para cada projeto, adicione:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Uma <strong>imagem</strong></li>
            <li>Um <strong>link</strong> para o site do projeto</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
