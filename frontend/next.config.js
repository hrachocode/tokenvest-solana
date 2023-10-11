/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ "localhost", "tokenvest.net" ],
  },
};

module.exports = nextConfig;
