"use client";
import { useState, useEffect } from "react";

const bilmeceler = [
  {
    soru: "Yağmur yağınca açarım,\nHoop gökyüzünü kaplarım.\nBenimle gider her yere\nHiç ıslanmam sayesinde.",
    cevap: "Şemsiye",
  },
  {
    soru: "Duvarda asılı durur,\nBana bakar durur.\nBakınca kendini görürsün,\nKaçınca silinirsin.",
    cevap: "Ayna",
  },
  {
    soru: "Elektrikler kesilince hemen yakarız.\nBize ışık verir,\nDaha sonra erir.",
    cevap: "Mum",
  },

  {
    soru: "Karşıdan baktım hiç yok,\nYanına vardım pek çok.",
    cevap: "Karınca",
  },
  {
    soru: "Altı mermer üstü mermer,\nİçinde bir kuştur döner.",
    cevap: "Dil",
  },
  // Resimdeki yeni bilmeceler
  {
    soru: "Kuyruğu var, at değil.\nKanadı var, kuş değil.",
    cevap: "Balık",
  },
  {
    soru: "Dışı var, içi yok;\nTekme yer, suçu yok.",
    cevap: "Top",
  },
  {
    soru: "Akşam baktım çoktu, sabah baktım yoktu.",
    cevap: "Yıldız",
  },
  {
    soru: "Konuşurum ama dilim yok, duyulurum ama bedenim yok.\nBir düşünce kadar hafif, bir fikir kadar derinim.",
    cevap: "Rüya",
  },
  {
    soru: "Gün doğduğunda açar, geceleri tekrar solarım.\nKuşlar uçar üstümden, bulutlar geçer üzerimden.",
    cevap: "Gökyüzü",
  },
  {
    soru: "Yolda giderim, izim peşimden gelir,\nÇok hızlı giderim, kimse beni geçemez,\nHep ilerlerim, asla durmam.",
    cevap: "Zaman",
  },
  {
    soru: "Dört ayağı var canı yok, ayağını kessen kanı yok",
    cevap: "Masa",
  },
  {
    soru: "İki camlı pencere, bakıp durur her yere.",
    cevap: "Gözlük",
  },
  {
    soru: "Bazen yücelir, bazen cücelir nereye gitsem benimle gelir.",
    cevap: "Gölge",
  },
  {
    soru: "Benim adım beş hece kuzeyde görünürüm her gece",
    cevap: "Kutup Yıldızı",
  },
];

export default function BilmecePage() {
  const [currentBilmece, setCurrentBilmece] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 15'ten 60'a değiştirildi
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !showAnswer) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showAnswer) {
      setShowAnswer(true);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, showAnswer]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(60); // 15'ten 60'a değiştirildi
    setShowAnswer(false);
    setUserAnswer("");
    setIsCorrect(null);
  };

  const nextBilmece = () => {
    if (currentBilmece < bilmeceler.length - 1) {
      setCurrentBilmece((prev) => prev + 1);
      setTimeLeft(60); // 15'ten 60'a değiştirildi
      setShowAnswer(false);
      setUserAnswer("");
      setIsCorrect(null);
    } else {
      // Oyun bitti
      setGameStarted(false);
      setCurrentBilmece(0);
    }
  };

  const checkAnswer = () => {
    const correct =
      userAnswer.toLowerCase().trim() ===
      bilmeceler[currentBilmece].cevap.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 10);
    }
    setShowAnswer(true);
  };

  const showAnswerImmediately = () => {
    setShowAnswer(true);
    setTimeLeft(0);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">��</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bilmece Oyunu
          </h1>
          <p className="text-gray-600 mb-6">Bilmeceleri çöz ve puan kazan!</p>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Oyunu Başlat
          </button>
          {score > 0 && (
            <div className="mt-4 text-lg text-gray-700">
              Toplam Puan:{" "}
              <span className="font-bold text-purple-600">{score}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Bilmece #{currentBilmece + 1}
              </h1>
              <p className="text-gray-600">
                Toplam: {bilmeceler.length} bilmece
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-500">Puan</div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div
                className={`text-4xl font-bold ${
                  timeLeft <= 10 ? "text-red-500" : "text-blue-500" // 5'ten 10'a değiştirildi
                }`}
              >
                {timeLeft}
              </div>
              <div className="text-gray-500">Saniye</div>
            </div>
            <div className="w-full max-w-md mx-4">
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    timeLeft <= 10 ? "bg-red-500" : "bg-blue-500" // 5'ten 10'a değiştirildi
                  }`}
                  style={{ width: `${(timeLeft / 60) * 100}%` }} // 15'ten 60'a değiştirildi
                ></div>
              </div>
            </div>
            <button
              onClick={showAnswerImmediately}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Cevabı Göster
            </button>
          </div>
        </div>

        {/* Bilmece */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🤔</div>
            <div className="text-xl text-gray-700 whitespace-pre-line leading-relaxed">
              {bilmeceler[currentBilmece].soru}
            </div>
          </div>

          {!showAnswer && (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Cevabınızı yazın..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg text-center"
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
              />
              <div className="flex justify-center">
                <button
                  onClick={checkAnswer}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  Cevabı Kontrol Et
                </button>
              </div>
            </div>
          )}

          {showAnswer && (
            <div className="text-center">
              <div
                className={`text-6xl mb-4 ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {isCorrect ? "🎉" : "��"}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                Cevap: {bilmeceler[currentBilmece].cevap}
              </div>
              {isCorrect !== null && (
                <div
                  className={`text-lg ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect ? "Doğru cevap! +10 puan" : "Yanlış cevap!"}
                </div>
              )}
              <button
                onClick={nextBilmece}
                className="mt-6 bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-lg"
              >
                {currentBilmece < bilmeceler.length - 1
                  ? "Sonraki Bilmece"
                  : "Oyunu Bitir"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
