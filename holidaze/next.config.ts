import type { NextConfig } from "next";

/**
 * Next.js configuration for Holidaze:
 * - Enables optimized external images
 * - Ensures type and linting errors are caught at build time
 */
const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com","media.istockphoto.com" ],
  },
  typescript: {
    ignoreBuildErrors: false, //  Catch errors properly
  },
  eslint: {
    ignoreDuringBuilds: false, // Catch linting issues early
  },
  reactStrictMode: true, // Recommended for detecting issues
  output: "standalone",
};

export default nextConfig;
