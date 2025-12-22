"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Search, Sparkles } from "lucide-react";
import {
  FaBookOpen,
  FaRegLightbulb,
  FaRocket,
  FaStar,
  FaMagic,
  FaGift,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { checkPageAccess } from "@/lib/checkAccess";

const KitapOnerileri = () => {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Erişim kontrolü
    const accessCheck = checkPageAccess("/kitap-onerileri");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);

  const kitapVerileri = {
    "1.SINIF": [
      {
        kitap: "ÇİKOLATA SERİSİ",
        yazar: "ŞÜKRAN UZUN",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "KOLAY OKUTAN HECELİ HİKAYE SERİSİ",
        yazar: "ŞÜKRAN UZUN",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "Eğlenceli Oyunlarla İlk Okuma Kitaplarım",
        yazar: "SERPİL KAYA",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "2.SINIF": [
      {
        kitap: "AMA NEDEN ? OKUMA SERİSİ",
        yazar: "AYGÜN ASLAN",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "KANGAL TOROS SERİSİ",
        yazar: "MEHMET KARABULUT",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "2.-3.SINIF": [
      {
        kitap: "GÖKDENİZ DÜNYA TURUNDA",
        yazar: "VİLDAN ÖZDEMİR",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "3.SINIF": [
      {
        kitap: "MUCİT METE VE TAYFASI",
        yazar: "CELAL AKBAŞ",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "GİZEMLİ ÇARKIN PEŞİNDE",
        yazar: "KUZEY BULUT",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ŞUT VE GOL",
        yazar: "JEAN-CHARLES BERTHİ",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "3.-4.SINIF": [
      {
        kitap: "Kurtuluşun Kahramanları",
        yazar: "İSMAİL BİLGİN",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "BULUTLARA ŞİİR YAZAN ÇOCUK",
        yazar: "BEHİÇ AK",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "YAŞASIN Ç HARFİ KARDEŞLİĞİ",
        yazar: "BEHİÇ AK",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ALAADDİN'İN GEVEZE SU BORULARI",
        yazar: "BEHİÇ AK",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "4.SINIF": [
      {
        kitap: "TÜYLÜ BİR UZAYLI MACERASI",
        yazar: "SABRİ SAFİYE",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "AŞAĞİSTANBUL",
        yazar: "MELİS SENA YILMAZ",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ALİ CAVİD'E KARŞI",
        yazar: "İREM UŞAR",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ADA VE ADAM",
        yazar: "SEVİM AK",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "5.SINIF": [
      {
        kitap: "MOMO",
        yazar: "MİCHAEL ENDE",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ROBİT- PASLI BİR MACERA",
        yazar: "SHANE HEGARTY",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "TEHLİKENİN KOKUSU- GİZEMLİ YERALTI",
        yazar: "ABİE LONGSTAFF",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "6.SINIF": [
      {
        kitap: "İÇİMDEKİ MÜZİK",
        yazar: "SHARON M. DRAPER",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "İÇİMDEKİ MELODİ",
        yazar: "SHARON M. DRAPER",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "7.SINIF": [
      {
        kitap: "RÜZGARI DİZGİNLEYEN ÇOCUK",
        yazar: "BREYAN MEALER",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "SON ŞANS DURAĞI",
        yazar: "ÇİĞDEM SEZER",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    "8.SINIF": [
      {
        kitap: "KORSAN KIZLAR",
        yazar: "İSMET BERTAN",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
    LİSE: [
      {
        kitap: "BEYAZ GEMİ",
        yazar: "CENGİZ AYTMATOV",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ÇALIKUŞU",
        yazar: "REŞAT NURİ GÜNTEKİN",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "BİR BİLİM ADAMININ ROMANI",
        yazar: "OĞUZ ATAY",
        renk: "bg-white border-2 border-gray-200",
      },
      {
        kitap: "ESİR ŞEHRİN İNSANLARI",
        yazar: "KEMAL TAHİR",
        renk: "bg-white border-2 border-gray-200",
      },
    ],
  };

  // Sınıf başlık renkleri
  const sinifBaslikRenkleri = {
    "1.SINIF": "from-pink-400 to-rose-500",
    "2.SINIF": "from-yellow-400 to-orange-400",
    "2.-3.SINIF": "from-orange-400 to-amber-500",
    "3.SINIF": "from-green-400 to-emerald-500",
    "3.-4.SINIF": "from-blue-400 to-cyan-500",
    "4.SINIF": "from-indigo-400 to-blue-500",
    "5.SINIF": "from-purple-400 to-violet-500",
    "6.SINIF": "from-teal-400 to-cyan-500",
    "7.SINIF": "from-slate-400 to-gray-500",
    "8.SINIF": "from-gray-400 to-slate-500",
    LİSE: "from-zinc-400 to-gray-600",
  };

  const siniflar = Object.keys(kitapVerileri);

  const filteredKitaplar = Object.entries(kitapVerileri)
    .filter(([sinif]) => selectedGrade === "all" || sinif === selectedGrade)
    .flatMap(([sinif, kitaplar]) =>
      kitaplar
        .filter(
          (kitap) =>
            kitap.kitap.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kitap.yazar.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((kitap) => ({ ...kitap, sinif }))
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative"
            >
              <FaBookOpen className="w-20 h-20 text-indigo-600 mr-6" />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-3 -right-3"
              >
                <FaRegLightbulb className="w-10 h-10 text-yellow-500" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
                className="absolute -bottom-2 -left-2"
              >
                <FaMagic className="w-8 h-8 text-purple-500" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Kitap Önerileri
              </h1>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-lg text-gray-600 font-medium">
                  Hayal Gücünü Keşfet!
                </span>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            <FaRocket className="inline w-6 h-6 text-purple-500 mr-3" />
            <span className="text-indigo-700 font-semibold">
              Sınıf seviyenize uygun, eğlenceli ve öğretici kitaplar keşfedin!
            </span>
            <br />
            <span className="text-gray-700">
              Her yaş grubu için özel olarak seçilmiş harika kitaplar sizi
              bekliyor.
            </span>
            <FaGift className="inline w-5 h-5 text-pink-500 ml-3" />
          </motion.p>
        </div>

        {/* Filtreler */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Sınıf Filtresi */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                Sınıf Seçin
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg"
              >
                <option value="all">🎯 Tüm Sınıflar</option>
                {siniflar.map((sinif) => (
                  <option key={sinif} value={sinif}>
                    {sinif === "1.SINIF"
                      ? "🌟 1.SINIF"
                      : sinif === "LİSE"
                      ? "🎓 LİSE"
                      : `📚 ${sinif}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Arama */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Search className="w-5 h-5 mr-2 text-purple-600" />
                Kitap veya Yazar Ara
              </label>
              <input
                type="text"
                placeholder="🔍 Kitap adı veya yazar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Sınıf Kategorileri */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {siniflar.map((sinif, index) => {
            const kitaplar = kitapVerileri[sinif];
            const filteredKitaplarForGrade = kitaplar.filter(
              (kitap) =>
                kitap.kitap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kitap.yazar.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (selectedGrade !== "all" && selectedGrade !== sinif) return null;
            if (filteredKitaplarForGrade.length === 0) return null;

            return (
              <motion.div
                key={sinif}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/30"
              >
                {/* Sınıf Başlığı */}
                <div
                  className={`bg-gradient-to-r ${sinifBaslikRenkleri[sinif]} text-white p-4 relative overflow-hidden`}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -right-6 -top-6 w-12 h-12 bg-white/10 rounded-full"
                  />
                  <div className="flex items-center justify-between relative z-10">
                    <h2 className="text-lg font-bold flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <FaStar className="w-5 h-5 mr-2 text-yellow-300" />
                      </motion.div>
                      {sinif}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <motion.span
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                      >
                        {filteredKitaplarForGrade.length} 📚
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Kitaplar */}
                <div className="p-4 space-y-3">
                  {filteredKitaplarForGrade.map((kitap, kitapIndex) => (
                    <motion.div
                      key={`${sinif}-${kitapIndex}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: kitapIndex * 0.1,
                      }}
                      whileHover={{
                        scale: 1.02,
                        x: 8,
                        transition: { duration: 0.2 },
                      }}
                      className={`p-3 rounded-xl border-2 ${kitap.renk} cursor-pointer relative group hover:shadow-md transition-all duration-200`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-tight">
                            📖 {kitap.kitap}
                          </h3>
                          <p className="text-gray-600 text-xs">
                            ✍️ {kitap.yazar}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sonuç Bulunamadı */}
        {filteredKitaplar.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30"
          >
            <FaBookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              📚 Kitap Bulunamadı
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Arama kriterlerinize uygun kitap bulunamadı.
              <br />
              <span className="text-indigo-600 font-medium">
                Farklı anahtar kelimeler deneyebilir veya filtreleri
                değiştirebilirsiniz.
              </span>
            </p>
          </motion.div>
        )}

        {/* Alt Bilgi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center py-16 mb-8"
        >
          <div className="flex items-center justify-center space-x-4 text-gray-500">
            <FaRegLightbulb className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Her kitap yeni bir macera!</span>
            <FaStar className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Okumaya devam edin!</span>
            <FaMagic className="w-5 h-5 text-purple-500" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KitapOnerileri;
