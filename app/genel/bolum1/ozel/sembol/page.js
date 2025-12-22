"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const symbols = [
  "●",
  "+",
  "×",
  "→",
  "■",
  "▲",
  "▼",
  "◆",
  "★",
  "♦",
  "♠",
  "♣",
  "♥",
  "⚫",
  "⚪",
  "🔴",
  "🔵",
  "🟡",
  "🟢",
  "🟣",
  "🔶",
  "🔷",
  "🔸",
  "🔹",
  "💎",
  "⭐",
  "✨",
  "💫",
  "🌟",
  "💠",
  "🔺",
  "🔻",
  "🔘",
  "🔵",
  "🔴",
  "🟣",
  "🟢",
  "⚪",
  "⚫",
  "🔲",
  "◼",
  "◻",
  "◾",
  "◽",
];
const gridSize = { rows: 6, cols: 5 };

// Zorluk seviyeleri ve süreleri
const difficultyLevels = {
  easy: { name: "Kolay", time: 70, color: "green" },
  medium: { name: "Orta", time: 50, color: "orange" },
  hard: { name: "Zor", time: 30, color: "red" },
};

// Rastgele sembol grid'i oluştur
const generateRandomGrid = () => {
  // Önce 5 rastgele sembol seç
  const shuffledSymbols = [...symbols].sort(() => Math.random() - 0.5);
  const selectedSymbols = shuffledSymbols.slice(0, 5);

  const grid = [];
  for (let i = 0; i < gridSize.rows; i++) {
    const row = [];
    for (let j = 0; j < gridSize.cols; j++) {
      row.push(
        selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)]
      );
    }
    grid.push(row);
  }
  return grid;
};

// Grid'deki sembol sayılarını hesapla
const countSymbols = (grid) => {
  const counts = {};
  // Sadece grid'de kullanılan sembolleri say
  const usedSymbols = [...new Set(grid.flat())];

  usedSymbols.forEach((symbol) => {
    counts[symbol] = 0;
  });

  grid.forEach((row) => {
    row.forEach((symbol) => {
      if (counts.hasOwnProperty(symbol)) {
        counts[symbol]++;
      }
    });
  });

  return counts;
};

