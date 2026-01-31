/** @type {import('next').NextConfig} */

// Performance: Enable bundle analyzer in analyze mode
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Performance: Enable React strict mode for catching issues early
  reactStrictMode: true,

  // Performance: Configure remote image domains for next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
    // Performance: Modern formats for better compression
    formats: ['image/avif', 'image/webp'],
  },

  // Performance: Enable ISR for Contentful content
  // Pages will be regenerated in the background after 60 seconds
  experimental: {
    // Partial Prerendering when stable
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
