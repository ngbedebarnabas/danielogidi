import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The Flyers page was merged into Itinerary.
  async redirects() {
    return [{ source: "/flyers", destination: "/itinerary", permanent: true }];
  },
  // Playlist thumbnails on the Teachings page come from YouTube.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
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
