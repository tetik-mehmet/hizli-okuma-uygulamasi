"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Target,
  Brain,
  Eye,
  Clock,
  Zap,
  FileText,
  Scissors,
  Image,
  Search,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { checkPageAccess } from "@/lib/checkAccess";

export default function OdakSayfasi() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    // Erişim kontrolü
    const accessCheck = checkPageAccess("/odak");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);

  const egzersizKategorileri = [
    {
      id: "paragraf",
      baslik: "Paragraf Egzersizleri",
      aciklama: "Metin okuma ve anlama becerilerinizi geliştirin",
      icon: BookOpen,
      renk: "from-blue-500 to-cyan-500",
      hoverRenk: "from-blue-600 to-cyan-600",
      link: "/genel/odak/paragrafegzersiz",
    },
    {
      id: "dilbilgisi",
      baslik: "Dilbilgisi Egzersizleri",
      aciklama: "Türkçe dilbilgisi kurallarını öğrenin ve pekiştirin",
      icon: FileText,
      renk: "from-green-500 to-emerald-500",
      hoverRenk: "from-green-600 to-emerald-600",
      link: "/genel/odak/dilbilgisi",
    },
    {
      id: "heceleme",
      baslik: "Heceleme Egzersizleri",
      aciklama: "Kelime heceleme ve telaffuz becerilerinizi geliştirin",
      icon: Scissors,
      renk: "from-purple-500 to-pink-500",
      hoverRenk: "from-purple-600 to-pink-600",
      link: "/genel/odak/heceleme",
    },
    {
      id: "boslukdoldurma",
      baslik: "Boşluk Doldurma Egzersizleri",
      aciklama:
        "Metinlerdeki eksik kelimeleri tamamlayarak okuma hızınızı artırın",
      icon: Target,
      renk: "from-orange-500 to-red-500",
      hoverRenk: "from-orange-600 to-red-600",
      link: "/genel/odak/bosluk",
    },
    {
      id: "esanlamli",
      baslik: "Eş Anlamlı Kelime Eşleştirme",
      aciklama:
        "Eş anlamlı kelimeleri eşleştirerek kelime haznenizi genişletin",
      icon: Brain,
      renk: "from-indigo-500 to-blue-500",
      hoverRenk: "from-indigo-600 to-blue-600",
      link: "/genel/odak/esanlamli",
    },
    {
      id: "gorselyorumlama",
      baslik: "Görsel Yorumlama",
      aciklama:
        "Görselleri analiz ederek görsel okuma ve yorumlama becerilerinizi geliştirin",
      icon: Image,
      renk: "from-teal-500 to-green-500",
      hoverRenk: "from-teal-600 to-green-600",
      link: "/genel/odak/gorsel-yorumlama",
    },
    {
      id: "ikilemeler",
      baslik: "İkilemeler ve Pekiştirmeler",
      aciklama:
        "Türkçe ikilemeleri ve pekiştirme yapılarını öğrenerek dil becerilerinizi geliştirin",
      icon: Zap,
      renk: "from-yellow-500 to-amber-500",
      hoverRenk: "from-yellow-600 to-amber-600",
      link: "/genel/odak/ikilemeler",
    },
    {
      id: "bulkaybet",
      baslik: "Bul ve Kaybet",
      aciklama:
        "Renk ve şekil algılama becerilerinizi geliştirerek görsel odaklanmanızı artırın",
      icon: Search,
      renk: "from-rose-500 to-pink-500",
      hoverRenk: "from-rose-600 to-pink-600",
      link: "/genel/odak/renk-kaybolma",
    },
    {
      id: "hayvankartlari",
      baslik: "Hayvan Kartları",
      aciklama:
        "Hayvanları tanıyarak görsel hafıza ve tanıma becerilerinizi geliştirin",
      icon: Eye,
      renk: "from-emerald-500 to-teal-500",
      hoverRenk: "from-emerald-600 to-teal-600",
      link: "/genel/odak/hayvan-kartlari",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Geri Dön Butonu */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/genel">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Geri Dön</span>
          </motion.button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Odak ve Konsantrasyon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Hızlı okuma becerilerinizi geliştirmek için özel olarak
              tasarlanmış egzersizler
            </p>
          </motion.div>
        </div>
      </div>

      {/* Egzersiz Kategorileri */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {egzersizKategorileri.map((kategori) => (
            <motion.div
              key={kategori.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredButton(kategori.id)}
              onHoverEnd={() => setHoveredButton(null)}
              className="relative group"
            >
              <Link href={kategori.link}>
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${kategori.renk} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${kategori.renk} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <kategori.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {kategori.baslik}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {kategori.aciklama}
                    </p>

                    {/* Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                        Başla
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${kategori.renk} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${kategori.hoverRenk} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Placeholder for other sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Diğer egzersiz kategorileri yakında eklenecek...</p>
        </div>
      </div>
    </div>
  );
}
