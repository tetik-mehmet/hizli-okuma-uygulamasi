"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function EsAnlamliPage({
  visibleGroupIds,
  defaultGroupId,
  embedded,
} = {}) {
  const router = useRouter();
  const [selectedWord, setSelectedWord] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Görüntüdeki eş anlamlı kelimeler - 5'erli gruplar halinde
  const baseWordGroups = [
    // Grup 1: Renkler ve Temel Nitelikler
    [
      { word: "AK", synonym: "BEYAZ", category: "renk" },
      { word: "KIRMIZI", synonym: "AL", category: "renk" },
      { word: "SİYAH", synonym: "KARA", category: "renk" },
      { word: "AKILLI", synonym: "USLU", category: "nitelik" },
      { word: "BASİT", synonym: "KOLAY", category: "nitelik" },
    ],
    // Grup 2: Vücut ve Sağlık
    [
      { word: "KAFA", synonym: "BAŞ", category: "vücut" },
      { word: "KALP", synonym: "YÜREK", category: "vücut" },
      { word: "SURAT", synonym: "YÜZ", category: "vücut" },
      { word: "SAĞLIK", synonym: "SIHHAT", category: "durum" },
      { word: "İHTİYAR", synonym: "YAŞLI", category: "yaş" },
    ],
    // Grup 3: Duygular ve Davranışlar
    [
      { word: "KUŞKU", synonym: "ŞÜPHE", category: "duygu" },
      { word: "SEVİNÇ", synonym: "NEŞE", category: "duygu" },
      { word: "DERT", synonym: "ÜZÜNTÜ", category: "duygu" },
      { word: "İSTEK", synonym: "ARZU", category: "duygu" },
      { word: "KİBAR", synonym: "NAZİK", category: "davranış" },
    ],
    // Grup 4: Meslekler ve Eğitim
    [
      { word: "HAKİM", synonym: "YARGIÇ", category: "meslek" },
      { word: "DOKTOR", synonym: "HEKİM", category: "meslek" },
      { word: "SINAV", synonym: "İMTİHAN", category: "değerlendirme" },
      { word: "SINIF", synonym: "DERSLİK", category: "eğitim" },
      { word: "BAŞVURU", synonym: "MÜRACAAT", category: "istek" },
    ],
    // Grup 5: Doğa ve Çevre
    [
      { word: "DOĞA", synonym: "TABİAT", category: "çevre" },
      { word: "NEHİR", synonym: "IRMAK", category: "su" },
      { word: "RÜZGAR", synonym: "YEL", category: "hava" },
      { word: "DÜNYA", synonym: "YERKÜRE", category: "gezegen" },
      { word: "SONBAHAR", synonym: "GÜZ", category: "mevsim" },
    ],
    // Grup 6: Zaman ve Kavramlar
    [
      { word: "ASIR", synonym: "YÜZYIL", category: "zaman" },
      { word: "ÖZGÜRLÜK", synonym: "HÜRRİYET", category: "kavram" },
      { word: "ANLAM", synonym: "MANA", category: "kavram" },
      { word: "SEBEP", synonym: "NEDEN", category: "kavram" },
      { word: "AMAÇ", synonym: "GAYE", category: "hedef" },
    ],
    // Grup 7: Yapılar ve Mekanlar
    [
      { word: "ANIT", synonym: "ABİDE", category: "yapı" },
      { word: "İL", synonym: "ŞEHİR", category: "yerleşim" },
      { word: "MEKAN", synonym: "YER", category: "konum" },
      { word: "BÜYÜK", synonym: "İRİ", category: "boyut" },
      { word: "SÜRATLİ", synonym: "HIZLI", category: "hareket" },
    ],
    // Grup 8: Dil ve İletişim
    [
      { word: "SÖZCÜK", synonym: "KELİME", category: "dil" },
      { word: "CÜMLE", synonym: "TÜMCE", category: "dil" },
      { word: "CEVAP", synonym: "YANIT", category: "iletişim" },
      { word: "SORU", synonym: "SUAL", category: "iletişim" },
      { word: "AD", synonym: "İSİM", category: "kimlik" },
    ],
    // Grup 9: Deneyim ve Keşif
    [
      { word: "ACEMİ", synonym: "TOY", category: "deneyim" },
      { word: "MACERA", synonym: "SERÜVEN", category: "deneyim" },
      { word: "BULUŞ", synonym: "İCAT", category: "keşif" },
      { word: "ANI", synonym: "HATIRA", category: "bellek" },
      { word: "MİSAFİR", synonym: "KONUK", category: "kişi" },
    ],
    // Grup 10: Diğer
    [
      { word: "BİÇİM", synonym: "ŞEKİL", category: "görünüm" },
      { word: "HIZ", synonym: "SÜRAT", category: "hareket" },
      { word: "İLAVE", synonym: "EK", category: "ekleme" },
      { word: "PROBLEM", synonym: "SORUN", category: "durum" },
      { word: "SAVAŞ", synonym: "HARP", category: "çatışma" },
    ],
    // Grup 11: Son Grup
    [
      { word: "ARMAĞAN", synonym: "HEDİYE", category: "verme" },
      { word: "KANUN", synonym: "YASA", category: "hukuk" },
      { word: "KİŞİ", synonym: "ŞAHIS", category: "kimlik" },
    ],
  ];

  const wordGroups = useMemo(() => {
    if (Array.isArray(visibleGroupIds) && visibleGroupIds.length > 0) {
      const allowed = new Set(visibleGroupIds);
      return baseWordGroups.filter((_, idx) => allowed.has(idx + 1));
    }
    return baseWordGroups;
  }, [visibleGroupIds]);

  const initialGroupIndex = useMemo(() => {
    if (defaultGroupId != null) {
      if (Array.isArray(visibleGroupIds) && visibleGroupIds.length > 0) {
        const idx = visibleGroupIds.indexOf(defaultGroupId);
        return idx >= 0 ? idx : 0;
      }
      const zeroIdx = defaultGroupId - 1;
      return zeroIdx >= 0 ? zeroIdx : 0;
    }
    return 0;
  }, [defaultGroupId, visibleGroupIds]);

  useEffect(() => {
    setCurrentGroup(initialGroupIndex);
  }, [initialGroupIndex]);

  // Mevcut gruptaki kelimeleri gerçekten karışık sırayla göster (eş anlamlılar yan yana olmasın)
  const getCurrentGroupWords = () => {
    const currentGroupWords = wordGroups[currentGroup];
    const allWords = [];

    // Tüm kelimeleri sabit sırayla diz
    currentGroupWords.forEach((pair) => {
      allWords.push(pair.word);
      allWords.push(pair.synonym);
    });

    // Gerçekten karışık sıralama (eş anlamlılar yan yana olmasın)
    const shuffledOrder = [
      [0, 6, 1, 8, 3, 5, 2, 9, 4, 7], // Grup 1: AK, KARA, BEYAZ, AKILLI, USLU, AL, KIRMIZI, BASİT, SİYAH, KOLAY
      [2, 7, 0, 9, 4, 1, 5, 8, 3, 6], // Grup 2: KALP, İHTİYAR, KAFA, YAŞLI, YÜZ, BAŞ, YÜREK, SURAT, SAĞLIK, SIHHAT
      [4, 9, 1, 6, 3, 8, 0, 5, 2, 7], // Grup 3: SEVİNÇ, KİBAR, KUŞKU, NAZİK, İSTEK, ŞÜPHE, KUŞKU, ARZU, DERT, ÜZÜNTÜ
      [6, 1, 3, 8, 0, 5, 2, 9, 4, 7], // Grup 4: DOKTOR, SINIF, HAKİM, BAŞVURU, YARGIÇ, HEKİM, SINAV, MÜRACAAT, DERSLİK, İMTİHAN
      [8, 3, 5, 0, 2, 7, 4, 9, 1, 6], // Grup 5: NEHİR, DÜNYA, SONBAHAR, DOĞA, YERKÜRE, IRMAK, TABİAT, GÜZ, RÜZGAR, YEL
      [2, 7, 0, 5, 4, 9, 6, 1, 8, 3], // Grup 6: ANLAM, SEBEP, ASIR, ÖZGÜRLÜK, YÜZYIL, NEDEN, HÜRRİYET, ASIR, MANA, YÜZYIL
      [4, 9, 2, 7, 6, 1, 8, 3, 0, 5], // Grup 7: MEKAN, BÜYÜK, ANIT, İRİ, ABİDE, YER, İL, ŞEHİR, ANIT, ABİDE
      [6, 1, 4, 9, 8, 3, 0, 5, 2, 7], // Grup 8: CEVAP, SORU, CÜMLE, KELİME, SUAL, YANIT, SÖZCÜK, TÜMCE, AD, İSİM
      [8, 3, 6, 1, 0, 5, 2, 7, 4, 9], // Grup 9: BULUŞ, ACEMİ, ANI, TOY, MACERA, İCAT, ACEMİ, HATIRA, SERÜVEN, MACERA
      [0, 5, 8, 3, 2, 7, 4, 9, 1, 6], // Grup 10: BİÇİM, HIZ, İLAVE, PROBLEM, ŞEKİL, SORUN, EK, BİÇİM, SÜRAT, HIZ
      [2, 7, 0, 5, 8, 1, 4, 3, 6, 9], // Grup 11: KİŞİ, HEDİYE, ARMAĞAN, YASA, ŞAHIS, ARMAĞAN, KANUN, KİŞİ, YASA, HEDİYE
    ];

    // Mevcut grup için karışık sırayı al
    const currentShuffle = shuffledOrder[currentGroup] || shuffledOrder[0];

    // Kelimeleri karışık sırayla döndür
    const shuffledWords = [];
    currentShuffle.forEach((index) => {
      if (allWords[index]) {
        shuffledWords.push(allWords[index]);
      }
    });

    return shuffledWords;
  };

  // Geri bildirim göster
  const showFeedbackMessage = (message, type) => {
    setFeedback({ message, type });
    setShowFeedback(true);

    // 3 saniye sonra geri bildirimi gizle
    setTimeout(() => {
      setShowFeedback(false);
      setFeedback(null);
    }, 3000);
  };

  // Oyunu başlat
  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [startTime]);

  // Kelime seçimi
  const handleWordClick = (word) => {
    if (matchedPairs.includes(word)) return; // Zaten eşleşmiş kelimeleri seçme

    if (!selectedWord) {
      setSelectedWord(word);
      showFeedbackMessage(
        `${word} kelimesi seçildi! Şimdi eş anlamlısını bul.`,
        "info"
      );
    } else {
      // Eşleştirme kontrolü
      if (selectedWord === word) {
        setSelectedWord(null);
        showFeedbackMessage("Aynı kelimeyi tekrar seçemezsin!", "warning");
        return;
      }

      // Mevcut grupta kelime çiftini bul
      const currentGroupWords = wordGroups[currentGroup];
      let selectedPair = null;
      let clickedPair = null;

      // Seçilen kelime hangi çiftte?
      for (const pair of currentGroupWords) {
        if (pair.word === selectedWord || pair.synonym === selectedWord) {
          selectedPair = pair;
          break;
        }
      }

      // Tıklanan kelime hangi çiftte?
      for (const pair of currentGroupWords) {
        if (pair.word === word || pair.synonym === word) {
          clickedPair = pair;
          break;
        }
      }

      // Eşleştirme kontrolü - Aynı çiftte mi?
      if (selectedPair && clickedPair && selectedPair === clickedPair) {
        // Doğru eşleştirme - Aynı çiftteki kelimeler
        setMatchedPairs((prev) => [...prev, selectedWord, word]);
        setScore((prev) => prev + 10);

        showFeedbackMessage(
          `🎉 Mükemmel! ${selectedWord} = ${word} doğru eşleşti! +10 puan`,
          "success"
        );

        // Oyun tamamlandı mı kontrol et
        const totalWords = wordGroups.reduce(
          (sum, group) => sum + group.length * 2,
          0
        );
        if (matchedPairs.length + 2 === totalWords) {
          setGameCompleted(true);
          setEndTime(Date.now());
        }
      } else {
        // Yanlış eşleştirme - Farklı çiftlerdeki kelimeler
        setScore((prev) => Math.max(0, prev - 2));
        showFeedbackMessage(
          `❌ Yanlış! ${selectedWord} ≠ ${word} eşleşmedi. -2 puan`,
          "error"
        );
      }

      setSelectedWord(null);
    }
  };

  // Oyunu yeniden başlat
  const resetGame = () => {
    setSelectedWord(null);
    setMatchedPairs([]);
    setScore(0);
    setGameCompleted(false);
    setStartTime(Date.now());
    setEndTime(null);
    setCurrentGroup(initialGroupIndex);
    setFeedback(null);
    setShowFeedback(false);
  };

  // Ana sayfaya dön
  const goHome = () => {
    router.push("/");
  };

  // Sonraki gruba geç
  const nextGroup = () => {
    if (currentGroup < wordGroups.length - 1) {
      setCurrentGroup((prev) => prev + 1);
      setSelectedWord(null);
      showFeedbackMessage(`Grup ${currentGroup + 2}'ye geçildi!`, "info");
    }
  };

  // Önceki gruba geç
  const prevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup((prev) => prev - 1);
      setSelectedWord(null);
      showFeedbackMessage(`Grup ${currentGroup}'ye geri dönüldü!`, "info");
    }
  };

  // Kelime kartı bileşeni
  const WordCard = ({ word, isMatched, isSelected }) => (
    <div
      className={`
        w-32 h-16 flex items-center justify-center text-center text-sm font-bold rounded-lg cursor-pointer transition-all duration-300
        ${
          isMatched
            ? "bg-green-500 text-white shadow-lg scale-95 animate-pulse"
            : isSelected
            ? "bg-blue-500 text-white shadow-lg scale-105 animate-bounce"
            : "bg-white text-gray-800 shadow-md hover:shadow-lg hover:scale-105 border-2 border-gray-200"
        }
      `}
      onClick={() => handleWordClick(word)}
    >
      {word}
    </div>
  );

  // Oyun tamamlandığında süre hesapla
  const getGameTime = () => {
    if (!startTime || !endTime) return 0;
    return Math.round((endTime - startTime) / 1000);
  };

  // Toplam kelime sayısını hesapla
  const getTotalWords = () => {
    return wordGroups.reduce((sum, group) => sum + group.length * 2, 0);
  };

  // Mevcut gruptaki eşleşen kelime sayısını hesapla
  const getCurrentGroupMatches = () => {
    const currentGroupWords = wordGroups[currentGroup];
    let matches = 0;

    currentGroupWords.forEach((pair) => {
      if (
        matchedPairs.includes(pair.word) &&
        matchedPairs.includes(pair.synonym)
      ) {
        matches++;
      }
    });

    return matches;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Geri Bildirim Toast */}
        {showFeedback && feedback && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-500 ${
              feedback.type === "success"
                ? "bg-green-500 text-white"
                : feedback.type === "error"
                ? "bg-red-500 text-white"
                : feedback.type === "warning"
                ? "bg-yellow-500 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {feedback.type === "success"
                  ? "✅"
                  : feedback.type === "error"
                  ? "❌"
                  : feedback.type === "warning"
                  ? "⚠️"
                  : "ℹ️"}
              </span>
              <p className="font-semibold">{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            Eş Anlamlı Kelime Eşleştirme
          </h1>
          <p className="text-lg text-gray-600">
            Kelimelerin eş anlamlılarını bul ve eşleştir!
          </p>
        </div>

        {/* Skor ve Durum */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div className="bg-blue-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800">Skor</h3>
              <p className="text-2xl font-bold text-blue-600">{score}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800">
                Eşleşen Çiftler
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {matchedPairs.length / 2}
              </p>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800">
                Toplam Çift
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {getTotalWords() / 2}
              </p>
            </div>
            <div className="bg-orange-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-800">Grup</h3>
              <p className="text-2xl font-bold text-orange-600">
                {currentGroup + 1}/{wordGroups.length}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800">
                Grup İlerleme
              </h3>
              <p className="text-2xl font-bold text-yellow-600">
                {getCurrentGroupMatches()}/{wordGroups[currentGroup].length}
              </p>
            </div>
          </div>
        </div>

        {/* Oyun Alanı */}
        {!gameCompleted ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Grup Navigasyonu */}
            <div className="flex justify-between items-center mb-6">
              {!embedded && wordGroups.length > 1 ? (
                <>
                  <button
                    onClick={prevGroup}
                    disabled={currentGroup === 0}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentGroup === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    ← Önceki Grup
                  </button>

                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                      Grup {currentGroup + 1}:{" "}
                      {wordGroups[currentGroup][0]?.category || "Genel"}{" "}
                      Kategorisi
                    </h2>
                    <p className="text-sm text-gray-500">
                      {getCurrentGroupMatches()}/
                      {wordGroups[currentGroup].length} kelime çifti eşleşti
                    </p>
                  </div>

                  <button
                    onClick={nextGroup}
                    disabled={currentGroup === wordGroups.length - 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentGroup === wordGroups.length - 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    Sonraki Grup →
                  </button>
                </>
              ) : (
                <div className="text-center mx-auto">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Grup {currentGroup + 1}:{" "}
                    {wordGroups[currentGroup][0]?.category || "Genel"}{" "}
                    Kategorisi
                  </h2>
                  <p className="text-sm text-gray-500">
                    {getCurrentGroupMatches()}/{wordGroups[currentGroup].length}{" "}
                    kelime çifti eşleşti
                  </p>
                </div>
              )}
            </div>

            {/* Seçilen Kelime */}
            <div className="mb-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Seçilen Kelime:
              </h3>
              {selectedWord ? (
                <div className="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block text-lg font-bold animate-pulse">
                  {selectedWord}
                </div>
              ) : (
                <div className="text-gray-400">Henüz kelime seçilmedi</div>
              )}
            </div>

            {/* Kelime Kartları - Karışık Sırayla (Sabit) */}
            <div className="grid grid-cols-5 gap-4 justify-items-center">
              {getCurrentGroupWords().map((word, index) => (
                <WordCard
                  key={`${word}-${index}`}
                  word={word}
                  isMatched={matchedPairs.includes(word)}
                  isSelected={selectedWord === word}
                />
              ))}
            </div>

            {/* Grup İlerleme Çubuğu */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Grup {currentGroup + 1}</span>
                <span>
                  {Math.round(((currentGroup + 1) / wordGroups.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentGroup + 1) / wordGroups.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          /* Oyun Tamamlandı */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Tebrikler!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Tüm eş anlamlı kelimeleri başarıyla eşleştirdin!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Final Skorun
                </h3>
                <p className="text-3xl font-bold text-green-600">{score}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Oyun Süresi
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {getGameTime()} saniye
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resetGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Tekrar Oyna
              </button>
            </div>
          </div>
        )}

        {/* Kontrol Butonları */}
        {!gameCompleted && (
          <div className="mt-8 text-center">
            <button
              onClick={resetGame}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Oyunu Sıfırla
            </button>
          </div>
        )}

        {/* Oyun Kuralları */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Nasıl Oynanır?
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Kelimeler 5&apos;erli gruplar halinde gösterilir</li>
            <li>
              • Her grupta kelimeler karışık sırayla dizilir ama yerleri
              değişmez
            </li>
            <li>• İlk olarak bir kelime seç</li>
            <li>• Sonra o kelimenin eş anlamlısını bul ve tıkla</li>
            <li>• Doğru eşleştirmelerde +10 puan kazanırsın</li>
            <li>• Yanlış eşleştirmelerde -2 puan kaybedersin</li>
            <li>• Tüm kelimeleri eşleştirerek oyunu tamamla!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
