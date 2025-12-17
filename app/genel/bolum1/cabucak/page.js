"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const MIN_HIZ_MS = 150;
const MAX_HIZ_MS = 1200;

// Kısa kelime tamlamaları (2-3 kelime)
const kisaTamlamalar = [
  "hızlı okuma",
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
  "tarih bilgisi",
  "geçmiş anı",
  "gelecek planı",
  "şimdi anı",
  "zaman yönetimi",
  "müze gezisi",
  "kariyer planı",
  "başarı hikayesi",
  "çalışma ortamı",
  "üretim süreci",
  "ülke yönetimi",
  "dünya barışı",
  "evren bilgisi",
  "galaksi keşfi",
  "gezegen araştırması",
  "yıldız ışığı",
  "güneş enerjisi",
  "ay yüzeyi",
];

// Uzun cümleler
const cumleler = [
  "Bugün hava çok güzel, yürüyüşe çıkmak için harika bir zaman.",
  "Kısa süreli odaklanma, daha etkili öğrenmenin anahtarıdır.",
  "Her gün küçük adımlarla ilerlemek büyük sonuçlar doğurur.",
  "Düzenli egzersiz, zihinsel performansı olumlu etkiler.",
  "Zamanı iyi planlamak, verimi artırmanın pratik yoludur.",
  "Okurken satırların üzerinde gözlerin akmasına izin ver.",
  "Derin nefes al ve dikkati tek bir noktada toplamaya çalış.",
  "Hedeflerini netleştir, ölç ve düzenli aralıklarla gözden geçir.",
  "Göz kaslarını güçlendirmek okuma hızını doğrudan etkiler.",
  "Kısa molalar, uzun çalışma seanslarından daha verimlidir.",
  "Cümleyi tek bakışta algılamaya odaklanmayı dene.",
  "Odaklandığında zihnin daha az enerji harcar ve hızlanır.",
  "Zihnini ısıtmak için önce kolay egzersizlerle başla.",
  "Göz gezdirme tekniği, anlamayı kaybetmeden hız kazandırır.",
  "Tekrar etmek ustalığın yolunu açar.",
  "Kendine karşı nazik ol, ilerleme zaman alır.",
  "Gözlerini satırın ortasında sabitle ve alanı geniş gör.",
  "Hız ve anlama dengesini korumak her zaman önceliklidir.",
  "Konsantrasyon, pratikle güçlenen bir kas gibidir.",
  "Bir cümleyi tek bakışta yakalayabildiğinde hızın artar.",
];

