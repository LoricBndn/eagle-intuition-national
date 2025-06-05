import Image from "next/image";
import { UpdatePost, DeletePost } from "@/components/post/buttons";
import { fetchFilteredPosts } from "@/lib/data";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default async function PostTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);

  if (!posts || posts.length === 0) {
    return <div className="mt-6 text-center text-gray-600">Não foram encontradas mensagens.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="rounded-md bg-white p-4 shadow-sm">
                <div className="flex items-center mb-2">
                  {post.imagesUrl?.[0] ? (
                    <Image
                      src={post.imagesUrl[0]}
                      alt="Imagem principal"
                      width={48}
                      height={48}
                      className="rounded-md object-cover mr-3"
                    />
                  ) : (
                    <div className="mr-3 h-12 w-12 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                      Nenhuma imagem
                    </div>
                  )}
                  <div className="flex flex-col flex-grow">
                    <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">{post.category}</p>
                  </div>
                  <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                    {format(new Date(post.createdAt), "dd MMM yyyy", { locale: pt })}
                  </div>
                </div>
                <p className="mb-3 text-sm text-gray-700 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex justify-end gap-3">
                  <UpdatePost id={post.id} />
                  <DeletePost id={post.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Título</th>
                <th className="px-3 py-5 font-medium">Categoria</th>
                <th className="px-3 py-5 font-medium">Resumo</th>
                <th className="px-3 py-5 font-medium">Imagem principal</th>
                <th className="px-3 py-5 font-medium">Data</th>
                <th className="px-3 py-5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts.map((post) => (
                <tr key={post.id} className="border-b py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{post.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">{post.category}</td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-[200px] truncate text-gray-700">
                    {post.content.slice(0, 100)}{post.content.length > 100 && "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.imagesUrl?.[0] ? (
                      <Image
                        src={post.imagesUrl[0]}
                        alt="Image principale"
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">Nenhuma imagem</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {format(new Date(post.createdAt), "dd MMM yyyy", { locale: pt })}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <UpdatePost id={post.id} />
                      <DeletePost id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
