import { fetchPostBySlug } from "@/lib/data";
import ZoomableImage from "@/components/ui/zoomImage";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function postTitle(content: string) {
  const firstLine = content.split("\n")[0].trim();
  return firstLine.length > 70 ? firstLine.slice(0, 70) + "…" : firstLine;
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const params = await props.params;
  const post = await fetchPostBySlug(params.slug);

  if (!post) return { title: "Publicação não encontrada" };

  const title = postTitle(post.content);
  const description = post.content.slice(0, 160);
  const image = post.imagesUrl?.[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: image ? [{ url: image, alt: title }] : undefined,
    },
  };
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const { slug } = params;
  const post = await fetchPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="max-w-4xl mx-auto p-6 pt-30">
      <Link
        href="/noticias"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Notícias
      </Link>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.createdAt).toLocaleDateString("pt-PT", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <article className="prose max-w-none mb-10 leading-relaxed">
        {post.content
          .split(/\n{2,}/)
          .map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line mb-4">
              {paragraph.trim()}
            </p>
          ))}
      </article>
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
