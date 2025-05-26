import postsData from "@/data/posts.js";
import Posts from "@/components/post/posts";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";

export default function Post() {
  return (
    <div className="flex flex-col items-center default-p-y gap-8">
      <Title title="Novidades" />
      <Posts posts={postsData} limit={3} />
      <Button
        className="w-full mt-8"
        text="See more posts"
        link="/noticias"
      />
    </div>
  );
}
