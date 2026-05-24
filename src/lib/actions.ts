"use server";

import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryPost } from "@prisma/client";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

const NewsletterSchema = z.object({
  email: z.string().email("A valid email is required."),
});

export type CourseState = {
  errors?: {
    title?: string[];
    icon?: string[];
  };
  message: string | null;
};

export type PostState = {
  errors?: {
    content?: string[];
    imagesUrl?: string[];
  };
  message: string | null;
};

export type NewsletterState = {
  errors?: {
    email?: string[];
  };
  message: string | null;
};

export type ErasmusCourseState = {
  errors?: {
    title?: string[];
    description?: string[];
    pdf?: string[];
    imageUrl?: string[];
  };
  message: string | null;
};

export type ErasmusProjectState = {
  errors?: {
    title?: string[];
    url?: string[];
    imageUrl?: string[];
  };
  message: string | null;
};

export type PartnerState = {
  errors?: {
    name?: string[];
    url?: string[];
    imageUrl?: string[];
  };
  message: string | null;
};

export type VideoState = {
  errors?: {
    title?: string[];
    url?: string[];
    imageUrl?: string[];
  };
  message: string | null;
};

function parseString(value: FormDataEntryValue | null): string | null {
  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }
  return null;
}

async function uploadToApi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${text}`);
  }

  const data = await res.json();
  return data.url;
}

// -------------------- COURSE --------------------

export async function createCourse(prevState: CourseState, formData: FormData): Promise<CourseState> {
  const title = formData.get("title") as string;
  const icon = formData.get("icon") as string;

  if (!title || !icon) {
    return {
      message: "Title and icon are required.",
      errors: {
        title: !title ? ["The title is required."] : [],
        icon: !icon ? ["An icon must be selected."] : [],
      },
    };
  }

  await prisma.course.create({
    data: {
      id: uuidv4(),
      title,
      icon,
    },
  });

  revalidatePath("/admin/dashboard/courses");
  redirect("/admin/dashboard/courses");
}

export async function updateCourse(prevState: CourseState, formData: FormData): Promise<CourseState> {
  const id = formData.get("id") as string;
  const title = parseString(formData.get("title"));
  const icon = formData.get("icon") as string;

  if (!id || !title) {
    return {
      message: "Missing required fields.",
      errors: {
        title: !title ? ["The title is required."] : [],
        icon: !icon ? ["An icon must be selected."] : [],
      },
    };
  }

  await prisma.course.update({
    where: { id },
    data: {
      title,
      ...(icon && { icon }),
    },
  });

  revalidatePath("/admin/dashboard/courses");
  redirect("/admin/dashboard/courses");
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/dashboard/courses");
}

// -------------------- POST --------------------

export async function createPost(prevState: PostState, formData: FormData): Promise<PostState> {
  const content = parseString(formData.get("content")) as string;
  const files = formData.getAll("images") as File[];

  const errors: PostState["errors"] = {};
  if (!content) errors.content = ["Content is required."];
  if (files.length === 0) errors.imagesUrl = ["At least one image is required."];

  if (Object.keys(errors).length > 0) {
    return { message: "Missing required fields.", errors };
  }

  const imageUrls = await Promise.all(
    files.filter(file => file && file.size > 0).map(file => uploadToApi(file))
  );

  const slug = uuidv4();

  await prisma.post.create({
    data: {
      content,
      imagesUrl: imageUrls,
      category: CategoryPost.Web,
      slug,
      url: "",
    },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function updatePost(prevState: PostState, formData: FormData): Promise<PostState> {
  const id = formData.get("id") as string;
  const content = parseString(formData.get("content"));
  const files = formData.getAll("images") as File[];

  if (!id || !content) {
    return {
      message: "Missing required fields.",
      errors: { content: !content ? ["The content is required."] : [] },
    };
  }

  const existingPost = await prisma.post.findUnique({ where: { id } });
  if (!existingPost) return { message: "Post not found.", errors: {} };

  const newImageUrls = await Promise.all(
    files.filter(file => file && file.size > 0).map(file => uploadToApi(file))
  );

  const updatedImageUrls = [...existingPost.imagesUrl, ...newImageUrls];

  await prisma.post.update({
    where: { id },
    data: { content, imagesUrl: updatedImageUrls },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({ where: { id } });

  if (post) {
    for (const url of post.imagesUrl) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images/delete`, {
          method: "POST",
          body: JSON.stringify({ publicId }),
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    await prisma.post.delete({ where: { id } });
  }

  revalidatePath("/admin/dashboard/posts");
}

