/**
 * Structured Data (JSON-LD) Component
 * Schema.org markup'ları için component
 */

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hızlı Okuma",
    alternateName: "Odak Anatolia",
    url: "https://hizliokuma.app",
    logo: "https://hizliokuma.app/logo.png",
    description:
      "Hızlı okuma teknikleri ile okuma hızınızı 3 kat artırın. Bilimsel yöntemlerle anlama oranınızı koruyarak daha hızlı okuyun.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-530-478-41-66",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
    sameAs: [
      // Sosyal medya hesapları buraya eklenebilir
    ],
  };
}

export function WebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hızlı Okuma",
    url: "https://hizliokuma.app",
    description:
      "Hızlı okuma teknikleri ile okuma hızınızı 3 kat artırın. Bilimsel yöntemlerle anlama oranınızı koruyarak daha hızlı okuyun.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hizliokuma.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function CourseSchema({
  name = "Hızlı Okuma Eğitimi",
  description = "Okuma hızınızı 3 kat artıran bilimsel teknikler",
  provider = "Hızlı Okuma",
  price = "1899",
  priceCurrency = "TRY",
  duration = "P1M",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://hizliokuma.app",
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: priceCurrency,
      availability: "https://schema.org/InStock",
      url: "https://hizliokuma.app/subscription-expired",
    },
    duration: duration,
    educationalLevel: "Beginner",
    inLanguage: "tr",
  };
}

export function EducationalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalService",
    name: "Hızlı Okuma Eğitimi",
    description:
      "Okuma hızınızı 3 kat artıran, anlama oranınızı koruyan bilimsel hızlı okuma teknikleri eğitimi.",
    provider: {
      "@type": "Organization",
      name: "Hızlı Okuma",
      url: "https://hizliokuma.app",
    },
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: ["student", "teacher", "professional"],
    },
  };
}

export function BreadcrumbListSchema({ items }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Structured Data Component - JSON-LD script tag'i oluşturur
 */
export default function StructuredData({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

