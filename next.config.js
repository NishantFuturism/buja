/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'demoliveadmin.adibuja.com',
            port: '',
            pathname: '/media/Images/**',
          },
        ],
      },
}

module.exports = nextConfig
