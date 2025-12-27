/**
 * SEO Helper Utilities
 * Metadata oluşturma için yardımcı fonksiyonlar
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hizliokuma.app";
const SITE_NAME = "Hızlı Okuma";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

/**
 * Metadata oluşturma helper fonksiyonu
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Okuma Hızınızı 3 Kat Artırın`;

  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  const metadata = {
    title: fullTitle,
    description: description || `${SITE_NAME} ile okuma hızınızı 3 kat artırın. Bilimsel tekniklerle anlama oranınızı koruyarak daha hızlı okuyun.`,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url: fullUrl,
      title: fullTitle,
      description: description || `${SITE_NAME} ile okuma hızınızı 3 kat artırın.`,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || `${SITE_NAME} ile okuma hızınızı 3 kat artırın.`,
      images: [image],
      creator: "@hizliokuma",
    },
    alternates: {
      canonical: fullUrl,
    },
    icons: {
      icon: "/logo.png",
      apple: "/logo.png",
    },
    manifest: "/manifest.json",
  };

  return metadata;
}

/**
 * Open Graph metadata oluşturma
 */
export function generateOpenGraph({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Okuma Hızınızı 3 Kat Artırın`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return {
    type,
    url: fullUrl,
    title: fullTitle,
    description: description || `${SITE_NAME} ile okuma hızınızı 3 kat artırın.`,
    siteName: SITE_NAME,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title || SITE_NAME,
      },
    ],
    locale: "tr_TR",
  };
}

/**
 * Twitter Card metadata oluşturma
 */
export function generateTwitterCard({
  title,
  description,
  image = DEFAULT_IMAGE,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Okuma Hızınızı 3 Kat Artırın`;

  return {
    card: "summary_large_image",
    title: fullTitle,
    description: description || `${SITE_NAME} ile okuma hızınızı 3 kat artırın.`,
    images: [image],
    creator: "@hizliokuma",
  };
}

/**
 * Canonical URL oluşturma
 */
export function generateCanonicalUrl(path = "") {
  return `${SITE_URL}${path}`;
}

/**
 * Ana sayfa için metadata
 */
export const homeMetadata = generateMetadata({
  title: "Ana Sayfa",
  description:
    "Hızlı okuma teknikleri ile okuma hızınızı 3 kat artırın. Bilimsel yöntemlerle anlama oranınızı koruyarak dakikada 480 kelime okuyun. Öğrenciler, profesyoneller ve sınav hazırlığı yapanlar için özel programlar.",
  keywords: [
    "hızlı okuma",
    "okuma hızı",
    "hızlı okuma teknikleri",
    "okuma hızı artırma",
    "anlama oranı",
    "hızlı okuma kursu",
    "okuma egzersizleri",
    "göz hareketleri",
    "konsantrasyon",
    "dikkat geliştirme",
  ],
  url: "/",
});

/**
 * Hakkımızda sayfası için metadata
 */
export const aboutMetadata = generateMetadata({
  title: "Hakkımızda",
  description:
    "Hızlı Okuma platformu hakkında bilgi edinin. Misyonumuz, vizyonumuz ve ekibimiz hakkında detaylı bilgi.",
  keywords: [
    "hızlı okuma hakkında",
    "hızlı okuma platformu",
    "ekip",
    "misyon",
    "vizyon",
  ],
  url: "/hakkimizda",
});

/**
 * İletişim sayfası için metadata
 */
export const contactMetadata = generateMetadata({
  title: "İletişim",
  description:
    "Hızlı Okuma platformu ile iletişime geçin. Sorularınız, önerileriniz ve destek talepleriniz için bize ulaşın.",
  keywords: ["iletişim", "destek", "yardım", "sorular"],
  url: "/iletisim",
});

/**
 * SpeedMind sayfası için metadata
 */
export const speedMindMetadata = generateMetadata({
  title: "SpeedMind",
  description:
    "SpeedMind ile zihinsel odak ve hızlı okuma becerilerinizi geliştirin. Bilimsel tekniklerle okuma hızınızı artırın.",
  keywords: [
    "speedmind",
    "zihinsel odak",
    "bilişsel kontrol",
    "hızlı okuma",
    "dikkat geliştirme",
  ],
  url: "/speedmind",
});

