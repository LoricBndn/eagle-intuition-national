import { Prisma, CategoryPost } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// -------------------- COURSES --------------------

export async function fetchCourses() {
  return await prisma.course.findMany();
}

export async function fetchCourseById(id: string) {
  return await prisma.course.findUnique({ where: { id } });
}

export async function fetchFilteredCourses(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.course.findMany({
    where: query?.trim()
      ? { title: { contains: query, mode: "insensitive" } }
      : {},
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchCoursesPages(query: string, itemsPerPage = 8) {
  const where: Prisma.CourseWhereInput | undefined = query?.trim()
    ? { title: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.course.count({ where });
  return Math.ceil(total / itemsPerPage);
}

// -------------------- POSTS --------------------

export async function fetchPosts() {
  return await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
}

export async function fetchPostsNational() {
  return await prisma.post.findMany({
    where: { category: CategoryPost.National },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPostsInternational() {
  return await prisma.post.findMany({
    where: { category: CategoryPost.International },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPostsNationalWeb() {
  return await prisma.post.findMany({
    where: { category: { in: [CategoryPost.National, CategoryPost.Web] } },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPostsInternationalWeb() {
  return await prisma.post.findMany({
    where: { category: { in: [CategoryPost.International, CategoryPost.Web] } },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPostById(id: string) {
  return await prisma.post.findUnique({ where: { id } });
}

export async function fetchPostBySlug(slug: string) {
  return await prisma.post.findUnique({ where: { slug } });
}

export async function fetchPostsByCategory(category: CategoryPost) {
  return await prisma.post.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPostsPages(query: string, itemsPerPage = 8) {
  const where: Prisma.PostWhereInput | undefined = query?.trim()
    ? { content: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesNational(query: string, itemsPerPage = 8) {
  const where: Prisma.PostWhereInput = {
    category: CategoryPost.National,
    ...(query?.trim() && { title: { contains: query, mode: "insensitive" } }),
  };
  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesInternational(query: string, itemsPerPage = 8) {
  const where: Prisma.PostWhereInput = {
    category: CategoryPost.International,
    ...(query?.trim() && { title: { contains: query, mode: "insensitive" } }),
  };
  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesNationalWeb(
  query: string,
  category: string,
  itemsPerPage = 8
) {
  const where: Prisma.PostWhereInput = {
    category:
      category === "Todos"
        ? { in: [CategoryPost.National, CategoryPost.Web] }
        : category === "Web"
        ? CategoryPost.Web
        : CategoryPost.National,
    ...(query?.trim() && { content: { contains: query, mode: "insensitive" } }),
  };
  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesInternationalWeb(query: string, itemsPerPage = 8) {
  const where: Prisma.PostWhereInput = {
    category: { in: [CategoryPost.International, CategoryPost.Web] },
    ...(query?.trim() && { title: { contains: query, mode: "insensitive" } }),
  };
  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const safePage = currentPage > 0 ? currentPage : 1;
  const offset = (safePage - 1) * itemsPerPage;

  return await prisma.post.findMany({
    where: query?.trim()
      ? { OR: [{ content: { contains: query, mode: "insensitive" } }] }
      : {},
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsNational(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: CategoryPost.National,
      ...(query?.trim() && {
        OR: [{ content: { contains: query, mode: "insensitive" } }],
      }),
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsInternational(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: CategoryPost.International,
      ...(query?.trim() && {
        OR: [{ content: { contains: query, mode: "insensitive" } }],
      }),
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsNationalWeb(
  query: string,
  category: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  const where: Prisma.PostWhereInput = {
    category:
      category === "Todos"
        ? { in: [CategoryPost.National, CategoryPost.Web] }
        : category === "Web"
        ? CategoryPost.Web
        : CategoryPost.National,
    ...(query?.trim() && {
      OR: [{ content: { contains: query, mode: "insensitive" } }],
    }),
  };

  return await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsInternationalWeb(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: { in: [CategoryPost.International, CategoryPost.Web] },
      ...(query?.trim() && {
        OR: [{ content: { contains: query, mode: "insensitive" } }],
      }),
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchCategories() {
  const categories = await prisma.post.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  return categories.map((c) => c.category);
}

// -------------------- NEWSLETTERS --------------------

export async function fetchNewsletters() {
  return await prisma.newsletter.findMany({ orderBy: { createdAt: "desc" } });
}

export async function fetchNewsletterById(id: string) {
  return await prisma.newsletter.findUnique({ where: { id } });
}

export async function fetchFilteredNewsletters(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.newsletter.findMany({
    where: query?.trim()
      ? { email: { contains: query, mode: "insensitive" } }
      : {},
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchNewslettersPages(query: string, itemsPerPage = 8) {
  const where: Prisma.NewsletterWhereInput | undefined = query?.trim()
    ? { email: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.newsletter.count({ where });
  return Math.ceil(total / itemsPerPage);
}

// -------------------- ERASMUS COURSES --------------------

export async function fetchErasmusCourses() {
  return await prisma.erasmusCourse.findMany({ orderBy: { createdAt: "desc" } });
}

export async function fetchErasmusCourseById(id: string) {
  return await prisma.erasmusCourse.findUnique({ where: { id } });
}

export async function fetchFilteredErasmusCourses(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.erasmusCourse.findMany({
    where: query?.trim()
      ? { title: { contains: query, mode: "insensitive" } }
      : {},
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchErasmusCoursesPages(query: string, itemsPerPage = 8) {
  const where: Prisma.ErasmusCourseWhereInput | undefined = query?.trim()
    ? { title: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.erasmusCourse.count({ where });
  return Math.ceil(total / itemsPerPage);
}

// -------------------- ERASMUS PROJECTS --------------------

export async function fetchErasmusProjects() {
  return await prisma.erasmusProject.findMany({ orderBy: { createdAt: "desc" } });
}

export async function fetchErasmusProjectById(id: string) {
  return await prisma.erasmusProject.findUnique({ where: { id } });
}

export async function fetchFilteredErasmusProjects(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.erasmusProject.findMany({
    where: query?.trim()
      ? { title: { contains: query, mode: "insensitive" } }
      : {},
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchErasmusProjectsPages(query: string, itemsPerPage = 8) {
  const where: Prisma.ErasmusProjectWhereInput | undefined = query?.trim()
    ? { title: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.erasmusProject.count({ where });
  return Math.ceil(total / itemsPerPage);
}

// -------------------- PARTNERS --------------------

export async function fetchPartners() {
  return await prisma.partner.findMany({ orderBy: { createdAt: "desc" } });
}

export async function fetchPartnerById(id: string) {
  return await prisma.partner.findUnique({ where: { id } });
}

export async function fetchFilteredPartners(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.partner.findMany({
    where: query?.trim()
      ? { name: { contains: query, mode: "insensitive" } }
      : {},
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPartnersPages(query: string, itemsPerPage = 8) {
  const where: Prisma.PartnerWhereInput | undefined = query?.trim()
    ? { name: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.partner.count({ where });
  return Math.ceil(total / itemsPerPage);
}

// -------------------- VIDEOS --------------------

export async function fetchVideos() {
  return await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
}

export async function fetchVideoById(id: string) {
  return await prisma.video.findUnique({ where: { id } });
}

export async function fetchFilteredVideos(
  query: string,
  currentPage: number,
  itemsPerPage = 8
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.video.findMany({
    where: query?.trim()
      ? { title: { contains: query, mode: "insensitive" } }
      : {},
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchVideosPages(query: string, itemsPerPage = 8) {
  const where: Prisma.VideoWhereInput | undefined = query?.trim()
    ? { title: { contains: query, mode: "insensitive" } }
    : undefined;

  const total = await prisma.video.count({ where });
  return Math.ceil(total / itemsPerPage);
}

// -------------------- USERS --------------------

export async function fetchUsers() {
  return await prisma.user.findMany();
}

export async function fetchUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

// -------------------- DASHBOARD STATS --------------------

export async function fetchDashboardStats() {
  const [posts, newsletters, courses, partners] = await Promise.all([
    prisma.post.count(),
    prisma.newsletter.count(),
    prisma.course.count(),
    prisma.partner.count(),
  ]);
  return { posts, newsletters, courses, partners };
}
