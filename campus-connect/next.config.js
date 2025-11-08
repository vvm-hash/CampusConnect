/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Disable LightningCSS by forcing Webpack CSS handling
    config.module.rules.forEach(rule => {
      if (Array.isArray(rule.use)) {
        rule.use.forEach(loader => {
          if (loader.loader?.includes("css-loader")) {
            loader.options.modules = {
              exportLocalsConvention: "as-is"
            };
          }
        });
      }
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

module.exports = nextConfig;
