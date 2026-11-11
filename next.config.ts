import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The Flyers page was merged into Itinerary.
  async redirects() {
    return [{ source: "/flyers", destination: "/itinerary", permanent: true }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
