import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PPR (Partial Pre-rendering) enable etmek için
  /*experimental: {
    ppr: 'incremental', // Next.js 15'te available
  },*/
  
  // Performance optimizations
  images: {
    domains: ["fakestoreapi.com"],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Caching strategies
  async headers() {
    return [
      {
        // SSG ve ISR sayfalar için cache headers
        source: '/ssg/products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/isr/products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },

  // Webpack optimizasyonu: performans izleme
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }
    
    return config;
  },
};

export default nextConfig;
