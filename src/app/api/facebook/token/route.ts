import { NextResponse } from "next/server";
import fetch from "node-fetch";

const APP_ID = process.env.FACEBOOK_APP_ID!;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET!;
const USER_ACCESS_TOKEN = process.env.FACEBOOK_USER_ACCESS_TOKEN!;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;

interface FbTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function POST() {
  if (!APP_ID || !APP_SECRET || !USER_ACCESS_TOKEN || !VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  try {
    // 🔄 Regénérer le token Facebook
    const fbUrl = `https://graph.facebook.com/v24.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${USER_ACCESS_TOKEN}`;
    const fbRes = await fetch(fbUrl);
    if (!fbRes.ok) throw new Error(await fbRes.text());
    const fbData = (await fbRes.json()) as FbTokenResponse;
    const newToken = fbData.access_token;

    // 🟢 Mettre à jour la variable sur Vercel via l'API
    const vercelUrl = `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env`;
    const updateRes = await fetch(vercelUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          key: "FACEBOOK_USER_ACCESS_TOKEN",
          value: newToken,
          target: ["production", "preview", "development"],
          type: "encrypted",
        },
      ]),
    });

    if (!updateRes.ok) {
      const text = await updateRes.text();
      throw new Error(`Vercel API update failed: ${text}`);
    }

    return NextResponse.json({ message: "Token updated", newToken });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