// -------------------- NEWSLETTER --------------------

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email');
  const category = formData.get('category');

  const result = NewsletterSchema.safeParse({ email });

  if (!result.success) {
    return { success: false, error: result.error.format().email?._errors[0] || 'Email invalide' };
  }

  if (category !== 'National' && category !== 'International') {
    return { success: false, error: 'Catégorie invalide' };
  }

  try {
    await prisma.newsletter.upsert({
      where: { email: result.data.email },
      update: {},
      create: { email: result.data.email, category },
    });

    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Erreur newsletter:', err);
    return { success: false, error: 'Erreur serveur' };
  }
}


export async function deleteNewsletter(id: string) {
  try {
    await prisma.newsletter.delete({
      where: { id },
    });

    revalidatePath('/admin/newsletters');
  } catch (error) {
    console.error("Erreur de suppression :", error);
    throw new Error('Erreur lors de la suppression de la newsletter');
  }
}

// -------------------- ERASMUS COURSE --------------------

const BASE_URL = 'https://europe.ei.edu.pt/erasmus';

export async function createErasmusCourse(
  prevState: ErasmusCourseState,
  formData: FormData
): Promise<ErasmusCourseState> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const pdfFile = formData.get('pdf') as File | null;
  const imageFile = formData.get('image') as File | null;

  const errors: ErasmusCourseState['errors'] = {};

  if (!title) errors.title = ['The title is required.'];
  if (!description) errors.description = ['The description is required.'];
  if (!imageFile || imageFile.size === 0) errors.imageUrl = ['An image must be uploaded.'];
  if (pdfFile && pdfFile.size > 0) {
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const magicBytes = pdfBuffer.slice(0, 4).toString('hex');
    if (magicBytes !== '25504446') errors.pdf = ['Le fichier doit être un PDF valide.'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: 'Please correct the errors in the form.',
      errors,
    };
  }

  // Save image
  const imageBuffer = Buffer.from(await imageFile!.arrayBuffer());
  const imageName = `${uuidv4()}-${imageFile!.name}`;
  const imagePath = path.join(process.cwd(), 'public/erasmus/courses/images', imageName);
  await writeFile(imagePath, imageBuffer);
  const imageUrl = `/erasmus/courses/images/${imageName}`;

  // Save PDF
  let pdfUrl = '';
  if (pdfFile && pdfFile.size > 0) {
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfName = `${uuidv4()}-${pdfFile.name}`;
    const pdfPath = path.join(process.cwd(), 'public/erasmus/courses/pdfs', pdfName);
    await writeFile(pdfPath, pdfBuffer);
    pdfUrl = `/erasmus/courses/pdfs/${pdfName}`;
  }

  // Générer URL unique si nécessaire, sinon tu peux modifier cette partie
  const url = BASE_URL;

  await prisma.erasmusCourse.create({
    data: {
      title,
      description,
      pdf: pdfUrl,
      url,
      imageUrl,
    },
  });

  revalidatePath('/admin/dashboard/erasmus-courses');
  redirect('/admin/dashboard/erasmus-courses');
}

