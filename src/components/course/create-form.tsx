'use client';

import Button from '@/components/ui/button';
import { createCourse, CourseState } from '@/lib/actions';
import { useActionState } from 'react';
import { BookOpen, Edit } from 'lucide-react';

export default function CreateCourseForm() {
  const initialState: CourseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Course Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Course Title
          </label>
          <div className="relative">
            <Edit className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Course Title"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="title-error"
            />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Icon Url */}
        <div className="mb-4">
          <label htmlFor="icon" className="mb-2 block text-sm font-medium">
            Icon Url
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="icon"
              name="iconUrl"
              type="text"
              placeholder="Icon Url"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="icon-error"
            />
          </div>
          <div id="icon-error" aria-live="polite" aria-atomic="true">
            {state.errors?.iconUrl?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Global Error */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Button text="Cancel" link="/admin/dashboard/courses" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
        <Button text="Create Course" type="submit" />
      </div>
    </form>
  );
}
