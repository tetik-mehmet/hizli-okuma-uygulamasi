"use client";
import { useState, useEffect, useRef } from "react";

export default function KoseSayiHatirlama() {
  const [sayilar, setSayilar] = useState([1, 2, 3, 4]);
  const [skor, setSkor] = useState(0);
  const [oyunDurumu, setOyunDurumu] = useState("bekleme"); // 'bekleme', 'oyun', 'sonuc'
  const [hatirlananSayilar, setHatirlananSayilar] = useState([]);
  const [seviye, setSeviye] = useState(1);
  const [zamanlayici, setZamanlayici] = useState(0);
  const [seciliHiz, setSeciliHiz] = useState(2000); // Başlangıç hızı (ms)
  const [otomatikHizArtisi, setOtomatikHizArtisi] = useState(true); // Otomatik hız artışı
  const intervalRef = useRef(null);
  const sayiIntervalRef = useRef(null);

  // Hız seçenekleri (ms cinsinden)
  const hizSecenekleri = [
    {
      deger: 3000,
      etiket: "Yavaş (3 saniye)",
      renk: "from-green-400 to-green-600",
    },
    {
      deger: 2000,
      etiket: "Normal (2 saniye)",
      renk: "from-blue-400 to-blue-600",
    },
    {
      deger: 1500,
      etiket: "Hızlı (1.5 saniye)",
      renk: "from-yellow-400 to-yellow-600",
    },
    {
      deger: 1000,
      etiket: "Çok Hızlı (1 saniye)",
      renk: "from-red-400 to-red-600",
    },
    {
      deger: 500,
      etiket: "Ultra Hızlı (0.5 saniye)",
      renk: "from-purple-400 to-purple-600",
    },
  ];

  // Rastgele sayılar oluştur (1-10 arası, tekrar etmeyen)
  const rastgeleSayilarOlustur = () => {
    const tumSayilar = Array.from({ length: 10 }, (_, i) => i + 1); // 1'den 10'a
    const karisikSayilar = [];

    // 4 tane rastgele sayı seç
    for (let i = 0; i < 4; i++) {
      const rastgeleIndex = Math.floor(Math.random() * tumSayilar.length);
      karisikSayilar.push(tumSayilar[rastgeleIndex]);
      tumSayilar.splice(rastgeleIndex, 1); // Seçilen sayıyı listeden çıkar
    }

    return karisikSayilar;
  };

  // Sayıları karıştır
  const sayilariKaristir = () => {
    // Hem pozisyonları karıştır hem de yeni rastgele sayılar oluştur
    const yeniSayilar = rastgeleSayilarOlustur();
    setSayilar(yeniSayilar);
  };

  // Oyunu başlat
  const oyunuBaslat = () => {
    setOyunDurumu("oyun");
    setSkor(0);
    setSeviye(1);
    setZamanlayici(0);
    setHatirlananSayilar([]);

    // İlk rastgele sayıları oluştur
    setSayilar(rastgeleSayilarOlustur());

    // Seçilen hızda sayıları karıştır
    sayiIntervalRef.current = setInterval(sayilariKaristir, seciliHiz);

    // Zamanlayıcıyı başlat
    intervalRef.current = setInterval(() => {
      setZamanlayici((prev) => prev + 1);
    }, 1000);
  };

  // Oyunu durdur
  const oyunuDurdur = () => {
    setOyunDurumu("sonuc");
    if (sayiIntervalRef.current) clearInterval(sayiIntervalRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Hız değiştiğinde interval'ı güncelle
  useEffect(() => {
    if (oyunDurumu === "oyun" && sayiIntervalRef.current) {
      clearInterval(sayiIntervalRef.current);
      sayiIntervalRef.current = setInterval(sayilariKaristir, seciliHiz);
    }
  }, [seciliHiz, oyunDurumu]);

  // Otomatik hız artışı
  useEffect(() => {
    if (otomatikHizArtisi && oyunDurumu === "oyun" && sayiIntervalRef.current) {
      const hizArtisi = setInterval(() => {
        setSeciliHiz((prev) => {
          const yeniHiz = Math.max(200, prev - 50); // Minimum 200ms
          return yeniHiz;
        });
      }, 10000); // Her 10 saniyede bir hız artır

      return () => clearInterval(hizArtisi);
    }
  }, [otomatikHizArtisi, oyunDurumu]);

  // Sayı tahmin et
  const sayiTahminEt = (tahmin) => {
    if (oyunDurumu !== "oyun") return;

    const dogruSayilar = sayilar.filter(
      (sayi, index) => hatirlananSayilar[index] === sayi
    ).length;

    if (dogruSayilar === 4) {
      setSkor((prev) => prev + 10);
      setSeviye((prev) => prev + 1);

      // Otomatik hız artışı kapalıysa seviye bazlı hız artışı
      if (!otomatikHizArtisi) {
        if (sayiIntervalRef.current) clearInterval(sayiIntervalRef.current);
        const yeniHiz = Math.max(200, seciliHiz - 100);
        setSeciliHiz(yeniHiz);
        sayiIntervalRef.current = setInterval(sayilariKaristir, yeniHiz);
      }
    }
  };

  // Yeni oyun
  const yeniOyun = () => {
    setOyunDurumu("bekleme");
    setSayilar(rastgeleSayilarOlustur()); // Yeni rastgele sayılar
    setSkor(0);
    setSeviye(1);
    setZamanlayici(0);
    setHatirlananSayilar([]);
    setSeciliHiz(2000); // Hızı sıfırla
  };

  // Component unmount olduğunda interval'ları temizle
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sayiIntervalRef.current) clearInterval(sayiIntervalRef.current);
    };
  }, []);

  // Mevcut hızı saniye cinsinden göster
  const hiziGoster = (ms) => {
    return ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            Köşe Sayı Hatırlama
          </h1>
          <p className="text-lg text-indigo-600">
            Ortadaki noktaya odaklan ve köşelerdeki rastgele sayıları hatırla!
          </p>
        </div>

        {/* Hız Ayarları - Sadece bekleme durumunda göster */}
        {oyunDurumu === "bekleme" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-xl font-bold text-indigo-800 mb-4 text-center">
              Hız Ayarları
            </h3>

            {/* Hız Seçenekleri */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {hizSecenekleri.map((hiz, index) => (
                <button
                  key={index}
                  onClick={() => setSeciliHiz(hiz.deger)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    seciliHiz === hiz.deger
                      ? `bg-gradient-to-r ${hiz.renk} text-white border-transparent shadow-lg scale-105`
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-semibold">{hiz.etiket}</div>
                  <div className="text-sm opacity-80">
                    {hiziGoster(hiz.deger)} değişim
                  </div>
                </button>
              ))}
            </div>

            {/* Otomatik Hız Artışı */}
            <div className="flex items-center justify-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={otomatikHizArtisi}
                  onChange={(e) => setOtomatikHizArtisi(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">
                  Otomatik hız artışı (her 10 saniyede)
                </span>
              </label>
            </div>

            {/* Seçilen Hız Bilgisi */}
            <div className="text-center mt-4 p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm text-indigo-600 font-medium">
                Seçilen Hız: {hiziGoster(seciliHiz)}
              </span>
            </div>

            {/* Sayı Aralığı Bilgisi */}
            <div className="text-center mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-sm text-yellow-700 font-medium">
                Sayılar 1-10 arası rastgele seçilir ve her değişimde yenilenir
              </span>
            </div>
          </div>
        )}

        {/* Oyun Alanı */}
        <div className="flex justify-center mb-8">
          <div className="relative w-96 h-96 bg-white rounded-2xl shadow-2xl border-4 border-indigo-200">
            {/* Sol Üst Köşe */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {sayilar[0]}
            </div>

            {/* Sağ Üst Köşe */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {sayilar[1]}
            </div>

            {/* Sol Alt Köşe */}
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {sayilar[2]}
            </div>

            {/* Sağ Alt Köşe */}
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {sayilar[3]}
            </div>

            {/* Merkez Odak Noktası - Küçültüldü */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-600 rounded-full shadow-md flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Kesikli çember kaldırıldı */}
          </div>
        </div>

        {/* Kontrol Paneli */}
        <div className="text-center mb-8">
          {oyunDurumu === "bekleme" && (
            <button
              onClick={oyunuBaslat}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Oyunu Başlat
            </button>
          )}

          {oyunDurumu === "oyun" && (
            <div className="space-y-4">
              <div className="flex justify-center space-x-8 text-lg">
                <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                  <span className="font-semibold text-indigo-600">Seviye:</span>{" "}
                  {seviye}
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                  <span className="font-semibold text-indigo-600">Skor:</span>{" "}
                  {skor}
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                  <span className="font-semibold text-indigo-600">Süre:</span>{" "}
                  {zamanlayici}s
                </div>
              </div>

              {/* Mevcut Hız Göstergesi */}
              <div className="bg-white px-4 py-2 rounded-lg shadow-md inline-block">
                <span className="font-semibold text-indigo-600">
                  Mevcut Hız:
                </span>{" "}
                {hiziGoster(seciliHiz)}
              </div>

              <button
                onClick={oyunuDurdur}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl text-lg font-bold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Oyunu Bitir
              </button>
            </div>
          )}

          {oyunDurumu === "sonuc" && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                  Oyun Sonucu
                </h3>
                <div className="space-y-2 text-lg">
                  <p>
                    <span className="font-semibold">Final Skor:</span> {skor}
                  </p>
                  <p>
                    <span className="font-semibold">Ulaşılan Seviye:</span>{" "}
                    {seviye}
                  </p>
                  <p>
                    <span className="font-semibold">Toplam Süre:</span>{" "}
                    {zamanlayici} saniye
                  </p>
                  <p>
                    <span className="font-semibold">Başlangıç Hızı:</span>{" "}
                    {hiziGoster(seciliHiz)}
                  </p>
                </div>
              </div>

              <button
                onClick={yeniOyun}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl text-lg font-bold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Yeni Oyun
              </button>
            </div>
          )}
        </div>

        {/* Talimatlar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-indigo-800 mb-4">
            Nasıl Oynanır?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">1. Hız Seç</h4>
              <p>Oyun başlamadan önce istediğin hızı seç</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">2. Odaklan</h4>
              <p>Ortadaki mavi noktaya bak ve odaklan</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">
                3. Gözlemle
              </h4>
              <p>Köşelerdeki rastgele sayıların yer değiştirmesini izle</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">4. Hatırla</h4>
              <p>Sayıların son konumlarını aklında tut</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">5. Geliş</h4>
              <p>Otomatik hız artışı ile zorluk seviyesi artar</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">6. Zorluk</h4>
              <p>Sayılar 1-10 arası rastgele ve her değişimde yenilenir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
