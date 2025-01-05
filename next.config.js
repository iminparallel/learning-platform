/** @type {import('next').NextConfig} */
const nextConfig = {
  // pageExtensions : [ "**/*.js", "**/*.jsx"]
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  //pageExtensions: ["index.jsx", "index.js"],
  //include: ["next-env.d.js", "**/*.js", "**/*.jsx"],
};

module.exports = nextConfig;
