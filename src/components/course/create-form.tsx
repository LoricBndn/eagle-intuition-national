"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { createCourse, CourseState } from "@/lib/actions";
import { useActionState } from "react";
import { Edit } from "lucide-react";

export default function CreateCourseForm() {
  const initialState: CourseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

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

        {/* Icon Upload */}
        <div className="mb-4">
          <label htmlFor="iconUrl" className="mb-2 block text-sm font-medium">
            Upload Icon Image
          </label>
          <input
            id="iconUrl"
            name="icon"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:rounded-md file:border-0
              file:bg-secondary file:px-4 file:py-2
              file:text-sm file:font-semibold
              file:text-primary hover:file:bg-primary hover:file:text-white"
            aria-describedby="icon-error"
          />
          <div id="icon-error" aria-live="polite" aria-atomic="true">
            {state.errors?.iconUrl?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Image preview */}
          {previewUrl && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
              <img
                src={previewUrl}
                alt="Selected preview"
                className="h-32 w-auto rounded-md border border-gray-300 object-cover"
              />
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