export async function updateErasmusCourse(
  prevState: ErasmusCourseState,
  formData: FormData
): Promise<ErasmusCourseState> {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const pdfFile = formData.get('pdf') as File | null;
  const imageFile = formData.get('image') as File | null;

  const errors: ErasmusCourseState['errors'] = {};

  if (!title) errors.title = ['The title is required.'];
  if (!description) errors.description = ['The description is required.'];

  if (Object.keys(errors).length > 0) {
    return {
      message: 'Please correct the errors in the form.',
      errors,
    };
  }

  // Récupérer l'ancien enregistrement pour supprimer anciens fichiers si besoin
  const existingCourse = await prisma.erasmusCourse.findUnique({ where: { id } });
  if (!existingCourse) {
    return { message: 'Course not found.' };
  }

  let imageUrl = existingCourse.imageUrl;
  if (imageFile instanceof File && imageFile.size > 0) {
    // Supprimer ancienne image
    const oldImagePath = path.join(process.cwd(), 'public', existingCourse.imageUrl);
    await unlink(oldImagePath).catch((err) => { console.error("[unlink]", err); });

    // Sauvegarder nouvelle image
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${uuidv4()}-${imageFile.name}`;
    const imagePath = path.join(process.cwd(), 'public/erasmus/courses/images', imageName);
    await writeFile(imagePath, imageBuffer);
    imageUrl = `/erasmus/courses/images/${imageName}`;
  }

  let pdfUrl = existingCourse.pdf;
  if (pdfFile instanceof File && pdfFile.size > 0) {
    // Supprimer ancien pdf
    if (existingCourse.pdf) {
      const oldPdfPath = path.join(process.cwd(), 'public', existingCourse.pdf);
      await unlink(oldPdfPath).catch((err) => { console.error("[unlink]", err); });
    }
    // Sauvegarder nouveau pdf
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfName = `${uuidv4()}-${pdfFile.name}`;
    const pdfPath = path.join(process.cwd(), 'public/erasmus/courses/pdfs', pdfName);
    await writeFile(pdfPath, pdfBuffer);
    pdfUrl = `/erasmus/courses/pdfs/${pdfName}`;
  }

  const url = BASE_URL;

  await prisma.erasmusCourse.update({
    where: { id },
    data: {
      title,
      description,
      pdf: pdfUrl,
      url,
      imageUrl,
    },
  });

  revalidatePath('/admin/dashboard/erasmus-courses');
  redirect('/admin/dashboard/erasmus-courses');
}

// Delete function
export async function deleteErasmusCourse(id: string): Promise<void> {
  const course = await prisma.erasmusCourse.findUnique({ where: { id } });
  if (!course) return;

  // Supprimer fichiers image et pdf
  if (course.imageUrl) {
    const imagePath = path.join(process.cwd(), 'public', course.imageUrl);
    await unlink(imagePath).catch((err) => { console.error("[unlink]", err); });
  }
  if (course.pdf) {
    const pdfPath = path.join(process.cwd(), 'public', course.pdf);
    await unlink(pdfPath).catch((err) => { console.error("[unlink]", err); });
  }

  await prisma.erasmusCourse.delete({ where: { id } });

  revalidatePath('/admin/dashboard/erasmus-courses');
  redirect('/admin/dashboard/erasmus-courses');
}


// -------------------- ERASMUS PROJECT --------------------

export async function createErasmusProject(prevState: ErasmusProjectState, formData: FormData): Promise<ErasmusProjectState> {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !url || !imageFile) {
    return {
      message: "All fields are required.",
      errors: {
        title: ["Required."],
        url: ["Required."],
        imageUrl: ["An image must be uploaded."],
      },
    };
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = `${uuidv4()}-${imageFile.name}`;
  const uploadPath = path.join(process.cwd(), "public/erasmus/projects/images", filename);
  await writeFile(uploadPath, buffer);

  const imageUrl = `/erasmus/projects/images/${filename}`;

  await prisma.erasmusProject.create({
    data: { title, url, imageUrl },
  });

  revalidatePath("/admin/dashboard/erasmus-projects");
  redirect("/admin/dashboard/erasmus-projects");
}

export async function updateErasmusProject(prevState: ErasmusProjectState, formData: FormData): Promise<ErasmusProjectState> {
  const id = formData.get("id") as string;
  const title = parseString(formData.get("title"));
  const url = parseString(formData.get("url"));
  const imageFile = formData.get("image") as File | null;

  if (!id || !title || !url) {
    return {
      message: "Missing required fields.",
      errors: {
        title: ["Required."],
        url: ["Required."],
        imageUrl: imageFile ? [] : ["An image must be uploaded or retained."],
      },
    };
  }

  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${uuidv4()}-${imageFile.name}`;
    const uploadPath = path.join(process.cwd(), "public/erasmus/projects/images", filename);
    await writeFile(uploadPath, buffer);
    imageUrl = `/erasmus/projects/images/${filename}`;

    const existing = await prisma.erasmusProject.findUnique({ where: { id } });
    if (existing?.imageUrl?.startsWith("/erasmus/projects/images/")) {
      const oldPath = path.join(process.cwd(), "public", existing.imageUrl);
      await unlink(oldPath).catch((err) => { console.error("[unlink]", err); });
    }
  }

  await prisma.erasmusProject.update({
    where: { id },
    data: {
      title,
      url,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/admin/dashboard/erasmus-projects");
  redirect("/admin/dashboard/erasmus-projects");
}

export async function deleteErasmusProject(id: string) {
  const project = await prisma.erasmusProject.findUnique({ where: { id } });
  if (project?.imageUrl?.startsWith("/erasmus/projects/images/")) {
    const imagePath = path.join(process.cwd(), "public", project.imageUrl);
    await unlink(imagePath).catch((err) => { console.error("[unlink]", err); });
  }

  await prisma.erasmusProject.delete({ where: { id } });

  revalidatePath("/admin/dashboard/erasmus-projects");
}

// -------------------- PARTNER --------------------

export async function createPartner(prevState: PartnerState, formData: FormData): Promise<PartnerState> {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !url || !imageFile) {
    return {
      message: "All fields are required.",
      errors: {
        name: ["Required."],
        url: ["Required."],
        imageUrl: ["An image must be uploaded."],
      },
    };
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = `${uuidv4()}-${imageFile.name}`;
  const uploadPath = path.join(process.cwd(), "public/partners/images", filename);
  await writeFile(uploadPath, buffer);

  const imageUrl = `/partners/images/${filename}`;

  await prisma.partner.create({
    data: { name, url, imageUrl },
  });

  revalidatePath("/admin/dashboard/partners");
  redirect("/admin/dashboard/partners");
}

export async function updatePartner(prevState: PartnerState, formData: FormData): Promise<PartnerState> {
  const id = formData.get("id") as string;
  const name = parseString(formData.get("name"));
  const url = parseString(formData.get("url"));
  const imageFile = formData.get("image") as File | null;

  if (!id || !name || !url) {
    return {
      message: "Missing required fields.",
      errors: {
        name: ["Required."],
        url: ["Required."],
        imageUrl: imageFile ? [] : ["An image must be uploaded or retained."],
      },
    };
  }

  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${uuidv4()}-${imageFile.name}`;
    const uploadPath = path.join(process.cwd(), "public/partners/images", filename);
    await writeFile(uploadPath, buffer);
    imageUrl = `/partners/images/${filename}`;

    const existing = await prisma.partner.findUnique({ where: { id } });
    if (existing?.imageUrl?.startsWith("/partners/images/")) {
      const oldPath = path.join(process.cwd(), "public", existing.imageUrl);
      await unlink(oldPath).catch((err) => { console.error("[unlink]", err); });
    }
  }

  await prisma.partner.update({
    where: { id },
    data: {
      name,
      url,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/admin/dashboard/partners");
  redirect("/admin/dashboard/partners");
}

export async function deletePartner(id: string) {
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (partner?.imageUrl?.startsWith("/partners/images/")) {
    const imagePath = path.join(process.cwd(), "public", partner.imageUrl);
    await unlink(imagePath).catch((err) => { console.error("[unlink]", err); });
  }

  await prisma.partner.delete({ where: { id } });

  revalidatePath("/admin/dashboard/partners");
}

// -------------------- VIDEO --------------------

export async function createVideo(prevState: VideoState, formData: FormData): Promise<VideoState> {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !url || !imageUrl) {
    return {
      message: "All fields are required.",
      errors: {
        title: !title ? ["Required."] : [],
        url: !url ? ["Required."] : [],
        imageUrl: !imageUrl ? ["Required."] : [],
      },
    };
  }

  await prisma.video.create({
    data: { title, url, imageUrl },
  });

  revalidatePath("/admin/dashboard/videos");
  redirect("/admin/dashboard/videos");
}

export async function updateVideo(prevState: VideoState, formData: FormData): Promise<VideoState> {
  const id = formData.get("id") as string;
  const title = parseString(formData.get("title"));
  const url = parseString(formData.get("url"));

  if (!id || !title || !url) {
    return {
      message: "Missing required fields.",
      errors: {
        title: ["Required."],
        url: ["Required."],
      },
    };
  }

  await prisma.video.update({
    where: { id },
    data: { title, url },
  });

  revalidatePath("/admin/dashboard/videos");
  redirect("/admin/dashboard/videos");
}

export async function deleteVideo(id: string) {
  await prisma.video.delete({ where: { id } });

  revalidatePath("/admin/dashboard/videos");
}