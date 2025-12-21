"use client";

import { useState, useEffect } from "react";

// Türkçe kelimeler ve heceleri - ÇANKAYA ŞUBE KELİMELER
const kelimeler = [
  // 1 HECELİ KELİMELER
  {
    kelime: "Borç",
    heceler: ["Borç"],
  },
  {
    kelime: "Boy",
    heceler: ["Boy"],
  },
  {
    kelime: "Burs",
    heceler: ["Burs"],
  },
  {
    kelime: "Bant",
    heceler: ["Bant"],
  },
  {
    kelime: "Bal",
    heceler: ["Bal"],
  },
  {
    kelime: "Bar",
    heceler: ["Bar"],
  },
  {
    kelime: "Bay",
    heceler: ["Bay"],
  },
  {
    kelime: "Bek",
    heceler: ["Bek"],
  },
  {
    kelime: "Bel",
    heceler: ["Bel"],
  },
  {
    kelime: "Ben",
    heceler: ["Ben"],
  },
  {
    kelime: "Ber",
    heceler: ["Ber"],
  },
  {
    kelime: "Beş",
    heceler: ["Beş"],
  },
  {
    kelime: "Bey",
    heceler: ["Bey"],
  },
  {
    kelime: "Bil",
    heceler: ["Bil"],
  },
  {
    kelime: "Bin",
    heceler: ["Bin"],
  },
  {
    kelime: "Bir",
    heceler: ["Bir"],
  },
  {
    kelime: "Biz",
    heceler: ["Biz"],
  },
  {
    kelime: "Boz",
    heceler: ["Boz"],
  },
  {
    kelime: "Buğ",
    heceler: ["Buğ"],
  },
  {
    kelime: "Bul",
    heceler: ["Bul"],
  },
  {
    kelime: "Bun",
    heceler: ["Bun"],
  },
  {
    kelime: "Bur",
    heceler: ["Bur"],
  },
  {
    kelime: "Buş",
    heceler: ["Buş"],
  },
  {
    kelime: "Buy",
    heceler: ["Buy"],
  },
  {
    kelime: "Buz",
    heceler: ["Buz"],
  },

  // 2 HECELİ KELİMELER
  {
    kelime: "Kitap",
    heceler: ["Ki", "tap"],
  },
  {
    kelime: "Kalem",
    heceler: ["Ka", "lem"],
  },
  {
    kelime: "Bilgi",
    heceler: ["Bil", "gi"],
  },
  {
    kelime: "Başka",
    heceler: ["Baş", "ka"],
  },
  {
    kelime: "Büyük",
    heceler: ["Bü", "yük"],
  },
  {
    kelime: "Bakış",
    heceler: ["Ba", "kış"],
  },
  {
    kelime: "Bilim",
    heceler: ["Bi", "lim"],
  },
  {
    kelime: "Bölüm",
    heceler: ["Bö", "lüm"],
  },
  {
    kelime: "Bütün",
    heceler: ["Bü", "tün"],
  },
  {
    kelime: "Bakım",
    heceler: ["Ba", "kım"],
  },
  {
    kelime: "Bilgi",
    heceler: ["Bil", "gi"],
  },
  {
    kelime: "Bölge",
    heceler: ["Böl", "ge"],
  },
  {
    kelime: "Büyük",
    heceler: ["Bü", "yük"],
  },
  {
    kelime: "Bakış",
    heceler: ["Ba", "kış"],
  },
  {
    kelime: "Bilim",
    heceler: ["Bi", "lim"],
  },
  {
    kelime: "Bölüm",
    heceler: ["Bö", "lüm"],
  },
  {
    kelime: "Bütün",
    heceler: ["Bü", "tün"],
  },
  {
    kelime: "Bakım",
    heceler: ["Ba", "kım"],
  },

  // 3 HECELİ KELİMELER
  {
    kelime: "Benzersiz",
    heceler: ["Ben", "zer", "siz"],
  },
  {
    kelime: "Başyazı",
    heceler: ["Baş", "ya", "zı"],
  },
  {
    kelime: "Bergomat",
    heceler: ["Ber", "go", "mat"],
  },
  {
    kelime: "Öğrenci",
    heceler: ["Öğ", "ren", "ci"],
  },
  {
    kelime: "Bilgisayar",
    heceler: ["Bil", "gi", "sayar"],
  },
  {
    kelime: "Başarılı",
    heceler: ["Ba", "şa", "rılı"],
  },
  {
    kelime: "Büyüleyici",
    heceler: ["Bü", "yü", "leyici"],
  },
  {
    kelime: "Bakımlı",
    heceler: ["Ba", "kım", "lı"],
  },
  {
    kelime: "Bilimsel",
    heceler: ["Bi", "lim", "sel"],
  },
  {
    kelime: "Bölgesel",
    heceler: ["Bö", "lge", "sel"],
  },
  {
    kelime: "Bütünsel",
    heceler: ["Bü", "tün", "sel"],
  },
  {
    kelime: "Bakışlı",
    heceler: ["Ba", "kış", "lı"],
  },
  {
    kelime: "Bilgili",
    heceler: ["Bil", "gi", "li"],
  },
  {
    kelime: "Bölgeli",
    heceler: ["Böl", "ge", "li"],
  },
  {
    kelime: "Büyüklü",
    heceler: ["Bü", "yük", "lü"],
  },
  {
    kelime: "Bakımlı",
    heceler: ["Ba", "kım", "lı"],
  },
  {
    kelime: "Bilimli",
    heceler: ["Bi", "lim", "li"],
  },
  {
    kelime: "Bölümlü",
    heceler: ["Bö", "lüm", "lü"],
  },
  {
    kelime: "Bütünlü",
    heceler: ["Bü", "tün", "lü"],
  },
];