export default function SembolSayma({
  embedded = false,
  defaultDifficulty = "easy",
  autoStart = false,
} = {}) {
  const timeUpAudioRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(defaultDifficulty);
  const [timeLeft, setTimeLeft] = useState(70);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [correctCounts, setCorrectCounts] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showDifficultySelect, setShowDifficultySelect] = useState(!embedded);

  // Seçilen zorluk seviyesine göre süreyi al
  const getSelectedTime = () => difficultyLevels[selectedDifficulty].time;

  // Yeni oyun başlat
  const startNewGame = useCallback(() => {
    const newGrid = generateRandomGrid();
    setGrid(newGrid);
    setUserAnswers({});
    setTimeLeft(getSelectedTime());
    setIsGameActive(true);
    setGameResult(null);
    setShowResults(false);
    setShowDifficultySelect(false);

    // Doğru cevapları hesapla
    const counts = countSymbols(newGrid);
    setCorrectCounts(counts);
  }, [selectedDifficulty]);

  // Gömülü kullanımda otomatik başlat
  useEffect(() => {
    if (
      embedded &&
      autoStart &&
      showDifficultySelect === false &&
      !isGameActive &&
      grid.length === 0
    ) {
      startNewGame();
    }
  }, [
    embedded,
    autoStart,
    showDifficultySelect,
    isGameActive,
    grid.length,
    startNewGame,
  ]);

  // Timer
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameActive(false);
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
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // Oyun sonucunu hesapla
  const calculateScore = () => {
    let correct = 0;
    let total = Object.keys(correctCounts).length; // Sadece kullanılan sembolleri say

    Object.keys(correctCounts).forEach((symbol) => {
      if (userAnswers[symbol] === correctCounts[symbol]) {
        correct++;
      }
    });

    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  // Cevap güncelle
  const updateAnswer = (symbol, value) => {
    if (!isGameActive) return;

    const numValue = parseInt(value) || 0;
    setUserAnswers((prev) => ({
      ...prev,
      [symbol]: numValue,
    }));
  };

  // Oyunu bitir
  const finishGame = () => {
    setIsGameActive(false);
    setShowResults(true);
  };

  // Ana menüye dön
  const backToMenu = () => {
    setShowDifficultySelect(true);
    setIsGameActive(false);
    setShowResults(false);
    setGrid([]);
    setUserAnswers({});
  };

  // Zorluk seviyesi seç
  const selectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 font-inter">
      <audio
        ref={timeUpAudioRef}
        src="/sesler/doldu.mp3"
        preload="auto"
        hidden
      />

      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-fredoka text-indigo-800 mb-2">
            Sembol Sayma Egzersizi
          </h1>
          <p className="text-lg text-gray-600">
            Seçtiğiniz zorluk seviyesine göre süre içerisinde tablodaki
            sembolleri sayın
          </p>
        </div>

        {/* Zorluk Seviyesi Seçimi */}
        {showDifficultySelect && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Zorluk Seviyesi Seçin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(difficultyLevels).map(([key, level]) => (
                <button
                  key={key}
                  onClick={() => selectDifficulty(key)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    selectedDifficulty === key
                      ? `border-${level.color}-500 bg-${level.color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`text-4xl font-bold text-${level.color}-600 mb-2`}
                  >
                    {level.time}s
                  </div>
                  <div className="text-xl font-bold text-gray-800 mb-2">
                    {level.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {level.time} saniye içerisinde tamamlayın
                  </div>
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={startNewGame}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
              >
                Oyunu Başlat
              </button>
            </div>
          </div>
        )}

        {/* Oyun Alanı */}
        {!showDifficultySelect && (
          <>
            {/* Timer */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div
                  className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                    difficultyLevels[selectedDifficulty].color === "green"
                      ? "bg-green-500"
                      : difficultyLevels[selectedDifficulty].color === "orange"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                >
                  {difficultyLevels[selectedDifficulty].name}
                </div>
                <div
                  className={`text-3xl font-bold ${
                    timeLeft <= 10
                      ? "text-red-600"
                      : timeLeft <= 20
                      ? "text-orange-500"
                      : "text-indigo-600"
                  }`}
                >
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    difficultyLevels[selectedDifficulty].color === "green"
                      ? "bg-green-500"
                      : difficultyLevels[selectedDifficulty].color === "orange"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(timeLeft / getSelectedTime()) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Ana Grid */}
            <div className="grid grid-cols-5 gap-3 mb-8 max-w-md mx-auto">
              {grid.map((row, rowIndex) =>
                row.map((symbol, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center text-3xl font-bold text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-200"
                  >
                    {symbol}
                  </div>
                ))
              )}
            </div>

            {/* Cevap Formu */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                Her sembolden kaç tane var?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.keys(correctCounts).map((symbol) => (
                  <div key={symbol} className="text-center">
                    <div className="text-4xl text-indigo-600 mb-2">
                      {symbol}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={userAnswers[symbol] || ""}
                      onChange={(e) => updateAnswer(symbol, e.target.value)}
                      disabled={!isGameActive}
                      className="w-20 h-12 text-center text-lg font-bold border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kontrol Butonları */}
            <div className="text-center space-x-4">
              {isGameActive && (
                <button
                  onClick={finishGame}
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
                >
                  Bitir
                </button>
              )}

              <button
                onClick={backToMenu}
                className="px-8 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg"
              >
                Ana Menü
              </button>

              <button
                onClick={startNewGame}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
              >
                Yeni Oyun
              </button>
            </div>
          </>
        )}

        {/* Sonuçlar */}
        {showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
              <div className="text-center mb-4">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-2 ${
                    difficultyLevels[selectedDifficulty].color === "green"
                      ? "bg-green-500"
                      : difficultyLevels[selectedDifficulty].color === "orange"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                >
                  {difficultyLevels[selectedDifficulty].name}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Oyun Sonucu
              </h2>

              {(() => {
                const score = calculateScore();
                return (
                  <>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-indigo-600 mb-2">
                        {score.correct}/{score.total}
                      </div>
                      <div className="text-lg text-gray-600">
                        Doğru Cevap: %{score.percentage}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {score.total} sembolden {score.correct} tanesini doğru
                        saydınız
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {Object.keys(correctCounts).map((symbol) => {
                        const isCorrect =
                          userAnswers[symbol] === correctCounts[symbol];
                        return (
                          <div
                            key={symbol}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{symbol}</span>
                              {isCorrect ? (
                                <span className="text-green-600 text-xl">
                                  ✓
                                </span>
                              ) : (
                                <span className="text-red-600 text-xl">✗</span>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                Senin Cevabın
                              </div>
                              <div
                                className={`font-bold ${
                                  isCorrect ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {userAnswers[symbol] || 0}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                Doğru Cevap
                              </div>
                              <div className="font-bold text-green-600">
                                {correctCounts[symbol]}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-center space-x-3">
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        Kapat
                      </button>
                      <button
                        onClick={backToMenu}
                        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Ana Menü
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
