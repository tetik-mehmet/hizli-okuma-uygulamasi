"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPageAccess } from "@/lib/checkAccess";

export default function HafizaEt() {
  const router = useRouter();

  useEffect(() => {
    // Erişim kontrolü
    const accessCheck = checkPageAccess("/genel/bolum1/hafiza/hafizaet");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);
  const [colorAnswers, setColorAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [customTime, setCustomTime] = useState(45); // Kullanıcının girdiği süre
  const [isActive, setIsActive] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [wordDisplayTime, setWordDisplayTime] = useState(20);
  const [showAnswerFields, setShowAnswerFields] = useState(false);
  const [currentColors, setCurrentColors] = useState({});
  const [currentColorWords, setCurrentColorWords] = useState([]);

  // Renk hafızası için farklı kelime setleri
  const colorWordSets = [
    {
      name: "Ev Eşyaları",
      words: [
        "MASA",
        "SANDALYE",
        "LAMBA",
        "PERDE",
        "HALI",
        "ÇERÇEVE",
        "VAZO",
        "KİTAP",
      ],
    },
    {
      name: "Meyveler",
      words: [
        "ELMA",
        "ARMUT",
        "PORTAKAL",
        "MUZ",
        "ÇİLEK",
        "KİRAZ",
        "ŞEFTALİ",
        "KAYISI",
      ],
    },
    {
      name: "Hayvanlar",
      words: [
        "ASLAN",
        "KAPLAN",
        "FİL",
        "ZEBRA",
        "PANDA",
        "KÖPEK",
        "KEDİ",
        "TAVŞAN",
      ],
    },
    {
      name: "Şehirler",
      words: [
        "İSTANBUL",
        "ANKARA",
        "İZMİR",
        "BURSA",
        "ANTALYA",
        "ADANA",
        "KONYA",
        "TRABZON",
      ],
    },
    {
      name: "Ülkeler",
      words: [
        "TÜRKİYE",
        "ALMANYA",
        "FRANSA",
        "İTALYA",
        "İSPANYA",
        "HOLLANDA",
        "BELÇİKA",
        "AVUSTURYA",
      ],
    },
    {
      name: "Renkler ve Şekiller",
      words: [
        "KARE",
        "ÜÇGEN",
        "DAİRE",
        "KALP",
        "YILDIZ",
        "OKTA",
        "BEŞGEN",
        "ALTIGEN",
      ],
    },
    {
      name: "Müzik ve Sanat",
      words: [
        "NOTA",
        "ŞARKI",
        "RESİM",
        "HEYKEL",
        "TABLO",
        "PİYANO",
        "GİTAR",
        "KEMAN",
      ],
    },
    {
      name: "Spor ve Oyun",
      words: [
        "FUTBOL",
        "BASKETBOL",
        "TENİS",
        "YÜZME",
        "KOŞU",
        "VOLEYBOL",
        "BADMİNTON",
        "KAYAK",
      ],
    },
    {
      name: "Yemek ve İçecek",
      words: [
        "EKMEK",
        "SÜT",
        "ELMA",
        "PORTAKAL",
        "ÇAY",
        "KAHVE",
        "SU",
        "MEYVE",
      ],
    },
    {
      name: "Meslekler",
      words: [
        "DOKTOR",
        "ÖĞRETMEN",
        "MÜHENDİS",
        "AVUKAT",
        "HEMŞİRE",
        "POLİS",
        "İTFAİYECİ",
        "PİLOT",
      ],
    },
    {
      name: "Ulaşım Araçları",
      words: [
        "ARABA",
        "TREN",
        "UÇAK",
        "GEMİ",
        "BİSİKLET",
        "MOTOSİKLET",
        "OTOBÜS",
        "METRO",
      ],
    },
    {
      name: "Doğa ve Çevre",
      words: [
        "AĞAÇ",
        "ÇİÇEK",
        "GÜNEŞ",
        "AY",
        "YILDIZ",
        "BULUT",
        "YAĞMUR",
        "KAR",
      ],
    },
    {
      name: "Teknoloji",
      words: [
        "BİLGİSAYAR",
        "TELEFON",
        "TABLET",
        "KAMERA",
        "HOPARLÖR",
        "KLAVYE",
        "FARE",
        "EKRAN",
      ],
    },
    {
      name: "Okul ve Eğitim",
      words: [
        "KALEM",
        "DEFTER",
        "SILGI",
        "ÇANTA",
        "TAHTA",
        "PROJEKTÖR",
        "MASA",
        "SANDALYE",
      ],
    },
    {
      name: "Hava Durumu",
      words: [
        "GÜNEŞLİ",
        "BULUTLU",
        "YAĞMURLU",
        "KARLI",
        "RÜZGARLI",
        "SISLI",
        "FIRTINALI",
        "SICAK",
      ],
    },
    {
      name: "Vücut Organları",
      words: ["GÖZ", "KULAK", "BURUN", "AĞIZ", "EL", "AYAK", "KALP", "BEYİN"],
    },
    {
      name: "Renkler",
      words: [
        "KIRMIZI",
        "MAVİ",
        "SARI",
        "YEŞİL",
        "MOR",
        "TURUNCU",
        "PEMBE",
        "KAHVERENGİ",
      ],
    },
    {
      name: "Sayılar",
      words: ["BİR", "İKİ", "ÜÇ", "DÖRT", "BEŞ", "ALTI", "YEDİ", "SEKİZ"],
    },
    {
      name: "Mevsimler",
      words: [
        "İLKBAHAR",
        "YAZ",
        "SONBAHAR",
        "KIŞ",
        "HAZİRAN",
        "ARALIK",
        "MART",
        "EYLÜL",
      ],
    },
    {
      name: "Günler",
      words: [
        "PAZARTESİ",
        "SALI",
        "ÇARŞAMBA",
        "PERŞEMBE",
        "CUMA",
        "CUMARTESİ",
        "PAZAR",
        "BUGÜN",
      ],
    },
    {
      name: "Aile Üyeleri",
      words: ["ANNE", "BABA", "KARDEŞ", "DEDE", "NİNE", "AMCA", "HALA", "DAYI"],
    },
    {
      name: "Duygular",
      words: [
        "MUTLU",
        "ÜZGÜN",
        "KIZGIN",
        "ŞAŞKIN",
        "KORKUNÇ",
        "SEVİMLİ",
        "GÜZEL",
        "KÖTÜ",
      ],
    },
    {
      name: "Ev Bölümleri",
      words: [
        "SALON",
        "MUTFAK",
        "YATAK ODASI",
        "BANYO",
        "KORİDOR",
        "BALKON",
        "GARAJ",
        "BAHÇE",
      ],
    },
    {
      name: "Hobiler",
      words: [
        "OKUMAK",
        "YAZMAK",
        "ÇİZMEK",
        "OYNAMAK",
        "ŞARKI SÖYLEMEK",
        "DANS ETMEK",
        "RESİM YAPMAK",
        "MÜZİK",
      ],
    },
    {
      name: "Müzik Aletleri",
      words: [
        "GİTAR",
        "PİYANO",
        "KEMAN",
        "FLÜT",
        "DAVUL",
        "SAKSOFON",
        "AKORDEON",
        "BANJO",
      ],
    },
    {
      name: "Spor Dalları",
      words: [
        "FUTBOL",
        "BASKETBOL",
        "VOLEYBOL",
        "TENİS",
        "BADMİNTON",
        "MASA TENİSİ",
        "GÜREŞ",
        "JUDO",
      ],
    },
    {
      name: "Yemek Çeşitleri",
      words: [
        "ÇORBA",
        "PİLAV",
        "ET",
        "TAVUK",
        "BALIK",
        "MAKARNA",
        "PİZZA",
        "HAMBURGER",
      ],
    },
    {
      name: "İçecekler",
      words: [
        "SU",
        "ÇAY",
        "KAHVE",
        "SÜT",
        "MEYVE SUYU",
        "LİMONATA",
        "AYRAN",
        "KOLA",
      ],
    },
    {
      name: "Kıyafetler",
      words: [
        "GÖMLEK",
        "PANTOLON",
        "ETEK",
        "CEKET",
        "KALPAK",
        "ÇORAP",
        "AYAKKABI",
        "ŞAPKA",
      ],
    },
    {
      name: "Eşyalar",
      words: [
        "TELEFON",
        "KALEM",
        "KİTAP",
        "ÇANTA",
        "GÖZLÜK",
        "SAAT",
        "ANAHTAR",
        "CÜZDAN",
      ],
    },
    {
      name: "Bitkiler",
      words: [
        "GÜL",
        "PAPATYA",
        "LALE",
        "ORKİDE",
        "KARANFİL",
        "ZAMBAK",
        "MENEKŞE",
        "KASIMPATI",
      ],
    },
    {
      name: "Deniz Canlıları",
      words: [
        "BALIK",
        "YUNUS",
        "KÖPEKBALIĞI",
        "DENİZ YILDIZI",
        "DENİZ ANASI",
        "MİDYE",
        "KARİDES",
        "YENGEÇ",
      ],
    },
  ];

  const colorOptions = [
    "kırmızı",
    "mavi",
    "sarı",
    "açık mavi",
    "yeşil",
    "kahverengi",
    "mor",
    "turuncu",
  ];

  // Rastgele renk kelime seti seçme fonksiyonu
  const selectRandomColorWordSet = () => {
    const randomSet =
      colorWordSets[Math.floor(Math.random() * colorWordSets.length)];

    // ColorAnswers state'ini yeni kelimelerle güncelle
    const newColorAnswers = {};
    randomSet.words.forEach((word) => {
      newColorAnswers[word] = "";
    });
    setColorAnswers(newColorAnswers);

    return randomSet.words;
  };

  // Renkleri rastgele atama fonksiyonu
  const assignRandomColors = (words) => {
    const shuffledColors = [...colorOptions].sort(() => Math.random() - 0.5);
    const newColors = {};
    const newColorWords = [];

    words.forEach((word, index) => {
      newColors[word] = shuffledColors[index];
      newColorWords.push({
        word: word,
        color: shuffledColors[index],
      });
    });

    setCurrentColors(newColors);
    setCurrentColorWords(newColorWords);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      checkColorAnswers();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Kelime gösterim süresi için useEffect
  useEffect(() => {
    let interval = null;
    if (isActive && showWords && wordDisplayTime > 0) {
      interval = setInterval(() => {
        setWordDisplayTime((prev) => prev - 1);
      }, 1000);
    } else if (wordDisplayTime === 0) {
      setShowWords(false);
      setShowAnswerFields(true);
    }
    return () => clearInterval(interval);
  }, [isActive, showWords, wordDisplayTime]);

  const playRestartSound = () => {
    try {
      const audio = new Audio("/magic.wav");
      audio.play();
    } catch (e) {
      // sessizce geç
    }
  };

  const startExercise = () => {
    const selectedWords = selectRandomColorWordSet();
    assignRandomColors(selectedWords);

    setIsActive(true);
    setTimeLeft(customTime); // Kullanıcının girdiği süreyi kullan
    setWordDisplayTime(20);
    setShowWords(true);
    setShowAnswerFields(false);
    setShowResults(false);
    setScore(0);
  };

  const handleColorInputChange = (word, value) => {
    if (isActive) {
      setColorAnswers((prev) => ({
        ...prev,
        [word]: value,
      }));
    }
  };

  const checkColorAnswers = () => {
    let correct = 0;
    Object.keys(currentColors).forEach((word) => {
      if (
        colorAnswers[word].toLowerCase() === currentColors[word].toLowerCase()
      ) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
    setIsActive(false);
  };

  const resetExercise = () => {
    playRestartSound();
    const selectedWords = selectRandomColorWordSet();
    assignRandomColors(selectedWords);

    setShowResults(false);
    setScore(0);
    setTimeLeft(customTime); // Kullanıcının girdiği süreyi kullan
    setWordDisplayTime(20);
    setIsActive(true);
    setShowWords(true);
    setShowAnswerFields(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Başlık Bölümü - Daha yumuşak */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-6 rounded-3xl shadow-xl mb-6 backdrop-blur-sm">
            <h1 className="text-4xl font-bold">
              🎨 Renk Hafızası Etkinliği 🧠
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Renkleri ve kelimeleri hatırlayarak hafızanızı güçlendirin!
          </p>
        </div>

        {/* Süre Seçimi ve Başlatma - Yeni eklenen bölüm */}
        <div className="text-center mb-8">
          {!isActive && !showResults && (
            <div className="space-y-6">
              {/* Süre Seçimi */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 inline-block border border-white/20">
                <h3 className="text-xl font-bold text-gray-700 mb-6">
                  ⏱️ Etkinlik Süresini Seçin
                </h3>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <label className="text-lg font-semibold text-gray-600">
                    Süre (saniye):
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={customTime}
                    onChange={(e) =>
                      setCustomTime(parseInt(e.target.value) || 45)
                    }
                    className="w-24 h-12 text-center border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-lg font-medium"
                    placeholder="45"
                  />
                  <span className="text-sm text-gray-500">
                    (10-300 saniye arası)
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  Seçilen süre:{" "}
                  <span className="font-semibold text-purple-600">
                    {customTime} saniye
                  </span>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-1 shadow-xl inline-block">
                  <button
                    onClick={startExercise}
                    className="bg-white text-green-600 font-bold py-5 px-16 rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl text-xl hover:bg-green-50"
                  >
                    🚀 Etkinliği Başlat
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Renkli kelimeleri inceleyin ve hafızanızı test edin
              </div>
            </div>
          )}
          {isActive && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 inline-block border border-white/20">
              <div className="text-3xl font-bold text-red-600 mb-4">
                ⏰ Kalan Süre: {formatTime(timeLeft)}
              </div>
              {showWords && (
                <div className="text-xl font-semibold text-blue-600 mb-4 bg-blue-50/80 px-6 py-3 rounded-2xl">
                  👀 Kelimeleri İnceleme: {wordDisplayTime} saniye
                </div>
              )}
              <div className="w-80 bg-gray-100 rounded-full h-4 mt-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-4 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${(timeLeft / customTime) * 100}%` }} // customTime kullan
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Renk Hafızası Egzersizi - Daha yumuşak */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 border border-white/30">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 UYGULAMA GÖREVİ
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Aşağıdaki kutuların renklerine ve içerisinde yazan kelimelere
              odaklanıp inceleyiniz.
              <br />
              <span className="font-semibold text-purple-600">
                Dikkatli bakın ve hafızanızda tutun!
              </span>
            </p>
          </div>

          {/* Renkli Kelime Kutuları - Daha yumuşak */}
          {showWords && currentColorWords.length > 0 && (
            <div className="mb-10">
              <div className="bg-gradient-to-br from-blue-50/60 to-purple-50/60 rounded-3xl p-8 mb-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-center text-gray-700 mb-8 flex items-center justify-center">
                  <span className="mr-3">🌈</span>
                  Kelime ve Renk Tablosu
                  <span className="ml-3">🌈</span>
                </h3>

                {/* Üst Satır */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  {currentColorWords.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className={`border-2 border-white/50 rounded-3xl p-8 text-center font-bold text-white text-xl shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
                      style={{
                        backgroundColor:
                          item.color === "kırmızı"
                            ? "#ef4444"
                            : item.color === "mavi"
                            ? "#3b82f6"
                            : item.color === "sarı"
                            ? "#eab308"
                            : item.color === "açık mavi"
                            ? "#22d3ee"
                            : item.color === "yeşil"
                            ? "#22c55e"
                            : item.color === "kahverengi"
                            ? "#a16207"
                            : item.color === "mor"
                            ? "#a855f7"
                            : item.color === "turuncu"
                            ? "#f97316"
                            : "#6b7280",
                      }}
                    >
                      <div className="text-4xl mb-3">✨</div>
                      {item.word}
                    </div>
                  ))}
                </div>

                {/* Orta Satır */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  {currentColorWords.slice(3, 6).map((item, index) => (
                    <div
                      key={index + 3}
                      className={`border-2 border-white/50 rounded-3xl p-8 text-center font-bold text-white text-xl shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
                      style={{
                        backgroundColor:
                          item.color === "kırmızı"
                            ? "#ef4444"
                            : item.color === "mavi"
                            ? "#3b82f6"
                            : item.color === "sarı"
                            ? "#eab308"
                            : item.color === "açık mavi"
                            ? "#22d3ee"
                            : item.color === "yeşil"
                            ? "#22c55e"
                            : item.color === "kahverengi"
                            ? "#a16207"
                            : item.color === "mor"
                            ? "#a855f7"
                            : item.color === "turuncu"
                            ? "#f97316"
                            : "#6b7280",
                      }}
                    >
                      <div className="text-4xl mb-3">✨</div>
                      {item.word}
                    </div>
                  ))}
                </div>

                {/* Alt Satır */}
                <div className="grid grid-cols-2 gap-8 justify-center">
                  {currentColorWords.slice(6, 8).map((item, index) => (
                    <div
                      key={index + 6}
                      className={`border-2 border-white/50 rounded-3xl p-8 text-center font-bold text-white text-xl shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
                      style={{
                        backgroundColor:
                          item.color === "kırmızı"
                            ? "#ef4444"
                            : item.color === "mavi"
                            ? "#3b82f6"
                            : item.color === "sarı"
                            ? "#eab308"
                            : item.color === "açık mavi"
                            ? "#22d3ee"
                            : item.color === "yeşil"
                            ? "#22c55e"
                            : item.color === "kahverengi"
                            ? "#a16207"
                            : item.color === "mor"
                            ? "#a855f7"
                            : item.color === "turuncu"
                            ? "#f97316"
                            : "#6b7280",
                      }}
                    >
                      <div className="text-4xl mb-3">✨</div>
                      {item.word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Kelimeler gizlendikten sonra gösterilecek mesaj */}
          {!showWords && isActive && (
            <div className="mb-10 text-center">
              <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 border border-yellow-200/50 rounded-3xl p-10 shadow-xl backdrop-blur-sm">
                <div className="text-5xl mb-6">🤔</div>
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                  Kelimeler Gizlendi!
                </h3>
                <p className="text-lg text-yellow-700 max-w-2xl mx-auto leading-relaxed">
                  Şimdi hatırladığınız renkleri seçin. Kelimeleri tekrar görmek
                  için &quot;Yeniden Başla&quot; butonuna tıklayın.
                </p>
                <div className="text-3xl mt-6">🎨 🧠 ✨</div>
              </div>
            </div>
          )}

          {/* Renk Hatırlama Formu */}
          {showAnswerFields && (
            <div className="bg-gradient-to-br from-gray-50/80 to-blue-50/80 rounded-3xl p-10 border border-blue-200/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-center text-gray-700 mb-8 flex items-center justify-center">
                <span className="mr-3">🎯</span>
                Renk Hatırlama Testi
                <span className="ml-3">🎯</span>
              </h3>
              <p className="text-center text-gray-600 mb-8 leading-relaxed">
                Önceki egzersizde verilen kelimelerin hangi renk kutucukta
                olduğunu seçiniz.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.keys(colorAnswers).map((word) => (
                  <div
                    key={word}
                    className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:border-blue-300/70 transition-all duration-300 hover:shadow-xl backdrop-blur-sm"
                  >
                    <label className="text-lg font-bold text-gray-700 mb-4 block text-center">
                      {word}
                    </label>
                    <select
                      value={colorAnswers[word] || ""}
                      onChange={(e) =>
                        handleColorInputChange(word, e.target.value)
                      }
                      disabled={!isActive}
                      className={`w-full h-14 text-center border-2 rounded-2xl focus:outline-none text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "border-blue-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
                          : "border-gray-200 bg-gray-100 text-gray-500"
                      }`}
                    >
                      <option value="">Renk seçin</option>
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Kontrol Butonları - Daha yumuşak */}
        <div className="flex justify-center gap-8 mb-10">
          {isActive && showAnswerFields && (
            <button
              onClick={checkColorAnswers}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-5 px-12 rounded-3xl transition-all duration-500 shadow-xl hover:scale-105 hover:shadow-2xl text-lg"
            >
              🔍 Cevapları Kontrol Et
            </button>
          )}
          {isActive && (
            <button
              onClick={resetExercise}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-5 px-12 rounded-3xl transition-all duration-500 shadow-xl hover:scale-105 hover:shadow-2xl text-lg"
            >
              🔄 Yeniden Başla
            </button>
          )}
        </div>

        {/* Sonuçlar - Daha yumuşak */}
        {showResults && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/30">
            <div className="text-center mb-10">
              <div className="text-7xl mb-6">
                {score === Object.keys(currentColors).length ? "🎉" : "❌"}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                {score === Object.keys(currentColors).length
                  ? "Tebrikler!"
                  : "Sonuçlar"}
              </h3>
            </div>

            <div className="text-center mb-10">
              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-3xl p-8 inline-block backdrop-blur-sm">
                <p className="text-2xl text-gray-700 mb-3">
                  Doğru cevap sayısı:
                </p>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {score}/{Object.keys(currentColors).length}
                </div>
              </div>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                {score === Object.keys(currentColors).length
                  ? "🎉 Mükemmel! Tüm cevaplar doğru! 🎉"
                  : "💪 Bazı cevaplar yanlış. Tekrar deneyin!"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {Object.keys(currentColors).map((word) => {
                const userAnswer = colorAnswers[word] || "";
                const correctAnswer = currentColors[word];
                const isCorrect =
                  userAnswer.toLowerCase() === correctAnswer.toLowerCase();

                return (
                  <div
                    key={word}
                    className={`p-8 rounded-3xl border border-white/50 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm ${
                      isCorrect
                        ? "bg-gradient-to-br from-green-50/80 to-emerald-50/80"
                        : "bg-gradient-to-br from-red-50/80 to-pink-50/80"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {isCorrect ? "✅" : "❌"}
                      </div>
                      <p className="font-bold text-gray-800 text-lg mb-4">
                        {word}
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">
                            Sizin cevabınız:
                          </span>{" "}
                          {userAnswer}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Doğru cevap:</span>{" "}
                          {correctAnswer}
                        </p>
                      </div>
                      <div
                        className={`mt-4 text-sm font-bold px-4 py-2 rounded-full ${
                          isCorrect
                            ? "bg-green-200/80 text-green-800"
                            : "bg-red-200/80 text-red-800"
                        }`}
                      >
                        {isCorrect ? "✓ Doğru" : "✗ Yanlış"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sonuçlardan sonra Yeniden Başla butonu */}
            <div className="text-center">
              <button
                onClick={resetExercise}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-5 px-16 rounded-3xl transition-all duration-500 shadow-xl hover:scale-105 hover:shadow-2xl text-xl"
              >
                🚀 Yeniden Başla
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
