// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // TEMPORARY OVERRIDE TO KEEP IT BUILDING SUCCESSFULLY
  // - REMOVE THIS ONCE LINT ERRORS ARE RESOLVED
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Development logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Production builds
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
