"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GorselYorumlama() {
  const router = useRouter();
  const [currentClass, setCurrentClass] = useState("all");
  const [currentGraph, setCurrentGraph] = useState(1); // 1 for Evcil Hayvan, 2 for Kitap Türleri
  const [answers, setAnswers] = useState({
    5: { a: "", b: "", c: "", d: "" },
    6: {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: "",
      h: "",
      i: "",
      j: "",
      k: "",
      l: "",
      m: "",
    },
    7: { a: "", b: "", c: "", d: "" },
  });
  const [feedback, setFeedback] = useState({
    5: { a: null, b: null, c: null, d: null },
    6: {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
      i: null,
      j: null,
      k: null,
      l: null,
      m: null,
    },
    7: { a: null, b: null, c: null, d: null },
  });
  const [showResults, setShowResults] = useState({
    5: false,
    6: false,
    7: false,
  });
  const [scores, setScores] = useState({
    5: 0,
    6: 0,
    7: 0,
  });

  const handleAnswerChange = (classNum, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [classNum]: {
        ...prev[classNum],
        [question]: value,
      },
    }));
  };

  const checkAnswers = (classNum) => {
    const correctAnswers = {
      5: { a: "Futbol", b: "Voleybol", c: "35", d: "15" },
      6: {
        a: "Kedi",
        b: "Balık",
        c: "25",
        d: "10",
        e: "Macera",
        f: "Bilim Kurgu",
        g: "22",
        h: "2",
        i: "Zeynep",
        j: "140",
        k: "30",
        l: "Perşembe",
        m: "Pazartesi",
      },
      7: { a: "İngilizce", b: "Sosyal", c: "40", d: "10" },
    };

    const userAnswers = answers[classNum];
    const correct = correctAnswers[classNum];
    const newFeedback = { ...feedback[classNum] };
    let score = 0;
    let totalQuestions = 0;

    if (classNum === 6) {
      // 6. sınıf için sadece seçili grafiğin sorularını kontrol et
      if (currentGraph === 1) {
        // Evcil Hayvan grafiği - a, b, c, d soruları
        const evcilHayvanAnswers = {
          a: correct.a,
          b: correct.b,
          c: correct.c,
          d: correct.d,
        };
        Object.keys(evcilHayvanAnswers).forEach((key) => {
          const isCorrect =
            userAnswers[key].toLowerCase() ===
            evcilHayvanAnswers[key].toLowerCase();
          newFeedback[key] = isCorrect ? "correct" : "incorrect";
          if (isCorrect) score++;
          totalQuestions++;
        });
      } else if (currentGraph === 2) {
        // Kitap Türleri grafiği - e, f, g, h soruları
        const kitapTurleriAnswers = {
          e: correct.e,
          f: correct.f,
          g: correct.g,
          h: correct.h,
        };
        Object.keys(kitapTurleriAnswers).forEach((key) => {
          const isCorrect =
            userAnswers[key].toLowerCase() ===
            kitapTurleriAnswers[key].toLowerCase();
          newFeedback[key] = isCorrect ? "correct" : "incorrect";
          if (isCorrect) score++;
          totalQuestions++;
        });
      } else if (currentGraph === 3) {
        // Günlük Okuma Süreleri soruları
        const okumaSuresiSorulari = {
          i: correct.i,
          j: correct.j,
          k: correct.k,
          l: correct.l,
          m: correct.m,
        };
        Object.keys(okumaSuresiSorulari).forEach((key) => {
          const isCorrect =
            userAnswers[key].toLowerCase() ===
            okumaSuresiSorulari[key].toLowerCase();
          newFeedback[key] = isCorrect ? "correct" : "incorrect";
          if (isCorrect) score++;
          totalQuestions++;
        });
      }
    } else {
      // Diğer sınıflar için tüm soruları kontrol et
      Object.keys(correct).forEach((key) => {
        const isCorrect =
          userAnswers[key].toLowerCase() === correct[key].toLowerCase();
        newFeedback[key] = isCorrect ? "correct" : "incorrect";
        if (isCorrect) score++;
        totalQuestions++;
      });
    }

    // Geri bildirim ve puanları güncelle
    setFeedback((prev) => ({ ...prev, [classNum]: newFeedback }));
    setScores((prev) => ({ ...prev, [classNum]: score }));
    setShowResults((prev) => ({ ...prev, [classNum]: true }));

    // Bildirim pencereleri kaldırıldı; sonuçlar ekrandaki sonuç kutularında gösterilir.
  };

  const resetAnswers = (classNum) => {
    setAnswers((prev) => ({
      ...prev,
      [classNum]: Object.keys(prev[classNum]).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    }));
    setFeedback((prev) => ({
      ...prev,
      [classNum]: Object.keys(prev[classNum]).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
    }));
    setShowResults((prev) => ({ ...prev, [classNum]: false }));
    setScores((prev) => ({ ...prev, [classNum]: 0 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            5, 6 ve 7. Sınıfl Etkinlikleri
          </h1>
          <p className="text-lg text-gray-600">
            Görsel verileri analiz edin ve soruları cevaplayın
          </p>
        </div>

        {/* 5. Sınıf İçeriği */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            5. Sınıf Grafik ve Tablo Yorumlama Soruları
          </h2>

          {/* Grafik */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Öğrencilerin En Çok Sevdiği Spor Dalları
            </h3>
            <div className="flex items-end justify-center space-x-8 h-64 mb-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-red-500 rounded-t-lg"
                  style={{ height: "120px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Futbol</span>
                <span className="text-xs text-gray-500">25</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-blue-500 rounded-t-lg"
                  style={{ height: "80px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Basketbol</span>
                <span className="text-xs text-gray-500">20</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-green-500 rounded-t-lg"
                  style={{ height: "60px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Yüzme</span>
                <span className="text-xs text-gray-500">15</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-orange-500 rounded-t-lg"
                  style={{ height: "40px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Voleybol</span>
                <span className="text-xs text-gray-500">10</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-purple-500 rounded-t-lg"
                  style={{ height: "100px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Tenis</span>
                <span className="text-xs text-gray-500">20</span>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              <span className="font-medium">Y ekseni:</span> Öğrenci Sayısı
              (0-25)
            </div>
          </div>

          {/* Sorular */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-700">
              1) Grafiğe göre soruları cevaplayınız:
            </h4>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">a)</span>
                <span className="text-gray-600">
                  En çok sevilen spor dalı hangisidir?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[5].a}
                    onChange={(e) => handleAnswerChange(5, "a", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[5].a === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[5].a === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[5].a && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[5].a === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[5].a === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">b)</span>
                <span className="text-gray-600">
                  En az sevilen spor dalı hangisidir?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[5].b}
                    onChange={(e) => handleAnswerChange(5, "b", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[5].b === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[5].b === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[5].b && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[5].b === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[5].b === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">c)</span>
                <span className="text-gray-600">
                  Futbol ve Tenis&apos;i seven toplam öğrenci sayısı kaçtır?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[5].c}
                    onChange={(e) => handleAnswerChange(5, "c", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[5].c === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[5].c === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[5].c && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[5].c === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[5].c === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">d)</span>
                <span className="text-gray-600">
                  Futbol Basketbol&apos;dan kaç fazla?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[5].d}
                    onChange={(e) => handleAnswerChange(5, "d", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[5].d === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[5].d === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[5].d && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[5].d === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[5].d === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => checkAnswers(5)}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Cevapları Kontrol Et
            </button>
          </div>

          {/* Sonuç Göstergesi */}
          {showResults[5] && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  Sonuçlarınız
                </h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {scores[5]}/4 Doğru
                </div>
                <div className="text-sm text-blue-600 mb-3">
                  Başarı Oranı: {Math.round((scores[5] / 4) * 100)}%
                </div>
                <button
                  onClick={() => resetAnswers(5)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Yeniden Başlat
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 6. Sınıf İçeriği */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            6. Sınıf Grafik ve Tablo Yorumlama Soruları
          </h2>

          {/* Grafik Seçimi */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => setCurrentGraph(1)}
                className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all ${
                  currentGraph === 1
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Evcil Hayvan Grafiği
              </button>
              <button
                onClick={() => setCurrentGraph(2)}
                className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all ${
                  currentGraph === 2
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Kitap Türleri Grafiği
              </button>
              <button
                onClick={() => setCurrentGraph(3)}
                className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all ${
                  currentGraph === 3
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                Günlük Okuma Süreleri
              </button>
            </div>
          </div>

          {/* Evcil Hayvan Grafiği */}
          {currentGraph === 1 && (
            <div>
              <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Öğrencilerin Evcil Hayvan Tercihleri
              </h3>
              <div className="flex items-end justify-center space-x-8 h-64 mb-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-pink-500 rounded-t-lg"
                    style={{ height: "140px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Kedi</span>
                  <span className="text-xs text-gray-500">28</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-yellow-500 rounded-t-lg"
                    style={{ height: "100px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Köpek</span>
                  <span className="text-xs text-gray-500">20</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-blue-500 rounded-t-lg"
                    style={{ height: "80px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Kuş</span>
                  <span className="text-xs text-gray-500">16</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-green-500 rounded-t-lg"
                    style={{ height: "40px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Balık</span>
                  <span className="text-xs text-gray-500">8</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-purple-500 rounded-t-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Tavşan</span>
                  <span className="text-xs text-gray-500">12</span>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 mb-8">
                <span className="font-medium">Y ekseni:</span> Öğrenci Sayısı
                (0-30)
              </div>

              {/* Evcil Hayvan Soruları */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  Evcil Hayvan Tercihleri grafiğine göre soruları cevaplayınız:
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">a)</span>
                    <span className="text-gray-600">
                      En çok tercih edilen evcil hayvan hangisidir?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].a}
                        onChange={(e) =>
                          handleAnswerChange(6, "a", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].a === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].a === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].a && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].a === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].a === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">b)</span>
                    <span className="text-gray-600">
                      En az tercih edilen evcil hayvan hangisidir?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].b}
                        onChange={(e) =>
                          handleAnswerChange(6, "b", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].b === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].b === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].b && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].b === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].b === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">c)</span>
                    <span className="text-gray-600">
                      Kedi ve Tavşan&apos;ı tercih eden toplam öğrenci sayısı
                      kaçtır?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].c}
                        onChange={(e) =>
                          handleAnswerChange(6, "c", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].c === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].c === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].c && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].c === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].c === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">d)</span>
                    <span className="text-gray-600">
                      Kedi Köpek&apos;ten kaç fazla?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].d}
                        onChange={(e) =>
                          handleAnswerChange(6, "d", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].d === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].d === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].d && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].d === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].d === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => checkAnswers(6)}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cevapları Kontrol Et
                </button>
              </div>

              {/* Sonuç Göstergesi */}
              {showResults[6] && currentGraph === 1 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">
                      Evcil Hayvan Grafiği Sonuçları
                    </h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {scores[6]}/4 Doğru
                    </div>
                    <div className="text-sm text-blue-600 mb-3">
                      Başarı Oranı: {Math.round((scores[6] / 4) * 100)}%
                    </div>
                    <button
                      onClick={() => resetAnswers(6)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Yeniden Başlat
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Kitap Türleri Grafiği */}
          {currentGraph === 2 && (
            <div>
              <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Öğrencilerin En Sevdiği Kitap Türleri
              </h3>
              <div className="flex items-end justify-center space-x-8 h-64 mb-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-blue-600 rounded-t-lg"
                    style={{ height: "120px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Macera</span>
                  <span className="text-xs text-gray-500">12</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-yellow-500 rounded-t-lg"
                    style={{ height: "80px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Masal</span>
                  <span className="text-xs text-gray-500">8</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-green-500 rounded-t-lg"
                    style={{ height: "100px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Hikaye</span>
                  <span className="text-xs text-gray-500">10</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-purple-500 rounded-t-lg"
                    style={{ height: "70px" }}
                  ></div>
                  <span className="mt-2 text-sm font-medium">Şiir</span>
                  <span className="text-xs text-gray-500">7</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 bg-red-500 rounded-t-lg"
                    style={{ height: "50px" }}
                  ></div>
                  <span className="text-xs text-gray-500">5</span>
                  <span className="mt-2 text-sm font-medium">Bilim Kurgu</span>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 mb-8">
                <span className="font-medium">Y ekseni:</span> Öğrenci Sayısı
                (0-14)
              </div>

              {/* Kitap Türleri Soruları */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  Kitap Türleri grafiğine göre soruları cevaplayınız:
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">e)</span>
                    <span className="text-gray-600">
                      Yukarıdaki grafiğe göre en çok sevilen kitap türü
                      hangisidir?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].e}
                        onChange={(e) =>
                          handleAnswerChange(6, "e", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].e === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].e === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].e && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].e === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].e === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">f)</span>
                    <span className="text-gray-600">
                      En az öğrencinin sevdiği kitap türü hangisidir?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].f}
                        onChange={(e) =>
                          handleAnswerChange(6, "f", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].f === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].f === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].f && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].f === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].f === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">g)</span>
                    <span className="text-gray-600">
                      Macera ve Hikâye kitaplarını seven toplam öğrenci sayısı
                      kaçtır?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].g}
                        onChange={(e) =>
                          handleAnswerChange(6, "g", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].g === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].g === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].g && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].g === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].g === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">h)</span>
                    <span className="text-gray-600">
                      Hikaye seven öğrenci sayısı, Masal sevenlerden kaç
                      fazladır?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].h}
                        onChange={(e) =>
                          handleAnswerChange(6, "h", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].h === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].h === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].h && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].h === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].h === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => checkAnswers(6)}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cevapları Kontrol Et
                </button>
              </div>

              {/* Sonuç Göstergesi */}
              {showResults[6] && currentGraph === 2 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">
                      Kitap Türleri Grafiği Sonuçları
                    </h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {scores[6]}/4 Doğru
                    </div>
                    <div className="text-sm text-blue-600 mb-3">
                      Başarı Oranı: {Math.round((scores[6] / 4) * 100)}%
                    </div>
                    <button
                      onClick={() => resetAnswers(6)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Yeniden Başlat
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Günlük Okuma Süreleri Tablosu */}
          {currentGraph === 3 && (
            <div>
              <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Öğrencilerin Günlük Okuma Süreleri (Dakika)
              </h3>

              {/* Tablo */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Öğrenci Adı
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                        Pazartesi
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                        Salı
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                        Çarşamba
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                        Perşembe
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                        Cuma
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                        Elif
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        30
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        15
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        15
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        30
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        20
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                        Mert
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        20
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        15
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        20
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        20
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        15
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                        Zeynep
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        15
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        45
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        30
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        45
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        20
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                        Ahmet
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        45
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        20
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        15
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        30
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        30
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Günlük Okuma Süreleri Soruları */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  Tabloya göre soruları cevaplayınız:
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">i)</span>
                    <span className="text-gray-600">
                      En çok kitap okuyan öğrenci kimdir?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].i}
                        onChange={(e) =>
                          handleAnswerChange(6, "i", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].i === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].i === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].i && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].i === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].i === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">j)</span>
                    <span className="text-gray-600">
                      Ahmet toplam kaç dakika kitap okumuştur?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].j}
                        onChange={(e) =>
                          handleAnswerChange(6, "j", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].j === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].j === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].j && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].j === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].j === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">k)</span>
                    <span className="text-gray-600">
                      Elif ve Mert&apos;in Salı günü toplam okuma süresi kaç
                      dakikadır?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].k}
                        onChange={(e) =>
                          handleAnswerChange(6, "k", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].k === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].k === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].k && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].k === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].k === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">l)</span>
                    <span className="text-gray-600">
                      Haftanın hangi gününde öğrenciler genel olarak daha çok
                      kitap okumuş?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].l}
                        onChange={(e) =>
                          handleAnswerChange(6, "l", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].l === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].l === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].l && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].l === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].l === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">m)</span>
                    <span className="text-gray-600">
                      Zeynep&apos;in okuma süresinin en az olduğu gün
                      hangisidir?
                    </span>
                    <div className="flex-1 max-w-xs relative">
                      <input
                        type="text"
                        value={answers[6].m}
                        onChange={(e) =>
                          handleAnswerChange(6, "m", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          feedback[6].m === "correct"
                            ? "border-green-500 bg-green-50"
                            : feedback[6].m === "incorrect"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Cevabınızı yazın..."
                      />
                      {feedback[6].m && (
                        <div
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                            feedback[6].m === "correct"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {feedback[6].m === "correct" ? "✓" : "✗"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => checkAnswers(6)}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cevapları Kontrol Et
                </button>
              </div>

              {/* Sonuç Göstergesi */}
              {showResults[6] && currentGraph === 3 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">
                      Günlük Okuma Süreleri Sonuçları
                    </h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {scores[6]}/5 Doğru
                    </div>
                    <div className="text-sm text-blue-600 mb-3">
                      Başarı Oranı: {Math.round((scores[6] / 5) * 100)}%
                    </div>
                    <button
                      onClick={() => resetAnswers(6)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Yeniden Başlat
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 7. Sınıf İçeriği */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            7. Sınıf Grafik ve Tablo Yorumlama Soruları
          </h2>

          {/* Grafik */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Öğrencilerin En Çok Sevdikleri Dersler
            </h3>
            <div className="flex items-end justify-center space-x-8 h-64 mb-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-red-500 rounded-t-lg"
                  style={{ height: "80px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Matematik</span>
                <span className="text-xs text-gray-500">20</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-blue-400 rounded-t-lg"
                  style={{ height: "60px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Türkçe</span>
                <span className="text-xs text-gray-500">15</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-green-500 rounded-t-lg"
                  style={{ height: "100px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Fen</span>
                <span className="text-xs text-gray-500">25</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-orange-500 rounded-t-lg"
                  style={{ height: "40px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">Sosyal</span>
                <span className="text-xs text-gray-500">10</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-purple-500 rounded-t-lg"
                  style={{ height: "120px" }}
                ></div>
                <span className="mt-2 text-sm font-medium">İngilizce</span>
                <span className="text-xs text-gray-500">30</span>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              <span className="font-medium">Y ekseni:</span> Öğrenci Sayısı
              (0-30)
            </div>
          </div>

          {/* Sorular */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-700">
              1) Grafiğe göre soruları cevaplayınız:
            </h4>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">a)</span>
                <span className="text-gray-600">
                  En çok sevilen ders hangisidir?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[7].a}
                    onChange={(e) => handleAnswerChange(7, "a", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[7].a === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[7].a === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[7].a && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[7].a === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[7].a === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">b)</span>
                <span className="text-gray-600">
                  En az sevilen ders hangisidir?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[7].b}
                    onChange={(e) => handleAnswerChange(7, "b", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[7].b === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[7].b === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[7].b && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[7].b === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[7].b === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">c)</span>
                <span className="text-gray-600">
                  Türkçe ve Fen&apos;i seven toplam öğrenci sayısı kaçtır?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[7].c}
                    onChange={(e) => handleAnswerChange(7, "c", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[7].c === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[7].c === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[7].c && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[7].c === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[7].c === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">d)</span>
                <span className="text-gray-600">
                  İngilizce Matematik&apos;ten kaç fazla?
                </span>
                <div className="flex-1 max-w-xs relative">
                  <input
                    type="text"
                    value={answers[7].d}
                    onChange={(e) => handleAnswerChange(7, "d", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      feedback[7].d === "correct"
                        ? "border-green-500 bg-green-50"
                        : feedback[7].d === "incorrect"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Cevabınızı yazın..."
                  />
                  {feedback[7].d && (
                    <div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg ${
                        feedback[7].d === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feedback[7].d === "correct" ? "✓" : "✗"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => checkAnswers(7)}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Cevapları Kontrol Et
            </button>
          </div>

          {/* Sonuç Göstergesi */}
          {showResults[7] && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  Sonuçlarınız
                </h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {scores[7]}/4 Doğru
                </div>
                <div className="text-sm text-blue-600 mb-3">
                  Başarı Oranı: {Math.round((scores[7] / 4) * 100)}%
                </div>
                <button
                  onClick={() => resetAnswers(7)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Yeniden Başlat
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Geri Dön Butonu */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
}
