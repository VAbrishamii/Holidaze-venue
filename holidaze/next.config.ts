import type { NextConfig } from "next";

/**
 * Next.js configuration for Holidaze:
 * - Enables optimized external images
 * - Ensures type and linting errors are caught at build time
 * - Enables React strict mode for better error detection
 */
const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com","media.istockphoto.com" ],
  },
  typescript: {
    ignoreBuildErrors: false, //  Catch errors properly
  },
  eslint: {
    ignoreDuringBuilds: false, // Catch linting issues early
  },
  reactStrictMode: true, // Enable React's strict mode for better error detection
  output: "standalone",
};

export default nextConfig;
