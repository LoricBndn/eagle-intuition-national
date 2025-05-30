import Image from "next/image";
import { UpdatePost, DeletePost } from "@/components/post/buttons";
import { fetchFilteredPosts } from "@/lib/data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function PostTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);

  if (!posts || posts.length === 0) {
    return <div className="mt-6 text-center text-gray-600">Aucun post trouvé.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {posts.map((post) => (
              <div key={post.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h2 className="text-base font-medium">{post.title}</h2>
                    <p className="text-sm text-gray-500">{post.category}</p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(post.createdAt), "PPP", { locale: fr })}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePost id={post.id} />
                    <DeletePost id={post.id} />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.content}</p>
                {post.imagesUrl.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {post.imagesUrl.map((url, idx) => (
                      <Image key={idx} src={url} alt="post image" width={64} height={64} className="rounded-md" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Titre</th>
                <th className="px-3 py-5 font-medium">Catégorie</th>
                <th className="px-3 py-5 font-medium">Résumé</th>
                <th className="px-3 py-5 font-medium">Image principale</th>
                <th className="px-3 py-5 font-medium">Date</th>
                <th className="px-6 py-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts.map((post) => (
                <tr key={post.id} className="border-b py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{post.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">{post.category}</td>
                  <td className="max-w-xs truncate px-3 py-3">
                    {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
                  </td>
                  <td className="px-3 py-3">
                    {post.imagesUrl.length > 0 && (
                      <Image
                        src={post.imagesUrl[0]}
                        alt="Image principale"
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                    {format(new Date(post.createdAt), "PPP", { locale: fr })}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-6 text-right">
                    <div className="flex justify-end gap-3">
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
