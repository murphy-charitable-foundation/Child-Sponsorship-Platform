import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wltdnmugxukcvslxnbvv.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "/sponsorship/dashboard",
      },
      {
        source: "/dashboard/child/:id",
        destination: "/sponsorship/dashboard/child/:id",
      },
    ];
  },
};

export default nextConfig;
