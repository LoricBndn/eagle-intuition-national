import { NextResponse } from "next/server";
import { CategoryPost, PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_USER_ACCESS_TOKEN;

const PLACEHOLDER_IMAGE = "https://citygem.app/wp-content/uploads/2024/08/placeholder-1-1.png";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST() {
  if (!PAGE_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Facebook Page ID or Access Token not set" },
      { status: 500 }
    );
  }

  try {
    const url = `https://graph.facebook.com/v24.0/${PAGE_ID}/posts?access_token=${ACCESS_TOKEN}&limit=10`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: `Facebook API error: ${errorText}` }, { status: 500 });
    }

    const data = await res.json();
    const posts = data.data;

    const prismaPosts = [];

    for (const p of posts) {
      // Ignorer les posts d'événements
      if (p.story?.includes("créé un évènement")) continue;

      const postDate = p.created_time ? new Date(p.created_time) : new Date();
      let imagesUrl: string[] = [];

      // Récupérer les images via l'endpoint attachments
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
        ).then(urls => urls.filter((u): u is string => !!u));
      }

      // Si le post a du contenu mais aucune image, ajouter le placeholder
      if (p.message && imagesUrl.length === 0) {
        imagesUrl.push(PLACEHOLDER_IMAGE);
      }

      // Ignorer les posts totalement vides
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

    if (prismaPosts.length === 0) {
      return NextResponse.json({ message: "No new posts to add" });
    }

    const addedPosts = await prisma.post.createMany({
      data: prismaPosts,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "Posts added", addedPosts });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
