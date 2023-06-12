/** @type {import("next").NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
