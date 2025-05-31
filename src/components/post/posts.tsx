"use client";

import PostCard from "@/components/post/post-card";

interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
  imagesUrl: string[];
  slug: string;
}

interface PostsProps {
  posts?: Post[];
  limit?: number;
}

export default function Posts({ posts = [], limit }: PostsProps) {
  const latestPosts = limit ? posts.slice(-limit).reverse() : [...posts];

  return (
    <div className="default-p-x">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
