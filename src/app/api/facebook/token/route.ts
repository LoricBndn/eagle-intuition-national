import { NextResponse } from "next/server";
import fetch from "node-fetch";

const APP_ID = process.env.FACEBOOK_APP_ID!;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET!;
const USER_ACCESS_TOKEN = process.env.FACEBOOK_USER_ACCESS_TOKEN!;
const PAGE_ID = process.env.FACEBOOK_PAGE_ID!;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

interface FbTokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

interface FbPageTokenResponse {
  access_token?: string;
  id?: string;
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

async function upsertVercelEnv(key: string, value: string) {
  const teamQuery = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";

  // Supprimer si elle existe
  await fetch(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env/${key}${teamQuery}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  }).catch(() => {}); // ignorer l'erreur si elle n'existe pas

  // Créer la variable
  const createRes = await fetch(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env${teamQuery}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        key,
        value,
        target: ["development", "preview", "production"],
        type: "encrypted",
      },
    ]),
  });

  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(`Vercel API update failed: ${text}`);
  }
}

async function refreshFacebookPageToken() {
  if (!APP_ID || !APP_SECRET || !USER_ACCESS_TOKEN || !PAGE_ID || !VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    throw new Error("Missing environment variables");
  }

  // 1️⃣ Rafraîchir le token utilisateur (long-lived)
  const fbUserTokenUrl = `https://graph.facebook.com/v24.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${USER_ACCESS_TOKEN}`;
  const fbUserRes = await fetch(fbUserTokenUrl);
  if (!fbUserRes.ok) throw new Error(await fbUserRes.text());
  const fbUserData = (await fbUserRes.json()) as FbTokenResponse;
  const newUserToken = fbUserData.access_token;

  // 2️⃣ Obtenir le token de la page
  const fbPageUrl = `https://graph.facebook.com/v24.0/${PAGE_ID}?fields=access_token&access_token=${newUserToken}`;
  const fbPageRes = await fetch(fbPageUrl);
  if (!fbPageRes.ok) throw new Error(await fbPageRes.text());
  const fbPageData = (await fbPageRes.json()) as FbPageTokenResponse;

  if (fbPageData.error) throw new Error(`Facebook API error: ${fbPageData.error.message}`);
  const newPageToken = fbPageData.access_token;
  if (!newPageToken) throw new Error("Failed to retrieve new page token");

  // 3️⃣ Supprimer et recréer les variables sur Vercel
  await upsertVercelEnv("FACEBOOK_PAGE_ACCESS_TOKEN", newPageToken);
  await upsertVercelEnv("FACEBOOK_USER_ACCESS_TOKEN", newUserToken);

  return {
    message: "Facebook Page token refreshed successfully",
    pageToken: newPageToken,
    userToken: newUserToken,
  };
}

// ✅ GET pour cron automatique
export async function GET() {
  try {
    const result = await refreshFacebookPageToken();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Facebook token refresh failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// ✅ POST pour test manuel
export async function POST() {
  return GET();
}
