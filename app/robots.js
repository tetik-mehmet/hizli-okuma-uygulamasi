/**
 * Robots.txt Generator
 * Arama motorları için robots.txt dosyası oluşturur
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hizliokuma.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/panel/",
          "/yonetim-paneli/",
          "/ogrenci-panel/",
          "/subscription-expired/",
          "/free-trial/",
          "/odevler/",
          "/_next/",
          "/static/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

