import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: [],
  
  // Disable caching during development to prevent build failures
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      staleTimes: {
        dynamic: 0,
        static: 0,
      },
    },
    // Disable build cache in development
    onDemandEntries: {
      maxInactiveAge: 0,
      pagesBufferLength: 0,
    },
  }),
  
  // Set turbopack root to fix workspace warning
  turbopack: {
    root: '.',
  },
  
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      config.optimization.splitChunks = false;
    }
    
    // Disable caching in development
    if (dev) {
      config.cache = false;
    }
    
    return config;
  },
};

export default nextConfig;
