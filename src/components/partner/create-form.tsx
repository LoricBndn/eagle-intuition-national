"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { createPartner, PartnerState } from "@/lib/actions";
import { useActionState } from "react";
import { Edit, Link as LinkIcon } from "lucide-react";

export default function CreatePartnerForm() {
  const initialState: PartnerState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createPartner, initialState);
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
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <Edit className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Partner Name"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm"
              aria-describedby="name-error"
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* URL */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            Partner URL
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm"
              aria-describedby="url-error"
            />
          </div>
          <div id="url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.url?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Partner Image
          </label>
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
            {state.errors?.imageUrl?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
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
          link="/admin/dashboard/partners"
          className="bg-gray-100 text-gray-600 hover:bg-gray-200"
        />
        <Button text="Create Partner" type="submit" />
      </div>
    </form>
  );
}
