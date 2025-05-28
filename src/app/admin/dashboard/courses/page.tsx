import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import CourseTable from '@/components/course/course-table';
import { CreateCourse} from '@/components/course/buttons';
import { CourseSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { fetchCoursesPages } from '@/lib/data';
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
  const totalPages = await fetchCoursesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search courses..." />
        <CreateCourse />
      </div>
      <Suspense key={query + currentPage} fallback={<CourseSkeleton />}>
        <CourseTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
