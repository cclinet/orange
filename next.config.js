/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
    // esmExternals: "loose",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.creativecommons.org",
        port: "",
        pathname: "/l/**",
      },
    ],
  },
  // webpack: (config, {}) => {
  //   config.resolve.fallback = { fs: false };
  //   return config;
  // },
};
