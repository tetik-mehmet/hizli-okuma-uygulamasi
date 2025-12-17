"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Info,
  Zap,
  Target,
  Timer,
  Pause,
  Play,
  ArrowLeft,
} from "lucide-react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

const kelimeler = [
  // Mevcut kelimeler
  "kitap",
  "hızlı",
  "okuma",
  "egzersiz",
  "gelişim",
  "beyin",
  "odak",
  "zihin",
  "kelime",
  "antrenman",
  "göz",
  "algı",
  "hız",
  "pratik",
  "dikkat",
  "okuyucu",
  "metin",
  "paragraf",
  "cümle",
  "süre",

  // Yeni eklenen kelimeler - genel kategoriler
  "bilgi",
  "öğrenme",
  "eğitim",
  "başarı",
  "motivasyon",
  "hedef",
  "plan",
  "strateji",
  "teknik",
  "yöntem",
  "beceri",
  "yetenek",
  "güç",
  "enerji",
  "dinamik",
  "aktif",
  "yaratıcı",
  "yenilikçi",
  "modern",
  "gelişmiş",
  "profesyonel",
  "uzman",
  "usta",

  // Doğa ve çevre
  "doğa",
  "çevre",
  "yeşil",
  "mavi",
  "güneş",
  "ay",
  "yıldız",
  "bulut",
  "rüzgar",
  "yağmur",
  "deniz",
  "okyanus",
  "dağ",
  "orman",
  "çiçek",
  "ağaç",
  "kuş",
  "balık",

  // Duygular ve hisler
  "mutluluk",
  "sevinç",
  "neşe",
  "gülümseme",
  "kahkaha",
  "umut",
  "güven",
  "cesaret",
  "kararlılık",
  "azim",
  "sabır",
  "sakinlik",
  "huzur",
  "sakin",
  "rahat",
  "keyif",

  // Hareket ve aktivite
  "koşu",
  "yürüyüş",
  "dans",
  "müzik",
  "ritim",
  "hareket",
  "spor",
  "fitness",
  "yoga",
  "meditasyon",
  "nefes",
  "konsantrasyon",
  "odaklanma",
  "gözlem",
  "analiz",

  // Teknoloji ve bilim
  "teknoloji",
  "bilim",
  "araştırma",
  "keşif",
  "buluş",
  "inovasyon",
  "dijital",
  "siber",
  "robot",
  "yapay",
  "zeka",
  "algoritma",
  "veri",
  "bilgi",
  "sistem",

  // Sanat ve kültür
  "sanat",
  "kültür",
  "tarih",
  "geçmiş",
  "gelecek",
  "şimdi",
  "an",
  "zaman",
  "müze",
  "galeri",
  "sergi",
  "performans",
  "gösteri",
  "festival",
  "kutlama",

  // İnsan ilişkileri
  "arkadaş",
  "aile",
  "toplum",
  "birlik",
  "dayanışma",
  "yardım",
  "destek",
  "sevgi",
  "dostluk",
  "güven",
  "saygı",
  "anlayış",
  "empati",
  "hoşgörü",
  "barış",
  "huzur",

  // Meslek ve iş
  "meslek",
  "iş",
  "kariyer",
  "başarı",
  "çalışma",
  "üretim",
  "yaratıcılık",
  "liderlik",
  "takım",
  "grup",
  "organizasyon",
  "proje",
  "görev",
  "sorumluluk",

  // Mekan ve yer
  "ev",
  "okul",
  "üniversite",
  "kütüphane",
  "park",
  "bahçe",
  "sokak",
  "şehir",
  "ülke",
  "dünya",
  "evren",
  "galaksi",
  "gezegen",
  "yıldız",
  "güneş",
  "ay",
];

