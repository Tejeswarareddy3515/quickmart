import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow these origins to request dev-only _next resources from other hosts
  // Resolves: "Cross origin request detected" warning during local network testing
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.29.48:3000',
  ],
  outputFileTracingRoot: '/Users/tejeswarareddy/Downloads/quickmart',
  images: {
    domains: ['images.unsplash.com', 'cdn.quickmart.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3001'}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
