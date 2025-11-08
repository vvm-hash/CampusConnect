/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false // disable lightningcss
  },
  turbopack: false // force webpack instead of turbopack
}

module.exports = nextConfig
