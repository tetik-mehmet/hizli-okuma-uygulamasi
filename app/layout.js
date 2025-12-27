import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateMetadata as genMeta } from "../lib/seo";
import StructuredData, {
  OrganizationSchema,
  WebSiteSchema,
} from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  ...genMeta({
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
  }),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#3b82f6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData data={OrganizationSchema()} />
        <StructuredData data={WebSiteSchema()} />
        {children}
      </body>
    </html>
  );
}
