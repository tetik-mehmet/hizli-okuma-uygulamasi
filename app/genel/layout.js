import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Genel Egzersizler",
  description:
    "Hızlı okuma genel egzersizleri. Okuma hızınızı artırmak için çeşitli egzersizler ve teknikler. Bölüm 1, odak egzersizleri ve daha fazlası.",
  keywords: [
    "hızlı okuma egzersizleri",
    "okuma egzersizleri",
    "genel egzersizler",
    "hızlı okuma teknikleri",
    "odak egzersizleri",
  ],
  url: "/genel",
});

export default function GenelLayout({ children }) {
  return children;
}

