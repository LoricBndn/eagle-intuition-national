import { NextResponse } from "next/server";
import { CategoryPost, PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// === ⚙️ Configuration Vercel ===
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const PAGE_ID = process.env.FACEBOOK_PAGE_ID!;

const PLACEHOLDER_IMAGE =
  "https://citygem.app/wp-content/uploads/2024/08/placeholder-1-1.png";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === 📦 Interfaces ===
interface VercelEnv {
  id: string;
  key: string;
  value?: string;
  target: string[];
  type: string;
}

interface VercelEnvListResponse {
  envs: VercelEnv[];
}

// === 🧩 Fonction pour récupérer une variable d'environnement depuis Vercel ===
async function getVercelEnv(key: string): Promise<string | undefined> {
  const teamQuery = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env${teamQuery}`,
    {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Vercel API error: ${await res.text()}`);
  }

  const data: VercelEnvListResponse = await res.json();
  const env = data.envs.find((e) => e.key === key);
  if (!env?.value) {
    console.warn(`[Vercel Env] ${key} non trouvé ou vide`);
  }
  return env?.value;
}

// === 🔄 Récupération et sauvegarde des posts Facebook ===
async function fetchAndStoreFacebookPosts() {
  const ACCESS_TOKEN = await getVercelEnv("FACEBOOK_PAGE_ACCESS_TOKEN");

  console.log("ACCESS_TOKEN depuis Vercel :", ACCESS_TOKEN);

  if (!PAGE_ID || !ACCESS_TOKEN) {
    throw new Error("Facebook Page ID or Access Token not set");
  }

  console.log("🔑 Using Facebook Page Token:", ACCESS_TOKEN.slice(0, 10) + "...");

  // 1️⃣ Récupération des posts Facebook
  const url = `https://graph.facebook.com/v24.0/${PAGE_ID}/posts?access_token=${ACCESS_TOKEN}&limit=10`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Facebook API error: ${errorText}`);
  }

  const data = await res.json();
  const posts = data.data;
  const prismaPosts = [];

  // 2️⃣ Parcours des posts
  for (const p of posts) {
    if (p.story?.includes("créé un évènement")) continue;

    const postDate = p.created_time ? new Date(p.created_time) : new Date();
    let imagesUrl: string[] = [];

    // 3️⃣ Récupération des images jointes
    const attachRes = await fetch(
      `https://graph.facebook.com/v24.0/${p.id}?fields=attachments&access_token=${ACCESS_TOKEN}&limit=10`
    );

    if (attachRes.ok) {
      const attachData = await attachRes.json();
      const attachments = attachData.attachments?.data || [];

      imagesUrl = await Promise.all(
        attachments.map(async (att: any) => {
          if (att.media?.image?.src) {
            try {
              const uploadRes = await cloudinary.uploader.upload(att.media.image.src, {
                folder: "facebook_posts",
              });
              return uploadRes.secure_url;
            } catch (err) {
              console.error("Cloudinary upload failed:", err);
              return null;
            }
          }
          return null;
        })
      ).then((urls) => urls.filter((u): u is string => !!u));
    }

    if (p.message && imagesUrl.length === 0) {
      imagesUrl.push(PLACEHOLDER_IMAGE);
    }

    if (!p.message && imagesUrl.length === 0) continue;

    prismaPosts.push({
      content: p.message || "",
      slug: p.id,
      imagesUrl,
      category: CategoryPost.National,
      url: `https://www.facebook.com/${PAGE_ID}/posts/${p.id}`,
      createdAt: postDate,
    });
  }

  // 4️⃣ Insertion en base
  if (prismaPosts.length === 0) {
    return { message: "No new posts to add" };
  }

  const addedPosts = await prisma.post.createMany({
    data: prismaPosts,
    skipDuplicates: true,
  });

  return { message: "Posts added", addedPosts };
}

// === ✅ Routes API ===
export async function GET() {
  try {
    const result = await fetchAndStoreFacebookPosts();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Facebook fetch failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
