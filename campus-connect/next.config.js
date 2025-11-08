/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // disable lightningcss
  },
  turbopack: false, // force webpack instead of turbopack
  eslint: {
    ignoreDuringBuilds: true, // ✅ allow deploy even if ESLint errors exist
  },
};

module.exports = nextConfig;
