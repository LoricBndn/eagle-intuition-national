import Posts from "@/components/post/posts";
import Button from "@/components/ui/button";
import { fetchPostsNationalWeb } from "@/lib/data";

export default async function PostsHome() {
  const posts = await fetchPostsNationalWeb();

  const latestPosts = posts
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return (
    <>
      <div className="w-full">
        <Posts posts={latestPosts} />
      </div>
      <Button className="w-full mt-8" text="Ver mais publicações" link="/noticias" />
    </>
  );
}
