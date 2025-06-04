import { Metadata } from "next";
import { Suspense } from "react";

import { fetchErasmusCoursesPages } from "@/lib/data";
import Search from "@/components/ui/search";
import { CreateErasmusCourse } from "@/components/erasmus/buttons";
import { ErasmusCourseSkeleton } from "@/components/ui/skeletons";
import ErasmusCourseTable from "@/components/erasmus/erasmus-course-table";
import Pagination from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Erasmus Courses",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchErasmusCoursesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Erasmus Courses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar courses..." />
        <CreateErasmusCourse />
      </div>
      <Suspense key={query + currentPage} fallback={<ErasmusCourseSkeleton />}>
        <ErasmusCourseTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
