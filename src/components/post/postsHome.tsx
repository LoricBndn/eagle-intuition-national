import Posts from "@/components/post/posts";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import { fetchPostsNationalWeb } from "@/lib/data";

export default async function PostsHome() {
  const posts = await fetchPostsNationalWeb();

  const latestPosts = posts
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3)
    .reverse();

  return (
    <div  className="flex flex-col items-center default-p-y gap-8">
      <Title title="Novidades" />
      <div className="w-full">
      <Posts posts={latestPosts} limit={3} />
      </div>
      <Button className="w-full mt-8" text="See more posts" link="/noticias" />
    </div>
  );
}
