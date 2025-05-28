"use client"

import { useSearchParams } from "next/navigation";
import postsData from "@/data/posts";
import Posts from "@/components/post/posts";
import SearchBar from "@/components/ui/search-bar";
import Pagination from "@/components/ui/pagination";

const POSTS_PER_PAGE = 9;

interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  imagesUrl: string[];
}

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";

  const filteredPosts = (postsData as Post[]).filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query);
    const matchesCategory = category === "All" || post.category === category;
    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div>
      <div className="bg-secondary w-full h-140 default-p-x flex flex-col justify-center items-center gap-10 -z-20">
        <span className="bg-[#FFDCC0] text-primary rounded-full px-6 py-1 font-semibold">
          Notícias
        </span>
        <h1 className="text-title text-[clamp(2.5rem,calc(2vw+1.5rem),6rem)] font-semibold">
          Resources and insights
        </h1>
        <h3 className="text-primary text-lg ">
          The latest industry news, interviews, technologies, and resources.
        </h3>
        <SearchBar placeholder="Search articles..." />
      </div>

      <div className="default-p-y" id="posts">
        <Posts posts={currentPosts} />
        <div className="mt-12 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
