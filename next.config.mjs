/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stackexchange.com',
        pathname: '/users/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
