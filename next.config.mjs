/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-xxx.r2.dev', // Ganti dengan domain R2 kamu yang sebenarnya
      },
    ],
  },
};

export default nextConfig;
