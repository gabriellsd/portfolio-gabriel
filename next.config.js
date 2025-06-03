/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Configuração condicional para GitHub Pages
  ...(process.env.GITHUB_PAGES === 'true' && {
    output: 'export',
    trailingSlash: true,
    assetPrefix: '/portfolio-gabriel/',
    basePath: '/portfolio-gabriel',
  }),
}

module.exports = nextConfig 