/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, {}) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  i18n: {
    locales: ["zh-CN", "zh", "zh-Hans", "en-US"],
    defaultLocale: "zh-CN",
  },
};
