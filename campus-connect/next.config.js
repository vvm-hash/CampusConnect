/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Disable lightningcss (Tailwind v4 requires this on Vercel)
    css: { lightningcss: false }
  },
  experimental: {
    // Fully disable Turbopack build pipeline
    turbo: false
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  }
};

module.exports = nextConfig;
