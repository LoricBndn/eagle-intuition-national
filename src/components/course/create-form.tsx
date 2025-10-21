"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { createCourse, CourseState } from "@/lib/actions";
import { useActionState } from "react";
import { Edit } from "lucide-react";
import { IconPickerDialog } from "@/components/ui/icon-picker-dialog";
import { IconRenderer } from "@/components/ui/icon-picker";

export default function CreateCourseForm() {
  const initialState: CourseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Course Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Course Title
          </label>
          <div className="relative">
            <Edit
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Course Title"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="title-error"
              required
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

        {/* Icon Picker */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Select Icon</label>

          <input type="hidden" name="icon" value={selectedIcon ?? ""} />

          <IconPickerDialog
            onIconSelect={(icon) => setSelectedIcon(icon)}
            selectedIcon={selectedIcon}
          />

          {selectedIcon && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span>Selected icon:</span>
              <IconRenderer icon={selectedIcon} className="size-6 text-primary" />
            </div>
          )}
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
        <Button
          text="Cancel"
          link="/admin/dashboard/courses"
          className="bg-gray-100 text-gray-600 hover:bg-gray-200"
        />
        <Button text="Create Course" type="submit" />
      </div>
    </form>
  );
}
