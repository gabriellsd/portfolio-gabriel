/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Só aplicar configuração GitHub Pages quando explicitamente solicitado
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    assetPrefix: '/portfolio-gabriel/',
    basePath: '/portfolio-gabriel',
  }),
}

module.exports = nextConfig 