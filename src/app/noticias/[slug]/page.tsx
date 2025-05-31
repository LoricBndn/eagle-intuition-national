import { fetchPostBySlug } from "@/lib/data"; // adapte le chemin selon ton projet
import Image from "next/image";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 pt-30    ">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <article className="prose max-w-none mb-10">
        {post.content}
      </article>

      {post.imagesUrl && post.imagesUrl.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {post.imagesUrl.map((imgSrc, index) => (
            <Image
              key={index}
              src={imgSrc}
              alt={`${post.title} image ${index + 1}`}
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
          ))}
        </div>
      )}
    </main>
  );
}
