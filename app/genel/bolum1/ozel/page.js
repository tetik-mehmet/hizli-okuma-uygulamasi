"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Eye,
  Type,
  Hash,
  PenTool,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const alistirmalar = [
  {
    id: 1,
    baslik: "Hece Birleştirme Alıştırması",
    aciklama:
      "Hece ve sesleri birleştirerek kelime oluşturma becerilerinizi geliştirin",
    icon: BookOpen,
    renk: "from-blue-500 to-cyan-500",
    hoverRenk: "from-blue-600 to-cyan-600",
    link: "/heceozel",
  },
  {
    id: 2,
    baslik: "Kelime Bulma Alıştırması",
    aciklama: "Metinler arasında belirli kelimeleri hızlıca bulma ve tanıma",
    icon: Search,
    renk: "from-green-500 to-emerald-500",
    hoverRenk: "from-green-600 to-emerald-600",
    link: "/bulma",
  },
  {
    id: 3,
    baslik: "Kelime Takip Alıştırması",
    aciklama: "Göz hareketlerinizi geliştirerek kelime takip hızınızı artırın",
    icon: Eye,
    renk: "from-purple-500 to-pink-500",
    hoverRenk: "from-purple-600 to-pink-600",
    link: "/takip",
  },
  {
    id: 4,
    baslik: "Harf Bulma Alıştırması",
    aciklama: "Karışık harfler arasından belirli harfleri hızlıca bulma",
    icon: Type,
    renk: "from-orange-500 to-red-500",
    hoverRenk: "from-orange-600 to-red-600",
    link: "/exercise5",
  },
  {
    id: 5,
    baslik: "Sembol Sayma Alıştırması",
    aciklama: "Görsel algı ve sayısal becerilerinizi geliştirin",
    icon: Hash,
    renk: "from-indigo-500 to-blue-500",
    hoverRenk: "from-indigo-600 to-blue-600",
    link: "/sembol",
  },
  {
    id: 6,
    baslik: "Yazım Alıştırması",
    aciklama: "Doğru yazım ve imla kurallarını pekiştirin",
    icon: PenTool,
    renk: "from-teal-500 to-green-500",
    hoverRenk: "from-teal-600 to-green-600",
    link: "/yazim",
  },
  {
    id: 7,
    baslik: "Eksik Harf Tamamla Alıştırması",
    aciklama:
      "Eksik harfleri tamamlayarak kelime ve cümleleri tamamlama becerilerinizi geliştirin",
    icon: PenTool,
    renk: "from-rose-500 to-pink-500",
    hoverRenk: "from-rose-600 to-pink-600",
    link: "/tamamla",
  },
];

export default function OzelSayfa() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Geri Dön Butonu - Sol üst köşe */}
      <button
        onClick={() => router.push("/panel")}
        className="fixed top-6 left-6 z-50 bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>
      {/* Header Bölümü */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                Özel Alıştırmalar
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Hızlı Okuma Becerilerinizi
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Geliştirin
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Özel olarak tasarlanmış alıştırmalarla okuma hızınızı artırın,
              görsel algınızı geliştirin ve konsantrasyonunuzu güçlendirin.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Alıştırma Kartları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alistirmalar.map((alistirma, index) => {
            const IconComponent = alistirma.icon;
            return (
              <motion.div
                key={alistirma.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <Link href={alistirma.link}>
                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${alistirma.renk} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {/* Icon Container */}
                    <div className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${alistirma.renk} mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                          {alistirma.baslik}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {alistirma.aciklama}
                        </p>

                        {/* Arrow Icon */}
                        <div className="flex items-center justify-between pt-4">
                          <div
                            className={`inline-flex items-center space-x-2 text-sm font-medium bg-gradient-to-r ${alistirma.renk} bg-clip-text text-transparent`}
                          >
                            <span>Başla</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div
                      className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${alistirma.renk} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Alt Bilgi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Düzenli Pratik Yapın
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Bu alıştırmaları düzenli olarak yaparak okuma hızınızı önemli
              ölçüde artırabilir, görsel algınızı geliştirebilir ve
              konsantrasyon sürenizi uzatabilirsiniz.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
