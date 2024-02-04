/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
            port: '',
            pathname: '/account123/**',
          },
        ],
      },
};

export default nextConfig;
