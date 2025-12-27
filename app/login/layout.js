import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Giriş Yap",
  description:
    "Hızlı Okuma platformuna giriş yapın. Hızlı okuma egzersizlerine erişim için hesabınıza giriş yapın.",
  keywords: ["giriş", "login", "hesap", "üyelik"],
  url: "/login",
  noindex: true,
});

export default function LoginLayout({ children }) {
  return children;
}

