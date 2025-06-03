/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-gabriel' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-gabriel' : '',
}

module.exports = nextConfig 