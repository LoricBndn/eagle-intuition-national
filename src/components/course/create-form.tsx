'use client';

import {
  BookOpen,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { createCourse, State } from '@/lib/actions';
import { useActionState } from 'react';

export default function CreateCourseForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);

  return (
    <form action={formAction}>
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
            placeholder="Enter course title"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Icon Name */}
        <div className="mb-4">
          <label htmlFor="icon" className="mb-2 block text-sm font-medium">
            Icon (Lucide name)
          </label>
          <input
            id="icon"
            name="icon"
            type="text"
            placeholder="e.g., BookOpen"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="icon-error"
          />
          <div id="icon-error" aria-live="polite" aria-atomic="true">
            {state.errors?.icon?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Course Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Course Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="isActive"
                  type="radio"
                  value="true"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                  defaultChecked
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  Active <CheckCircle className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="isActive"
                  type="radio"
                  value="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="inactive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  Inactive <XCircle className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.isActive?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* Global Error */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Button text="Cancel" link="/dashboard/courses" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
        <Button text="Create Course" type="submit" />
      </div>
    </form>
  );
}
