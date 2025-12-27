import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "SpeedMind",
  description:
    "SpeedMind ile zihinsel odak ve hızlı okuma becerilerinizi geliştirin. Bilimsel tekniklerle okuma hızınızı artırın. Bilişsel kontrol ve dikkat geliştirme programı.",
  keywords: [
    "speedmind",
    "zihinsel odak",
    "bilişsel kontrol",
    "hızlı okuma",
    "dikkat geliştirme",
    "odaklanma teknikleri",
    "beyin egzersizleri",
  ],
  url: "/speedmind",
});

export default function SpeedMindLayout({ children }) {
  return children;
}

