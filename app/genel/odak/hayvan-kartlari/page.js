"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const hayvanlar = [
  {
    id: 1,
    isim: "kanguru",
    resim: "/resimler/kanguru .png",
    heceler: ["kan", "gu", "ru"],
    bilgi:
      "Kangurular Avustralya'da yaşar ve yavrularını karınlarındaki keselerinde taşır. Bir zıplayışta 9 metre mesafe kat edebilirler!",
    ses: "/sesler/kanguru.mp3",
  },
  {
    id: 2,
    isim: "papağan",
    resim: "/resimler/papagan.png",
    heceler: ["pa", "pa", "ğan"],
    bilgi:
      "Papaganlar çok zeki kuşlardır ve insan seslerini taklit edebilirler. Bazı türleri 80 yıla kadar yaşayabilir!",
    ses: "/sesler/papagan.mp3",
  },
  {
    id: 3,
    isim: "kurbağa",
    resim: "/resimler/kurbaga.png",
    heceler: ["kur", "ba", "ğa"],
    bilgi:
      "Kurbağalar hem karada hem suda yaşayabilir. Derileri nemli olmalıdır ve yumurtalarını suya bırakırlar.",
    ses: "/sesler/kurbaga.mp3",
  },
  {
    id: 4,
    isim: "karınca",
    resim: "/resimler/karinca.png",
    heceler: ["ka", "rın", "ca"],
    bilgi:
      "Karıncalar çok çalışkan böceklerdir. Bir kolonide milyonlarca karınca bulunabilir ve hepsi birlikte çalışır!",
    ses: "/sesler/karinca.mp3",
  },
  {
    id: 5,
    isim: "zürafa",
    resim: "/resimler/zurafa.png",
    heceler: ["zü", "ra", "fa"],
    bilgi:
      "Zürafalar dünyanın en uzun hayvanlarıdır. Boyunları 2 metre uzunluğunda olabilir ve kalpleri çok güçlüdür!",
    ses: "/sesler/zurafa.mp3",
  },
  {
    id: 6,
    isim: "penguen",
    resim: "/resimler/penguen.png",
    heceler: ["pen", "gu", "en"],
    bilgi:
      "Penguenler uçamaz ama çok iyi yüzücüdürler. Antarktika'nın soğuk sularında balık avlayabilirler!",
    ses: "/sesler/penguen.mp3",
  },
  {
    id: 7,
    isim: "ahtapot",
    resim: "/resimler/ahtapot.png",
    heceler: ["ah", "ta", "pot"],
    bilgi:
      "Ahtapotlar çok zeki deniz canlılarıdır. 8 kolları vardır ve tehlike anında mürekkep püskürterek kaçabilirler!",
    ses: "/sesler/doldu.mp3", // Ahtapot sesi yok, doldu sesi kullanılıyor
  },
  {
    id: 8,
    isim: "kaplumbağa",
    resim: "/resimler/kaplumbaga.png",
    heceler: ["kap", "lum", "ba", "ğa"],
    bilgi:
      "Kaplumbağalar çok uzun ömürlü sürüngenlerdir. Bazı türleri 150 yıla kadar yaşayabilir ve kabukları ev olarak kullanır!",
    ses: "/sesler/kaplumbaga.mp3",
  },
  {
    id: 9,
    isim: "yarasa",
    resim: "/resimler/yarasa.png",
    heceler: ["ya", "ra", "sa"],
    bilgi:
      "Yarasalar memeli hayvanlardır ve uçabilen tek memeli türüdür. Karanlıkta yön bulmak için ses dalgalarını kullanırlar!",
    ses: "/sesler/yarasa.mp3",
  },
  {
    id: 10,
    isim: "baykuş",
    resim: "/resimler/baykus.png",
    heceler: ["bay", "kuş"],
    bilgi:
      "Baykuşlar gece avlanan yırtıcı kuşlardır. Çok keskin görüşleri vardır ve başlarını 270 derece döndürebilirler!",
    ses: "/sesler/baykus.mp3",
  },
  {
    id: 11,
    isim: "aslan",
    resim: "/resimler/aslan.png",
    heceler: ["as", "lan"],
    bilgi:
      "Aslanlar ormanın kralı olarak bilinir. Sosyal hayvanlardır ve sürü halinde yaşarlar. Erkek aslanların yelesi vardır!",
    ses: "/sesler/aslan.mp3",
  },
  {
    id: 12,
    isim: "yunus",
    resim: "/resimler/yunus.png",
    heceler: ["yu", "nus"],
    bilgi:
      "Yunuslar çok zeki deniz memelileridir. Ekolokasyon kullanarak yön bulurlar ve insanlarla iletişim kurabilirler!",
    ses: "/sesler/yunus.mp3",
  },
  {
    id: 13,
    isim: "kartal",
    resim: "/resimler/kartal.png",
    heceler: ["kar", "tal"],
    bilgi:
      "Kartallar çok güçlü yırtıcı kuşlardır. Çok keskin görüşleri vardır ve yüksekten avlarını tespit edebilirler!",
    ses: "/sesler/kartal.mp3",
  },
  {
    id: 14,
    isim: "goril",
    resim: "/resimler/goril.png",
    heceler: ["go", "ril"],
    bilgi:
      "Goriller insanlara en yakın hayvanlardan biridir. Çok güçlü ve zeki maymunlardır. Aile grupları halinde yaşarlar!",
    ses: "/sesler/goril.mp3",
  },
  {
    id: 15,
    isim: "geyik",
    resim: "/resimler/geyik.png",
    heceler: ["ge", "yik"],
    bilgi:
      "Geyikler zarif ve hızlı hayvanlardır. Erkek geyiklerin boynuzları vardır ve her yıl yenilenir!",
    ses: "/sesler/doe.mp3",
  },
  {
    id: 16,
    isim: "kertenkele",
    resim: "/resimler/kertenkele.png",
    heceler: ["ker", "ten", "ke", "le"],
    bilgi:
      "Kertenkeleler sürüngenlerdir ve çok hızlı hareket edebilirler. Tehlike anında kuyruklarını bırakıp kaçabilirler!",
    ses: "/sesler/kertenkele.mp3",
  },
  {
    id: 17,
    isim: "fare",
    resim: "/resimler/fare.png",
    heceler: ["fa", "re"],
    bilgi:
      "Fareler çok zeki kemirgenlerdir. Çok hızlı ürerler ve farklı ortamlarda yaşayabilirler!",
    ses: "/sesler/fare.mp3",
  },
  {
    id: 18,
    isim: "arı",
    resim: "/resimler/ari.png",
    heceler: ["a", "rı"],
    bilgi:
      "Arılar çok önemli böceklerdir. Çiçeklerden nektar toplar ve bal yaparlar. Bitkilerin tozlaşmasına yardım ederler!",
    ses: "/sesler/cancel.mp3", // Arı sesi yok, cancel sesi kullanılıyor
  },
  {
    id: 19,
    isim: "domuz",
    resim: "/resimler/domuz.png",
    heceler: ["do", "muz"],
    bilgi:
      "Domuzlar çok zeki çiftlik hayvanlarıdır. Çok iyi koku alırlar ve her şeyi yerler!",
    ses: "/sesler/domuz.mp3",
  },
  {
    id: 20,
    isim: "vatoz",
    resim: "/resimler/vatoz.png",
    heceler: ["va", "toz"],
    bilgi:
      "Vatozlar deniz tabanında yaşayan balıklardır. Çok geniş yüzgeçleri vardır ve zararsızdırlar!",
    ses: "/sesler/pause.mp3", // Vatoz sesi yok, pause sesi kullanılıyor
  },
  {
    id: 21,
    isim: "kirpi",
    resim: "/resimler/kirpi.png",
    heceler: ["kir", "pi"],
    bilgi:
      "Kirpiler dikenli memelilerdir. Tehlike anında top gibi olup dikenlerini çıkarırlar!",
    ses: "/sesler/unpause.mp3", // Kirpi sesi yok, unpause sesi kullanılıyor
  },
  {
    id: 22,
    isim: "kedi",
    resim: "/resimler/kedi.png",
    heceler: ["ke", "di"],
    bilgi:
      "Kediler evcil hayvanlardır. Çok temizdirler ve kendilerini yalayarak temizlerler!",
    ses: "/sesler/cancel.mp3", // Kedi sesi yok, cancel sesi kullanılıyor
  },
  {
    id: 23,
    isim: "köpek",
    resim: "/resimler/kopek.png",
    heceler: ["kö", "pek"],
    bilgi:
      "Köpekler insanın en iyi dostudur. Çok sadık ve zeki hayvanlardır. Farklı türleri vardır!",
    ses: "/sesler/kurt.mp3", // Köpek sesi yok, kurt sesi kullanılıyor
  },
  {
    id: 24,
    isim: "ceylan",
    resim: "/resimler/ceylan.png",
    heceler: ["cey", "lan"],
    bilgi:
      "Ceylanlar çok zarif ve hızlı hayvanlardır. Çöllerde yaşarlar ve çok az su ile hayatta kalabilirler!",
    ses: "/sesler/doe.mp3", // Ceylan sesi yok, geyik sesi kullanılıyor
  },
  {
    id: 25,
    isim: "inek",
    resim: "/resimler/inek.png",
    heceler: ["i", "nek"],
    bilgi:
      "İnekler çiftlik hayvanlarıdır. Süt verirler ve çok sakin hayvanlardır!",
    ses: "/sesler/inek.mp3",
  },
  {
    id: 26,
    isim: "kuzu",
    resim: "/resimler/kuzu.png",
    heceler: ["ku", "zu"],
    bilgi: "Kuzular genç koyunlardır. Çok sevimli ve yumuşak yünleri vardır!",
    ses: "/sesler/kuzu.mp3",
  },
  {
    id: 27,
    isim: "ayı",
    resim: "/resimler/ayi.png",
    heceler: ["a", "yı"],
    bilgi:
      "Ayılar çok güçlü memelilerdir. Kışın kış uykusuna yatarlar ve çok iyi balık avcılarıdır!",
    ses: "/sesler/ayi.mp3",
  },
  {
    id: 28,
    isim: "gergedan",
    resim: "/resimler/gergedan.png",
    heceler: ["ger", "ge", "dan"],
    bilgi:
      "Gergedanlar çok güçlü memelilerdir. Boynuzları vardır ve çok kalın derileri vardır!",
    ses: "/sesler/gergedan.mp3",
  },
  {
    id: 29,
    isim: "maymun",
    resim: "/resimler/maymun.png",
    heceler: ["may", "mun"],
    bilgi:
      "Maymunlar çok zeki primatlardır. Ağaçlarda yaşarlar ve çok sosyal hayvanlardır!",
    ses: "/sesler/maymun.mp3",
  },
  {
    id: 30,
    isim: "sincap",
    resim: "/resimler/sincap.png",
    heceler: ["sin", "cap"],
    bilgi:
      "Sincaplar çok sevimli kemirgenlerdir. Ağaçlarda yaşarlar ve fındık toplarlar!",
    ses: "/sesler/sincap.mp3",
  },
  {
    id: 31,
    isim: "kaplan",
    resim: "/resimler/kaplan.png",
    heceler: ["kap", "lan"],
    bilgi:
      "Kaplanlar çok güçlü yırtıcı kedilerdir. Çizgili desenleri vardır ve çok iyi avcılardır!",
    ses: "/sesler/kaplan.mp3",
  },
];

