/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    APP_PORT: process.env.APP_PORT,
  },
};

module.exports = nextConfig;