export default function CabucakCumleEgzersizi() {
  const [basladi, setBasladi] = useState(false);
  const [duraklatildi, setDuraklatildi] = useState(false);
  const [bitis, setBitis] = useState(false);

  const [seciliSureSn, setSeciliSureSn] = useState(20);
  const [kalanSureSn, setKalanSureSn] = useState(20);
  const [hizMs, setHizMs] = useState(350);

  const [gosterilenMetin, setGosterilenMetin] = useState("");
  const [metinGorunur, setMetinGorunur] = useState(false);
  const [gosterimSayisi, setGosterimSayisi] = useState(0);
  const [metinTuru, setMetinTuru] = useState("tamlama"); // "tamlama" veya "cumle"

  const sureTimerRef = useRef(null);
  const cumleIntervalRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Ses referansları
  const startAudioRef = useRef(null);
  const pauseAudioRef = useRef(null);
  const unpauseAudioRef = useRef(null);
  const cancelAudioRef = useRef(null);

  // Ses dosyalarını hazırla
  useEffect(() => {
    startAudioRef.current = new Audio("/butonsesi.mp3");
    startAudioRef.current.volume = 0.5;
    startAudioRef.current.preload = "auto";

    pauseAudioRef.current = new Audio("/sesler/pause.mp3");
    pauseAudioRef.current.volume = 0.6;
    pauseAudioRef.current.preload = "auto";

    unpauseAudioRef.current = new Audio("/sesler/unpause.mp3");
    unpauseAudioRef.current.volume = 0.6;
    unpauseAudioRef.current.preload = "auto";

    cancelAudioRef.current = new Audio("/sesler/cancel.mp3");
    cancelAudioRef.current.volume = 0.6;
    cancelAudioRef.current.preload = "auto";
  }, []);

  // Genel amaçlı ses çalma yardımcı fonksiyonu
  const playAudio = (ref) => {
    try {
      if (ref.current) {
        if (ref.current.readyState >= 2) {
          ref.current.currentTime = 0;
          ref.current.play().catch((e) => console.log("Ses çalınamadı:", e));
        } else {
          ref.current.load();
          ref.current.addEventListener(
            "canplaythrough",
            () => {
              ref.current
                .play()
                .catch((e) => console.log("Ses çalınamadı:", e));
            },
            { once: true }
          );
        }
      }
    } catch (e) {
      console.log("Ses yüklenemedi:", e);
    }
  };

  // Ana timer ve cümle gösterme useEffect'i
  useEffect(() => {
    if (!basladi || bitis) return;

    // Kalan süre sayacı
    sureTimerRef.current = setInterval(() => {
      setKalanSureSn((prev) => {
        if (prev <= 1) {
          setBitis(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Metin gösterme döngüsü - sadece duraklatılmadığında çalışır
    if (!duraklatildi) {
      const runTick = () => {
        let yeniMetin;
        let yeniMetinTuru;

        // Karışık olarak hem tamlamalar hem cümleler gelsin
        const rastgeleSecim = Math.random();
        if (rastgeleSecim < 0.6) {
          // %60 ihtimalle kısa tamlamalar
          yeniMetin =
            kisaTamlamalar[Math.floor(Math.random() * kisaTamlamalar.length)];
          yeniMetinTuru = "tamlama";
        } else {
          // %40 ihtimalle cümleler
          yeniMetin = cumleler[Math.floor(Math.random() * cumleler.length)];
          yeniMetinTuru = "cumle";
        }

        setGosterilenMetin(yeniMetin);
        setMetinTuru(yeniMetinTuru);
        setGosterimSayisi((p) => p + 1);
        setMetinGorunur(true);

        // Görünürlük süresi: hızın ~%65'i açık, sonra kapanır
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(
          () => setMetinGorunur(false),
          Math.max(120, Math.floor(hizMs * 0.65))
        );
      };

      // İlk metni hemen göster
      runTick();

      // Interval'ı başlat
      cumleIntervalRef.current = setInterval(runTick, hizMs);
    }

    return () => {
      if (sureTimerRef.current) clearInterval(sureTimerRef.current);
      if (cumleIntervalRef.current) clearInterval(cumleIntervalRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [basladi, bitis, duraklatildi, hizMs]);

  // Hız değiştiğinde interval'ı yeniden başlat
  useEffect(() => {
    if (!basladi || bitis || duraklatildi) return;

    // Mevcut interval'ı temizle
    if (cumleIntervalRef.current) clearInterval(cumleIntervalRef.current);

    // Yeni hızla interval'ı başlat
    const runTick = () => {
      let yeniMetin;
      let yeniMetinTuru;

      // Karışık olarak hem tamlamalar hem cümleler gelsin
      const rastgeleSecim = Math.random();
      if (rastgeleSecim < 0.6) {
        // %60 ihtimalle kısa tamlamalar
        yeniMetin =
          kisaTamlamalar[Math.floor(Math.random() * kisaTamlamalar.length)];
        yeniMetinTuru = "tamlama";
      } else {
        // %40 ihtimalle cümleler
        yeniMetin = cumleler[Math.floor(Math.random() * cumleler.length)];
        yeniMetinTuru = "cumle";
      }

      setGosterilenMetin(yeniMetin);
      setMetinTuru(yeniMetinTuru);
      setGosterimSayisi((p) => p + 1);
      setMetinGorunur(true);

      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(
        () => setMetinGorunur(false),
        Math.max(120, Math.floor(hizMs * 0.65))
      );
    };

    runTick();
    cumleIntervalRef.current = setInterval(runTick, hizMs);

    return () => {
      if (cumleIntervalRef.current) clearInterval(cumleIntervalRef.current);
    };
  }, [hizMs]);

  const egzersiziBaslat = () => {
    playAudio(startAudioRef);
    setBasladi(true);
    setDuraklatildi(false);
    setBitis(false);
    setKalanSureSn(seciliSureSn);
    setGosterimSayisi(0);
    setGosterilenMetin("");
    setMetinGorunur(false);
    setMetinTuru("tamlama");
  };

  const tekrarBaslat = () => {
    setBasladi(true);
    setDuraklatildi(false);
    setBitis(false);
    setKalanSureSn(seciliSureSn);
    setGosterimSayisi(0);
    setGosterilenMetin("");
    setMetinGorunur(false);
    setMetinTuru("tamlama");
  };

  const secimlereDon = () => {
    playAudio(cancelAudioRef);
    setBasladi(false);
    setDuraklatildi(false);
    setBitis(false);
    setKalanSureSn(seciliSureSn);
    setGosterimSayisi(0);
    setGosterilenMetin("");
    setMetinGorunur(false);
    setMetinTuru("tamlama");
    if (sureTimerRef.current) clearInterval(sureTimerRef.current);
    if (cumleIntervalRef.current) clearInterval(cumleIntervalRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const duraklatDevamEt = () => {
    const yeniDuraklatildi = !duraklatildi;
    if (yeniDuraklatildi) {
      playAudio(pauseAudioRef);
    } else {
      playAudio(unpauseAudioRef);
    }
    setDuraklatildi(yeniDuraklatildi);

    if (yeniDuraklatildi) {
      // Duraklatıldığında interval'ları temizle
      if (cumleIntervalRef.current) clearInterval(cumleIntervalRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      setMetinGorunur(false);
    } else {
      // Devam edildiğinde interval'ı yeniden başlat
      const runTick = () => {
        let yeniMetin;
        let yeniMetinTuru;

        // Karışık olarak hem tamlamalar hem cümleler gelsin
        const rastgeleSecim = Math.random();
        if (rastgeleSecim < 0.6) {
          // %60 ihtimalle kısa tamlamalar
          yeniMetin =
            kisaTamlamalar[Math.floor(Math.random() * kisaTamlamalar.length)];
          yeniMetinTuru = "tamlama";
        } else {
          // %40 ihtimalle cümleler
          yeniMetin = cumleler[Math.floor(Math.random() * cumleler.length)];
          yeniMetinTuru = "cumle";
        }

        setGosterilenMetin(yeniMetin);
        setMetinTuru(yeniMetinTuru);
        setGosterimSayisi((p) => p + 1);
        setMetinGorunur(true);

        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(
          () => setMetinGorunur(false),
          Math.max(120, Math.floor(hizMs * 0.65))
        );
      };

      runTick();
      cumleIntervalRef.current = setInterval(runTick, hizMs);
    }
  };

  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Geri Dön Butonu - Sol üst köşe */}
      <button
        onClick={() => router.push("/panel")}
        className="fixed top-6 left-6 z-50 bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg text-white font-bold text-sm border border-white/20 hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>
      {/* Seçim ekranı */}
      {!basladi && !bitis && (
        <div className="w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Çabucak Görelim
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Kısa kelime tamlamaları ve cümleler karışık olarak ekranın ortasında
            hızla görünüp kaybolacaktır.
          </p>

          {/* Süre seçimi */}
          <div className="flex justify-center gap-3 mb-8">
            {[15, 20, 30].map((sn) => (
              <button
                key={sn}
                onClick={() => setSeciliSureSn(sn)}
                className={`px-5 py-3 rounded-xl text-sm font-bold border transition ${
                  seciliSureSn === sn
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-indigo-400"
                    : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                }`}
              >
                {sn} sn
              </button>
            ))}
          </div>

          {/* Hız ayarı */}
          <div className="max-w-md mx-auto mb-8">
            <label
              htmlFor="hiz"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Gösterim Hızı: <span className="text-indigo-600">{hizMs} ms</span>
            </label>
            <input
              id="hiz"
              type="range"
              min={MIN_HIZ_MS}
              max={MAX_HIZ_MS}
              step={50}
              value={hizMs}
              onChange={(e) => setHizMs(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-indigo-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{MIN_HIZ_MS} ms</span>
              <span>{MAX_HIZ_MS} ms</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={egzersiziBaslat}
              className="px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 shadow-lg"
            >
              Başla
            </button>
          </div>
        </div>
      )}

      {/* Egzersiz ekranı */}
      {basladi && !bitis && (
        <>
          {/* Kalan süre */}
          <div className="fixed top-6 left-6 bg-black/60 text-white text-sm font-bold px-4 py-2 rounded-full shadow">
            {kalanSureSn}s
          </div>

          {/* Kontroller */}
          <div className="fixed top-6 right-6 flex gap-3">
            <button
              onClick={duraklatDevamEt}
              className={`px-5 py-3 rounded-full text-sm font-bold text-white shadow ${
                duraklatildi ? "bg-emerald-500" : "bg-amber-500"
              }`}
            >
              {duraklatildi ? "Devam Et" : "Duraklat"}
            </button>
            <button
              onClick={secimlereDon}
              className="px-5 py-3 rounded-full text-sm font-bold text-white bg-rose-500 shadow"
            >
              İptal Et
            </button>
          </div>

          {/* Merkez metin */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
            <div
              key={gosterilenMetin + String(metinGorunur)}
              className={`select-none text-center font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent transition-opacity duration-200`}
              style={{
                opacity: metinGorunur ? 1 : 0,
                textShadow: "0 0 22px rgba(99,102,241,0.35)",
                fontSize:
                  metinTuru === "tamlama"
                    ? "clamp(32px, 6vw, 64px)"
                    : "clamp(28px, 5vw, 56px)",
                lineHeight: 1.25,
                maxWidth: metinTuru === "tamlama" ? "40ch" : "68ch",
              }}
            >
              {gosterilenMetin}
            </div>
          </div>
        </>
      )}

      {/* Sonuç ekranı */}
      {bitis && (
        <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            Egzersiz Bitti
          </h2>
          <p className="text-gray-700 mb-6">
            Toplam gösterim:{" "}
            <span className="font-black text-indigo-600">{gosterimSayisi}</span>
            <br />
            <span className="text-sm text-gray-500">
              Karışık metinler gösterildi
            </span>
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={tekrarBaslat}
              className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-indigo-500 shadow"
            >
              Tekrar Başlat
            </button>
            <button
              onClick={secimlereDon}
              className="px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-800"
            >
              Seçimlere Dön
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
