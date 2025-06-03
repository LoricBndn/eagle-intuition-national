import {
  PrismaClient,
  Prisma,
  CategoryPost,
  CategoryNewsletter,
} from "@prisma/client";
import { generateUniqueSlug, extractImagesFromAttachments } from "@/lib/utils";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

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

export async function fetchFilteredNewsletters(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const newsletters = await prisma.newsletter.findMany({
      where: {
        email: {
          contains: query,
          mode: "insensitive",
        },
      },
      skip: offset,
      take: itemsPerPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    return newsletters;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered newsletters.");
  }
}

export async function fetchNewslettersPages(query: string, itemsPerPage = 6) {
  const where: Prisma.NewsletterWhereInput | undefined = query?.trim()
    ? {
        email: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const totalNewletters = await prisma.newsletter.count({ where });
  return Math.ceil(Number(totalNewletters) / itemsPerPage);
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

export async function fetchFilteredCourses(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      skip: offset,
      take: itemsPerPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered courses.");
  }
}

export async function fetchCoursesPages(query: string, itemsPerPage = 6) {
  const where: Prisma.CourseWhereInput | undefined = query?.trim()
    ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const totalCourses = await prisma.course.count({ where });
  return Math.ceil(Number(totalCourses) / itemsPerPage);
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

export async function fetchPostBySlug(slug: string) {
  return await prisma.post.findUnique({ where: { slug } });
}

export async function fetchPostsByCategory(category: CategoryPost) {
  return await prisma.post.findMany({ where: { category } });
}

export async function fetchPostsPages(query: string, itemsPerPage = 6) {
  const where: Prisma.PostWhereInput | undefined = query?.trim()
    ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const totalPosts = await prisma.post.count({ where });
  return Math.ceil(Number(totalPosts) / itemsPerPage);
}

export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const safePage =
    typeof currentPage === "number" && currentPage > 0 ? currentPage : 1;
  const offset = (safePage - 1) * itemsPerPage;

  try {
    const posts = await prisma.post.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: itemsPerPage,
    });

    return posts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered posts.");
  }
}

export async function fetchCategories() {
  const categories = await prisma.post.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  return categories.map((c) => c.category);
}

// --- Facebook Posts ---
export async function fetchFacebookAndStorePosts(url?: string) {
  if (!FACEBOOK_PAGE_ID || !FACEBOOK_ACCESS_TOKEN) {
    console.error("Missing Facebook credentials.");
    return;
  }

  const seenIds = new Set<string>();

  const apiUrl = url
    ? url
    : `https://graph.facebook.com/v23.0/${FACEBOOK_PAGE_ID}/posts?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=id,message,created_time,attachments,status_type,permalink_url&limit=25`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error("Facebook API Error:", await res.text());
      return;
    }

    const { data, paging } = await res.json();

    for (const post of data) {
      console.log(post);
      if (seenIds.has(post.id)) continue;
      seenIds.add(post.id);
      if (post.status_type === "mobile_status_update") continue;

      const exists = await prisma.post.findUnique({ where: { id: post.id } });
      if (!exists) {
        try {
          const slug = await generateUniqueSlug(
            post.message?.substring(0, 15) || "post-facebook"
          );

          let imagesUrl: string[] = [];
          if (post.attachments?.data) {
            imagesUrl = extractImagesFromAttachments(post.attachments.data);
          }

          let sharedContent = "";
          if (post.status_type === "shared_story") {
            const sharedAttachment = post.attachments.data[0];
            sharedContent = [
              sharedAttachment?.title,
              sharedAttachment?.description,
              sharedAttachment?.url,
            ]
              .filter(Boolean)
              .join("\n");
          }

          await prisma.post.create({
            data: {
              id: post.id,
              slug,
              title:
                post.message?.substring(0, 10) ||
                sharedContent.substring(0, 10) ||
                "Post Facebook",
              content: post.message || sharedContent || "",
              createdAt: new Date(post.created_time),
              imagesUrl,
              category: CategoryPost.Facebook,
              url: post.permalink_url,
            },
          });
        } catch (error) {
          console.error(
            `Erreur lors de la création du post ${post.id} :`,
            error
          );
        }
      }
    }

    if (paging?.next) {
      return fetchFacebookAndStorePosts(paging.next);
    }
  } catch (error) {
    console.error("Error fetching or storing Facebook posts:", error);
  }
}