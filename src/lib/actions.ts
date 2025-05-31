"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { generateUniqueSlug } from "@/lib/utils";


const prisma = new PrismaClient();


export type CourseState = {
  errors?: {
    title?: string[];
    iconUrl?: string[];
  };
  message?: string | null;
};

export type PostState = {
  errors?: {
    title?: string[];
    content?: string[];
    imagesUrl?: string[];
  };
  message?: string | null;
};

function parseString(value: FormDataEntryValue | null): string | null {
  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }
  return null;
}

function parseStringArray(values: FormDataEntryValue[] | null): string[] {
  return (values ?? []).filter(
    (val): val is string => typeof val === "string" && val.trim() !== ""
  );
}

// -------------------- COURSE --------------------

export async function createCourse(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const iconFile = formData.get("icon") as File;

  if (!title || !iconFile) {
    return {
      message: "Title and icon image are required.",
      errors: {
        title: ["The title is required."],
        iconUrl: ["An image must be uploaded."],
      },
    };
  }

  const buffer = Buffer.from(await iconFile.arrayBuffer());
  const filename = `${uuidv4()}-${iconFile.name}`;
  const uploadPath = path.join(process.cwd(), "public/icons", filename);

  await writeFile(uploadPath, buffer);

  const imageUrl = `/icons/${filename}`;

  await prisma.course.create({
    data: {
      title,
      iconUrl: imageUrl,
    },
  });

  revalidatePath("/admin/dashboard/courses");
  redirect("/admin/dashboard/courses");
}

export async function updateCourse(
  prevState: any,
  formData: FormData
) {
  const id = formData.get("id") as string;
  const title = parseString(formData.get("title"));
  const iconFile = formData.get("icon") as File | null;

  if (!id || !title) {
    return {
      message: "Missing required fields.",
      errors: {
        title: ["The title is required."],
        iconUrl: iconFile ? [] : ["An image must be uploaded or retained."],
      },
    };
  }

  let imageUrl: string | null = null;

  if (iconFile && iconFile.size > 0) {
    const buffer = Buffer.from(await iconFile.arrayBuffer());
    const filename = `${uuidv4()}-${iconFile.name}`;
    const uploadPath = path.join(process.cwd(), "public/icons", filename);

    await writeFile(uploadPath, buffer);
    imageUrl = `/icons/${filename}`;

    const existingCourse = await prisma.course.findUnique({ where: { id } });
    if (existingCourse?.iconUrl && existingCourse.iconUrl.startsWith("/icons/")) {
      const oldPath = path.join(process.cwd(), "public", existingCourse.iconUrl);
      await unlink(oldPath).catch(() => {});
    }
  }

  await prisma.course.update({
    where: { id },
    data: {
      title,
      ...(imageUrl && { iconUrl: imageUrl }),
    },
  });

  revalidatePath("/admin/dashboard/courses");
  redirect("/admin/dashboard/courses");
}

export async function deleteCourse(id: string) {
  const course = await prisma.course.findUnique({ where: { id } });

  if (course?.iconUrl && course.iconUrl.startsWith("/icons/")) {
    const imagePath = path.join(process.cwd(), "public", course.iconUrl);
    await unlink(imagePath).catch(() => {});
  }

  await prisma.course.delete({ where: { id } });

  revalidatePath("/admin/dashboard/courses");
}

// -------------------- POSTS --------------------

export async function createPost(
  prevState: PostState,
  formData: FormData
): Promise<PostState> {
  const title = parseString(formData.get("title")) as string;
  const content = parseString(formData.get("content")) as string;
  const files = formData.getAll("images") as File[];

  const errors: PostState["errors"] = {};

  if (!title) errors.title = ["Title is required."];
  if (!content) errors.content = ["Content is required."];
  if (files.length === 0) errors.imagesUrl = ["At least one image is required."];

  if (Object.keys(errors).length > 0) {
    return { message: "Missing required fields.", errors };
  }

  const imagePaths: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${uuidv4()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/postsImg", filename);
      await writeFile(uploadPath, buffer);
      imagePaths.push(`/postsImg/${filename}`);
    }
  }

  const slug = await generateUniqueSlug(title);

  await prisma.post.create({
    data: {
      title,
      content,
      imagesUrl: imagePaths,
      category: "Web",
      slug,
    },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}


export async function updatePost(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
  const title = parseString(formData.get("title"));
  const content = parseString(formData.get("content"));
  const files = formData.getAll("images") as File[];

  if (!id || !title || !content) {
    return {
      message: "Missing required fields.",
      errors: {
        title: !title ? ["The title is required."] : [],
        content: !content ? ["The content is required."] : [],
        imagesUrl: files.length === 0 ? ["At least one image must be uploaded or retained."] : [],
      },
    };
  }

  const existingPost = await prisma.post.findUnique({ where: { id } });
  if (!existingPost) {
    return { message: "Post not found.", errors: {} };
  }

  let newImagePaths: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${uuidv4()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/postsImg", filename);
      await writeFile(uploadPath, buffer);
      newImagePaths.push(`/postsImg/${filename}`);
    }
  }

  if (newImagePaths.length > 0) {
    for (const oldPath of existingPost.imagesUrl) {
      if (oldPath.startsWith("/postsImg/")) {
        const fullPath = path.join(process.cwd(), "public", oldPath);
        await unlink(fullPath).catch(() => {});
      }
    }
  } else {
    newImagePaths = existingPost.imagesUrl;
  }

  const slug = await generateUniqueSlug(title);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      imagesUrl: newImagePaths,
    },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({ where: { id } });

  if (post) {
    for (const imagePath of post.imagesUrl) {
      if (imagePath.startsWith("/postsImg/")) {
        const fullPath = path.join(process.cwd(), "public", imagePath);
        await unlink(fullPath).catch(() => {});
      }
    }

    await prisma.post.delete({ where: { id } });
  }

  revalidatePath("/admin/dashboard/posts");
}