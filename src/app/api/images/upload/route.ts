import { NextRequest, NextResponse } from "next/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET!;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", UPLOAD_PRESET);
    cloudForm.append("folder", "posts");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: "POST",
      body: cloudForm,
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `Cloudinary upload failed: ${text}` }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ url: data.secure_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
