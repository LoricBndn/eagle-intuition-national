import { PrismaClient, Prisma, Category } from '@prisma/client';

const prisma = new PrismaClient();

// Users
export async function fetchUsers() {
  return await prisma.user.findMany();
}

export async function fetchUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

// Newsletters
export async function fetchNewsletters() {
  return await prisma.newsletter.findMany();
}

export async function fetchNewsletterById(id: string) {
  return await prisma.newsletter.findUnique({ where: { id } });
}

// Videos
export async function fetchVideos() {
  return await prisma.video.findMany();
}

export async function fetchVideoById(id: string) {
  return await prisma.video.findUnique({ where: { id } });
}

// Courses
export async function fetchCourses() {
  return await prisma.course.findMany();
}

export async function fetchCourseById(id: string) {
  return await prisma.course.findUnique({ where: { id } });
}

export async function fetchFilteredCourses(query: string, currentPage: number, itemsPerPage = 6) {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: itemsPerPage,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered courses.');
  }
}

export async function fetchCoursesPages(query: string, itemsPerPage = 10) {
  const where: Prisma.CourseWhereInput | undefined = query?.trim()
    ? {
            title: {
              contains: query,
              mode: 'insensitive',
            },
      }
    : undefined;

  const totalCourses = await prisma.course.count({ where });
  return Math.ceil(totalCourses / itemsPerPage);
}

// Erasmus Courses
export async function fetchErasmusCourses() {
  return await prisma.erasmusCourse.findMany();
}

export async function fetchErasmusCourseById(id: string) {
  return await prisma.erasmusCourse.findUnique({ where: { id } });
}

// Erasmus Projects
export async function fetchErasmusProjects() {
  return await prisma.erasmusProject.findMany();
}

export async function fetchErasmusProjectById(id: string) {
  return await prisma.erasmusProject.findUnique({ where: { id } });
}

// Posts
export async function fetchPosts() {
  return await prisma.post.findMany();
}

export async function fetchPostById(id: string) {
  return await prisma.post.findUnique({ where: { id } });
}

export async function fetchPostsByCategory(category: Category) {
  return await prisma.post.findMany({
    where: { category },
  });
}

export async function fetchFilteredPosts(query: string, currentPage: number, itemsPerPage = 9) {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const posts = await prisma.post.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: itemsPerPage,
    });

    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered posts.');
  }
}
