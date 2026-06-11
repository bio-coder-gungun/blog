/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/blog',
  assetPrefix: '/blog/',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default nextConfig
