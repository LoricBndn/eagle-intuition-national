import {  PrismaClient,  } from "@prisma/client";
const prisma = new PrismaClient();

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD") // décompose les lettres accentuées en base + accent
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/[^a-z0-9\s-]/g, "") // supprime caractères non alphanumériques sauf espace et tiret
    .trim()
    .replace(/\s+/g, "-"); // remplace espaces par tirets
}

export async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let i = 1;

  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i}`;
    i++;
  }

  return slug;
}