export default function HecelemePage() {
  const [currentKelimeIndex, setCurrentKelimeIndex] = useState(0);
  const [showHeceler, setShowHeceler] = useState(true);
  const [showKelime, setShowKelime] = useState(false);
  const [heceIndex, setHeceIndex] = useState(0);
  const [isCombining, setIsCombining] = useState(false);

  const currentKelime = kelimeler[currentKelimeIndex];

  // Yeni kelimeye geçiş
  const nextKelime = () => {
    setCurrentKelimeIndex((prev) => (prev + 1) % kelimeler.length);
    setShowHeceler(true);
    setShowKelime(false);
    setHeceIndex(0);
    setIsCombining(false);
  };

  // Önceki kelimeye geçiş
  const prevKelime = () => {
    setCurrentKelimeIndex(
      (prev) => (prev - 1 + kelimeler.length) % kelimeler.length
    );
    setShowHeceler(true);
    setShowKelime(false);
    setHeceIndex(0);
    setIsCombining(false);
  };

  // Heceleri tek tek göster
  useEffect(() => {
    if (showHeceler && heceIndex < currentKelime.heceler.length) {
      const timer = setTimeout(() => {
        setHeceIndex(heceIndex + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showHeceler && heceIndex >= currentKelime.heceler.length) {
      // Tüm heceler gösterildikten sonra birleşme animasyonunu başlat
      setTimeout(() => {
        setIsCombining(true);
        setTimeout(() => {
          setShowHeceler(false);
          setShowKelime(true);
          setIsCombining(false);
        }, 1500); // 1.5 saniye birleşme süresi
      }, 500);
    }
  }, [showHeceler, heceIndex, currentKelime.heceler.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <div className="text-center text-white mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Heceleme Alıştırması
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Kelimeleri hece hece öğrenelim!
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full">
        <div className="min-h-[300px] flex items-center justify-center mb-8 relative">
          {showHeceler && (
            <div className="flex justify-center items-center w-full">
              {currentKelime.heceler.slice(0, heceIndex).map((hece, index) => (
                <span
                  key={index}
                  className={`bg-gradient-to-br from-red-500 to-pink-500 text-white px-6 py-4 rounded-2xl text-2xl md:text-3xl font-bold shadow-lg transition-all duration-1500 ease-in-out ${
                    isCombining ? "hece-combine" : "hece-separate"
                  }`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: "heceAppear 0.5s ease-out",
                    transform: isCombining
                      ? "translateX(0)"
                      : `translateX(${
                          (index - (currentKelime.heceler.length - 1) / 2) * 200
                        }px)`,
                  }}
                >
                  {hece}
                </span>
              ))}
            </div>
          )}

          {showKelime && (
            <div className="animate-bounce">
              <span className="text-4xl md:text-5xl font-bold text-gray-800">
                {currentKelime.kelime}
              </span>
            </div>
          )}
        </div>

        <div className="text-center text-gray-600 mb-6">
          <p className="text-lg">
            Kelime: {currentKelimeIndex + 1} / {kelimeler.length}
          </p>
          <p className="text-lg">Heceler: {currentKelime.heceler.length}</p>
        </div>

        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={prevKelime}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            ← Önceki
          </button>
          <button
            onClick={nextKelime}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Sonraki →
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setShowHeceler(true);
              setShowKelime(false);
              setHeceIndex(0);
              setIsCombining(false);
            }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Tekrar Başlat
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes heceAppear {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .hece-separate {
          margin: 0 100px;
        }

        .hece-combine {
          margin: 0 5px;
        }
      `}</style>
    </div>
  );
}
