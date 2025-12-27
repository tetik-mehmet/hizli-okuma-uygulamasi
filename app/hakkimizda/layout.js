import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Hakkımızda",
  description:
    "Hızlı Okuma platformu hakkında bilgi edinin. Misyonumuz, vizyonumuz ve ekibimiz hakkında detaylı bilgi. Okuma hızınızı 3 kat artıran bilimsel teknikler.",
  keywords: [
    "hızlı okuma hakkında",
    "hızlı okuma platformu",
    "ekip",
    "misyon",
    "vizyon",
    "hızlı okuma eğitimi",
  ],
  url: "/hakkimizda",
});

export default function AboutLayout({ children }) {
  return children;
}

