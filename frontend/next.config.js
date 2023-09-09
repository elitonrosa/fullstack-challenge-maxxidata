/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EXTERNAL_API_URL: process.env.API_URL,
    NEXT_PUBLIC_INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
  },
};

module.exports = nextConfig;
