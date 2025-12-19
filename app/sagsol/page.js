"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPageAccess } from "@/lib/checkAccess";

export default function SagsolPage() {
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentExerciseData, setCurrentExerciseData] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(30); // Yeni eklenen state

  // Erişim kontrolü
  useEffect(() => {
    const accessCheck = checkPageAccess("/sagsol");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }
  }, [router]);

  // İki farklı egzersiz verisi
  const exerciseSets = {
    exercise1: [
      { id: 1, bigLetter: "A", smallLetter: "l", answer: "" },
      { id: 2, bigLetter: "B", smallLetter: "ö", answer: "" },
      { id: 3, bigLetter: "C", smallLetter: "o", answer: "" },
      { id: 4, bigLetter: "Ç", smallLetter: "e", answer: "" },
      { id: 5, bigLetter: "D", smallLetter: "ü", answer: "" },
      { id: 6, bigLetter: "I", smallLetter: "o", answer: "" },
      { id: 7, bigLetter: "H", smallLetter: "ü", answer: "" },
      { id: 8, bigLetter: "G", smallLetter: "e", answer: "" },
      { id: 9, bigLetter: "F", smallLetter: "u", answer: "" },
      { id: 10, bigLetter: "E", smallLetter: "a", answer: "" },
      { id: 11, bigLetter: "J", smallLetter: "i", answer: "" },
      { id: 12, bigLetter: "K", smallLetter: "i", answer: "" },
      { id: 13, bigLetter: "L", smallLetter: "ö", answer: "" },
      { id: 14, bigLetter: "M", smallLetter: "ü", answer: "" },
      { id: 15, bigLetter: "N", smallLetter: "u", answer: "" },
      { id: 16, bigLetter: "T", smallLetter: "u", answer: "" },
      { id: 17, bigLetter: "Ş", smallLetter: "a", answer: "" },
      { id: 18, bigLetter: "S", smallLetter: "o", answer: "" },
      { id: 19, bigLetter: "R", smallLetter: "e", answer: "" },
      { id: 20, bigLetter: "P", smallLetter: "i", answer: "" },
      { id: 21, bigLetter: "U", smallLetter: "ö", answer: "" },
      { id: 22, bigLetter: "Ü", smallLetter: "ö", answer: "" },
      { id: 23, bigLetter: "V", smallLetter: "a", answer: "" },
      { id: 24, bigLetter: "Y", smallLetter: "i", answer: "" },
      { id: 25, bigLetter: "Z", smallLetter: "e", answer: "" },
    ],
    exercise2: [
      { id: 1, bigLetter: "A", smallLetter: "e", answer: "" },
      { id: 2, bigLetter: "B", smallLetter: "o", answer: "" },
      { id: 3, bigLetter: "C", smallLetter: "a", answer: "" },
      { id: 4, bigLetter: "Ç", smallLetter: "ö", answer: "" },
      { id: 5, bigLetter: "D", smallLetter: "i", answer: "" },
      { id: 6, bigLetter: "I", smallLetter: "a", answer: "" },
      { id: 7, bigLetter: "H", smallLetter: "i", answer: "" },
      { id: 8, bigLetter: "G", smallLetter: "a", answer: "" },
      { id: 9, bigLetter: "F", smallLetter: "u", answer: "" },
      { id: 10, bigLetter: "E", smallLetter: "ü", answer: "" },
      { id: 11, bigLetter: "J", smallLetter: "u", answer: "" },
      { id: 12, bigLetter: "K", smallLetter: "ü", answer: "" },
      { id: 13, bigLetter: "L", smallLetter: "a", answer: "" },
      { id: 14, bigLetter: "M", smallLetter: "i", answer: "" },
      { id: 15, bigLetter: "N", smallLetter: "e", answer: "" },
      { id: 16, bigLetter: "T", smallLetter: "ö", answer: "" },
      { id: 17, bigLetter: "Ş", smallLetter: "u", answer: "" },
      { id: 18, bigLetter: "S", smallLetter: "a", answer: "" },
      { id: 19, bigLetter: "R", smallLetter: "e", answer: "" },
      { id: 20, bigLetter: "P", smallLetter: "ü", answer: "" },
      { id: 21, bigLetter: "U", smallLetter: "a", answer: "" },
      { id: 22, bigLetter: "Ü", smallLetter: "e", answer: "" },
      { id: 23, bigLetter: "V", smallLetter: "o", answer: "" },
      { id: 24, bigLetter: "Y", smallLetter: "ı", answer: "" },
      { id: 25, bigLetter: "Z", smallLetter: "a", answer: "" },
    ],
    exercise3: [
      { id: 1, bigLetter: "A", smallLetter: "e", answer: "" },
      { id: 2, bigLetter: "B", smallLetter: "a", answer: "" },
      { id: 3, bigLetter: "C", smallLetter: "i", answer: "" },
      { id: 4, bigLetter: "Ş", smallLetter: "o", answer: "" },
      { id: 5, bigLetter: "H", smallLetter: "i", answer: "" },
      { id: 6, bigLetter: "G", smallLetter: "a", answer: "" },
      { id: 7, bigLetter: "Y", smallLetter: "a", answer: "" },
      { id: 8, bigLetter: "K", smallLetter: "ü", answer: "" },
      { id: 9, bigLetter: "L", smallLetter: "a", answer: "" },
      { id: 10, bigLetter: "T", smallLetter: "ö", answer: "" },
      { id: 11, bigLetter: "F", smallLetter: "u", answer: "" },
      { id: 12, bigLetter: "S", smallLetter: "e", answer: "" },
      { id: 13, bigLetter: "U", smallLetter: "a", answer: "" },
      { id: 14, bigLetter: "Ü", smallLetter: "e", answer: "" },
      { id: 15, bigLetter: "V", smallLetter: "u", answer: "" },
    ],
    exercise4: [
      { id: 1, bigLetter: "A", smallLetter: "a", answer: "" },
      { id: 2, bigLetter: "B", smallLetter: "e", answer: "" },
      { id: 3, bigLetter: "C", smallLetter: "i", answer: "" },
      { id: 4, bigLetter: "D", smallLetter: "t", answer: "" },
      { id: 5, bigLetter: "N", smallLetter: "e", answer: "" },
      { id: 6, bigLetter: "H", smallLetter: "i", answer: "" },
      { id: 7, bigLetter: "G", smallLetter: "a", answer: "" },
      { id: 8, bigLetter: "F", smallLetter: "u", answer: "" },
      { id: 9, bigLetter: "Y", smallLetter: "k", answer: "" },
      { id: 10, bigLetter: "K", smallLetter: "l", answer: "" },
      { id: 11, bigLetter: "L", smallLetter: "m", answer: "" },
      { id: 12, bigLetter: "M", smallLetter: "n", answer: "" },
      { id: 13, bigLetter: "T", smallLetter: "n", answer: "" },
      { id: 14, bigLetter: "O", smallLetter: "h", answer: "" },
      { id: 15, bigLetter: "S", smallLetter: "g", answer: "" },
      { id: 16, bigLetter: "R", smallLetter: "f", answer: "" },
      { id: 17, bigLetter: "U", smallLetter: "d", answer: "" },
      { id: 18, bigLetter: "Ü", smallLetter: "c", answer: "" },
      { id: 19, bigLetter: "V", smallLetter: "b", answer: "" },
      { id: 20, bigLetter: "T", smallLetter: "a", answer: "" },
    ],
  };

  // Rastgele harf oluşturma fonksiyonu
  const generateRandomExercise = () => {
    const bigLetters = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
    const smallLetters = "abcçdefgğhıijklmnoöprsştuüvyz";

    const randomData = [];
    const usedBigLetters = new Set();

    for (let i = 1; i <= 25; i++) {
      let bigLetter;
      do {
        bigLetter = bigLetters[Math.floor(Math.random() * bigLetters.length)];
      } while (usedBigLetters.has(bigLetter));

      usedBigLetters.add(bigLetter);

      const smallLetter =
        smallLetters[Math.floor(Math.random() * smallLetters.length)];

      randomData.push({
        id: i,
        bigLetter: bigLetter,
        smallLetter: smallLetter,
        answer: "",
      });
    }

    setCurrentExerciseData(randomData);
    setShowImage(true);
    setTimeLeft(selectedDuration);
    setUserAnswers({});
    setScore(0);
    setShowResults(false);
    setShowExercise(false); // Bu satırı ekledim - cevap kısmını kapatır
    setSelectedExercise("random");
  };

  const exerciseData =
    selectedExercise === "random"
      ? currentExerciseData
      : selectedExercise
      ? exerciseSets[selectedExercise]
      : [];

  useEffect(() => {
    if (showImage && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowImage(false);
      setShowExercise(true);
    }
  }, [showImage, timeLeft]);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    exerciseData.forEach((item) => {
      if (
        userAnswers[item.id]?.toLowerCase() === item.smallLetter.toLowerCase()
      ) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetExercise = () => {
    setShowImage(false);
    setShowExercise(false);
    setTimeLeft(30);
    setUserAnswers({});
    setScore(0);
    setShowResults(false);
    setSelectedExercise(null);
  };

  const startExercise = (exerciseKey) => {
    setSelectedExercise(exerciseKey);
    if (exerciseKey === "random") {
      generateRandomExercise();
    } else {
      setShowImage(true);
      setTimeLeft(selectedDuration);
      setUserAnswers({});
      setScore(0);
      setShowResults(false); // Bu zaten var ama emin olmak için
    }
  };

  // Yeni eklenen fonksiyon - tekrar deneme için
  const restartExercise = () => {
    setShowImage(true);
    setTimeLeft(selectedDuration);
    setUserAnswers({});
    setScore(0);
    setShowResults(false);
    setShowExercise(false); // Bu önemli - cevap kısmını kapatır
  };

  if (!selectedExercise) {
    return (
      <div className="max-w-6xl mx-auto p-5 font-sans">
        <h1 className="text-center text-slate-800 mb-8 text-4xl font-bold">
          Sağ-Sol Beyin Egzersizi
        </h1>

        {/* Yeni eklenen açıklama bölümü */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border-2 border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            🧠 Bu Egzersiz Nasıl Çalışır?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <p>
                  <strong>Görsel Hafıza:</strong> Seçtiğiniz süre boyunca büyük
                  harflerin yanındaki küçük harfleri ezberleyin.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p>
                  <strong>Hatırlama:</strong> Süre dolduktan sonra her büyük
                  harfin yanına doğru küçük harfi yazın.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p>
                  <strong>Beyin Koordinasyonu:</strong> Sağ beyin görsel bilgiyi
                  işler, sol beyin analiz eder.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <p>
                  <strong>Sonuç:</strong> Doğru cevap sayınıza göre puanınızı
                  görün ve gelişiminizi takip edin.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500">
            <p className="text-blue-800 text-center font-medium">
              💡 <strong>Faydalar:</strong> Hafıza güçlenir, konsantrasyon
              artar, beyin hücreleri arası bağlantılar kuvvetlenir!
            </p>
          </div>
        </div>

        {/* Süre seçimi bölümü */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200 mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
            ⏱️ Süre Seçimi
          </h3>
          <p className="text-gray-600 text-center mb-4">
            Kendinizi test etmek için süreyi seçin:
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSelectedDuration(45)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedDuration === 45
                  ? "bg-green-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`}
            >
              45 Saniye (Kolay)
            </button>
            <button
              onClick={() => setSelectedDuration(30)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedDuration === 30
                  ? "bg-yellow-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700"
              }`}
            >
              ⚡ 30 Saniye (Orta)
            </button>
            <button
              onClick={() => setSelectedDuration(15)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedDuration === 15
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700"
              }`}
            >
              🚀 15 Saniye (Zor)
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Seçilen süre:{" "}
              <span className="font-bold text-blue-600">
                {selectedDuration} saniye
              </span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            Hangi alıştırmayı yapmak istiyorsunuz?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-500 hover:border-blue-600 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Kolay Seviye
              </h2>
              <p className="text-gray-600 mb-6">
                Başlangıç seviyesi - 15 harf kombinasyonu
              </p>
              <button
                onClick={() => startExercise("exercise3")}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Başla
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-500 hover:border-green-600 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Orta Seviye
              </h2>
              <p className="text-gray-600 mb-6">
                Orta seviye - 20 harf kombinasyonu
              </p>
              <button
                onClick={() => startExercise("exercise4")}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Başla
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-500 hover:border-red-600 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Zor Seviye
              </h2>
              <p className="text-gray-600 mb-6">
                Zor seviye - 25 harf kombinasyonu
              </p>
              <button
                onClick={() => startExercise("exercise1")}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Başla
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-yellow-500 hover:border-yellow-600 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Çok Zor Seviye
              </h2>
              <p className="text-gray-600 mb-6">
                En zor seviye - 25 harf kombinasyonu
              </p>
              <button
                onClick={() => startExercise("exercise2")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Başla
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-500 hover:border-purple-600 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Rastgele Harfler
              </h2>
              <p className="text-gray-600 mb-6">
                Her seferinde farklı harf kombinasyonları ile çalışın
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => startExercise("random")}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                >
                  Başla
                </button>
                {selectedExercise === "random" && (
                  <button
                    onClick={generateRandomExercise}
                    className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Harfleri Değiştir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <h1 className="text-center text-slate-800 mb-8 text-4xl font-bold">
        Sağ-Sol Beyin Egzersizi -{" "}
        {selectedExercise === "exercise1"
          ? "Kolay Seviye"
          : selectedExercise === "exercise2"
          ? "Orta Seviye"
          : selectedExercise === "exercise3"
          ? "Zor Seviye"
          : selectedExercise === "exercise4"
          ? "Çok Zor Seviye"
          : "Rastgele Harfler"}
      </h1>

      {showImage && (
        <div className="text-center mb-8">
          {/* Geri dön butonu - görsel hafıza aşamasında */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={resetExercise}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              ← Ana Menüye Dön
            </button>
            <div className="text-2xl text-red-500 font-bold p-3 bg-gray-50 rounded-lg border-2 border-red-500">
              Kalan Süre: {timeLeft} saniye
            </div>
            <div className="w-24"></div> {/* Boşluk için */}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-500">
            <p className="text-lg text-slate-800 mb-8 p-4 bg-gray-100 rounded-lg border-l-4 border-red-500">
              UYGULAMA: Aşağıdaki egzersiz sağ ve sol beynimizin arasındaki bağı
              kuvvetlendirecek.{" "}
              <strong>Seçilen süre: {selectedDuration} saniye</strong>
            </p>
            <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">
              {exerciseData.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-blue-500 text-white p-5 rounded-lg text-2xl font-bold text-center shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  <span className="text-2xl">{item.bigLetter}</span>
                  <span className="text-lg">{item.smallLetter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showExercise && !showResults && (
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border-2 border-green-500">
          {/* Geri dön butonu - hatırlama aşamasında */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={resetExercise}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              ← Ana Menüye Dön
            </button>
            <h2 className="text-slate-800 text-2xl font-bold">
              Şimdi hatırlamaya çalışın!
            </h2>
            <div className="w-24"></div> {/* Boşluk için */}
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            Her büyük harfin yanındaki küçük harfi yazın:
          </p>

          <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto mb-8">
            {exerciseData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-300"
              >
                <span className="text-3xl font-bold text-slate-800">
                  {item.bigLetter}
                </span>
                <input
                  type="text"
                  maxLength="1"
                  placeholder="?"
                  value={userAnswers[item.id] || ""}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  className="w-12 h-12 text-center text-2xl border-2 border-blue-500 rounded-lg outline-none focus:border-red-500 focus:shadow-lg focus:shadow-red-200 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <button
            onClick={checkAnswers}
            className="bg-green-500 hover:bg-green-600 text-white border-none py-4 px-8 text-lg rounded-lg cursor-pointer transition-colors duration-300"
          >
            Cevapları Kontrol Et
          </button>
        </div>
      )}

      {showResults && (
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-500">
          <h2 className="text-slate-800 mb-5 text-2xl font-bold">Sonuçlar</h2>
          <p className="text-2xl text-green-600 font-bold mb-3">
            Puanınız: {score}/{exerciseData.length}
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Başarı Oranı: %{((score / exerciseData.length) * 100).toFixed(0)}
          </p>

          <div className="mb-8">
            <h3 className="text-slate-800 mb-5 text-xl font-bold">
              Cevaplarınız:
            </h3>
            <div className="grid grid-cols-5 gap-3 max-w-4xl mx-auto">
              {exerciseData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300"
                >
                  <span className="text-2xl font-bold text-slate-800">
                    {item.bigLetter}
                  </span>
                  <span className="text-green-600 font-bold">
                    {item.smallLetter}
                  </span>
                  <span
                    className={`font-bold ${
                      userAnswers[item.id]?.toLowerCase() ===
                      item.smallLetter.toLowerCase()
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {userAnswers[item.id] || "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetExercise}
              className="bg-orange-500 hover:bg-orange-600 text-white border-none py-4 px-8 text-lg rounded-lg cursor-pointer transition-colors duration-300"
            >
              Ana Menüye Dön
            </button>
            <button
              onClick={restartExercise} // startExercise yerine restartExercise kullan
              className="bg-blue-500 hover:bg-blue-600 text-white border-none py-4 px-8 text-lg rounded-lg cursor-pointer transition-colors duration-300"
            >
              Tekrar Dene
            </button>
            {selectedExercise === "random" && (
              <button
                onClick={generateRandomExercise}
                className="bg-purple-500 hover:bg-purple-600 text-white border-none py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Yeni Harfler
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
