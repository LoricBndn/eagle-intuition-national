import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
      { protocol: "https", hostname: "citygem.app" },
      { protocol: "https", hostname: "*.fbcdn.net" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },
};

export default nextConfig;
