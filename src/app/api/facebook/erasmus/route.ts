import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

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
  return env?.value;
}

async function fetchAndStoreErasmusCourses() {
  const ACCESS_TOKEN = await getVercelEnv("FACEBOOK_PAGE_ACCESS_TOKEN");

  if (!PAGE_ID || !ACCESS_TOKEN) {
    throw new Error("Facebook Page ID or Access Token not set");
  }

  const url = `https://graph.facebook.com/v24.0/${PAGE_ID}/posts?access_token=${ACCESS_TOKEN}&limit=10`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Facebook API error: ${await res.text()}`);
  }

  const data = await res.json();
  const posts: Array<{ id: string; message?: string; created_time?: string; story?: string }> = data.data;
  const added = [];

  for (const p of posts) {
    if (!p.message) continue;
    if (p.story?.includes("créé un évènement")) continue;

    let imageUrl = PLACEHOLDER_IMAGE;

    const attachRes = await fetch(
      `https://graph.facebook.com/v24.0/${p.id}?fields=attachments&access_token=${ACCESS_TOKEN}`
    );

    if (attachRes.ok) {
      const attachData = await attachRes.json();
      const firstAttachment = attachData.attachments?.data?.[0];
      if (firstAttachment?.media?.image?.src) {
        try {
          const uploadRes = await cloudinary.uploader.upload(
            firstAttachment.media.image.src,
            { folder: "erasmus_courses" }
          );
          imageUrl = uploadRes.secure_url;
        } catch {
          // keep placeholder
        }
      }
    }

    const created = await prisma.erasmusCourse.create({
      data: {
        title: p.message.slice(0, 100),
        description: p.message,
        url: `https://www.facebook.com/${PAGE_ID}/posts/${p.id}`,
        imageUrl,
        createdAt: p.created_time ? new Date(p.created_time) : new Date(),
      },
    }).catch(() => null);

    if (created) added.push(created.id);
  }

  return { message: "Erasmus courses synced", added: added.length };
}

export async function GET() {
  try {
    const result = await fetchAndStoreErasmusCourses();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erasmus Facebook fetch failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