// İkili isim tamlamaları için yeni array
const ikiliTamlamalar = [
  "hızlı okuma",
  "kitap okuma",
  "göz egzersizi",
  "beyin antrenmanı",
  "odak gelişimi",
  "zihin egzersizi",
  "kelime oyunu",
  "metin analizi",
  "paragraf okuma",
  "cümle kurma",
  "süre yönetimi",
  "bilgi öğrenme",
  "eğitim sistemi",
  "başarı hikayesi",
  "motivasyon kaynağı",
  "hedef belirleme",
  "plan yapma",
  "strateji geliştirme",
  "teknik bilgi",
  "yöntem araştırma",
  "beceri geliştirme",
  "yetenek keşfi",
  "güç antrenmanı",
  "enerji kaynağı",
  "dinamik hareket",
  "aktif yaşam",
  "yaratıcı düşünce",
  "yenilikçi fikir",
  "modern teknoloji",
  "gelişmiş sistem",
  "profesyonel yaklaşım",
  "uzman görüşü",
  "usta çırak",
  "doğa sevgisi",
  "çevre koruma",
  "yeşil alan",
  "mavi gökyüzü",
  "güneş ışığı",
  "ay ışığı",
  "yıldız gecesi",
  "bulut şekli",
  "rüzgar sesi",
  "yağmur damlası",
  "deniz dalgası",
  "okyanus derinliği",
  "dağ zirvesi",
  "orman havası",
  "çiçek kokusu",
  "ağaç gölgesi",
  "kuş sesi",
  "balık yüzüşü",
  "mutluluk anı",
  "sevinç gözyaşı",
  "neşe kaynağı",
  "gülümseme yüzü",
  "kahkaha sesi",
  "umut ışığı",
  "güven duygusu",
  "cesaret gösterisi",
  "kararlılık hali",
  "azim gücü",
  "sabır taşı",
  "sakinlik hali",
  "huzur bulma",
  "sakin nefes",
  "rahat uyku",
  "keyif anı",
  "koşu yolu",
  "yürüyüş parkuru",
  "dans hareketi",
  "müzik ritmi",
  "ritim duygusu",
  "hareket kabiliyeti",
  "spor salonu",
  "fitness merkezi",
  "yoga matı",
  "meditasyon tekniği",
  "nefes egzersizi",
  "konsantrasyon gücü",
  "odaklanma becerisi",
  "gözlem yeteneği",
  "analiz sonucu",
  "teknoloji gelişimi",
  "bilim araştırması",
  "araştırma sonucu",
  "keşif yolculuğu",
  "buluş hikayesi",
  "inovasyon projesi",
  "dijital dünya",
  "siber güvenlik",
  "robot teknolojisi",
  "yapay zeka",
  "algoritma mantığı",
  "veri analizi",
  "bilgi sistemi",
  "sistem yönetimi",
  "sanat eseri",
  "kültür mirası",
  "tarih bilgisi",
  "geçmiş anı",
  "gelecek planı",
  "şimdi anı",
  "zaman yönetimi",
  "müze gezisi",
  "galeri sergisi",
  "sergi açılışı",
  "performans gösterisi",
  "gösteri programı",
  "festival havası",
  "kutlama töreni",
  "arkadaş grubu",
  "aile bağı",
  "toplum düzeni",
  "birlik ruhu",
  "dayanışma örneği",
  "yardım eli",
  "destek sistemi",
  "sevgi dolu",
  "dostluk bağı",
  "güven ortamı",
  "saygı duygusu",
  "anlayış gösterme",
  "empati kurma",
  "hoşgörü gösterme",
  "barış mesajı",
  "huzur bulma",
  "meslek seçimi",
  "iş hayatı",
  "kariyer planı",
  "başarı hikayesi",
  "çalışma ortamı",
  "üretim süreci",
  "yaratıcılık gücü",
  "liderlik özelliği",
  "takım ruhu",
  "grup çalışması",
  "organizasyon yapısı",
  "proje yönetimi",
  "görev dağılımı",
  "sorumluluk bilinci",
  "ev ortamı",
  "okul hayatı",
  "üniversite eğitimi",
  "kütüphane sessizliği",
  "park gezisi",
  "bahçe bakımı",
  "sokak temizliği",
  "şehir planlaması",
  "ülke yönetimi",
  "dünya barışı",
  "evren bilgisi",
  "galaksi keşfi",
  "gezegen araştırması",
  "yıldız ışığı",
  "güneş enerjisi",
  "ay yüzeyi",
];

const MIN_HIZ = 100;
const MAX_HIZ = 1000;

function getRandomPosition() {
  // Ekranın görünür alanında kalacak şekilde pozisyon hesapla
  // Üst ve sol kenarlardan minimum 15% uzaklık, alt ve sağ kenarlardan da minimum 15% uzaklık
  // İkili kelimeler için daha güvenli sınırlar
  const top = Math.random() * 50 + 25; // 25% - 75% arası
  const left = Math.random() * 50 + 25; // 25% - 80% arası

  return { top: `${top}%`, left: `${left}%` };
}

