"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";
import { updateCourse, CourseState } from "@/lib/actions";
import { useActionState } from "react";

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
  const [state, formAction] = useActionState(updateCourse, initialState);
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

        {/* Icon Upload */}
        <div className="mb-4">
          <label htmlFor="icon" className="mb-2 block text-sm font-medium">
            Upload New Icon Image
          </label>
          <input
            id="icon"
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
            {state.errors?.iconUrl?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>

          {/* Image preview */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                width={300}
                height={200}
                unoptimized // important ici car c'est une Data URL
                className="h-32 w-auto rounded-md border border-gray-300 object-cover"
              />
            ) : (
              <Image
                src={course.iconUrl}
                alt={course.title}
                width={300}
                height={200}
                className="rounded-md border border-gray-300 object-cover"
              />
            )}
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
