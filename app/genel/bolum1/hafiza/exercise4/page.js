"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Clock,
  CheckCircle,
  X,
  Play,
  RotateCcw,
  Brain,
} from "lucide-react";
import { checkPageAccess } from "@/lib/checkAccess";

// İlk logo seti için isimler (logolar1.png)
const LOGO_ISIMLERI_1 = [
  "GRATİS",
  "L'OREAL PARIS",
  "LAND ROVER",
  "GREYDER",
  "ÜLKER",
  "ASUS",
  "VAKKO",
  "ÇAĞDAŞ",
  "BEYMEN Club",
  "AVVA",
  "ONDOKUZ MAYIS ÜNİVERSİTESİ",
  "BİLKENT ÜNİVERSİTESİ",
];

// İkinci logo seti için isimler (logolar2.png)
const LOGO_ISIMLERI_2 = [
  "STAR TV",
  "TURKCELL",
  "BMW",
  "TOGG",
  "TÜRK TRAKTÖR",
  "YEMEKSEPETİ",
  "SÜTAŞ",
  "SAHİBİNDEN",
  "SAMSUNG",
  "WHATSAPP",
];

// Üçüncü logo seti için isimler (logolar3.png)
const LOGO_ISIMLERI_3 = [
  "BOĞAZİÇİ ÜNİVERSİTESİ",
  "BAŞKENT ÜNİVERSİTESİ",
  "GALATASARAY",
  "BEŞİKTAŞ",
  "BAHÇEŞEHİR KOLEJİ",
  "KÖFTECİ RAMİZ",
  "AUDİ",
  "SCANIA",
  "CHELSEA",
  "REAL MADRİD",
  "MEDİA MARKT",
  "LC WAIKIKI",
];

// Dördüncü logo seti için isimler (logolar4.png)
const LOGO_ISIMLERI_4 = [
  "YOUTUBE",
  "SPOTIFY",
  "ASELSAN",
  "HABER TÜRK",
  "FORD",
  "PASTANNECİM",
  "YUNUS",
  "TV8",
  "TOYOTA",
  "TAMER TANCA",
  "AİLE VE SOSYAL HİZMETLER BAKANLIĞI",
  "AKBANK",
  "ÇAYKUR RİZESPOR KULÜBÜ",
];

// Beşinci logo seti için isimler (logolar5.png)
const LOGO_ISIMLERI_5 = [
  "APPLE",
  "TÜRKİYE PETROLLERİ",
  "FERRARI",
  "PENTI",
  "ARMAĞAN",
  "MANGO",
  "TOMMY HILFIGER",
  "MKE ANKARAGÜCÜ",
  "ÇELİKLER HOLDİNG",
  "HİPNODİL AKADEMİ OFFICIAL",
  "VATAN COMPUTER",
];

// Altıncı logo seti için isimler (logolar6.png)
const LOGO_ISIMLERI_6 = [
  "DISNEY CHANNEL",
  "SONY",
  "CARTOON NETWORK",
  "MERCEDES-BENZ",
  "HUAWEI",
  "GRAND ANKARA HOTEL & CONVENTION CENTER",
  "JW MARRIOTT",
  "TÜRKHAVACILIK UZAYSANAYİİ",
  "ARABICA COFFEE HOUSE",
  "TORKU",
  "ANKARA ÜNİVERSİTESİ",
  "T.C. SAĞLIK BAKANLIĞI",
];

// Test için kullanılacak logo isimleri (her set için ayrı)
const TEST_ISIMLERI_1 = [
  "GRATİS",
  "SAMSUNG",
  "ONDOKUZ MAYIS ÜNİVERSİTESİ",
  "CAT",
  "ASUS",
  "LAND ROVER",
  "MİNİ COOPER",
  "VAKKO",
  "L'OREAL PARIS",
  "BİLKENT ÜNİVERSİTESİ",
  "AVVA",
  "GREYDER",
  "FLO",
  "OPEL",
  "ÜLKER",
  "FİLE",
  "ÇAĞDAŞ",
  "BEYMEN CLUB",
];

const TEST_ISIMLERI_2 = [
  "STAR TV",
  "TURKCELL",
  "BMW",
  "TOGG",
  "TÜRK TRAKTÖR",
  "YEMEKSEPETİ",
  "SÜTAŞ",
  "SAHİBİNDEN",
  "SAMSUNG",
  "WHATSAPP",
];

