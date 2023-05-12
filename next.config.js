/** @type {import("next").NextConfig} */
module.exports = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.creativecommons.org",
        port: "",
        pathname: "/l/**"
      }
    ]
  }
};
