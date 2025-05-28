import { Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteCourse } from '@/lib/actions';

export function CreateCourse() {
  return (
    <Link
      href="/admin/dashboard/courses/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Course</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCourse({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/courses/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteCourse({ id }: { id: string }) {
  const deleteCourseWithId = deleteCourse.bind(null, id);
  
  return (
    <form action={deleteCourseWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}
