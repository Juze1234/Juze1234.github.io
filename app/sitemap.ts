import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const languages = {
  en: "https://juze1234.github.io/",
  ru: "https://juze1234.github.io/ru/",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(languages).map((url) => ({
    url,
    lastModified,
    changeFrequency: "monthly",
    priority: url === languages.en ? 1 : 0.8,
    alternates: { languages },
  }));
}
