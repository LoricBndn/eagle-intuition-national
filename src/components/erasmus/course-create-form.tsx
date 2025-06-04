"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { createErasmusCourse, ErasmusCourseState } from "@/lib/actions";
import { useActionState } from "react";
import { Edit, FileText, Link } from "lucide-react";

export default function CreateErasmusCourseForm() {
  const initialState: ErasmusCourseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createErasmusCourse, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">Title</label>
          <div className="relative">
            <Edit className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Erasmus Course Title"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm"
              aria-describedby="title-error"
            />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Course description..."
            className="w-full rounded-md border border-gray-200 p-2 text-sm"
            aria-describedby="description-error"
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* PDF Upload */}
        <div className="mb-4">
          <label htmlFor="pdf" className="mb-2 block text-sm font-medium">Upload PDF</label>
          <input
            id="pdf"
            name="pdf"
            type="file"
            accept=".pdf"
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary hover:file:text-white"
            aria-describedby="pdf-error"
          />
          <div id="pdf-error" aria-live="polite" aria-atomic="true">
            {state.errors?.pdf?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">Cover Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary hover:file:text-white"
            aria-describedby="image-error"
          />
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.imageUrl?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
              <img
                src={previewUrl}
                alt="Image preview"
                className="h-32 w-auto rounded-md border border-gray-300 object-cover"
              />
            </div>
          )}
        </div>

        {/* Global Error */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Button
          text="Cancel"
          link="/admin/dashboard/erasmus-courses"
          className="bg-gray-100 text-gray-600 hover:bg-gray-200"
        />
        <Button text="Criar Erasmus Formação" type="submit" />
      </div>
    </form>
  );
}
