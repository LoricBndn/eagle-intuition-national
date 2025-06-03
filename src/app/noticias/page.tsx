import { fetchFilteredPosts, fetchPostsPages, fetchCategories  } from "@/lib/data";
import Posts from "@/components/post/posts";
import SearchBar from "@/components/ui/search-bar";
import Pagination from "@/components/ui/pagination";
import { redirect } from "next/navigation";

const POSTS_PER_PAGE = 9;

interface SearchParams {
  query?: string;
  category?: string;
  page?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.query?.toLowerCase() || "";
  const category = params.category || "All";
  const currentPage = Number(params.page) || 1;

  if (currentPage < 1) {
    redirect("/noticias");
  }

  const allFilteredPosts = await fetchFilteredPosts(
    query,
    currentPage,
    POSTS_PER_PAGE
  );

  const filteredByCategory =
    category === "All"
      ? allFilteredPosts
      : allFilteredPosts.filter((post) => post.category === category);

  const totalPages = await fetchPostsPages(query, POSTS_PER_PAGE);

  const categoriesFromDb = await fetchCategories();
  const categories = ["All", ...categoriesFromDb];

  return (
    <div>
      <div className="bg-secondary w-full h-140 default-p-x flex flex-col justify-center items-center gap-10 -z-20">
        <span className="bg-[#FFDCC0] text-primary rounded-full px-6 py-1 font-semibold">
          Notícias
        </span>
        <h1 className="text-title text-[clamp(2.5rem,calc(2vw+1.5rem),6rem)] font-semibold">
          Recursos e insights
        </h1>
        <h2 className="text-primary text-lg">
          As últimas notícias, entrevistas, tecnologias e recursos do setor.{" "}
        </h2>

        {/* Passer les paramètres actuels au SearchBar */}
        <SearchBar
          placeholder="Search articles..."
          initialQuery={query}
          initialCategory={category}
          categories={categories}
        />
      </div>

      <div className="default-p-y" id="posts">
        <Posts posts={filteredByCategory} />
        <div className="mt-12 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
