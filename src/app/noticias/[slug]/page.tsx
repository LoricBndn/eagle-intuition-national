import { fetchPostBySlug } from "@/lib/data";
import ZoomableImage from "@/components/ui/zoomImage";
import type { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PostPageProps
): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post non trouvé",
      description: "Le post demandé n'existe pas.",
    };
  }

  return {
    title: `Eagle Intuition`, // plus de titre du post
    description: post.content.slice(0, 160),
    openGraph: {
      title: `Eagle Intuition`,
      description: post.content.slice(0, 160),
      images: post.imagesUrl?.length
        ? [{ url: post.imagesUrl[0], alt: "Post image" }]
        : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 pt-30">
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <article className="prose max-w-none mb-10">{post.content}</article>

      {post.imagesUrl && post.imagesUrl.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {post.imagesUrl.map((imgSrc, index) => (
            <ZoomableImage
              key={index}
              src={imgSrc}
              alt={`Imagem ${index + 1}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
