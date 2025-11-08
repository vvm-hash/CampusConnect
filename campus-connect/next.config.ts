import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // The correct way to disable Turbopack on Next.js 16
  experimental: {
    optimizePackageImports: false, // actively prevents turbopack opt behavior
  }
};

export default nextConfig;
