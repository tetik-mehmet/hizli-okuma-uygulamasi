"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DATASETS = [
  // Alıştırma 1 (ilk görsel)
  {
    id: 1,
    words: [
      "_LM_",
      "B_L_K",
      "K_P_",
      "K_R_Z",
      "_Y_NC_K",
      "K_D_",
      "_R_B_",
      "B_L",
      "T_B_K",
      "T_P",
      "_TK_",
      "B_L_N",
      "B_HÇ_",
      "_K_L",
      "K_RP_Z",
    ],
    answers: {
      _LM_: ["ELMA", "ALMA", "OLMA"],
      B_L_K: ["BALIK", "BELEK", "BİLEK"],
      K_P_: ["KAPI", "KUPA"],
      K_R_Z: ["KİRAZ", "KERİZ"],
      _Y_NC_K: "OYUNCAK",
      K_D_: ["KEDİ", "KADI"],
      _R_B_: "ARABA",
      B_L: ["BAL", "BEL", "BOL"],
      T_B_K: "TABAK",
      T_P: ["TÜP", "TIP", "TOP"],
      _TK_: ["ATKI", "ETKİ"],
      B_L_N: ["BALON", "BİLEN", "BULAN"],
      B_HÇ_: ["BAHÇE", "BOHÇA"],
      _K_L: ["OKUL", "AKIL", "EKOL"],
      K_RP_Z: "KARPUZ",
    },
  },
  // Alıştırma 2 (ikinci görsel)
  {
    id: 2,
    words: [
      "M_M_",
      "E_İK",
      "BO_A",
      "KE_A_",
      "B_L",
      "V_K_L",
      "K_T_P",
      "B_YR_K",
      "O_U_",
      "A_N_",
      "TA_A_",
      "S_R_İ",
      "A_L_",
      "A_EŞ",
      "A_E_",
    ],
    answers: {
      M_M_: "MAMA",
      E_İK: "ETİK",
      BO_A: ["BOĞA", "BOYA"],
      KE_A_: ["KEMAN", "KEBAP", "KEMAL", "KENAR", "KENAN"],
      B_L: ["BAL", "BEL", "BOL"],
      V_K_L: "VEKİL",
      K_T_P: ["KİTAP", "KATİP"],
      B_YR_K: "BAYRAK",
      O_U_: "OKUL",
      A_N_: "ANNE",
      TA_A_: "TABAK",
      S_R_İ: ["SERGİ", "SORTİ"],
      A_L_: ["AİLE", "AYLA", "ADLİ"],
      A_EŞ: "ATEŞ",
      A_E_: "ALEV",
    },
  },
  // Alıştırma 3 (üçüncü görsel)
  {
    id: 3,
    words: [
      "G_Z_ÜK",
      "_O_U",
      "V_T_S",
      "B_R_N",
      "_ELE_ON",
      "_A_AS",
      "K_MB_RA",
      "P_T_N",
      "H_R_T_",
      "T_RK",
      "_L_AN",
      "İN_İL_Z",
      "K_RT",
      "A_ER_K_",
      "DE_E",
    ],
    answers: {
      G_Z_ÜK: "GÖZLÜK",
      _O_U: ["DOĞU", "DOLU", "KOLU"],
      V_T_S: "VİTES",
      B_R_N: "BURUN",
      _ELE_ON: "TELEFON",
      _A_AS: ["MAKAS", "TAKAS"],
      K_MB_RA: "KUMBARA",
      P_T_N: "PATEN",
      H_R_T_: "HARİTA",
      T_RK: "TÜRK",
      _L_AN: "ALMAN",
      İN_İL_Z: "İNGİLİZ",
      K_RT: ["KURT", "KÜRT", "KART"],
      A_ER_K_: "AMERİKA",
      DE_E: ["DERE", "DEDE", "DEVE"],
    },
  },
  // Alıştırma 4 (dördüncü görsel)
  {
    id: 4,
    words: [
      "DO_T_R",
      "Y_P_A_",
      "GE_İ_",
      "D_N_Y",
      "F_L_",
      "S_AD_UM",
      "D_N_Z",
      "_AV_Z",
      "M_S_",
      "K_RT_L",
      "G_Y_K",
      "KA_G_R_",
      "BA_İ_A",
      "E_K_K",
      "_A_I_",
    ],
    answers: {
      DO_T_R: "DOKTOR",
      Y_P_A_: "YAPRAK",
      GE_İ_: ["GELİN", "GELİR"],
      D_N_Y: "DENEY",
      F_L_: ["FİLE", "FİLO"],
      S_AD_UM: "STADYUM",
      D_N_Z: "DENİZ",
      _AV_Z: "HAVUZ",
      M_S_: ["MASA", "MUSA"],
      K_RT_L: "KARTAL",
      G_Y_K: "GEYİK",
      KA_G_R_: "KANGURU",
      BA_İ_A: "BALİNA",
      E_K_K: "ERKEK",
      _A_I_: "KADIN",
    },
  },
];

