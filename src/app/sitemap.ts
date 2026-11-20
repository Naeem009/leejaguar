import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = ["", "/fashion-retail", "/services", "/product-categories", "/about", "/contact"];
  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date("2026-11-20"),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
