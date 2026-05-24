"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import { updatePost, PostState } from "@/lib/actions";
import { useActionState } from "react";

export default function EditPostForm({
  post,
}: {
  post: {
    id: string;
    content: string;
    imagesUrl: string[];
  };
}) {
  const initialState: PostState = { message: null, errors: {} };
  const [state, formAction] = useActionState(updatePost, initialState);
  const [previews, setPreviews] = useState<string[]>(post.imagesUrl || []);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  return (
    <form action={formAction} encType="multipart/form-data">
      <input type="hidden" name="id" value={post.id} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={post.content}
            rows={4}
            placeholder="Edit post content..."
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="content-error"
          />
          {state.errors?.content?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>

        {/* Images */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">
            Upload new images (optional)
          </label>
          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm"
          />
          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {previews.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  width={160}
                  height={100}
                  className="rounded-md object-cover border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Global error */}
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/posts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button text="Save Changes" type="submit" />
      </div>
    </form>
  );
}
