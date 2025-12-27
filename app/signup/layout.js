import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Üye Ol",
  description:
    "Hızlı Okuma platformuna ücretsiz üye olun. Okuma hızınızı 3 kat artırmak için hemen başlayın.",
  keywords: ["üye ol", "kayıt", "signup", "hesap oluştur"],
  url: "/signup",
});

export default function SignupLayout({ children }) {
  return children;
}

