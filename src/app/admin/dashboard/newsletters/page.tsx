import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import NewsletterTable from "@/components/newsletter/newsletter-table";
import { NewsletterSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { fetchNewslettersPages } from "@/lib/data";
import { Metadata } from "next";
import ExportCSVButton from "@/components/newsletter/export-button";

export const metadata: Metadata = {
  title: "Newsletters",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const params = await searchParams;
  const query = params ?.query || "";
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchNewslettersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Newsletters</h1>
        <ExportCSVButton />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar e-mail..." />
      </div>
      <Suspense key={query + currentPage} fallback={<NewsletterSkeleton />}>
        <NewsletterTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
