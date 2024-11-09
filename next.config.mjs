// @ts-check

// include prototype pages in non-production builds
const default_page_ext = ["ts", "tsx", "js", "jsx", "mdx", "md"];
const page_ext =
  process.env.NODE_ENV === "production"
    ? [...default_page_ext]
    : ["proto.tsx", "proto.js", ...default_page_ext];
// we're unlikely to use ts or jsx for pages

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // TEMPORARY OVERRIDE TO KEEP IT BUILDING SUCCESSFULLY
  eslint: {
    ignoreDuringBuilds: true,
  },
  // - REMOVE THIS ONCE LINT ERRORS ARE RESOLVED

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // include/exclude prototype pages for different type of builds
  pageExtensions: page_ext,
};

export default nextConfig;
