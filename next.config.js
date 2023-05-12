/** @type {import("next").NextConfig} */
module.exports = {
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
