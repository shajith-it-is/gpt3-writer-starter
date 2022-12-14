/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    GTAG: process.env.GTAG,
  },
};
module.exports = nextConfig
