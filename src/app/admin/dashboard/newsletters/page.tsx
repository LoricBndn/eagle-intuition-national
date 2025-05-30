import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import NewsletterTable from '@/components/newsletter/newsletter-table';
import { CourseSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { fetchNewslettersPages } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
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
  const totalPages = await fetchNewslettersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Newsletters</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search email..." />
      </div>
      <Suspense key={query + currentPage} fallback={<CourseSkeleton />}>
        <NewsletterTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
