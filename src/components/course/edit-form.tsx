'use client';

import {
  BookOpen,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { updateCourse, State } from '@/lib/actions';
import { useActionState } from 'react';

export default function EditCourseForm({
  course,
}: {
  course: {
    id: string;
    title: string;
    icon: string;
    isActive: boolean;
  };
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCourseWithId = updateCourse.bind(null, course.id);
  const [state, formAction] = useActionState(updateCourseWithId, initialState);

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
            defaultValue={course.title}
            placeholder="Enter course title"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Icon Display Only */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          Current icon:
          <BookOpen className="h-5 w-5 text-gray-700" />
        </div>

        {/* Active Status */}
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
                  defaultChecked={course.isActive}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
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
                  defaultChecked={!course.isActive}
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
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/courses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button text="Save Changes" type="submit" />
      </div>
    </form>
  );
}
