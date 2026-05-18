/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.edamam.com' },
      { protocol: 'https', hostname: 'api.edamam.com' },
    ],
  },
}

module.exports = nextConfig