const TEST_ISIMLERI_3 = [
  "KOTON",
  "AUDİ",
  "BARCELONA",
  "MEDİA MARKT",
  "CHELSEA",
  "BOĞAZİÇİ ÜNİVERSİTESİ",
  "MAN",
  "TEKNOSA",
  "FENERBAHÇE",
  "GALATASARAY",
  "BAHÇEŞEHİR KOLEJİ",
  "KÖFTECİ YUSUF",
  "BEŞİKTAŞ",
  "VOLVO",
  "KÖFTECİ RAMİZ",
  "LC WAIKIKI",
  "OXXO",
  "ATILIM ÜNİVERSİTESİ",
  "BAŞKENT ÜNİVERSİTESİ",
  "SCANIA",
  "REAL MADRİD",
];

const TEST_ISIMLERI_4 = [
  "T.C. MİLLİ EĞİTİM BAKANLIĞI",
  "FORD",
  "INSTAGRAM",
  "AKBANK",
  "ÇAYKURRİZE SPOR",
  "TUSAŞ",
  "HONDA",
  "BİM",
  "T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI",
  "TAMER TANCA",
  "SPOTIFY",
  "YOUTUBE",
  "İNCİ",
  "TV8",
  "PASTANNECİM",
  "TOYOTA",
  "AKBANK",
  "BİM",
  "A-101",
  "YUNUS",
  "ASELSAN",
  "HABERTÜRK",
];

const TEST_ISIMLERI_5 = [
  "ANKARA ÜNİVERSİTESİ",
  "LİMAK HOLDİNG",
  "LACOSTE",
  "HİPNODİL AKADEMİ",
  "SHELL",
  "ASTON MARTİN",
  "APPLE",
  "BURGER KİNG",
  "ÇELİKLER HOLDİNG",
  "MKEANKARAGÜCÜ",
  "TOMMY HİLFİGER",
  "SAMSUNG TEKNOSA",
  "PENTİ",
  "BOYNER",
  "ARMAĞAN",
  "TÜRKİYE PETROLLERİ",
  "VATAN BİLGİSAYAR",
  "FERRARİ",
  "SEIKO",
  "HATEMOĞLU",
  "MANGO",
  "ALTINYILDIZ",
];

const TEST_ISIMLERI_6 = [
  "BMW",
  "TOSHIBA",
  "TÜRK HAVACILIK UZAY SANAYİİ",
  "MERCEDES-BENZ",
  "RİXOS",
  "GRAND MİDYAT HOTEL",
  "MİGROS",
  "GRAND ANKARA HOTEL",
  "TURKCELL",
  "MODERN 3D CONCEPT",
  "ANKARA ÜNİVERSİTESİ",
  "ÜLKER",
  "HUAWEİ",
  "TRT ÇOCUK",
  "ARABICA",
  "TORKU",
  "JW MARRIOT",
  "SONY",
  "T.C. SAĞLIK BAKANLIĞI",
  "FOXKİDS",
  "CARTOON NETWORK",
  "DİSNEP CHANNEL",
  "GOOGLE",
  "NETFLIX",
];

