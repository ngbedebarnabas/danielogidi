import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = ["", "/about", "/itinerary", "/flyers", "/teachings", "/invite", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/itinerary" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
