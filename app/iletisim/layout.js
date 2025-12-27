import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "İletişim",
  description:
    "Hızlı Okuma platformu ile iletişime geçin. Sorularınız, önerileriniz ve destek talepleriniz için bize ulaşın. WhatsApp, telefon ve e-posta iletişim kanallarımız.",
  keywords: [
    "iletişim",
    "destek",
    "yardım",
    "sorular",
    "hızlı okuma iletişim",
    "müşteri hizmetleri",
  ],
  url: "/iletisim",
});

export default function ContactLayout({ children }) {
  return children;
}

