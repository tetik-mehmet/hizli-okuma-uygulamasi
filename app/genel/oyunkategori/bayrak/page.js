"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const BayrakOyunu = () => {
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const countries = [
    { id: 1, name: "Turkey", flag: "/turkey-flag.png", matched: false },
    { id: 2, name: "United States", flag: "/usa-flag.png", matched: false },
    { id: 3, name: "United Kingdom", flag: "/uk-flag.png", matched: false },
    { id: 4, name: "Germany", flag: "/germany-flag.png", matched: false },
    { id: 5, name: "France", flag: "/france-flag.png", matched: false },
    { id: 6, name: "Italy", flag: "/italy-flag.png", matched: false },
    { id: 7, name: "Spain", flag: "/spain-flag.png", matched: false },
    { id: 8, name: "Japan", flag: "/japan-flag.png", matched: false },
    { id: 9, name: "China", flag: "/china-flag.png", matched: false },
    { id: 10, name: "Brazil", flag: "/brazil-flag.png", matched: false },
    { id: 11, name: "Canada", flag: "/canada-flag.png", matched: false },
    { id: 12, name: "Australia", flag: "/australia-flag.png", matched: false },
    {
      id: 13,
      name: "Netherlands",
      flag: "/netherlands-flag.png",
      matched: false,
    },
    { id: 14, name: "Sweden", flag: "/sweden-flag.png", matched: false },
    { id: 15, name: "Norway", flag: "/norway-flag.png", matched: false },
  ];

  const [shuffledCountries, setShuffledCountries] = useState([]);
  const [shuffledFlags, setShuffledFlags] = useState([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    setShuffledCountries(shuffled);
    setShuffledFlags([...shuffled].sort(() => Math.random() - 0.5));
    setMatchedPairs([]);
    setScore(0);
    setGameComplete(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const handleFlagClick = (flag) => {
    if (flag.matched) return;
    setSelectedFlag(flag);
  };

  const handleCountryClick = (country) => {
    if (country.matched) return;
    setSelectedCountry(country);
  };

  useEffect(() => {
    if (selectedFlag && selectedCountry) {
      if (selectedFlag.id === selectedCountry.id) {
        // Doğru eşleştirme
        setMatchedPairs((prev) => [...prev, selectedFlag.id]);
        setScore((prev) => prev + 10);

        // Eşleşen öğeleri güncelle
        setShuffledCountries((prev) =>
          prev.map((c) =>
            c.id === selectedCountry.id ? { ...c, matched: true } : c
          )
        );
        setShuffledFlags((prev) =>
          prev.map((f) =>
            f.id === selectedFlag.id ? { ...f, matched: true } : f
          )
        );
      } else {
        // Yanlış eşleştirme
        setScore((prev) => Math.max(0, prev - 2));
      }

      // Seçimleri sıfırla
      setTimeout(() => {
        setSelectedFlag(null);
        setSelectedCountry(null);
      }, 1000);
    }
  }, [selectedFlag, selectedCountry]);

  useEffect(() => {
    if (matchedPairs.length === countries.length) {
      setGameComplete(true);
      setEndTime(Date.now());
    }
  }, [matchedPairs]);

  const getTimeString = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          🇺🇸 Bayrak Eşleştirme Oyunu 🇹🇷
        </h1>

        {/* Skor ve Durum */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold text-indigo-600">
              Skor: {score}
            </div>
            <div className="text-lg text-gray-600">
              Eşleşen: {matchedPairs.length}/{countries.length}
            </div>
            <button
              onClick={startNewGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Yeni Oyun
            </button>
          </div>
        </div>

        {gameComplete ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Tebrikler! ��
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              Tüm bayrakları başarıyla eşleştirdiniz!
            </p>
            <div className="text-lg text-gray-600 mb-6">
              <p>
                Final Skor:{" "}
                <span className="font-bold text-indigo-600">{score}</span>
              </p>
              <p>
                Süre:{" "}
                <span className="font-bold text-indigo-600">
                  {startTime && endTime
                    ? getTimeString(endTime - startTime)
                    : "0:00"}
                </span>
              </p>
            </div>
            <button
              onClick={startNewGame}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Tekrar Oyna
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bayraklar */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                🏁 Bayraklar
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {shuffledFlags.map((flag) => (
                  <div
                    key={flag.id}
                    onClick={() => handleFlagClick(flag)}
                    className={`
                      cursor-pointer transition-all duration-200 transform hover:scale-105
                      ${
                        selectedFlag?.id === flag.id
                          ? "ring-4 ring-yellow-400"
                          : ""
                      }
                      ${flag.matched ? "opacity-50 cursor-not-allowed" : ""}
                      ${
                        selectedFlag?.id === flag.id
                          ? "bg-yellow-100"
                          : "bg-gray-50"
                      }
                      rounded-lg p-2 border-2
                    `}
                  >
                    <div className="w-full h-20 rounded overflow-hidden flex items-center justify-center">
                      {flag.matched ? (
                        <div className="w-full h-full bg-green-100 flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                      ) : (
                        <Image
                          src={flag.flag}
                          alt={`${flag.name} bayrağı`}
                          width={80}
                          height={60}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-xs text-center mt-2 text-gray-600">
                      Bayrak {flag.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ülke İsimleri */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                🌍 Ülke İsimleri
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {shuffledCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => handleCountryClick(country)}
                    className={`
                      cursor-pointer transition-all duration-200 transform hover:scale-105
                      ${
                        selectedCountry?.id === country.id
                          ? "ring-4 ring-yellow-400"
                          : ""
                      }
                      ${
                        country.matched
                          ? "opacity-50 cursor-not-allowed bg-green-100"
                          : "bg-gray-50"
                      }
                      rounded-lg p-4 border-2 text-center font-semibold
                    `}
                  >
                    {country.matched ? (
                      <span className="text-green-600">✅ {country.name}</span>
                    ) : (
                      <span
                        className={
                          selectedCountry?.id === country.id
                            ? "text-yellow-700"
                            : "text-gray-700"
                        }
                      >
                        {country.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Oyun Kuralları */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
            �� Oyun Kuralları
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li>
              • Sol taraftaki bayrakları sağ taraftaki ülke isimleriyle
              eşleştirin
            </li>
            <li>• Doğru eşleştirme: +10 puan</li>
            <li>• Yanlış eşleştirme: -2 puan</li>
            <li>• Tüm bayrakları eşleştirerek oyunu tamamlayın</li>
            <li>• Eşleşen çiftler yeşil renkte gösterilir</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BayrakOyunu;
