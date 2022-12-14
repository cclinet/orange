/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, {}) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};
