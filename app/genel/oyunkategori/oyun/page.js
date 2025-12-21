"use client";

import { useState, useEffect, useRef } from "react";

const MemoryGame = ({ embedded = false } = {}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  const successAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);
  const magicAudioRef = useRef(null);

  // MDF temalı kartlar
  const cardData = [
    { id: 1, content: "📚", name: "Kitap" },
    { id: 2, content: "📚", name: "Kitap" },
    { id: 3, content: "✏️", name: "Kalem" },
    { id: 4, content: "✏️", name: "Kalem" },
    { id: 5, content: "📖", name: "Okuma" },
    { id: 6, content: "📖", name: "Okuma" },
    { id: 7, content: "🎯", name: "Hedef" },
    { id: 8, content: "🎯", name: "Hedef" },
    { id: 9, content: "⚡", name: "Hız" },
    { id: 10, content: "⚡", name: "Hız" },
    { id: 11, content: "🧠", name: "Hafıza" },
    { id: 12, content: "🧠", name: "Hafıza" },
    { id: 13, content: "📝", name: "Not" },
    { id: 14, content: "📝", name: "Not" },
    { id: 15, content: "🎓", name: "Eğitim" },
    { id: 16, content: "🎓", name: "Eğitim" },
  ];

  // Oyunu başlat
  const startGame = () => {
    const shuffledCards = [...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        isFlipped: true,
        isMatched: false,
        position: index,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
    setTimer(0);
    setIsPlaying(false);
    setShowAllCards(true);

    setTimeout(() => {
      const updatedCards = shuffledCards.map((card) => ({
        ...card,
        isFlipped: false,
      }));
      setCards(updatedCards);
      setShowAllCards(false);
      setIsPlaying(true);
    }, 1700);
  };

  // Sesleri hazırla
  useEffect(() => {
    successAudioRef.current =
      typeof Audio !== "undefined" ? new Audio("/true.mp3") : null;
    wrongAudioRef.current =
      typeof Audio !== "undefined" ? new Audio("/wrong.mp3") : null;
    // magic mp3 yoksa wav'a düş
    if (typeof Audio !== "undefined") {
      const tryMp3 = new Audio("/magic.mp3");
      const setWavFallback = () => {
        magicAudioRef.current = new Audio("/magic.wav");
        magicAudioRef.current.volume = 0.6;
      };
      tryMp3.addEventListener(
        "canplaythrough",
        () => {
          magicAudioRef.current = tryMp3;
          magicAudioRef.current.volume = 0.6;
        },
        { once: true }
      );
      tryMp3.addEventListener("error", setWavFallback, { once: true });
      tryMp3.load();
    }
    if (successAudioRef.current) successAudioRef.current.volume = 0.6;
    if (wrongAudioRef.current) wrongAudioRef.current.volume = 0.6;
  }, []);

  const handleRestartWithSound = () => {
    try {
      if (magicAudioRef.current) {
        magicAudioRef.current.currentTime = 0;
        magicAudioRef.current.play().catch(() => {});
      }
    } catch (e) {}
    startGame();
  };

  // Kart çevir
  const flipCard = (cardId) => {
    if (!isPlaying || showAllCards) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      if (newFlippedCards[0].name === newFlippedCards[1].name) {
        setTimeout(() => {
          const updatedCards = newCards.map((c) =>
            newFlippedCards.some((fc) => fc.id === c.id)
              ? { ...c, isMatched: true }
              : c
          );
          setCards(updatedCards);
          setMatchedPairs((prev) => [...prev, newFlippedCards[0].name]);
          setScore((prev) => prev + 10);
          setFlippedCards([]);

          // Doğru eşleşme sesi
          try {
            if (successAudioRef.current) {
              successAudioRef.current.currentTime = 0;
              successAudioRef.current.play().catch(() => {});
            }
          } catch (e) {}

          if (matchedPairs.length + 1 === cardData.length / 2) {
            setGameCompleted(true);
            setIsPlaying(false);
          }
        }, 500);
      } else {
        // Yanlış eşleşme sesi
        try {
          if (wrongAudioRef.current) {
            wrongAudioRef.current.currentTime = 0;
            wrongAudioRef.current.play().catch(() => {});
          }
        } catch (e) {}

        setTimeout(() => {
          const updatedCards = newCards.map((c) =>
            newFlippedCards.some((fc) => fc.id === c.id)
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Timer
  useEffect(() => {
    let interval;
    if (isPlaying && !gameCompleted && !showAllCards) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameCompleted, showAllCards]);

  // Oyunu başlat
  useEffect(() => {
    startGame();
  }, []);

  // Header/Footer gizleme ve body scroll kilitleme (yalnızca tam sayfa kullanımda)
  useEffect(() => {
    if (embedded) return;
    const style = document.createElement("style");
    style.textContent = `
      header, footer { display: none !important; }
      body { overflow: hidden !important; margin: 0 !important; padding: 0 !important; height: 100vh !important; width: 100vw !important; }
      html { overflow: hidden !important; height: 100% !important; }
      #__next { height: 100vh !important; width: 100vw !important; overflow: hidden !important; }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [embedded]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`${
        embedded ? "w-full min-h-[650px]" : "w-screen h-screen overflow-hidden"
      } bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-4 font-sans flex flex-col`}
    >
      <div className="flex-1 flex flex-col">
        {/* Başlık Bölümü */}
        <div className="text-center mb-4 text-white flex-shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-shadow-lg">
            🧠 MDF Hafıza Oyunu
          </h1>
          <p className="text-lg opacity-90">
            Kartları eşleştirerek hafızanı geliştir!
          </p>
          {showAllCards && (
            <div className="mt-3 bg-yellow-400/20 backdrop-blur-md border border-yellow-300/30 rounded-xl p-2 text-yellow-200 font-bold text-sm">
              Kartları hatırla! 2 saniye sonra kapanacak...
            </div>
          )}
        </div>

        {/* İstatistikler */}
        <div className="flex justify-center gap-3 mb-4 flex-wrap flex-shrink-0">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 text-white font-bold text-center min-w-[100px]">
            <div className="text-xs opacity-80 mb-1">⏱️ Süre</div>
            <div className="text-lg">{formatTime(timer)}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 text-white font-bold text-center min-w-[100px]">
            <div className="text-xs opacity-80 mb-1">🎯 Puan</div>
            <div className="text-lg">{score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 text-white font-bold text-center min-w-[100px]">
            <div className="text-xs opacity-80 mb-1">🔄 Hamle</div>
            <div className="text-lg">{moves}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 text-white font-bold text-center min-w-[100px]">
            <div className="text-xs opacity-80 mb-1">✅ Eşleşme</div>
            <div className="text-lg">{matchedPairs.length}/8</div>
          </div>
        </div>

        {/* Oyun Tamamlandı Mesajı */}
        {gameCompleted && (
          <div className="bg-white/95 rounded-3xl p-6 text-center mb-4 shadow-2xl max-w-md mx-auto flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Tebrikler!
            </h2>
            <div className="space-y-2 text-gray-600">
              <p className="text-base">
                Toplam Puan:{" "}
                <span className="font-bold text-green-600">{score}</span>
              </p>
              <p className="text-base">
                Toplam Hamle:{" "}
                <span className="font-bold text-blue-600">{moves}</span>
              </p>
              <p className="text-base">
                Geçen Süre:{" "}
                <span className="font-bold text-purple-600">
                  {formatTime(timer)}
                </span>
              </p>
            </div>
            <button
              onClick={handleRestartWithSound}
              className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              🔄 Yeniden Başla
            </button>
          </div>
        )}

        {/* Oyun Tahtası - Esnek alan */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className={`grid grid-cols-4 gap-3 ${
              embedded ? "max-w-2xl" : "max-w-md"
            } w-full p-2`}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className={`aspect-square cursor-pointer transition-transform duration-300 hover:scale-105 perspective-1000 ${
                  showAllCards ? "pointer-events-none" : ""
                }`}
                onClick={() => flipCard(card.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${
                    card.isFlipped || card.isMatched ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Kart Ön Yüzü */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex flex-col items-center justify-center text-white text-2xl font-bold shadow-lg backface-hidden">
                    <span>❓</span>
                  </div>

                  {/* Kart Arka Yüzü */}
                  <div
                    className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center text-white text-2xl font-bold shadow-lg backface-hidden rotate-y-180 ${
                      card.isMatched
                        ? "bg-gradient-to-br from-green-400 to-green-600 animate-pulse"
                        : "bg-gradient-to-br from-blue-500 to-purple-600"
                    }`}
                  >
                    <span>{card.content}</span>
                    <span className="text-xs mt-1 opacity-80">{card.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontroller */}
        {!gameCompleted && !showAllCards && (
          <div className="text-center pt-4 flex-shrink-0">
            <button
              onClick={handleRestartWithSound}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              🔄 Yeni Oyun
            </button>
          </div>
        )}
      </div>

      {/* CSS Stilleri */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;
