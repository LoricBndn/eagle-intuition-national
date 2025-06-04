import { Metadata } from "next";
import { Suspense } from "react";

import { fetchVideosPages } from "@/lib/data";
import Search from "@/components/ui/search";
import { VideoSkeleton } from "@/components/ui/skeletons";
import VideoTable from "@/components/video/video-table";
import Pagination from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: 'Videos',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
      const searchParams = await props.searchParams;
      const query = searchParams?.query || '';
      const currentPage = Number(searchParams?.page) || 1;
      const totalPages = await fetchVideosPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold">Videos</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              <Search placeholder="Pesquisar videos..." />
            </div>
            <Suspense key={query + currentPage} fallback={<VideoSkeleton />}>
                <VideoTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}