/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "tokenvest.net",
      "tokenvest-solana.vercel.app",
      "strapi-um4k.onrender.com",
    ],
  },
};

module.exports = nextConfig;
