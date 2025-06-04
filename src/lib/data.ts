import {
  PrismaClient,
  Prisma,
  CategoryPost,
  CategoryNewsletter,
} from "@prisma/client";
import { generateUniqueSlug, extractImagesFromAttachments } from "@/lib/utils";

const prisma = new PrismaClient();

const FACEBOOK_NATIONAL_PAGE_ID = process.env.FACEBOOK_NATIONAL_PAGE_ID;
const FACEBOOK_INTERNATIONAL_PAGE_ID = process.env.FACEBOOK_INTERNATIONAL_PAGE_ID;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

// -------------------- PRINCIPAL --------------------

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

// Posts
export async function fetchPosts() {
  return await prisma.post.findMany();
}

export async function fetchPostsNational() {
  return await prisma.post.findMany({
    where: {
      category: CategoryPost.National,
    },
  });
}

export async function fetchPostsInternational() {
  return await prisma.post.findMany({
    where: {
      category: CategoryPost.International,
    },
  });
}

export async function fetchPostsNationalWeb() {
  return await prisma.post.findMany({
    where: {
      category: {
        in: [CategoryPost.National, CategoryPost.Web],
      },
    },
  });
}

export async function fetchPostsInternationalWeb() {
  return await prisma.post.findMany({
    where: {
      category: {
        in: [CategoryPost.International, CategoryPost.Web],
      },
    },
  });
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

export async function fetchPostsPagesNational(query: string, itemsPerPage = 6) {
  const where: Prisma.PostWhereInput = {
    category: CategoryPost.National,
    ...(query?.trim() && {
      title: {
        contains: query,
        mode: "insensitive",
      },
    }),
  };

  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesInternational(query: string, itemsPerPage = 6) {
  const where: Prisma.PostWhereInput = {
    category: CategoryPost.International,
    ...(query?.trim() && {
      title: {
        contains: query,
        mode: "insensitive",
      },
    }),
  };

  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesNationalWeb(query: string, itemsPerPage = 6) {
  const where: Prisma.PostWhereInput = {
    category: { in: [CategoryPost.National, CategoryPost.Web] },
    ...(query?.trim() && {
      title: {
        contains: query,
        mode: "insensitive",
      },
    }),
  };

  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
}

export async function fetchPostsPagesInternationalWeb(query: string, itemsPerPage = 6) {
  const where: Prisma.PostWhereInput = {
    category: { in: [CategoryPost.International, CategoryPost.Web] },
    ...(query?.trim() && {
      title: {
        contains: query,
        mode: "insensitive",
      },
    }),
  };

  const total = await prisma.post.count({ where });
  return Math.ceil(total / itemsPerPage);
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

export async function fetchFilteredPostsNational(query: string, currentPage: number, itemsPerPage = 6) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: CategoryPost.National,
      ...(query?.trim() && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsInternational(query: string, currentPage: number, itemsPerPage = 6) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: CategoryPost.International,
      ...(query?.trim() && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsNationalWeb(query: string, currentPage: number, itemsPerPage = 6) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: { in: [CategoryPost.National, CategoryPost.Web] },
      ...(query?.trim() && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: itemsPerPage,
  });
}

export async function fetchFilteredPostsInternationalWeb(query: string, currentPage: number, itemsPerPage = 6) {
  const offset = Math.max(currentPage - 1, 0) * itemsPerPage;

  return await prisma.post.findMany({
    where: {
      category: { in: [CategoryPost.International, CategoryPost.Web] },
      ...(query?.trim() && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
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

// Erasmus Courses
export async function fetchErasmusCourses() {
  return await prisma.erasmusCourse.findMany();
}

export async function fetchErasmusCourseById(id: string) {
  return await prisma.erasmusCourse.findUnique({ where: { id } });
}

export async function fetchFilteredErasmusCourses(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.erasmusCourse.findMany({
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
}

export async function fetchErasmusCoursesPages(query: string, itemsPerPage = 6) {
  const where: Prisma.ErasmusCourseWhereInput | undefined = query?.trim()
    ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const total = await prisma.erasmusCourse.count({ where });
  return Math.ceil(Number(total) / itemsPerPage);
}

// Erasmus Projects
export async function fetchErasmusProjects() {
  return await prisma.erasmusProject.findMany();
}

export async function fetchErasmusProjectById(id: string) {
  return await prisma.erasmusProject.findUnique({ where: { id } });
}

export async function fetchFilteredErasmusProjects(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.erasmusProject.findMany({
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
}

export async function fetchErasmusProjectsPages(query: string, itemsPerPage = 6) {
  const where: Prisma.ErasmusProjectWhereInput | undefined = query?.trim()
    ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const total = await prisma.erasmusProject.count({ where });
  return Math.ceil(Number(total) / itemsPerPage);
}

// Partner 

export async function fetchPartners() {
  return await prisma.partner.findMany();
}

export async function fetchPartnerById(id: string) {
  return await prisma.partner.findUnique({ where: { id } });
}

export async function fetchFilteredPartners(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.partner.findMany({
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
}

export async function fetchPartnersPages(query: string, itemsPerPage = 6) {
  const where: Prisma.PartnerWhereInput | undefined = query?.trim()
    ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const total = await prisma.partner.count({ where });
  return Math.ceil(Number(total) / itemsPerPage);
}

// Videos
export async function fetchVideos() {
  return await prisma.video.findMany();
}

export async function fetchVideoById(id: string) {
  return await prisma.video.findUnique({ where: { id } });
}

export async function fetchFilteredVideos(
  query: string,
  currentPage: number,
  itemsPerPage = 6
) {
  const offset = (currentPage - 1) * itemsPerPage;

  return await prisma.video.findMany({
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
}

export async function fetchVideosPages(query: string, itemsPerPage = 6) {
  const where: Prisma.VideoWhereInput | undefined = query?.trim()
    ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
    : undefined;

  const total = await prisma.video.count({ where });
  return Math.ceil(Number(total) / itemsPerPage);
}

// -------------------- UTILS --------------------

// Users
export async function fetchUsers() {
  return await prisma.user.findMany();
}

export async function fetchUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

// Facebook Posts
export async function fetchFacebookAndStorePosts(url?: string) {
  if (!FACEBOOK_NATIONAL_PAGE_ID || !FACEBOOK_ACCESS_TOKEN) {
    console.error("Missing Facebook credentials.");
    return;
  }

  const seenIds = new Set<string>();

  const apiUrl = url
    ? url
    : `https://graph.facebook.com/v23.0/${FACEBOOK_NATIONAL_PAGE_ID}/posts?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=id,message,created_time,attachments,status_type,permalink_url&limit=25`;

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
              category: CategoryPost.National,
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