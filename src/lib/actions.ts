'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CourseSchema = z.object({
  title: z.string().min(1, 'Course title is required.'),
  description: z.string().min(1, 'Course description is required.'),
  active: z.boolean(),
  iconId: z.string().uuid('iconId must be a valid UUID'),
});

const PostSchema = z.object({
  title: z.string().min(1, 'Post title is required.'),
  content: z.string().min(1, 'Post content is required.'),
});

function parseBoolean(value: FormDataEntryValue | null): boolean {
  if (typeof value === 'string') {
    return value === 'true' || value === 'on';
  }
  return false;
}

function parseString(value: FormDataEntryValue | null): string | null {
  if (typeof value === 'string' && value.trim() !== '') {
    return value;
  }
  return null;
}

export async function createCourse(formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    description: parseString(formData.get('description')),
    active: parseBoolean(formData.get('active')),
    iconId: parseString(formData.get('iconId')),
  };

  const validated = CourseSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Course.',
    };
  }

  const { title, description, active, iconId } = validated.data;

  await prisma.course.create({
    data: {
      title,
      description,
      active,
      iconId,
    },
  });

  revalidatePath('/admin/dashboard/courses');
  redirect('/admin/dashboard/courses');
}

export async function updateCourse(id: string, formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    description: parseString(formData.get('description')),
    active: parseBoolean(formData.get('active')),
    iconId: parseString(formData.get('iconId')),
  };

  const validated = CourseSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Course.',
    };
  }

  const { title, description, active, iconId } = validated.data;

  await prisma.course.update({
    where: { id },
    data: {
      title,
      description,
      active,
      iconId,
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
  };

  const validated = PostSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Post.',
    };
  }

  const { title, content } = validated.data;

  await prisma.post.create({
    data: {
      title,
      content,
      category: 'Web',  // majuscule pour l'enum
    },
  });

  revalidatePath('/admin/dashboard/posts');
  redirect('/admin/dashboard/posts');
}

export async function updatePost(id: string, formData: FormData) {
  const data = {
    title: parseString(formData.get('title')),
    content: parseString(formData.get('content')),
  };

  const validated = PostSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing or invalid fields in Post.',
    };
  }

  const { title, content } = validated.data;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
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