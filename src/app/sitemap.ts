import type { MetadataRoute } from "next";
import { absoluteSiteUrl, getPublicPagePaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // These are broad hints, not promised publishing schedules or fabricated update dates.
  return getPublicPagePaths().map((path) => ({
    url: absoluteSiteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/egitimler" ? 0.9 : 0.8,
  }));
}
