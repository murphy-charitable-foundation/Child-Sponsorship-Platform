import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "/sponsorship/dashboard",
      },
    ];
  },
};

export default nextConfig;
