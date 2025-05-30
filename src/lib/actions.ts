"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const CourseSchema = z.object({
  title: z.string().min(1, "Course title is required."),
  iconUrl: z.string().url("Icon must be a valid URL."),
});

const PostSchema = z.object({
  title: z.string().min(1, "Post title is required."),
  content: z.string().min(1, "Post content is required."),
  imagesUrl: z
    .array(z.string().url("Each image must be a valid URL."))
    .min(1, "At least one image is required."),
});

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
  const data = {
    title: parseString(formData.get("title")),
    content: parseString(formData.get("content")),
    imagesUrl: parseStringArray(formData.getAll("imagesUrl")),
  };

  const validated = PostSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Missing or invalid fields in Post.",
    };
  }

  const { title, content, imagesUrl } = validated.data;

  await prisma.post.create({
    data: {
      title,
      content,
      imagesUrl,
      category: "Web",
    },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function updatePost(
  id: string,
  prevState: PostState,
  formData: FormData
): Promise<PostState> {
  const data = {
    title: parseString(formData.get("title")),
    content: parseString(formData.get("content")),
    imagesUrl: parseStringArray(formData.getAll("imagesUrl")),
  };

  const validated = PostSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Missing or invalid fields in Post.",
    };
  }

  const { title, content, imagesUrl } = validated.data;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      imagesUrl,
      category: "Web",
    },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/dashboard/posts");
}
