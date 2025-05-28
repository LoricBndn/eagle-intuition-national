'use client';

import Link from 'next/link';
import Button from '@/components/ui/button';
import { updateCourse, CourseState } from '@/lib/actions';
import { useActionState } from 'react';

export default function EditCourseForm({
  course,
}: {
  course: {
    id: string;
    title: string;
    iconUrl: string;
  };
}) {
  const initialState: CourseState = { message: null, errors: {} };
  const updateCourseWithId = updateCourse.bind(null, course.id);
  const [state, formAction] = useActionState(updateCourseWithId, initialState);

  return (
    <form action={formAction}>
      {/* ID caché si utile côté backend */}
      <input type="hidden" name="id" value={course.id} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Course Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Course Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={course.title}
            placeholder="Enter course title"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Icon URL input (obligatoire côté backend) */}
        <div className="mb-4">
          <label htmlFor="iconUrl" className="mb-2 block text-sm font-medium">
            Icon URL
          </label>
          <input
            id="iconUrl"
            name="iconUrl"
            type="text"
            defaultValue={course.iconUrl}
            placeholder="https://example.com/icon.svg"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="iconUrl-error"
          />
          <div id="iconUrl-error" aria-live="polite" aria-atomic="true">
            {state.errors?.iconUrl?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Affichage visuel de l'icône (optionnel) */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          Current icon preview:
          {/* Ici tu peux charger dynamiquement l'image via URL */}
          <img src={course.iconUrl} alt="Current icon" className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/courses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button text="Save Changes" type="submit" />
      </div>
    </form>
  );
}
