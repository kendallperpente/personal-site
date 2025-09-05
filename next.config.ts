import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: [],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = false;
    }
    return config;
  },
};

export default nextConfig;
