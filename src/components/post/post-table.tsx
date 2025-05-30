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
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Title</th>
                <th className="px-3 py-5 font-medium">Catégory</th>
                <th className="px-3 py-5 font-medium">Summary</th>
                <th className="px-3 py-5 font-medium">Main Image</th>
                <th className="px-3 py-5 font-medium">Date</th>
                <th className="px-3 py-5 font-medium text-right">Actions</th>
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
                      <span className="text-gray-400 text-xs">Aucune image</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {format(new Date(post.createdAt), "dd MMM yyyy", { locale: fr })}
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

          {/* Vue mobile si nécessaire */}
          {/* (optionnel à ajouter si besoin) */}
        </div>
      </div>
    </div>
  );
}
