'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CourseSchema = z.object({
  title: z.string().min(1, 'Course title is required.'),
  iconUrl: z.string().url('Icon must be a valid URL.'),
});

const PostSchema = z.object({
  title: z.string().min(1, 'Post title is required.'),
  content: z.string().min(1, 'Post content is required.'),
  imagesUrl: z
    .array(z.string().url('Each image must be a valid URL.'))
    .min(1, 'At least one image is required.'),
});

function parseString(value: FormDataEntryValue | null): string | null {
  if (typeof value === 'string' && value.trim() !== '') {
    return value;
  }
  return null;
}

function parseStringArray(values: FormDataEntryValue[] | null): string[] {
  return (values ?? []).filter(
    (val): val is string => typeof val === 'string' && val.trim() !== ''
  );
}

export async function createCourse(formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    iconUrl: parseString(formData.get('iconUrl')),
  };

  const validated = CourseSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Course.',
    };
  }

  const { title, iconUrl } = validated.data;

  await prisma.course.create({
    data: {
      title,
      iconUrl,
    },
  });

  revalidatePath('/admin/dashboard/courses');
  redirect('/admin/dashboard/courses');
}

export async function updateCourse(id: string, formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    iconUrl: parseString(formData.get('iconUrl')),
  };

  const validated = CourseSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Course.',
    };
  }

  const { title, iconUrl } = validated.data;

  await prisma.course.update({
    where: { id },
    data: {
      title,
      iconUrl,
    },
  });

  revalidatePath('/admin/dashboard/courses');
  redirect('/admin/dashboard/courses');
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath('/admin/dashboard/courses');
}

// -------------------- POSTS --------------------

export async function createPost(formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    content: parseString(formData.get('content')),
    imagesUrl: parseStringArray(formData.getAll('imagesUrl')),
  };

  const validated = PostSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Post.',
    };
  }

  const { title, content, imagesUrl } = validated.data;

  await prisma.post.create({
    data: {
      title,
      content,
      imagesUrl,
      category: 'Web',
    },
  });

  revalidatePath('/admin/dashboard/posts');
  redirect('/admin/dashboard/posts');
}

export async function updatePost(id: string, formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    content: parseString(formData.get('content')),
    imagesUrl: parseStringArray(formData.getAll('imagesUrl')),
  };

  const validated = PostSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Post.',
    };
  }

  const { title, content, imagesUrl } = validated.data;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      imagesUrl,
      category: 'Web',
    },
  });

  revalidatePath('/admin/dashboard/posts');
  redirect('/admin/dashboard/posts');
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath('/admin/dashboard/posts');
}