export default function HayvanKartlari() {
  const [currentHayvanIndex, setCurrentHayvanIndex] = useState(0);
  const [currentHecelerIndex, setCurrentHecelerIndex] = useState(-1);
  const [showBitisik, setShowBitisik] = useState(false);
  const [showBilgi, setShowBilgi] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentHayvan = hayvanlar[currentHayvanIndex];

  // Ses çalma fonksiyonu
  const playHayvanSesi = () => {
    if (audioRef.current && currentHayvan.ses) {
      audioRef.current.src = currentHayvan.ses;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Ses durma fonksiyonu
  const stopHayvanSesi = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Ses bittiğinde state'i güncelle
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, []);

  // Bilgi gösterildiğinde ses çal
  useEffect(() => {
    if (showBilgi && currentHayvan.ses) {
      playHayvanSesi();
    }
  }, [showBilgi, currentHayvan.ses]);

  // Hayvan değiştiğinde sesi durdur
  useEffect(() => {
    stopHayvanSesi();
  }, [currentHayvanIndex]);

  const handleIleri = () => {
    if (!isCompleted) {
      if (currentHecelerIndex < currentHayvan.heceler.length - 1) {
        setCurrentHecelerIndex(currentHecelerIndex + 1);
      } else if (!showBitisik) {
        setShowBitisik(true);
      } else if (!showBilgi) {
        setShowBilgi(true);
      } else {
        setIsCompleted(true);
      }
    } else {
      // Sonraki hayvana geç
      if (currentHayvanIndex < hayvanlar.length - 1) {
        setCurrentHayvanIndex(currentHayvanIndex + 1);
        resetHayvan();
      } else {
        // Tüm hayvanlar bitti, başa dön
        setCurrentHayvanIndex(0);
        resetHayvan();
      }
    }
  };

  const handleGeri = () => {
    if (showBilgi) {
      setShowBilgi(false);
      stopHayvanSesi();
    } else if (showBitisik) {
      setShowBitisik(false);
    } else if (currentHecelerIndex > 0) {
      setCurrentHecelerIndex(currentHecelerIndex - 1);
    }
  };

  const resetHayvan = () => {
    setCurrentHecelerIndex(-1);
    setShowBitisik(false);
    setShowBilgi(false);
    setIsCompleted(false);
    stopHayvanSesi();
  };

  const getDisplayText = () => {
    if (showBilgi) {
      return currentHayvan.bilgi;
    } else if (showBitisik) {
      return currentHayvan.isim;
    } else if (currentHecelerIndex >= 0) {
      // Heceler arasında her zaman boşluk bırak, sadece showBitisik true olduğunda birleş
      const heceler = currentHayvan.heceler.slice(0, currentHecelerIndex + 1);
      return heceler.join(" ");
    } else {
      return ""; // İlk başta hiçbir hece gösterilmez
    }
  };

  const getButtonText = () => {
    if (isCompleted) {
      return currentHayvanIndex < hayvanlar.length - 1
        ? "Sonraki Hayvan"
        : "Başa Dön";
    } else if (showBilgi) {
      return "Tamamla";
    } else if (showBitisik) {
      return "Bilgiyi Göster";
    } else if (currentHecelerIndex < 0) {
      return "İlk Heceyi Göster";
    } else if (currentHecelerIndex < currentHayvan.heceler.length - 1) {
      return "Sonraki Hece";
    } else {
      return "Heceleri Birleştir";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Audio element */}
      <audio ref={audioRef} preload="auto" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            Hayvan Kartları
          </h1>
          <p className="text-lg text-indigo-600">
            Hayvanları hece hece öğrenelim!
          </p>
          <div className="mt-4 text-sm text-indigo-500">
            {currentHayvanIndex + 1} / {hayvanlar.length} Hayvan
          </div>
        </div>

        {/* Ana Kart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Hayvan Resmi */}
          <div className="flex justify-center mb-8">
            <div className="relative w-80 h-80 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={currentHayvan.resim}
                alt={currentHayvan.isim}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Heceler</span>
              <span>Kelime</span>
              <span>Bilgi</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  showBilgi
                    ? "bg-green-500 w-full"
                    : showBitisik
                    ? "bg-blue-500 w-2/3"
                    : "bg-indigo-500"
                }`}
                style={{
                  width: showBilgi
                    ? "100%"
                    : showBitisik
                    ? "66.66%"
                    : `${
                        ((currentHecelerIndex + 1) /
                          currentHayvan.heceler.length) *
                        33.33
                      }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Metin Alanı */}
          <div className="text-center mb-8">
            <div className="min-h-[80px] flex items-center justify-center">
              {showBilgi ? (
                <div className="text-center">
                  <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-4">
                    {getDisplayText()}
                  </p>
                  {/* Ses Kontrol Butonu */}
                  {currentHayvan.ses && (
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={isPlaying ? stopHayvanSesi : playHayvanSesi}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                          isPlaying
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <span className="text-lg">⏸️</span>
                            Sesi Durdur
                          </>
                        ) : (
                          <>
                            <span className="text-lg">🔊</span>
                            Sesi Çal
                          </>
                        )}
                      </button>
                      <span className="text-sm text-gray-500">
                        {currentHayvan.isim} sesi
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl font-bold text-indigo-800 mb-4">
                    {getDisplayText()}
                  </div>
                  {!showBitisik && currentHecelerIndex >= 0 && (
                    <div className="text-sm text-gray-500">
                      {currentHecelerIndex + 1} / {currentHayvan.heceler.length}{" "}
                      hece
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Kontrol Butonları */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGeri}
              disabled={currentHecelerIndex === 0 && !showBitisik && !showBilgi}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentHecelerIndex === 0 && !showBitisik && !showBilgi
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600 active:scale-95"
              }`}
            >
              Geri
            </button>

            <button
              onClick={handleIleri}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg"
            >
              {getButtonText()}
            </button>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Her hayvan için heceleri tek tek öğrenin, sonra kelimeyi ve ilginç
            bilgileri keşfedin! Hayvan bilgisi gösterildiğinde ses de çalacak.
          </p>
        </div>
      </div>
    </div>
  );
}
