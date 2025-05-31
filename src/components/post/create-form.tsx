"use client";

import { useActionState } from "react";
import { createPost, PostState } from "@/lib/actions";
import Button from "@/components/ui/button";
import { Edit, ImageIcon, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export default function CreatePostForm() {
  const initialState: PostState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createPost, initialState);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Reset input value to allow uploading same file twice if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      onSubmit={(e) => {
        const dataTransfer = new DataTransfer();
        images.forEach((file) => dataTransfer.items.add(file));
        if (fileInputRef.current) fileInputRef.current.files = dataTransfer.files;
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Post Title
          </label>
          <div className="relative">
            <Edit className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Post title"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="title-error"
              required
            />
          </div>
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}
        </div>

        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            placeholder="Write the post content..."
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="content-error"
            required
          />
          {state.errors?.content?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}
        </div>

        {/* Images Upload */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">Upload Images</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="images"
              name="images"
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-2 file:text-sm file:mr-4"
              aria-describedby="images-error"
              onChange={handleFileChange}
            />
          </div>
          {state.errors?.imagesUrl?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}

          {/* Previews */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {previews.map((src, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    width={160}
                    height={100}
                    className="rounded-md object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow-md group-hover:opacity-100 opacity-80 transition"
                    aria-label="Remove image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
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
        <Button
          text="Cancel"
          link="/admin/dashboard/posts"
          className="bg-gray-100 text-gray-600 hover:bg-gray-200"
        />
        <Button text="Create Post" type="submit" />
      </div>
    </form>
  );
}