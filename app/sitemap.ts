import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { pokepediaEntries } from "@/lib/data/pokepedia";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = [
    "",
    "/market",
    "/updates",
    "/pokepedia",
    "/rules",
    "/store",
    "/support",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const entries = pokepediaEntries.map((e) => ({
    url: `${base}/pokepedia/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...entries];
}
