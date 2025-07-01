import withFlowbiteReact from "flowbite-react/plugin/nextjs";

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

  // Allow external images from GitHub avatars
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/*",
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);