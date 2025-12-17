"use client";
import React from "react";
import Link from "next/link";
import { Brain, Zap, Target, Clock, Star, ArrowLeft } from "lucide-react";
import { GiBrain } from "react-icons/gi";
import { useRouter } from "next/navigation";

export default function HafizaPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-gray-900">
      {/* Geri Dön Butonu - Sol üst köşe */}
      <button
        onClick={() => router.push("/panel")}
        className="fixed top-6 left-6 z-50 bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Başlık Bölümü */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hafıza Egzersizleri
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beyninizi güçlendirin, hafızanızı geliştirin ve zihinsel
            performansınızı artırın
          </p>
        </div>

        {/* Ana Egzersiz Kartı - Logo Hafıza */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Logo Hafıza Egzersizi
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Görsel hafızanızı test edin ve geliştirin
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                  Yeni
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  Popüler
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  Bu egzersizde, çeşitli logoları kısa süre görecek ve ardından
                  hatırlamaya çalışacaksınız. Görsel hafızanızı güçlendirin ve
                  dikkat sürenizi artırın.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>5-10 dakika</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Görsel Hafıza</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>Seviye: Başlangıç</span>
                  </div>
                </div>

                <Link
                  href="/exercise4"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Egzersizi Başlat
                </Link>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center">
                    <Brain className="w-24 h-24 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ-Sol Beyin Egzersizi Kartı */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                  <GiBrain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Sağ-Sol Beyin Egzersizi
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Beyin yarıkürelerinizi dengeleyin ve senkronize edin
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full">
                  Gelişmiş
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full">
                  Önerilen
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  Bu egzersiz, beyninizin sağ ve sol yarıkürelerini aynı anda
                  çalıştırarak bilişsel performansınızı artırır. Mantık ve
                  yaratıcılığı birleştiren özel aktivitelerle beyninizi
                  güçlendirin.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>10-15 dakika</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Beyin Senkronizasyonu</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>Seviye: Orta</span>
                  </div>
                </div>

                <Link
                  href="/sagsol"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Egzersizi Başlat
                </Link>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-2xl flex items-center justify-center">
                    <GiBrain className="w-24 h-24 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Özel Etkinlikler Kartı */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Özel Etkinlikler
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Kişiselleştirilmiş hafıza geliştirme aktiviteleri
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 text-sm font-medium rounded-full">
                  Özel
                </span>
                <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-sm font-medium rounded-full">
                  Premium
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  Size özel hazırlanmış hafıza etkinlikleri ile kişisel gelişim
                  hedeflerinize ulaşın. İlerleme durumunuza göre uyarlanmış
                  egzersizler ve detaylı performans analizleri.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>15-20 dakika</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Kişisel Gelişim</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>Seviye: İleri</span>
                  </div>
                </div>

                <Link
                  href="/hafizaet"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Etkinlikleri Keşfet
                </Link>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 rounded-2xl flex items-center justify-center">
                    <Star className="w-24 h-24 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gelecek Egzersizler için Yer Tutucu */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Daha fazla hafıza egzersizi yakında eklenecek...
          </p>
        </div>
      </div>
    </div>
  );
}
