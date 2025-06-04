"use server";


import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryPost, PrismaClient } from "@prisma/client";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { generateUniqueSlug } from "@/lib/utils";


const prisma = new PrismaClient();

const NewsletterSchema = z.object({
  email: z.string().email("A valid email is required."),
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

export type NewsletterState = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

export type ErasmusCourseState = {
  errors?: {
    title?: string[];
    description?: string[];
    pdf?: string[];
    imageUrl?: string[];
  };
  message?: string | null;
};

export type ErasmusProjectState = {
  errors?: {
    title?: string[];
    url?: string[];
    imageUrl?: string[];
  };
  message?: string | null;
};

export type PartnerState = {
  errors?: {
    title?: string[];
    url?: string[];
    imageUrl?: string[];
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
  const uploadPath = path.join(process.cwd(), "public/courses/icons", filename);

  await writeFile(uploadPath, buffer);

  const imageUrl = `/courses/icons/${filename}`;

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
    const uploadPath = path.join(process.cwd(), "public/courses/icons", filename);

    await writeFile(uploadPath, buffer);
    imageUrl = `/courses/icons/${filename}`;

    const existingCourse = await prisma.course.findUnique({ where: { id } });
    if (existingCourse?.iconUrl && existingCourse.iconUrl.startsWith("/courses/icons/")) {
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

  if (course?.iconUrl && course.iconUrl.startsWith("/courses/icons/")) {
    const imagePath = path.join(process.cwd(), "public", course.iconUrl);
    await unlink(imagePath).catch(() => {});
  }

  await prisma.course.delete({ where: { id } });

  revalidatePath("/admin/dashboard/courses");
}

// -------------------- POST --------------------

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
      const uploadPath = path.join(process.cwd(), "public/posts/images", filename);
      await writeFile(uploadPath, buffer);
      imagePaths.push(`/posts/images/${filename}`);
    }
  }

  const slug = await generateUniqueSlug(title);

  await prisma.post.create({
    data: {
      title,
      content,
      imagesUrl: imagePaths,
      category: CategoryPost.Web,
      slug,
      url: "",
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
        imagesUrl: [], // On peut retirer l'erreur ici car on autorise aucune nouvelle image
      },
    };
  }

  const existingPost = await prisma.post.findUnique({ where: { id } });
  if (!existingPost) {
    return { message: "Post not found.", errors: {} };
  }

  const newImagePaths: string[] = [];

  // Upload nouvelles images et récupérer leurs chemins
  for (const file of files) {
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${uuidv4()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/posts/images", filename);
      await writeFile(uploadPath, buffer);
      newImagePaths.push(`/posts/images/${filename}`);
    }
  }

  // On conserve les anciennes images + on ajoute les nouvelles
  const updatedImagePaths = [...existingPost.imagesUrl, ...newImagePaths];

  // Génération du slug si titre changé
  let slug = existingPost.slug;
  if (existingPost.title !== title) {
    slug = await generateUniqueSlug(title);
  }

  // Mise à jour en base
  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      imagesUrl: updatedImagePaths,
    },
  });

  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({ where: { id } });

  if (post) {
    for (const imagePath of post.imagesUrl) {
      if (imagePath.startsWith("/posts/images/")) {
        const fullPath = path.join(process.cwd(), "public", imagePath);
        await unlink(fullPath).catch(() => {});
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
  if (pdfFile && !pdfFile.name.endsWith('.pdf')) errors.pdf = ['Only PDF files are accepted.'];

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
  id: string,
  formData: FormData
): Promise<ErasmusCourseState> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const pdfFile = formData.get('pdf') as File | null;
  const imageFile = formData.get('image') as File | null;

  const errors: ErasmusCourseState['errors'] = {};

  if (!title) errors.title = ['The title is required.'];
  if (!description) errors.description = ['The description is required.'];
  if (imageFile && imageFile.size === 0) errors.imageUrl = ['Uploaded image is empty.'];
  if (pdfFile && !pdfFile.name.endsWith('.pdf')) errors.pdf = ['Only PDF files are accepted.'];

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
  if (imageFile && imageFile.size > 0) {
    // Supprimer ancienne image
    const oldImagePath = path.join(process.cwd(), 'public', existingCourse.imageUrl);
    await unlink(oldImagePath).catch(() => {});

    // Sauvegarder nouvelle image
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${uuidv4()}-${imageFile.name}`;
    const imagePath = path.join(process.cwd(), 'public/erasmus/courses/images', imageName);
    await writeFile(imagePath, imageBuffer);
    imageUrl = `/erasmus/courses/images/${imageName}`;
  }

  let pdfUrl = existingCourse.pdf;
  if (pdfFile && pdfFile.size > 0) {
    // Supprimer ancien pdf
    if (existingCourse.pdf) {
      const oldPdfPath = path.join(process.cwd(), 'public', existingCourse.pdf);
      await unlink(oldPdfPath).catch(() => {});
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
export async function deleteErasmusCourse(id: string): Promise<ErasmusCourseState> {
  const course = await prisma.erasmusCourse.findUnique({ where: { id } });
  if (!course) {
    return { message: 'Course not found.' };
  }

  // Supprimer fichiers image et pdf
  if (course.imageUrl) {
    const imagePath = path.join(process.cwd(), 'public', course.imageUrl);
    await unlink(imagePath).catch(() => {});
  }
  if (course.pdf) {
    const pdfPath = path.join(process.cwd(), 'public', course.pdf);
    await unlink(pdfPath).catch(() => {});
  }

  await prisma.erasmusCourse.delete({ where: { id } });

  revalidatePath('/admin/dashboard/erasmus-courses');
  redirect('/admin/dashboard/erasmus-courses');

  return { message: 'Erasmus course deleted successfully.' };
}


// -------------------- ERASMUS PROJECT --------------------

export async function createErasmusProject(prevState: any, formData: FormData) {
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

export async function updateErasmusProject(prevState: any, formData: FormData) {
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
      await unlink(oldPath).catch(() => {});
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
    await unlink(imagePath).catch(() => {});
  }

  await prisma.erasmusProject.delete({ where: { id } });

  revalidatePath("/admin/dashboard/erasmus-projects");
}

// -------------------- PARTNER --------------------

export async function createPartner(prevState: any, formData: FormData) {
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
  const uploadPath = path.join(process.cwd(), "public/partners/images", filename);
  await writeFile(uploadPath, buffer);

  const imageUrl = `/partners/images/${filename}`;

  await prisma.partner.create({
    data: { title, url, imageUrl },
  });

  revalidatePath("/admin/dashboard/partners");
  redirect("/admin/dashboard/partners");
}

export async function updatePartner(prevState: any, formData: FormData) {
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
    const uploadPath = path.join(process.cwd(), "public/partners/images", filename);
    await writeFile(uploadPath, buffer);
    imageUrl = `/partners/images/${filename}`;

    const existing = await prisma.partner.findUnique({ where: { id } });
    if (existing?.imageUrl?.startsWith("/partners/images/")) {
      const oldPath = path.join(process.cwd(), "public", existing.imageUrl);
      await unlink(oldPath).catch(() => {});
    }
  }

  await prisma.partner.update({
    where: { id },
    data: {
      title,
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
    await unlink(imagePath).catch(() => {});
  }

  await prisma.partner.delete({ where: { id } });

  revalidatePath("/admin/dashboard/partners");
}

// -------------------- VIDEO --------------------

export async function createVideo(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

  if (!title || !url) {
    return {
      message: "All fields are required.",
      errors: {
        title: ["Required."],
        url: ["Required."],
      },
    };
  }

  await prisma.video.create({
    data: { title, url },
  });

  revalidatePath("/admin/dashboard/videos");
  redirect("/admin/dashboard/videos");
}

export async function updateVideo(prevState: any, formData: FormData) {
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