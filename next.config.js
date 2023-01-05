/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
};

module.exports = nextConfig;
