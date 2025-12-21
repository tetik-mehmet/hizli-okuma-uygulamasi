"use client";
import { useState, useEffect } from "react";
import { HiArrowLongRight } from "react-icons/hi2";

export default function TakipPage() {
  const [wordPairs, setWordPairs] = useState([
    { left: "OVA", right: "DİŞ", visible: true },
    { left: "BUZ", right: "KUŞ", visible: true },
    { left: "KAŞ", right: "BAŞ", visible: true },
    { left: "BEZ", right: "KEK", visible: true },
    { left: "ELMA", right: "KAYIK", visible: true },
    { left: "AYRAN", right: "VAPUR", visible: true },
    { left: "ARABA", right: "BİNA", visible: true },
    { left: "SİTE", right: "KOLA", visible: true },
    { left: "ARI", right: "KOVAN", visible: true },
  ]);

  const [gameState, setGameState] = useState("menu"); // menu, ready, playing, finished
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [countdown, setCountdown] = useState(15);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedTime, setSelectedTime] = useState(15);

  const timeOptions = [
    { value: 5, label: "5 saniye" },
    { value: 10, label: "10 saniye" },
    { value: 15, label: "15 saniye" },
    { value: 20, label: "20 saniye" },
    { value: 30, label: "30 saniye" },
    { value: 60, label: "1 dakika" },
  ];

  const exercises = [
    {
      id: 1,
      title: "Kelime Eşleştirme 1",
      description: "OVA-DİŞ, BUZ-KUŞ, KAŞ-BAŞ...",
      difficulty: "Kolay",
      wordCount: 9,
      category: "Temel Kelimeler",
    },
    {
      id: 2,
      title: "Kelime Eşleştirme 2",
      description: "KAR-NAR, KES-BAZ, MUŞ-KOY...",
      difficulty: "Orta",
      wordCount: 10,
      category: "Gelişmiş Kelimeler",
      disabled: false,
      wordPairs: [
        { left: "KAR", right: "NAR", visible: true },
        { left: "KES", right: "BAZ", visible: true },
        { left: "MUŞ", right: "KOY", visible: true },
        { left: "NARA", right: "HAVA", visible: true },
        { left: "KOVA", right: "CİVA", visible: true },
        { left: "TABLA", right: "DOLMA", visible: true },
        { left: "KAŞIK", right: "YEMEK", visible: true },
        { left: "PEMBE", right: "HAFTA", visible: true },
        { left: "BALTA", right: "KILIÇ", visible: true },
        { left: "CİĞER", right: "MAKAS", visible: true },
      ],
    },
    {
      id: 3,
      title: "Kelime Eşleştirme 3",
      description: "MENDİL-KAĞIT, BIYIK-BOĞAZ, ELMAS-HALAY...",
      difficulty: "Zor",
      wordCount: 10,
      category: "Uzman Seviye",
      disabled: false,
      wordPairs: [
        { left: "MENDİL", right: "KAĞIT", visible: true },
        { left: "BIYIK", right: "BOĞAZ", visible: true },
        { left: "ELMAS", right: "HALAY", visible: true },
        { left: "HALI", right: "KATI", visible: true },
        { left: "SIVI", right: "PARA", visible: true },
        { left: "SOPA", right: "ÇAPA", visible: true },
        { left: "BAL", right: "ŞAL", visible: true },
        { left: "ÜTÜ", right: "TEL", visible: true },
        { left: "BOL", right: "KOL", visible: true },
        { left: "AÇI", right: "YAN", visible: true },
      ],
    },
    {
      id: 4,
      title: "Kelime Eşleştirme 4",
      description: "KALEM-MASA, KİTAP-RAF, ÇANTA-DOLAP...",
      difficulty: "Orta",
      wordCount: 12,
      category: "Günlük Eşyalar",
      disabled: false,
      wordPairs: [
        { left: "KALEM", right: "MASA", visible: true },
        { left: "KİTAP", right: "RAF", visible: true },
        { left: "ÇANTA", right: "DOLAP", visible: true },
        { left: "TELEFON", right: "CEP", visible: true },
        { left: "BİLGİSAYAR", right: "EKRAN", visible: true },
        { left: "ÇAYDANLIK", right: "FİNCAN", visible: true },
        { left: "TABAK", right: "ÇATAL", visible: true },
        { left: "HAVLU", right: "BANYO", visible: true },
        { left: "ÇORAP", right: "AYAKKABI", visible: true },
        { left: "GÖZLÜK", right: "GÖZ", visible: true },
        { left: "ŞAPKA", right: "KAFA", visible: true },
        { left: "ELDİVEN", right: "EL", visible: true },
      ],
    },
    {
      id: 5,
      title: "Kelime Eşleştirme 5",
      description: "ASLAN-ORMAN, BALIK-DENİZ, KUŞ-GÖKYÜZÜ...",
      difficulty: "Zor",
      wordCount: 12,
      category: "Hayvanlar ve Doğa",
      disabled: false,
      wordPairs: [
        { left: "ASLAN", right: "ORMAN", visible: true },
        { left: "BALIK", right: "DENİZ", visible: true },
        { left: "KUŞ", right: "GÖKYÜZÜ", visible: true },
        { left: "KARINCA", right: "TOPRAK", visible: true },
        { left: "ARI", right: "ÇİÇEK", visible: true },
        { left: "KURBAĞA", right: "GÖL", visible: true },
        { left: "KAPLUMBAĞA", right: "KUM", visible: true },
        { left: "KARTAL", right: "DAĞ", visible: true },
        { left: "YUNUS", right: "OKYANUS", visible: true },
        { left: "PANDA", right: "BAMBU", visible: true },
        { left: "KANGURU", right: "AVUSTRALYA", visible: true },
        { left: "ZÜRAFA", right: "SAVAN", visible: true },
      ],
    },
    {
      id: 6,
      title: "Kelime Eşleştirme 6",
      description: "KIRMIZI-ELMA, MAVİ-GÖKYÜZÜ, YEŞİL-ÇİMEN...",
      difficulty: "Kolay",
      wordCount: 10,
      category: "Renkler ve Nesneler",
      disabled: false,
      wordPairs: [
        { left: "KIRMIZI", right: "ELMA", visible: true },
        { left: "MAVİ", right: "GÖKYÜZÜ", visible: true },
        { left: "YEŞİL", right: "ÇİMEN", visible: true },
        { left: "SARI", right: "GÜNEŞ", visible: true },
        { left: "MOR", right: "ÜZÜM", visible: true },
        { left: "TURUNCU", right: "PORTAKAL", visible: true },
        { left: "PEMBE", right: "ÇİÇEK", visible: true },
        { left: "KAHVERENGİ", right: "AĞAÇ", visible: true },
        { left: "SİYAH", right: "GECE", visible: true },
        { left: "BEYAZ", right: "KAR", visible: true },
      ],
    },
  ];

  const selectExercise = (exercise) => {
    if (exercise.disabled) return;

    // Eğer egzersizde özel kelime çiftleri varsa onları kullan
    if (exercise.wordPairs) {
      setWordPairs(
        exercise.wordPairs.map((pair) => ({ ...pair, visible: true }))
      );
    } else {
      // Varsayılan kelime çiftlerini kullan
      setWordPairs([
        { left: "OVA", right: "DİŞ", visible: true },
        { left: "BUZ", right: "KUŞ", visible: true },
        { left: "KAŞ", right: "BAŞ", visible: true },
        { left: "BEZ", right: "KEK", visible: true },
        { left: "ELMA", right: "KAYIK", visible: true },
        { left: "AYRAN", right: "VAPUR", visible: true },
        { left: "ARABA", right: "BİNA", visible: true },
        { left: "SİTE", right: "KOLA", visible: true },
        { left: "ARI", right: "KOVAN", visible: true },
      ]);
    }

    setSelectedExercise(exercise);
    setGameState("ready");
  };

  const startGame = () => {
    setGameState("playing");
    setCurrentRound(0);
    setScore(0);
    setUserAnswers({});

    // Seçilen süreye göre ayarla
    setCountdown(selectedTime);

    // Geri sayım
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setWordPairs((prev) =>
            prev.map((pair) => ({ ...pair, visible: false }))
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (index, answer) => {
    const correctAnswer = wordPairs[index].right;
    const isCorrect =
      answer.trim().toUpperCase() === correctAnswer.toUpperCase();

    setUserAnswers((prev) => ({
      ...prev,
      [index]: { answer, isCorrect },
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const checkAnswers = () => {
    setGameState("finished");
  };

  const resetGame = () => {
    setGameState("menu");
    setWordPairs((prev) => prev.map((pair) => ({ ...pair, visible: true })));
    setCurrentRound(0);
    setScore(0);
    setUserAnswers({});
    setSelectedExercise(null);
  };

  const backToMenu = () => {
    setGameState("menu");
    setWordPairs((prev) => prev.map((pair) => ({ ...pair, visible: true })));
    setCurrentRound(0);
    setScore(0);
    setUserAnswers({});
    setSelectedExercise(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Kelime Takip Egzersizleri
        </h1>

        {gameState === "menu" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hafıza ve kelime hatırlama becerilerinizi geliştirmek için
                tasarlanmış egzersizler. Kelime çiftlerini inceleyin ve sağ
                taraftaki kelimeleri hatırlamaya çalışın.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-200 ${
                    exercise.disabled
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-xl hover:scale-105 cursor-pointer"
                  }`}
                  onClick={() => selectExercise(exercise)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {exercise.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {exercise.title}
                    </h3>

                    <p className="text-gray-600 mb-4">{exercise.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Zorluk:</span>
                        <span
                          className={`font-medium ${
                            exercise.difficulty === "Kolay"
                              ? "text-green-600"
                              : exercise.difficulty === "Orta"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {exercise.difficulty}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Kategori:</span>
                        <span className="font-medium text-blue-600">
                          {exercise.category}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Kelime Sayısı:</span>
                        <span className="font-medium text-purple-600">
                          {exercise.wordCount}
                        </span>
                      </div>
                    </div>

                    {exercise.disabled && (
                      <div className="mt-4 p-2 bg-gray-100 rounded-lg">
                        <span className="text-sm text-gray-500">
                          Yakında eklenecek
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === "ready" && selectedExercise && (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedExercise.title}
              </h2>

              <div className="mb-6">
                <div className="flex justify-center space-x-8 text-center mb-6">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedExercise.difficulty}
                    </div>
                    <div className="text-sm text-gray-500">Zorluk</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedExercise.wordCount}
                    </div>
                    <div className="text-sm text-gray-500">Kelime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedExercise.category}
                    </div>
                    <div className="text-sm text-gray-500">Kategori</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Süre Seçin:
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTime(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedTime === option.value
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                          : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                Kelime çiftlerini {selectedTime} saniye inceleyin, sonra sağ
                taraftaki kelimeler kaybolacak ve hatırlamaya çalışın.
              </p>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={startGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
                >
                  Egzersizi Başlat
                </button>

                <button
                  onClick={backToMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
                >
                  Menüye Dön
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                  {selectedExercise?.title}
                </h2>
                <button
                  onClick={backToMenu}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  ← Menüye Dön
                </button>
              </div>

              {countdown > 0 && (
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {countdown}
                  </div>
                  <p className="text-gray-600">
                    Saniye sonra kelimeler kaybolacak
                  </p>
                </div>
              )}

              {countdown === 0 && (
                <div className="text-center mb-6">
                  <p className="text-lg text-gray-600">
                    Süre doldu! Kelimeleri hatırlamaya çalışın.
                  </p>
                </div>
              )}

              <div className="grid gap-4">
                {wordPairs.map((pair, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                  >
                    <div className="text-2xl font-bold text-blue-600 w-40 text-center mr-3 whitespace-nowrap px-1">
                      {pair.left}
                    </div>

                    <div className="flex items-center flex-1 mx-8">
                      <div className="w-full h-1 bg-blue-500"></div>
                    </div>

                    <div className="w-40 ml-3">
                      {pair.visible ? (
                        <div className="text-2xl font-bold text-green-600 text-center whitespace-nowrap px-1">
                          {pair.right}
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="Kelimeyi yazın..."
                          className="w-full text-center text-lg font-semibold border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                          style={{ textTransform: "uppercase" }}
                          onChange={(e) =>
                            handleAnswer(index, e.target.value.toUpperCase())
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                {countdown === 0 && (
                  <button
                    onClick={checkAnswers}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
                  >
                    Cevapları Kontrol Et
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {gameState === "finished" && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Egzersiz Tamamlandı!
            </h2>

            <div className="text-6xl font-bold text-blue-600 mb-6">
              {score}/{wordPairs.length}
            </div>

            <p className="text-xl text-gray-600 mb-8">
              {score === wordPairs.length
                ? "Mükemmel! Tüm kelimeleri doğru hatırladınız!"
                : score > wordPairs.length / 2
                ? "İyi gidiyorsunuz! Biraz daha pratik yapın."
                : "Daha fazla pratik yapmanız gerekiyor."}
            </p>

            <div className="space-y-4 mb-8">
              {wordPairs.map((pair, index) => {
                const ua = userAnswers[index]?.answer?.trim() || "";
                const hasAnswer = ua.length > 0;
                const isCorrect = userAnswers[index]?.isCorrect;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-4 text-lg"
                  >
                    <span className="font-semibold text-blue-600">
                      {pair.left}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-semibold text-green-600">
                      {pair.right}
                    </span>

                    {userAnswers[index] && (
                      <span
                        className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    )}

                    <span className="ml-4 text-sm text-gray-600">
                      Cevabım:{" "}
                      <span
                        className={`font-semibold ${
                          isCorrect ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {hasAnswer ? ua : "Boş"}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
              >
                Tekrar Dene
              </button>

              <button
                onClick={backToMenu}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
              >
                Menüye Dön
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