// Zorluk seviyeleri ve süreler
const DIFFICULTY_LEVELS = {
  easy: { name: "Kolay", time: 120, color: "green" }, // 5 dakika
  medium: { name: "Orta", time: 80, color: "yellow" }, // 3 dakika
  hard: { name: "Zor", time: 60, color: "red" }, // 2 dakika
};

function createEmptyAnswers(words) {
  return words.reduce((acc, k) => {
    acc[k] = "";
    return acc;
  }, {});
}

export default function Exercise5({
  visibleDatasetIds,
  defaultId,
  embedded,
} = {}) {
  const router = useRouter();
  const timeUpAudioRef = useRef(null);

  // Giriş kontrolü
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");

    // Giriş kontrolü
    if (!isLoggedIn || !authToken) {
      router.push("/login");
      return;
    }
  }, [router]);
  const filteredDatasets = useMemo(() => {
    if (Array.isArray(visibleDatasetIds) && visibleDatasetIds.length > 0) {
      return DATASETS.filter((d) => visibleDatasetIds.includes(d.id));
    }
    return DATASETS;
  }, [visibleDatasetIds]);

  const initialIndex = useMemo(() => {
    if (defaultId != null) {
      const idx = filteredDatasets.findIndex((d) => d.id === defaultId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  }, [defaultId, filteredDatasets]);

  const [datasetIndex, setDatasetIndex] = useState(initialIndex);
  const dataset = filteredDatasets[datasetIndex];
  const [difficulty, setDifficulty] = useState("medium");
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_LEVELS.medium.time);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [answers, setAnswers] = useState(() =>
    createEmptyAnswers(dataset.words)
  );
  const [showResults, setShowResults] = useState(false);

  // Timer efekti
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsTimerRunning(false);
            setShowResults(true);
            // Süre dolduğunda uyarı sesi çal
            if (timeUpAudioRef.current) {
              try {
                timeUpAudioRef.current.currentTime = 0;
                timeUpAudioRef.current.play();
              } catch (e) {
                // Sessizce geç
              }
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Zorluk değiştiğinde süreyi güncelle
  useEffect(() => {
    setTimeLeft(DIFFICULTY_LEVELS[difficulty].time);
  }, [difficulty]);

  // Veri seti değiştiğinde cevapları sıfırla
  const switchDataset = (nextIndex) => {
    setDatasetIndex(nextIndex);
    setAnswers(createEmptyAnswers(filteredDatasets[nextIndex].words));
    setShowResults(false);
    setGameStarted(false);
    setIsTimerRunning(false);
    setTimeLeft(DIFFICULTY_LEVELS[difficulty].time);
  };

  const correctAnswers = useMemo(() => dataset.answers, [dataset]);

  const handleInputChange = (word, value) => {
    if (!gameStarted) {
      setGameStarted(true);
      setIsTimerRunning(true);
    }
    setAnswers((prev) => ({
      ...prev,
      [word]: value.toLocaleUpperCase("tr"),
    }));
  };

  const checkAnswers = () => {
    setIsTimerRunning(false);
    setShowResults(true);
  };

  const resetExercise = () => {
    setAnswers(createEmptyAnswers(dataset.words));
    setShowResults(false);
    setGameStarted(false);
    setIsTimerRunning(false);
    setTimeLeft(DIFFICULTY_LEVELS[difficulty].time);
  };

  const startNewGame = () => {
    setGameStarted(true);
    setIsTimerRunning(true);
    setShowResults(false);
  };

  const isCorrect = (word) => {
    const user = (answers[word] || "").toLocaleUpperCase("tr");
    const key = correctAnswers[word];
    return Array.isArray(key) ? key.includes(user) : user === key;
  };

  const getScore = () => {
    const total = dataset.words.length;
    const correct = dataset.words.reduce(
      (sum, w) => sum + (isCorrect(w) ? 1 : 0),
      0
    );
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderTable = () => {
    const columns = 3;
    const rows = Math.ceil(dataset.words.length / columns);

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center text-blue-600">
          UYGULAMA: Aşağıdaki tabloda boş bırakılan yerlere sesli harfler
          yazarak anlamlı bir kelime oluşturunuz.
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-2 border-blue-300 bg-white">
            <tbody>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: columns }, (_, colIndex) => {
                    const wordIndex = rowIndex * columns + colIndex;
                    const word = dataset.words[wordIndex];
                    if (!word)
                      return (
                        <td
                          key={colIndex}
                          className="border border-blue-300 p-2"
                        ></td>
                      );

                    const correctKey = correctAnswers[word];

                    return (
                      <td
                        key={colIndex}
                        className="border border-blue-300 p-2 text-center"
                      >
                        <div className="text-[19px] text-gray-600 mb-2 font-semibold">
                          {word.split("").map((char, index) => (
                            <span
                              key={index}
                              className={
                                char === "_"
                                  ? "text-red-500 font-bold text-xl"
                                  : "text-[19px]"
                              }
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={answers[word] || ""}
                          onChange={(e) =>
                            handleInputChange(word, e.target.value)
                          }
                          className="w-24 h-10 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg font-semibold"
                          maxLength={
                            String(
                              Array.isArray(correctKey)
                                ? correctKey[0]
                                : correctKey
                            ).length
                          }
                          disabled={showResults}
                        />
                        {showResults && (
                          <div
                            className={`text-sm mt-2 font-semibold ${
                              isCorrect(word)
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {isCorrect(word)
                              ? "✓"
                              : `Doğru: ${
                                  Array.isArray(correctKey)
                                    ? correctKey.join(" veya ")
                                    : correctKey
                                }`}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const score = getScore();
  const currentDifficulty = DIFFICULTY_LEVELS[difficulty];

  const goBackToOzel = () => {
    router.push("/ozel");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <audio
        ref={timeUpAudioRef}
        src="/sesler/doldu.mp3"
        preload="auto"
        hidden
      />
      {/* Geri Dön Butonu - Sol Üst */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={goBackToOzel}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Geri Dön
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Eksik Harf Çalışması
          </h1>
          <p className="text-gray-600">
            Alıştırma {datasetIndex + 1} / {filteredDatasets.length}
          </p>
        </div>

        {/* Zorluk Seviyesi Seçimi */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Zorluk Seviyesi Seçin
          </h3>
          <div className="flex justify-center gap-4">
            {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                disabled={gameStarted}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  difficulty === key
                    ? `bg-${level.color}-500 text-white shadow-lg scale-105`
                    : `bg-gray-200 text-gray-700 hover:bg-gray-300`
                } ${gameStarted ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-lg">{level.name}</div>
                <div className="text-sm">{formatTime(level.time)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            Kalan Süre:{" "}
            <span className={`text-${currentDifficulty.color}-600`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          {!gameStarted && (
            <button
              onClick={startNewGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
            >
              Oyunu Başlat
            </button>
          )}
        </div>

        {/* Numaralı Alıştırma Gezinme */}
        {filteredDatasets.length > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Sol ok */}
              <button
                onClick={() =>
                  switchDataset(
                    (datasetIndex - 1 + filteredDatasets.length) %
                      filteredDatasets.length
                  )
                }
                aria-label="Önceki alıştırma"
                className="w-8 h-8 rounded-full border bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Numaralar */}
              {filteredDatasets.map((d, idx) => (
                <button
                  key={d.id}
                  onClick={() => switchDataset(idx)}
                  disabled={idx === datasetIndex}
                  aria-label={`Alıştırma ${idx + 1}`}
                  className={`w-10 h-10 rounded-full border font-semibold transition-all ${
                    idx === datasetIndex
                      ? "bg-blue-600 text-white border-blue-600 cursor-default"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              {/* Sağ ok */}
              <button
                onClick={() =>
                  switchDataset((datasetIndex + 1) % filteredDatasets.length)
                }
                aria-label="Sonraki alıştırma"
                className="w-8 h-8 rounded-full border bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              Alıştırma {datasetIndex + 1} / {filteredDatasets.length}
            </div>
          </div>
        )}

        {renderTable()}

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-8">
          {!showResults && gameStarted ? (
            <button
              onClick={checkAnswers}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Cevapları Kontrol Et
            </button>
          ) : showResults ? (
            <button
              onClick={resetExercise}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Yeniden Başla
            </button>
          ) : null}

          {!embedded && filteredDatasets.length > 1 && (
            <>
              <button
                onClick={() =>
                  switchDataset(
                    (datasetIndex - 1 + filteredDatasets.length) %
                      filteredDatasets.length
                  )
                }
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Önceki Alıştırma
              </button>

              <button
                onClick={() =>
                  switchDataset((datasetIndex + 1) % filteredDatasets.length)
                }
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Sonraki Alıştırma
              </button>
            </>
          )}
        </div>

        {showResults && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Sonuçlarınız
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {score.percentage}%
              </div>
              <div className="text-gray-600">
                {score.correct} / {score.total} doğru
              </div>
              {timeLeft === 0 && (
                <div className="text-red-600 font-semibold mt-2">
                  Süre doldu!
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Nasıl Çalışılır?
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Zorluk seviyesini seçin (Kolay: 5dk, Orta: 3dk, Zor: 2dk)</li>
            <li>• Oyunu Başlat butonuna tıklayın</li>
            <li>• Her kelimede eksik olan harfleri bulun</li>
            <li>• Boş kutulara uygun harfleri yazın</li>
            <li>• Anlamlı Türkçe kelimeler oluşturmaya çalışın</li>
            <li>• Süre dolmadan önce bitirmeye çalışın</li>
            <li>
              • Cevapları Kontrol Et butonuna tıklayarak sonuçlarınızı görün
            </li>
            <li>• Sonraki Alıştırma ile yeni tabloya geçin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