export default function Exercise4({ initialSet = 1 }) {
  const router = useRouter();
  const [currentPhase, setCurrentPhase] = useState("logoSelection"); // logoSelection, instructions, viewing, testing, results
  const [selectedLogoSet, setSelectedLogoSet] = useState(initialSet); // 1, 2, 3, 4, 5 veya 6
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedLogos, setSelectedLogos] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Giriş ve erişim kontrolü
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");

    // Giriş kontrolü
    if (!isLoggedIn || !authToken) {
      router.push("/login");
      return;
    }

    // Erişim kontrolü (free-trial kullanıcıları erişebilir)
    const accessCheck = checkPageAccess("/exercise4");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);

  // initialSet prop'u değiştiğinde selectedLogoSet'i güncelle
  useEffect(() => {
    setSelectedLogoSet(initialSet);
  }, [initialSet]);

  // initialSet prop'u verildiğinde doğrudan instructions aşamasına geç
  useEffect(() => {
    if (initialSet && initialSet !== 1) {
      setCurrentPhase("instructions");
    }
  }, [initialSet]);

  // Timer fonksiyonu
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentPhase === "viewing") {
      setCurrentPhase("testing");
      setIsTimerRunning(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isTimerRunning, currentPhase]);

  // Egzersizi başlat
  const startExercise = () => {
    setCurrentPhase("viewing");
    setTimeLeft(10);
    setIsTimerRunning(true);
    setSelectedLogos([]);
    setCorrectAnswers(0);
    setShowResults(false);
  };

  // Egzersizi sıfırla
  const resetExercise = () => {
    setCurrentPhase("instructions");
    setTimeLeft(10);
    setIsTimerRunning(false);
    setSelectedLogos([]);
    setCorrectAnswers(0);
    setShowResults(false);
    clearTimeout(timerRef.current);
  };

  // Logo seçimi
  const toggleLogoSelection = (logoName) => {
    setSelectedLogos((prev) =>
      prev.includes(logoName)
        ? prev.filter((name) => name !== logoName)
        : [...prev, logoName]
    );
  };

  // Logo seti seçimi
  const selectLogoSet = (setNumber) => {
    setSelectedLogoSet(setNumber);
    setCurrentPhase("instructions");
  };

  // Aktif logo isimlerini al
  const getActiveLogoIsimleri = () => {
    if (selectedLogoSet === 1) return LOGO_ISIMLERI_1;
    if (selectedLogoSet === 2) return LOGO_ISIMLERI_2;
    if (selectedLogoSet === 3) return LOGO_ISIMLERI_3;
    if (selectedLogoSet === 4) return LOGO_ISIMLERI_4;
    if (selectedLogoSet === 5) return LOGO_ISIMLERI_5;
    return LOGO_ISIMLERI_6;
  };

  // Aktif test isimlerini al
  const getActiveTestIsimleri = () => {
    if (selectedLogoSet === 1) return TEST_ISIMLERI_1;
    if (selectedLogoSet === 2) return TEST_ISIMLERI_2;
    if (selectedLogoSet === 3) return TEST_ISIMLERI_3;
    if (selectedLogoSet === 4) return TEST_ISIMLERI_4;
    if (selectedLogoSet === 5) return TEST_ISIMLERI_5;
    return TEST_ISIMLERI_6;
  };

  // Sonuçları hesapla
  const calculateResults = () => {
    const correctSelections = selectedLogos.filter((logo) =>
      getActiveLogoIsimleri().includes(logo)
    ).length;

    setCorrectAnswers(correctSelections);
    setShowResults(true);
    setCurrentPhase("results");
  };

  // Sonuçları göster
  const showResultsScreen = () => {
    setCurrentPhase("results");
  };

  return (
    <div className={`${initialSet ? 'min-h-0' : 'min-h-screen'} bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`}>
      <div className={`container mx-auto px-4 ${initialSet ? 'py-4' : 'py-8'}`}>
        {/* Başlık - Sadece standalone modda göster */}
        {!initialSet && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              Logo Hafıza Egzersizi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Altı farklı logo seti arasından seçim yapın ve hafızanızı test edin.
            </p>
          </div>
        )}

        {/* Ana içerik */}
        <div className="max-w-6xl mx-auto">
          {/* Logo seti seçimi */}
          {currentPhase === "logoSelection" && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Logo Seti Seçin
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-9xl mx-auto">
                  <div
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                    onClick={() => selectLogoSet(1)}
                  >
                    <div className="text-3xl mb-3">🎨</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Set 1</h3>
                    <p className="text-gray-600 mb-4">12 Logo</p>
                    <img
                      src="/logolar1.png"
                      alt="Logo Set 1"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                  <div
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl cursor-pointer hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                    onClick={() => selectLogoSet(2)}
                  >
                    <div className="text-3xl mb-3">🚗</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Set 2</h3>
                    <p className="text-gray-600 mb-4">10 Logo</p>
                    <img
                      src="/logolar2.png"
                      alt="Logo Set 2"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                  <div
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all duration-300"
                    onClick={() => selectLogoSet(3)}
                  >
                    <div className="text-3xl mb-3">🏆</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Set 3</h3>
                    <p className="text-gray-600 mb-4">12 Logo</p>
                    <img
                      src="/logolar3.png"
                      alt="Logo Set 3"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                  <div
                    className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl cursor-pointer hover:from-orange-100 hover:to-red-100 transition-all duration-300"
                    onClick={() => selectLogoSet(4)}
                  >
                    <div className="text-3xl mb-3">🌟</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Set 4</h3>
                    <p className="text-gray-600 mb-4">13 Logo</p>
                    <img
                      src="/logolar4.png"
                      alt="Logo Set 4"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                  <div
                    className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl cursor-pointer hover:from-teal-100 hover:to-cyan-100 transition-all duration-300"
                    onClick={() => selectLogoSet(5)}
                  >
                    <div className="text-3xl mb-3">💎</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Set 5</h3>
                    <p className="text-gray-600 mb-4">11 Logo</p>
                    <img
                      src="/logolar5.png"
                      alt="Logo Set 5"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                  <div
                    className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl cursor-pointer hover:from-pink-100 hover:to-rose-100 transition-all duration-300"
                    onClick={() => selectLogoSet(6)}
                  >
                    <div className="text-3xl mb-3">🎭</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Set 6</h3>
                    <p className="text-gray-600 mb-4">12 Logo</p>
                    <img
                      src="/logolar6.png"
                      alt="Logo Set 6"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Talimatlar */}
          {currentPhase === "instructions" && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <Eye className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Set {selectedLogoSet} - Nasıl Çalışır?
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <div className="text-3xl mb-3">👁️</div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      1. İnceleme
                    </h3>
                    <p className="text-gray-600">
                      Logoları 10 saniye boyunca dikkatlice inceleyin
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                    <div className="text-3xl mb-3">⏱️</div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      2. Bekleme
                    </h3>
                    <p className="text-gray-600">
                      Süre dolduktan sonra logolar kaybolacak
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                    <div className="text-3xl mb-3">✅</div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      3. Hatırlama
                    </h3>
                    <p className="text-gray-600">
                      Hatırladığınız logoları listeden işaretleyin
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setCurrentPhase("logoSelection")}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Farklı Set Seç
                </button>
                <button
                  onClick={startExercise}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  Egzersizi Başlat
                </button>
              </div>
            </div>
          )}

          {/* Logo görüntüleme */}
          {currentPhase === "viewing" && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-red-500" />
                  <span className="text-2xl font-bold text-gray-800">
                    Kalan Süre: {timeLeft} saniye
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src={
                    selectedLogoSet === 1
                      ? "/logolar1.png"
                      : selectedLogoSet === 2
                      ? "/logolar2.png"
                      : selectedLogoSet === 3
                      ? "/logolar3.png"
                      : selectedLogoSet === 4
                      ? "/logolar4.png"
                      : selectedLogoSet === 5
                      ? "/logolar5.png"
                      : "/logolar6.png"
                  }
                  alt="Logolar"
                  className="max-w-full h-auto rounded-xl shadow-lg"
                  style={{ maxHeight: "70vh" }}
                />
              </div>
            </div>
          )}

          {/* Test aşaması */}
          {currentPhase === "testing" && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Set {selectedLogoSet} - Hatırladığınız Logoları İşaretleyin
                </h2>
                <p className="text-gray-600">
                  Aşağıdaki listeden gördüğünüz logoları seçin. Doğru ve yanlış
                  seçimleriniz hesaplanacak.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {getActiveTestIsimleri().map((logoName, index) => (
                  <button
                    key={index}
                    onClick={() => toggleLogoSelection(logoName)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm ${
                      selectedLogos.includes(logoName)
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {selectedLogos.includes(logoName) && (
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                    )}
                    {logoName}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={calculateResults}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <CheckCircle className="w-5 h-5" />
                  Sonuçları Göster
                </button>
              </div>
            </div>
          )}

          {/* Sonuçlar */}
          {currentPhase === "results" && showResults && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Set {selectedLogoSet} - Egzersiz Tamamlandı!
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {correctAnswers}
                    </div>
                    <div className="text-gray-700">Doğru Hatırlanan</div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {
                        selectedLogos.filter(
                          (logo) => !getActiveLogoIsimleri().includes(logo)
                        ).length
                      }
                    </div>
                    <div className="text-gray-700">Yanlış Seçim</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {
                        getActiveLogoIsimleri().filter(
                          (logo) => !selectedLogos.includes(logo)
                        ).length
                      }
                    </div>
                    <div className="text-gray-700">Kaçırılan Logo</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Detaylı Sonuçlar
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">
                        ✅ Doğru Hatırlananlar:
                      </h4>
                      <div className="space-y-1">
                        {selectedLogos
                          .filter((logo) =>
                            getActiveLogoIsimleri().includes(logo)
                          )
                          .map((logo, index) => (
                            <div
                              key={index}
                              className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded"
                            >
                              {logo}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">
                        ❌ Yanlış Seçimler:
                      </h4>
                      <div className="space-y-1">
                        {selectedLogos
                          .filter(
                            (logo) => !getActiveLogoIsimleri().includes(logo)
                          )
                          .map((logo, index) => (
                            <div
                              key={index}
                              className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded"
                            >
                              {logo}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-blue-700 mb-2">
                      🔍 Kaçırılan Logolar:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getActiveLogoIsimleri()
                        .filter((logo) => !selectedLogos.includes(logo))
                        .map((logo, index) => (
                          <div
                            key={index}
                            className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded"
                          >
                            {logo}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={resetExercise}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <RotateCcw className="w-5 h-5" />
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