export default function HızlıOkumaEgzersizi() {
  const router = useRouter();
  const [basladi, setBasladi] = useState(false);
  const [bitis, setBitis] = useState(false);
  const [duraklatildi, setDuraklatildi] = useState(false);
  const [gosterilenKelime, setGosterilenKelime] = useState("");
  const [seciliSure, setSeciliSure] = useState(20);
  const [kalanSure, setKalanSure] = useState(20);
  const [gosterilenKelimeSayisi, setGosterilenKelimeSayisi] = useState(0);
  const [kelimePozisyon, setKelimePozisyon] = useState({
    top: "50%",
    left: "50%",
  });
  const [kelimeHizi, setKelimeHizi] = useState(250);
  // Yeni state'ler ekle
  const [tekKelimeGoster, setTekKelimeGoster] = useState(true);
  const [ciftKelimeGoster, setCiftKelimeGoster] = useState(true);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  // Window boyutlarını al
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Ses dosyasını önceden yükle ve hazırla
  const audioRef = useRef(null);
  const pauseAudioRef = useRef(null);
  const unpauseAudioRef = useRef(null);
  const cancelAudioRef = useRef(null);

  // Component yüklendiğinde ses dosyasını hazırla
  useEffect(() => {
    audioRef.current = new Audio("/butonsesi.mp3");
    audioRef.current.volume = 0.5;
    audioRef.current.preload = "auto"; // Ses dosyasını önceden yükle

    // Duraklat/Devam Et sesleri
    pauseAudioRef.current = new Audio("/sesler/pause.mp3");
    pauseAudioRef.current.volume = 0.6;
    pauseAudioRef.current.preload = "auto";

    unpauseAudioRef.current = new Audio("/sesler/unpause.mp3");
    unpauseAudioRef.current.volume = 0.6;
    unpauseAudioRef.current.preload = "auto";

    // İptal sesi
    cancelAudioRef.current = new Audio("/sesler/cancel.mp3");
    cancelAudioRef.current.volume = 0.6;
    cancelAudioRef.current.preload = "auto";

    // Ses dosyası yüklendiğinde hazır olduğunu işaretle
    audioRef.current.addEventListener("canplaythrough", () => {
      console.log("Ses dosyası hazır");
    });

    // Hata durumunda log
    audioRef.current.addEventListener("error", (error) => {
      console.log("Ses dosyası yüklenemedi:", error);
    });
  }, []);

  // Ses çalma fonksiyonu - optimize edilmiş
  const sesCal = () => {
    try {
      if (audioRef.current) {
        // Ses dosyası hazırsa hemen çal
        if (audioRef.current.readyState >= 2) {
          // HAVE_CURRENT_DATA
          audioRef.current.currentTime = 0; // Baştan başlat
          audioRef.current.play().catch((error) => {
            console.log("Ses çalınamadı:", error);
          });
        } else {
          // Ses dosyası henüz hazır değilse yükle ve çal
          audioRef.current.load();
          audioRef.current.addEventListener(
            "canplaythrough",
            () => {
              audioRef.current.play().catch((error) => {
                console.log("Ses çalınamadı:", error);
              });
            },
            { once: true }
          ); // Event listener'ı bir kez çalıştır
        }
      }
    } catch (error) {
      console.log("Ses yüklenemedi:", error);
    }
  };

  // Genel amaçlı ses çalma (ref ile)
  const sesCalGenel = (ref) => {
    try {
      if (ref.current) {
        if (ref.current.readyState >= 2) {
          ref.current.currentTime = 0;
          ref.current.play().catch((error) => {
            console.log("Ses çalınamadı:", error);
          });
        } else {
          ref.current.load();
          ref.current.addEventListener(
            "canplaythrough",
            () => {
              ref.current.play().catch((error) => {
                console.log("Ses çalınamadı:", error);
              });
            },
            { once: true }
          );
        }
      }
    } catch (error) {
      console.log("Ses yüklenemedi:", error);
    }
  };

  useEffect(() => {
    if (bitis) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [bitis]);

  // Ana timer useEffect'i
  useEffect(() => {
    let timer;

    if (basladi && !bitis && !duraklatildi) {
      timer = setInterval(() => {
        setKalanSure((prev) => {
          if (prev <= 1) {
            setBitis(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [basladi, bitis, duraklatildi]);

  // Kelime gösterme useEffect'i
  useEffect(() => {
    let kelimeInterval;

    if (basladi && !bitis && !duraklatildi) {
      kelimeInterval = setInterval(() => {
        let gosterilecekMetin;

        // Kullanıcının seçimlerine göre kelime seç
        if (tekKelimeGoster && ciftKelimeGoster) {
          // Her ikisi de seçiliyse rastgele
          const rastgeleSecim = Math.random();
          if (rastgeleSecim < 0.5) {
            gosterilecekMetin =
              ikiliTamlamalar[
                Math.floor(Math.random() * ikiliTamlamalar.length)
              ];
          } else {
            gosterilecekMetin =
              kelimeler[Math.floor(Math.random() * kelimeler.length)];
          }
        } else if (tekKelimeGoster && !ciftKelimeGoster) {
          // Sadece tek kelime
          gosterilecekMetin =
            kelimeler[Math.floor(Math.random() * kelimeler.length)];
        } else if (!tekKelimeGoster && ciftKelimeGoster) {
          // Sadece çift kelime
          gosterilecekMetin =
            ikiliTamlamalar[Math.floor(Math.random() * ikiliTamlamalar.length)];
        } else {
          // Hiçbiri seçili değilse varsayılan olarak tek kelime
          gosterilecekMetin =
            kelimeler[Math.floor(Math.random() * kelimeler.length)];
        }

        setGosterilenKelime(gosterilecekMetin);
        setGosterilenKelimeSayisi((prev) => prev + 1);
        setKelimePozisyon(getRandomPosition());
        setParticleCount((prev) => prev + 1);
      }, kelimeHizi);
    }

    return () => {
      if (kelimeInterval) clearInterval(kelimeInterval);
    };
  }, [
    basladi,
    bitis,
    duraklatildi,
    kelimeHizi,
    tekKelimeGoster,
    ciftKelimeGoster,
  ]);

  const egzersiziBaslat = () => {
    sesCal(); // Ses çal
    setBasladi(true);
    setBitis(false);
    setDuraklatildi(false);
    setKalanSure(seciliSure);
    setGosterilenKelimeSayisi(0);
    setGosterilenKelime("");
    setKelimePozisyon({ top: "50%", left: "50%" });
    setParticleCount(0);
  };

  const tekrarBaslat = () => {
    setBasladi(true);
    setBitis(false);
    setDuraklatildi(false);
    setKalanSure(seciliSure);
    setGosterilenKelimeSayisi(0);
    setGosterilenKelime("");
    setKelimePozisyon({ top: "50%", left: "50%" });
    setParticleCount(0);
  };

  const secimlereDon = () => {
    // İptal sesini çal
    sesCalGenel(cancelAudioRef);
    setBasladi(false);
    setBitis(false);
    setDuraklatildi(false);
    setKalanSure(seciliSure);
    setGosterilenKelimeSayisi(0);
    setGosterilenKelime("");
    setKelimePozisyon({ top: "50%", left: "50%" });
    setParticleCount(0);
  };

  const duraklatDevamEt = () => {
    const sonrakiDurum = !duraklatildi;
    if (sonrakiDurum) {
      // Duraklatıldı
      sesCalGenel(pauseAudioRef);
    } else {
      // Devam edildi
      sesCalGenel(unpauseAudioRef);
    }
    setDuraklatildi(sonrakiDurum);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Geri Dön Butonu - Sol üst köşe */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/panel")}
        className="fixed top-6 left-6 z-50 bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </motion.button>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * windowSize.width],
              y: [0, Math.random() * windowSize.height],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Karanlık mod butonunu kaldır */}

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={300}
            recycle={false}
            colors={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"]}
          />
        )}
      </AnimatePresence>

      {/* Seçim Ekranı */}
      <AnimatePresence>
        {!basladi && !bitis && (
          <motion.div
            key="secim"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="flex flex-col items-center gap-8 w-full max-w-2xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-8 w-full">
              <motion.div
                className="flex items-center gap-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Zap className="w-10 h-10 text-yellow-400 animate-pulse" />
                <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                  Hızlı Okuma Egzersizi
                </h1>
                <Target className="w-10 h-10 text-pink-400 animate-bounce" />
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Info className="w-8 h-8 text-white/80 cursor-pointer hover:text-yellow-400 transition-colors" />
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 p-4 rounded-2xl bg-black/80 backdrop-blur-xl text-white text-sm shadow-2xl border border-white/20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400">
                      Nasıl Oynanır?
                    </span>
                  </div>
                  Ekranda rastgele konumda kelimeler belirecek ve kısa
                  süreliğine görünecektir. Amaç, kelimeleri hızlıca okuyup
                  algılamaktır. Süre ve hız ayarlarını kendinize göre
                  seçebilirsiniz.
                </div>
              </motion.div>

              {/* Süre kartları */}
              <motion.div
                className="flex gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[15, 20, 30].map((sure, index) => (
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    key={sure}
                    onClick={() => setSeciliSure(sure)}
                    className={`relative px-8 py-6 rounded-2xl font-bold text-xl border-2 transition-all duration-300 overflow-hidden ${
                      seciliSure === sure
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300 shadow-2xl"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-md"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {seciliSure === sure && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-2">
                      <Timer className="w-5 h-5" />
                      {sure} saniye
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {/* Hız ayarı */}
              <motion.div
                className="w-full flex flex-col items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <label
                  htmlFor="hizBar"
                  className="mb-4 text-xl font-bold text-white flex items-center gap-2"
                >
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Kelime Kaybolma Hızı:{" "}
                  <span className="font-black text-yellow-400 text-2xl">
                    {kelimeHizi} ms
                  </span>
                </label>
                <div className="relative w-full max-w-md">
                  <input
                    id="hizBar"
                    type="range"
                    min={MIN_HIZ}
                    max={MAX_HIZ}
                    step={50}
                    value={kelimeHizi}
                    onChange={(e) => setKelimeHizi(Number(e.target.value))}
                    className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between w-full text-sm text-white/70 mt-2">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Hızlı
                    </span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-4 h-4 text-pink-400" />
                      Yavaş
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Kelime türü seçimi */}
              <motion.div
                className="w-full flex flex-col items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <label className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  Gösterilecek Kelime Türü:
                </label>
                <div className="flex gap-4">
                  {/* Tek Kelime Seçeneği */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTekKelimeGoster(!tekKelimeGoster)}
                    className={`relative px-6 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 ${
                      tekKelimeGoster
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-300 shadow-lg"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-md"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-current">
                        {tekKelimeGoster && (
                          <motion.div
                            className="w-2 h-2 bg-current rounded-full m-0.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          />
                        )}
                      </span>
                      Tek Kelime
                    </div>
                  </motion.button>

                  {/* Çift Kelime Seçeneği */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCiftKelimeGoster(!ciftKelimeGoster)}
                    className={`relative px-6 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 ${
                      ciftKelimeGoster
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300 shadow-lg"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-md"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-current">
                        {ciftKelimeGoster && (
                          <motion.div
                            className="w-2 h-2 bg-current rounded-full m-0.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          />
                        )}
                      </span>
                      İkili Tamlama
                    </div>
                  </motion.button>
                </div>

                {/* Uyarı mesajı */}
                {!tekKelimeGoster && !ciftKelimeGoster && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-yellow-400 text-sm font-medium mt-2 text-center"
                  >
                    ⚠️ En az bir kelime türü seçmelisiniz!
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                  y: -3,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={egzersiziBaslat}
                disabled={!tekKelimeGoster && !ciftKelimeGoster}
                className={`relative px-12 py-6 rounded-full font-black text-2xl shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group ${
                  !tekKelimeGoster && !ciftKelimeGoster
                    ? "bg-gray-500 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white hover:from-yellow-300 hover:via-orange-400 hover:to-pink-400"
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-7 h-7 animate-pulse" />
                  BAŞLA!
                  <Zap className="w-7 h-7 animate-pulse" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Oyun Ekranı */}
      <AnimatePresence>
        {basladi && !bitis && (
          <>
            {/* Kalan Süre - Sol üst köşeye taşındı */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed top-6 left-32 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 z-50"
            >
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-yellow-400" />
                {kalanSure}s
              </div>
            </motion.div>

            <motion.div
              key="oyun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-full h-full top-0 left-0 pointer-events-none"
            >
              {gosterilenKelime && !duraklatildi && (
                <motion.span
                  key={
                    gosterilenKelime + kelimePozisyon.top + kelimePozisyon.left
                  }
                  initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                  animate={{
                    scale: [0.3, 1.2, 1],
                    opacity: [0, 1, 1, 0],
                    rotate: [-20, 0, 0, 20],
                    filter: [
                      "blur(10px)",
                      "blur(0px)",
                      "blur(0px)",
                      "blur(10px)",
                    ],
                  }}
                  exit={{ scale: 0.3, opacity: 0, rotate: 20 }}
                  transition={{ duration: kelimeHizi / 1000 }}
                  className="select-none font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse"
                  style={{
                    position: "absolute",
                    ...kelimePozisyon,
                    transform: "translate(-50%, -50%)",
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
                    maxWidth: "80vw", // Ekran genişliğinin %80'i
                    maxHeight: "80vh", // Ekran yüksekliğinin %80'i
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    // Responsive font boyutu
                    fontSize: gosterilenKelime.length > 10 ? "3rem" : "4rem", // İkili kelimeler için daha küçük font
                    lineHeight: 1.2,
                    textAlign: "center",
                    wordBreak: "break-word",
                    // Kelime uzunluğuna göre dinamik boyutlandırma
                    ...(gosterilenKelime.length > 15 && {
                      fontSize: "2.5rem",
                      maxWidth: "70vw",
                      maxHeight: "70vh",
                    }),
                    ...(gosterilenKelime.length > 20 && {
                      fontSize: "2rem",
                      maxWidth: "60vw",
                      maxHeight: "60vh",
                    }),
                  }}
                >
                  {gosterilenKelime}
                </motion.span>
              )}
            </motion.div>

            {/* Duraklatıldı mesajı */}
            <AnimatePresence>
              {duraklatildi && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-xl px-8 py-6 rounded-2xl shadow-2xl border-2 border-white/20 z-50"
                >
                  <div className="flex items-center gap-3 text-white font-bold text-2xl">
                    <Pause className="w-8 h-8 text-yellow-400 animate-pulse" />
                    Egzersiz Duraklatıldı
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Eski kalan süre göstergesini kaldır */}

            {/* Kontrol butonları */}
            <div className="fixed top-8 right-8 flex gap-4 z-50">
              {/* Duraklat/Devam Et butonu */}
              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: duraklatildi ? "#10b981" : "#f59e0b",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={duraklatDevamEt}
                className={`px-6 py-4 rounded-full font-bold text-lg shadow-2xl transition cursor-pointer backdrop-blur-md border border-white/20 flex items-center gap-2 ${
                  duraklatildi
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                {duraklatildi ? (
                  <>
                    <Play className="w-5 h-5" />
                    Devam Et
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5" />
                    Duraklat
                  </>
                )}
              </motion.button>

              {/* İptal Et butonu */}
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: "#ef4444" }}
                whileTap={{ scale: 0.95 }}
                onClick={secimlereDon}
                className="px-6 py-4 rounded-full bg-red-500 text-white font-bold text-lg shadow-2xl hover:bg-red-600 transition cursor-pointer backdrop-blur-md border border-white/20"
              >
                İptal Et
              </motion.button>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Oyun Sonu */}
      <AnimatePresence>
        {bitis && (
          <motion.div
            key="sonuc"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -40 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
            className="flex flex-col items-center gap-8 mt-8 bg-white/10 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border-2 border-white/20 relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl flex items-center gap-3">
                  <Target className="w-10 h-10 text-green-400" />
                  Egzersiz Bitti!
                  <Target className="w-10 h-10 text-blue-400" />
                </h2>
              </motion.div>

              <motion.p
                className="text-2xl text-white font-bold text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Toplam gösterilen kelime/tamlama:{" "}
                <span className="font-black text-4xl bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  {gosterilenKelimeSayisi}
                </span>
              </motion.p>

              <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={tekrarBaslat}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl shadow-2xl hover:from-pink-400 hover:to-purple-400 transition-all duration-300 cursor-pointer"
                >
                  Tekrar Başlat
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={secimlereDon}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xl shadow-2xl hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 cursor-pointer"
                >
                  Seçimlere Dön
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }

        .slider::-moz-range-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }
      `}</style>
    </div>
  );
}
