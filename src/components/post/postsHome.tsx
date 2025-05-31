import Posts from "@/components/post/posts";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import { fetchPosts } from "@/lib/data"; // adapte le chemin selon ta structure

export default async function PostsHome() {
  // Récupère les posts depuis la BDD
  const posts = await fetchPosts();

  // Optionnel : limite à 3 posts, tri décroissant sur createdAt si besoin
  const latestPosts = posts
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col items-center default-p-y gap-8">
      <Title title="Novidades" />
      <div className="w-full">
      <Posts posts={latestPosts} limit={3} />
      </div>
      <Button className="w-full mt-8" text="See more posts" link="/noticias" />
    </div>
  );
}
