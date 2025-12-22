"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OdakliOkuma() {
  const router = useRouter();
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wordCount, setWordCount] = useState(50);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [customDuration, setCustomDuration] = useState(60); // Kullanıcı tarafından ayarlanan süre
  const [wordSpeed, setWordSpeed] = useState(1); // Kelime gösterim hızı (1x, 2x, 3x gibi)
  const intervalRef = useRef(null);

  const metin =
    "İnsanlık tarihi boyunca doğa, insan yaşamının en temel unsuru olmuştur. İnsanlar, varoluşlarının ilk anlarından itibaren doğadan beslenmiş, doğada barınmış ve doğanın sunduğu kaynakları kullanarak yaşamlarını sürdürmüşlerdir. Doğa, insan için hem bir yaşam alanı hem de bir öğretici olmuştur. Fakat zamanla insanoğlunun doğaya yaklaşımı değişmiş, bu kadim ilişkinin dengesi bozulmuştur. Günümüzde doğa ve insan arasındaki ilişki, hem iş birliği hem de çatışma boyutlarıyla değerlendirilmektedir.";

  // Metni kelimelere ayır ve her kelimede rastgele bir harfi kırmızı yap
  const prepareWords = () => {
    const wordArray = metin.split(/\s+/).filter((word) => word.length > 0);
    const processedWords = wordArray.map((word) => {
      const randomIndex = Math.floor(Math.random() * word.length);
      return {
        text: word,
        redLetterIndex: randomIndex,
      };
    });
    return processedWords;
  };

  // Oyunu başlat
  const startGame = () => {
    const preparedWords = prepareWords();
    setWords(preparedWords.slice(0, wordCount));
    setCurrentWordIndex(0);
    setIsPlaying(true);
    setIsStarted(true);
    setTimeLeft(customDuration);
  };

  // Oyunu durdur
  const stopGame = () => {
    setIsPlaying(false);
    setIsStarted(false);
    setCurrentWordIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Oyunu sıfırla
  const resetGame = () => {
    stopGame();
    setWords([]);
    setCurrentWordIndex(0);
    setTimeLeft(customDuration);
  };

  // Kelime gösterimi için interval
  useEffect(() => {
    if (isPlaying && words.length > 0) {
      // Kelime gösterim hızını hesapla
      const baseInterval = (customDuration * 1000) / words.length;
      const adjustedInterval = baseInterval / wordSpeed;

      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, adjustedInterval);

      intervalRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [isPlaying, words.length, customDuration, wordSpeed]);

  // Geri sayım
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  // Kelimeyi render et
  const renderWord = (word) => {
    if (!word) return null;

    return word.text.split("").map((letter, index) => (
      <span
        key={index}
        className={`text-4xl font-bold ${
          index === word.redLetterIndex ? "text-red-500" : "text-gray-800"
        }`}
      >
        {letter}
      </span>
    ));
  };

  // Hız seçenekleri
  const speedOptions = [
    { value: 0.5, label: "0.5x (Yavaş)" },
    { value: 1, label: "1x (Normal)" },
    { value: 1.5, label: "1.5x (Hızlı)" },
    { value: 2, label: "2x (Çok Hızlı)" },
    { value: 3, label: "3x (Ultra Hızlı)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Odaklı Okuma
          </h1>
          <p className="text-gray-600">
            Kelimeleri tek tek okuyarak odaklanma becerinizi geliştirin
          </p>
        </div>

        {/* Kontrol Paneli */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kelime Sayısı
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isStarted}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Toplam Süre (saniye)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                value={customDuration}
                onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isStarted}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gösterim Hızı
              </label>
              <select
                value={wordSpeed}
                onChange={(e) => setWordSpeed(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isStarted}
              >
                {speedOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-600">Kalan Süre</div>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex gap-2 justify-center mt-6">
            {!isStarted ? (
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Başla
              </button>
            ) : (
              <>
                <button
                  onClick={stopGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Durdur
                </button>
                <button
                  onClick={resetGame}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Sıfırla
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bilgi Paneli */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-blue-800">
            <div>
              <div className="font-semibold">Kelime Başına Süre</div>
              <div className="text-lg font-bold">
                {words.length > 0
                  ? (customDuration / wordSpeed / words.length).toFixed(2)
                  : 0}{" "}
                saniye
              </div>
            </div>
            <div>
              <div className="font-semibold">Toplam Süre</div>
              <div className="text-lg font-bold">{customDuration} saniye</div>
            </div>
            <div>
              <div className="font-semibold">Hız Çarpanı</div>
              <div className="text-lg font-bold">{wordSpeed}x</div>
            </div>
          </div>
        </div>

        {/* İlerleme Çubuğu */}
        {isStarted && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                İlerleme: {currentWordIndex + 1} / {words.length}
              </span>
              <span>
                {Math.round(((currentWordIndex + 1) / words.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentWordIndex + 1) / words.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Kelime Gösterimi */}
        <div className="bg-white rounded-lg shadow-lg p-12 min-h-96 flex items-center justify-center">
          {!isStarted ? (
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl">
                Ayarları yapıp Başla butonuna tıklayarak oyunu başlatın
              </p>
            </div>
          ) : words.length > 0 && currentWordIndex < words.length ? (
            <div className="text-center">
              <div className="mb-4">{renderWord(words[currentWordIndex])}</div>
              <div className="text-sm text-gray-500">
                Kelime {currentWordIndex + 1} / {words.length}
              </div>
            </div>
          ) : (
            <div className="text-center text-green-600">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl font-bold">
                Tebrikler! Tüm kelimeleri okudunuz!
              </p>
              <button
                onClick={resetGame}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Tekrar Oyna
              </button>
            </div>
          )}
        </div>

        {/* Geri Dön Butonu */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
}
