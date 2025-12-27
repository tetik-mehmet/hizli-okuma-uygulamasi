"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Home, BookOpen, Target, Zap } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
    if (query.trim()) {
      performSearch(query.trim());
    }
  }, [searchParams]);

  const performSearch = (query) => {
    setIsSearching(true);
    
    // Sayfalar ve içerikler - Arama yapılacak yerler
    const searchablePages = [
      {
        title: "Hızlı Okuma Teknikleri",
        description: "Göz hareketlerini optimize ederek okuma hızınızı 3-5 kat artırın.",
        href: "/",
        category: "Ana Sayfa",
        keywords: ["hızlı okuma", "okuma hızı", "okuma teknikleri", "göz hareketleri"],
      },
      {
        title: "Özellikler",
        description: "Platformumuzda sunulan etkili teknikler ve verimlilik artırıcı özellikler",
        href: "/#features",
        category: "Ana Sayfa",
        keywords: ["özellikler", "teknikler", "verimlilik"],
      },
      {
        title: "Fiyatlandırma",
        description: "Size en uygun abonelik planını seçin ve hızlı okuma yolculuğunuza başlayın",
        href: "/#pricing",
        category: "Ana Sayfa",
        keywords: ["fiyat", "fiyatlandırma", "paket", "abonelik", "ücret"],
      },
      {
        title: "Hakkımızda",
        description: "Hızlı Okuma platformu hakkında bilgi edinin",
        href: "/hakkimizda",
        category: "Hakkımızda",
        keywords: ["hakkımızda", "hakkinda", "biz", "ekip", "platform"],
      },
      {
        title: "SpeedMind",
        description: "SpeedMind hızlı okuma yöntemi hakkında detaylı bilgi",
        href: "/speedmind",
        category: "SpeedMind",
        keywords: ["speedmind", "yöntem", "metod"],
      },
      {
        title: "İletişim",
        description: "Bizimle iletişime geçin, sorularınızı sorun",
        href: "/iletisim",
        category: "İletişim",
        keywords: ["iletişim", "iletisim", "iletişime", "destek", "yardım", "sorular"],
      },
      {
        title: "Genel Egzersizler",
        description: "Hızlı okuma egzersizlerine başlayın",
        href: "/genel",
        category: "Egzersizler",
        keywords: ["egzersiz", "egzersizler", "genel", "alıştırma", "pratik"],
      },
      {
        title: "Öğrenci Paneli",
        description: "İlerlemenizi takip edin ve hedeflerinize ulaşın",
        href: "/ogrenci-panel",
        category: "Panel",
        keywords: ["öğrenci", "ogrenci", "panel", "ilerleme", "istatistik"],
      },
    ];

    // Arama yap
    const queryLower = query.toLowerCase();
    const matchedResults = searchablePages.filter((page) => {
      const titleMatch = page.title.toLowerCase().includes(queryLower);
      const descMatch = page.description.toLowerCase().includes(queryLower);
      const keywordMatch = page.keywords.some((keyword) =>
        keyword.toLowerCase().includes(queryLower)
      );
      return titleMatch || descMatch || keywordMatch;
    });

    // Sonuçları sırala (başlık eşleşmesi öncelikli)
    const sortedResults = matchedResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(queryLower);
      const bTitleMatch = b.title.toLowerCase().includes(queryLower);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    setResults(sortedResults);
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery.trim());
    }
  };

  return (
    <div className="pt-20 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Arama Kutusu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-base sm:text-lg"
                  autoFocus
                />
              </div>
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ara
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Sonuçlar */}
        {isSearching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Aranıyor...</p>
          </motion.div>
        ) : searchQuery.trim() ? (
          results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{results.length}</span> sonuç
                  bulundu
                </p>
              </div>

              {results.map((result, index) => (
                <motion.div
                  key={result.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <Link href={result.href}>
                    <div className="flex items-start gap-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white shadow-md">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {result.title}
                          </h3>
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {result.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{result.description}</p>
                        <div className="flex items-center gap-2 text-sm text-orange-600 font-medium group-hover:gap-3 transition-all">
                          Sayfaya Git
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sonuç bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                "{searchQuery}" için sonuç bulunamadı. Lütfen farklı bir arama terimi
                deneyin.
              </p>
              <Link href="/">
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5" />
                  Ana Sayfaya Dön
                </motion.button>
              </Link>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Arama yapın
            </h3>
            <p className="text-gray-600 mb-6">
              Aradığınız içeriği bulmak için yukarıdaki arama kutusunu kullanın.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["hızlı okuma", "fiyatlandırma", "egzersizler", "speedmind"].map(
                (term) => (
                  <motion.button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {term}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function SearchLoadingFallback() {
  return (
    <div className="pt-20 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-orange-50 font-inter">
      <Header />
      <Suspense fallback={<SearchLoadingFallback />}>
        <SearchContent />
      </Suspense>
      <Footer />
    </main>
  );
}

