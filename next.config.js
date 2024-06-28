/* eslint-disable quotes */
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src', './public'],
    prependData: "@import '@/scss/variables';",
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
