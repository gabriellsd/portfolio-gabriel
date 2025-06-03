/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const isVercel = process.env.VERCEL === '1'

const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Configuração específica para GitHub Pages
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    assetPrefix: '/portfolio-gabriel/',
    basePath: '/portfolio-gabriel',
  }),
  // Configuração para Vercel (padrão)
  ...(isVercel && {
    // Vercel funciona com configuração padrão do Next.js
  }),
}

module.exports = nextConfig 