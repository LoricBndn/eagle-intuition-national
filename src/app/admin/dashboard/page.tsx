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
    <main className="p-6 text-base">
      <header className="flex items-center mb-6">
        <h1 className="text-title font-semibold">Dashboard</h1>
      </header>

      <p className="mb-6">Bem-vindo, {session.user?.name}!</p>

      <div className="space-y-6">
        <div>
          <h2 className="text-title font-semibold">🔵 Navegação rápida</h2>
          <p>
            No canto inferior direito, você verá uma <strong>pastilha flutuante</strong> que
            permanece visível enquanto estiver conectado. Ela permite navegar entre o <strong>site</strong> e o <strong>dashboard</strong>,
            além de oferecer a opção de <strong>logout</strong>.
          </p>
        </div>

        <div>
          <h2 className="text-title font-semibold">📂 Menu lateral</h2>
          <p>
            À esquerda, você encontrará uma <strong>barra lateral</strong> com todos os módulos que pode
            gerenciar.
          </p>
        </div>

        <div>
          <h2 className="text-title font-semibold">🎓 Formaçōes</h2>
          <p>
            Neste módulo, você verá uma <strong>tabela com todas as formações</strong>. É possível:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Adicionar, editar e excluir formações</li>
            <li>As alterações são refletidas diretamente no site</li>
            <li>
              No formulário, adicione um <strong>título</strong> e uma <strong>imagem (ícone com fundo transparente de preferência)</strong> a partir do seu computador
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-title font-semibold">📝 Posts</h2>
          <p>
            Aqui você encontra uma <strong>tabela com todos os posts</strong>, organizados por data. Existem dois tipos:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Posts para o <strong>Facebook</strong></li>
            <li>Posts para o <strong>site web</strong></li>
          </ul>
          <p>No formulário de criação ou edição, você pode:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Adicionar um <strong>título</strong> e uma <strong>descrição</strong></li>
            <li>Adicionar e remover <strong>múltiplas imagens</strong></li>
          </ul>
          <p>As mudanças são exibidas automaticamente no site e na tabela com a <strong>data atual</strong>.</p>
        </div>

        <div>
          <h2 className="text-title font-semibold">📧 Newsletter</h2>
          <p>
            Neste módulo, você verá todos os <strong>e-mails inscritos</strong> na newsletter. Você pode:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Exportar todos os e-mails em um arquivo <strong>.CSV</strong></li>
            <li>Excluir e-mails individualmente</li>
          </ul>
        </div>

        <div>
          <h2 className="text-title font-semibold">📚 ErasmusCourses</h2>
          <p>
            Neste módulo, você pode <strong>adicionar, editar ou excluir cursos</strong>. Para cada curso, informe:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Um <strong>título</strong></li>
            <li>Um <strong>link</strong> para o curso em outro site</li>
          </ul>
        </div>

        <div>
          <h2 className="text-title font-semibold">🌍 ErasmusProject</h2>
          <p>
            Aqui você pode gerenciar os <strong>projetos Erasmus</strong>. Para cada projeto, adicione:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Uma <strong>imagem</strong></li>
            <li>Um <strong>link</strong> para o site do projeto</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
