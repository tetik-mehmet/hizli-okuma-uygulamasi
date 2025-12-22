"use client";

import { useState } from "react";
import Link from "next/link";

export default function OgrenciPaneliPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [assignments] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: `Ödev ${index + 1}`,
    }))
  );

  // Kitap okuma takibi
  const [pagesRead, setPagesRead] = useState(0);
  const [readingGoal] = useState(20); // Günlük hedef
  const [readingStreak, setReadingStreak] = useState(0); // Okuma serisi
  const [lastReadDate, setLastReadDate] = useState(new Date().toDateString());

  // Kupalar ve madalyalar verisi
  const [achievements] = useState([
    {
      id: 1,
      type: "cup",
      title: "Hızlı Okuyucu",
      description: "5 ödevi tamamladın!",
      icon: "🏆",
      color: "from-yellow-400 to-orange-500",
      unlocked: false,
      progress: 0,
    },
    {
      id: 2,
      type: "medal",
      title: "Kelime Ustası",
      description: "100 kelimeyi doğru okudun!",
      icon: "🥇",
      color: "from-yellow-300 to-yellow-600",
      unlocked: false,
      progress: 0,
    },
    {
      id: 3,
      type: "medal",
      title: "Hafıza Şampiyonu",
      description: "Hafıza oyunlarında başarılısın!",
      icon: "🥈",
      color: "from-gray-300 to-gray-600",
      unlocked: false,
      progress: 0,
    },
    {
      id: 4,
      type: "cup",
      title: "Odaklanma Ustası",
      description: "30 dakika odaklanarak çalıştın!",
      icon: "🏆",
      color: "from-blue-400 to-blue-600",
      unlocked: false,
      progress: 0,
    },
    {
      id: 5,
      type: "medal",
      title: "Dilbilgisi Uzmanı",
      description: "Tüm dilbilgisi kurallarını öğrendin!",
      icon: "🥉",
      color: "from-orange-300 to-orange-600",
      unlocked: false,
      progress: 0,
    },
    {
      id: 6,
      type: "cup",
      title: "Çoklu Görev Ustası",
      description: "3 farklı alanda uzmanlaştın!",
      icon: "🏆",
      color: "from-purple-400 to-purple-600",
      unlocked: false,
      progress: 0,
    },
  ]);

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  function resetAll() {
    setFirstName("");
    setLastName("");
  }

  // Kitap okuma fonksiyonları
  function addPages(pages) {
    setPagesRead((prev) => prev + pages);

    // Okuma serisini kontrol et
    const today = new Date().toDateString();
    if (today === lastReadDate) {
      setReadingStreak((prev) => prev + 1);
    } else {
      setReadingStreak(1);
      setLastReadDate(today);
    }
  }

  function resetReading() {
    setPagesRead(0);
    setReadingStreak(0);
  }

  // Okuma hedefi yüzdesi
  const readingProgress = Math.min((pagesRead / readingGoal) * 100, 100);

  // Motivasyon mesajları
  const getMotivationMessage = () => {
    if (pagesRead === 0)
      return "Bugün henüz kitap okumadın. Hadi başlayalım! 📚";
    if (pagesRead < 5)
      return "Küçük adımlar büyük yolculukların başlangıcıdır! 🌱";
    if (pagesRead < 10) return "Harika gidiyorsun! Devam et! 🚀";
    if (pagesRead < 15) return "Çok yaklaştın! Son bir hamle! 💪";
    if (pagesRead >= readingGoal) return "Mükemmel! Bugünkü hedefini aştın! 🎉";
    return "Harika bir iş çıkarıyorsun! 📖";
  };

  // Okuma seviyesi
  const getReadingLevel = () => {
    if (pagesRead === 0)
      return { level: "Yeni Başlayan", icon: "🌱", color: "text-gray-500" };
    if (pagesRead < 5)
      return { level: "Çırak Okuyucu", icon: "📖", color: "text-blue-500" };
    if (pagesRead < 10)
      return { level: "Acemi Okuyucu", icon: "📚", color: "text-green-500" };
    if (pagesRead < 15)
      return {
        level: "Deneyimli Okuyucu",
        icon: "🎯",
        color: "text-orange-500",
      };
    if (pagesRead < 20)
      return { level: "Uzman Okuyucu", icon: "🏆", color: "text-purple-500" };
    return { level: "Kitap Kurdu", icon: "👑", color: "text-yellow-600" };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-orange-100 p-4 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
            Öğrenci Paneli
          </h1>
          <p className="text-gray-600">
            Ödevleri hızlıca oluştur ve öğrenciye ata.
          </p>
        </div>

        {/* Ana Grid Layout - 2 Sütun */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Sol Sütun */}
          <div className="space-y-6">
            {/* Öğrenci Bilgisi */}
            <section className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Öğrenci Bilgisi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ad"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Soyad"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center justify-center rounded-lg bg-orange-500 text-white font-semibold px-4 py-2 hover:bg-orange-600 transition-colors"
                >
                  Temizle
                </button>
              </div>
              <div className="mt-4 text-gray-700">
                {fullName ? (
                  <span className="text-xl font-medium">
                    Hoş geldin,{" "}
                    <span className="text-orange-600 font-bold">
                      {fullName}
                    </span>
                    !
                  </span>
                ) : (
                  <span className="text-xl font-medium">Hoş geldin!</span>
                )}
              </div>
            </section>

            {/* Kitap Okuma Takibi - Kompakt Versiyon */}
            <section className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  📚 Kitap Okuma Takibi
                </h2>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    🔥 {readingStreak} Gün
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    🎯 {readingGoal} sayfa
                  </span>
                </div>
              </div>

              {/* Kompakt Okuma Kartı */}
              <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl p-4 mb-4 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">
                      {pagesRead}{" "}
                      <span className="text-lg">/ {readingGoal}</span>
                    </div>
                    <p className="text-xs text-purple-100">
                      {getMotivationMessage()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl">{getReadingLevel().icon}</div>
                    <div
                      className={`text-xs font-medium ${
                        getReadingLevel().color
                      }`}
                    >
                      {getReadingLevel().level}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/30 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-1000 ease-out"
                    style={{ width: `${readingProgress}%` }}
                  ></div>
                </div>
                <div className="text-center text-xs text-purple-100">
                  %{Math.round(readingProgress)} Tamamlandı
                </div>
              </div>

              {/* Hızlı Ekleme Butonları */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1, 2, 5, 10].map((pages) => (
                  <button
                    key={pages}
                    onClick={() => addPages(pages)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    +{pages}
                  </button>
                ))}
              </div>

              {/* Özel Butonlar */}
              <div className="flex gap-2">
                <button
                  onClick={() => addPages(1)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 text-sm"
                >
                  📖 1 Sayfa
                </button>
                <button
                  onClick={resetReading}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-2 px-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 text-sm"
                >
                  🔄 Sıfırla
                </button>
              </div>
            </section>

            {/* Ödevler */}
            <section className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Ödevler
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {assignments.map((assignment) => (
                  <Link
                    key={assignment.id}
                    href={`/odevler/odev${assignment.id}`}
                    className="block bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg p-4 text-center font-semibold hover:from-orange-500 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {assignment.title}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sağ Sütun */}
          <div className="space-y-6">
            {/* MEB Ücretsiz Kitap Kaynakları */}
            <section className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  📚 MEB Ücretsiz Kitap Kaynakları
                </h2>
                <p className="text-sm text-gray-600">
                  Milli Eğitim Bakanlığı tarafından yayınlanan kitapları
                  ücretsiz okuyabilirsiniz!
                </p>
              </div>

              {/* Ana Link Kartı */}
              <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-xl p-6 mb-4 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  📖
                </div>
                <div className="absolute bottom-0 left-0 text-4xl opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  🎓
                </div>

                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    🎯
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    MEB Türkçe EBA Kütüphanesi
                  </h3>
                  <p className="text-sm text-green-100 mb-4">
                    Kutup Yıldızı Masalları, Doğrucu Dosdoğrucu Davut ve daha
                    fazlası...
                  </p>

                  <a
                    href="https://turkce.eba.gov.tr/iceriklistesitab/okuma-kitaplari-249"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span className="text-lg mr-2">🚀</span>
                    <span>Kitapları Keşfet</span>
                  </a>
                </div>
              </div>

              {/* Özellikler */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-3 text-center text-white">
                  <div className="text-2xl mb-1">📖</div>
                  <div className="text-xs font-bold">90+ Kitap</div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-3 text-center text-white">
                  <div className="text-2xl mb-1">🎓</div>
                  <div className="text-xs font-bold">Ücretsiz</div>
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-3 text-center text-white">
                  <div className="text-2xl mb-1">🏛️</div>
                  <div className="text-xs font-bold">Resmi</div>
                </div>
              </div>
            </section>

            {/* Kupalar ve Madalyalar */}
            <section className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  🏆 Kupalar & Madalyalar
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {achievements.filter((a) => a.unlocked).length} Kazanıldı
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {achievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`relative group ${
                      achievement.unlocked
                        ? "transform hover:scale-105 transition-all duration-300"
                        : "opacity-70"
                    }`}
                  >
                    <div
                      className={`
                      relative bg-gradient-to-br ${achievement.color} 
                      rounded-lg p-3 text-center shadow-lg
                      ${achievement.unlocked ? "animate-pulse" : "grayscale"}
                      hover:shadow-xl transition-all duration-300
                    `}
                    >
                      <div className="text-3xl mb-2 transform group-hover:rotate-12 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <h3 className="text-xs font-bold text-white mb-1 drop-shadow-lg">
                        {achievement.title}
                      </h3>
                      <p className="text-white/90 text-xs drop-shadow-md">
                        {achievement.description}
                      </p>
                      {achievement.unlocked ? (
                        <div className="absolute top-1 right-1 text-white text-lg animate-bounce">
                          ✨
                        </div>
                      ) : (
                        <div className="absolute top-1 right-1 text-white/80 text-lg">
                          🔒
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* İstatistikler */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-2 text-center text-white">
                  <div className="text-lg font-bold">
                    {achievements.filter((a) => a.type === "cup").length}
                  </div>
                  <div className="text-xs">Kupa</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-lg p-2 text-center text-white">
                  <div className="text-lg font-bold">
                    {achievements.filter((a) => a.type === "medal").length}
                  </div>
                  <div className="text-xs">Madalya</div>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-2 text-center text-white">
                  <div className="text-lg font-bold">
                    {achievements.filter((a) => a.unlocked).length}
                  </div>
                  <div className="text-xs">Kazanılan</div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Alt Kısım - Tam Genişlik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* İstatistik Kartları */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              📊 Okuma İstatistikleri
            </h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3 text-center text-white">
                <div className="text-2xl font-bold">{pagesRead}</div>
                <div className="text-sm">Bugün Okunan</div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-3 text-center text-white">
                <div className="text-2xl font-bold">{readingStreak}</div>
                <div className="text-sm">Günlük Seri</div>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-3 text-center text-white">
                <div className="text-2xl font-bold">
                  {Math.round(readingProgress)}%
                </div>
                <div className="text-sm">Hedef Tamamlanma</div>
              </div>
            </div>
          </div>

          {/* Kitap Kategorileri */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              📚 Kitap Kategorileri
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "Masallar",
                  icon: "🧚",
                  color: "from-pink-400 to-pink-600",
                },
                {
                  name: "Romanlar",
                  icon: "📚",
                  color: "from-blue-400 to-blue-600",
                },
                {
                  name: "Şiirler",
                  icon: "✍️",
                  color: "from-purple-400 to-purple-600",
                },
                {
                  name: "Tarih",
                  icon: "🏛️",
                  color: "from-orange-400 to-orange-600",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${category.color} rounded-lg p-3 text-center text-white transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-xs font-medium">{category.name}</div>
                </div>
              ))}
            </div>

            {/* Kitap Önerileri Linki */}
            <div className="mt-4">
              <Link
                href="/kitap-onerileri"
                className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg p-4 text-center font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">📖</span>
                  <span>Kitap Önerileri</span>
                  <span className="text-xl">✨</span>
                </div>
                <p className="text-sm text-emerald-100 mt-1">
                  Yaş grubunuza uygun kitapları keşfedin
                </p>
              </Link>
            </div>
          </div>

          {/* Bilgi Notu */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              ℹ️ Bilgi
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <div className="text-xl">📖</div>
                  <div className="text-sm">
                    <strong>MEB EBA:</strong> Tüm kitaplar Milli Eğitim
                    Bakanlığı tarafından hazırlanmıştır.
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <div className="text-xl">🎯</div>
                  <div className="text-sm">
                    <strong>Günlük Hedef:</strong> {readingGoal} sayfa okuma
                    hedefi belirleyin.
                  </div>
                </div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 text-purple-800">
                  <div className="text-xl">🏆</div>
                  <div className="text-sm">
                    <strong>Başarılar:</strong> Okuma hedeflerinizi takip edin
                    ve ödülleri kazanın.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
