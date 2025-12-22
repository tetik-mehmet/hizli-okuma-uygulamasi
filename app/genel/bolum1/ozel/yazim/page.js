"use client";
import { useState, useEffect, useRef } from "react";

export default function YazimPage({ visibleSets = null }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(40);
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const audioRef = useRef(null);
  const timeUpAudioRef = useRef(null);

  const questionsSet1 = [
    {
      id: 1,
      words: ["kırafet", "kıvofet", "kıyafet"],
      correct: 2,
    },
    {
      id: 2,
      words: ["giysi", "giviisi", "givisi"],
      correct: 0,
    },
    {
      id: 3,
      words: ["giramafon", "gramafon", "gramofon"],
      correct: 2,
    },
    {
      id: 4,
      words: ["vestever", "vevsiter", "vestiyer"],
      correct: 2,
    },
    {
      id: 5,
      words: ["buluz", "bluz", "büluz"],
      correct: 0,
    },
    {
      id: 6,
      words: ["şarküteri", "sarkuteri", "sarkiteri"],
      correct: 0,
    },
    {
      id: 7,
      words: ["moco", "maço", "mocco"],
      correct: 1,
    },
    {
      id: 8,
      words: ["perzi", "piriz", "priz"],
      correct: 2,
    },
    {
      id: 9,
      words: ["kahkul", "kahkül", "kehkül"],
      correct: 1,
    },
    {
      id: 10,
      words: ["kakule", "kekule", "kakula"],
      correct: 0,
    },
    {
      id: 11,
      words: ["kıradeniz", "karadeniz", "kardeniz"],
      correct: 1,
    },
    {
      id: 12,
      words: ["kalumbağa", "kablumbağa", "kaplumbağa"],
      correct: 2,
    },
    {
      id: 13,
      words: ["grev", "girev", "girev"],
      correct: 0,
    },
  ];

  const questionsSet2 = [
    {
      id: 1,
      words: ["mikrefon", "mikrofon", "mikrafon"],
      correct: 1,
    },
    {
      id: 2,
      words: ["şarkıçı", "sarkıcı", "şarkıcı"],
      correct: 2,
    },
    {
      id: 3,
      words: ["ambiyans", "ambians", "ambivens"],
      correct: 0,
    },
    {
      id: 4,
      words: ["daktali", "daktile", "daktilo"],
      correct: 2,
    },
    {
      id: 5,
      words: ["gazeta", "gazete", "gazato"],
      correct: 1,
    },
    {
      id: 6,
      words: ["galeta", "gatela", "galleta"],
      correct: 0,
    },
    {
      id: 7,
      words: ["şarj", "sarz", "sarvz"],
      correct: 0,
    },
    {
      id: 8,
      words: ["cerkes", "cerkis", "cerkez"],
      correct: 2,
    },
    {
      id: 9,
      words: ["psikolig", "psikolag", "psikolog"],
      correct: 2,
    },
  ];

  const questionsSet3 = [
    {
      id: 1,
      words: ["milyoner", "millivoner", "milivoner"],
      correct: 0,
    },
    {
      id: 2,
      words: ["sundalve", "sandalye", "sandale"],
      correct: 1,
    },
    {
      id: 3,
      words: ["kasırlama", "karşılana", "karşılama"],
      correct: 2,
    },
    {
      id: 4,
      words: ["ağırlamak", "ağırlanak", "ağırlak"],
      correct: 0,
    },
    {
      id: 5,
      words: ["şoför", "şoför", "şöför"],
      correct: 0,
    },
    {
      id: 6,
      words: ["pılanlamak", "planlamak", "pilanlamak"],
      correct: 1,
    },
    {
      id: 7,
      words: ["projeksiyon", "projoksivon", "projeksüvon"],
      correct: 0,
    },
    {
      id: 8,
      words: ["ereskin", "erskin", "erişkin"],
      correct: 2,
    },
    {
      id: 9,
      words: ["galabivet", "galibiyet", "gelibivat"],
      correct: 1,
    },
    {
      id: 10,
      words: ["galeksi", "gelaksi", "galaksi"],
      correct: 2,
    },
    {
      id: 11,
      words: ["ziynet", "zevnet", "zivnit"],
      correct: 0,
    },
    {
      id: 12,
      words: ["kıvırcık", "kivircik", "kıvvırcık"],
      correct: 0,
    },
    {
      id: 13,
      words: ["perfüm", "parfum", "parfüm"],
      correct: 2,
    },
  ];

  const questionsSet4 = [
    {
      id: 1,
      words: ["manav", "manov", "monav"],
      correct: 0,
    },
    {
      id: 2,
      words: ["kirdele", "kordele", "kurdele"],
      correct: 2,
    },
    {
      id: 3,
      words: ["sorfa", "sofra", "sarfa"],
      correct: 1,
    },
    {
      id: 4,
      words: ["pıcak", "bıçak", "bacak"],
      correct: 1,
    },
    {
      id: 5,
      words: ["Saat", "sat", "saatt"],
      correct: 1,
    },
    {
      id: 6,
      words: ["Fize", "füzü", "füze"],
      correct: 2,
    },
    {
      id: 7,
      words: ["vaal", "vaad", "vaat"],
      correct: 2,
    },
    {
      id: 8,
      words: ["mekine", "makina", "makine"],
      correct: 2,
    },
    {
      id: 9,
      words: ["dudak", "daduk", "duduk"],
      correct: 0,
    },
    {
      id: 10,
      words: ["meymun", "maymun", "mamun"],
      correct: 1,
    },
    {
      id: 11,
      words: ["zeki", "ziki", "zeke"],
      correct: 0,
    },
    {
      id: 12,
      words: ["zerba", "zabre", "zebra"],
      correct: 2,
    },
    {
      id: 13,
      words: ["komedi", "kumedi", "komedii"],
      correct: 0,
    },
  ];

  const questionsSet5 = [
    {
      id: 1,
      words: ["kelem", "kelam", "kalem"],
      correct: 2,
    },
    {
      id: 2,
      words: ["anahtarlık", "anehtarlık", "anevtarlık"],
      correct: 0,
    },
    {
      id: 3,
      words: ["kümpas", "kampas", "kumpas"],
      correct: 2,
    },
    {
      id: 4,
      words: ["takerlek", "tekerlek", "tekirlek"],
      correct: 1,
    },
    {
      id: 5,
      words: ["ilezyon", "illüzyon", "ilüzvon"],
      correct: 1,
    },
    {
      id: 6,
      words: ["şöhret", "şahröt", "sehröt"],
      correct: 0,
    },
    {
      id: 7,
      words: ["doğon", "doğan", "dağan"],
      correct: 1,
    },
    {
      id: 8,
      words: ["pilaka", "pleka", "plaka"],
      correct: 2,
    },
    {
      id: 9,
      words: ["cidem", "çiğdem", "ciğğdem"],
      correct: 1,
    },
    {
      id: 10,
      words: ["labaratuvar", "laboratuvar", "labaratuar"],
      correct: 1,
    },
    {
      id: 11,
      words: ["eczane", "eczene", "eczaane"],
      correct: 0,
    },
  ];

  const questionsSet6 = [
    {
      id: 1,
      words: ["kilima", "kılima", "klima"],
      correct: 2,
    },
    {
      id: 2,
      words: ["müstakil", "mustakil", "müstekil"],
      correct: 0,
    },
    {
      id: 3,
      words: ["aheng", "ahenk", "ahank"],
      correct: 1,
    },
    {
      id: 4,
      words: ["profiteröl", "profeteröl", "profiterol"],
      correct: 2,
    },
    {
      id: 5,
      words: ["müteahit", "metüahit", "mütteahit"],
      correct: 0,
    },
    {
      id: 6,
      words: ["strateji", "sıtrateji", "strateje"],
      correct: 0,
    },
    {
      id: 7,
      words: ["psikivatre", "pisikivatri", "psikiyatri"],
      correct: 2,
    },
    {
      id: 8,
      words: ["kıronoloji", "kronoloji", "kironoloji"],
      correct: 1,
    },
    {
      id: 9,
      words: ["platonik", "pilatonik", "piletonik"],
      correct: 0,
    },
    {
      id: 10,
      words: ["krater", "kırater", "kirater"],
      correct: 0,
    },
    {
      id: 11,
      words: ["karakterstik", "karakteristik", "karekteristik"],
      correct: 1,
    },
    {
      id: 12,
      words: ["tırın", "tiren", "tren"],
      correct: 2,
    },
    {
      id: 13,
      words: ["zürefa", "zürafa", "zurafa"],
      correct: 1,
    },
  ];

  const questionsSet7 = [
    {
      id: 1,
      words: ["mimar", "mimarh", "mımar"],
      correct: 0,
    },
    {
      id: 2,
      words: ["muzze", "müze", "müzze"],
      correct: 1,
    },
    {
      id: 3,
      words: ["terapi", "terepi", "terapı"],
      correct: 0,
    },
    {
      id: 4,
      words: ["atlas", "atllas", "atles"],
      correct: 0,
    },
    {
      id: 5,
      words: ["sekreter", "sekretör", "segreter"],
      correct: 0,
    },
    {
      id: 6,
      words: ["tekneloji", "teknoloji", "teknooji"],
      correct: 1,
    },
    {
      id: 7,
      words: ["antoloji", "antaloji", "antoloci"],
      correct: 0,
    },
    {
      id: 8,
      words: ["kampanya", "kampanyae", "kamponya"],
      correct: 0,
    },
    {
      id: 9,
      words: ["stajyer", "stajiar", "stajyir"],
      correct: 0,
    },
    {
      id: 10,
      words: ["lavabo", "lavapo", "lavobo"],
      correct: 0,
    },
  ];

  const questionsSet8 = [
    {
      id: 1,
      words: ["karbonhidrat", "karbohidrat", "karbonhidraat"],
      correct: 0,
    },
    {
      id: 2,
      words: ["akvaryum", "akveriyum", "akvaryom"],
      correct: 0,
    },
    {
      id: 3,
      words: ["diyafram", "diyafran", "diyafrem"],
      correct: 0,
    },
    {
      id: 4,
      words: ["kütüphane", "kütüphana", "kütüpane"],
      correct: 0,
    },
    {
      id: 5,
      words: ["heykeltıraş", "heykeltaş", "heykeltraş"],
      correct: 0,
    },
    {
      id: 6,
      words: ["istatistik", "istatislik", "istatistlik"],
      correct: 0,
    },
    {
      id: 7,
      words: ["ekspres", "ekspreas", "eksperez"],
      correct: 0,
    },
    {
      id: 8,
      words: ["lisans", "lisanz", "lisens"],
      correct: 0,
    },
    {
      id: 9,
      words: ["molekül", "molekül", "molekül"],
      correct: 0,
    },
  ];

  const questionsSet9 = [
    {
      id: 1,
      words: ["macera", "macarra", "maccera"],
      correct: 0,
    },
    {
      id: 2,
      words: ["bisiklet", "bissiklet", "bisikled"],
      correct: 0,
    },
    {
      id: 3,
      words: ["oyuncak", "oyuncag", "oyıncak"],
      correct: 0,
    },
    {
      id: 4,
      words: ["gökyüzü", "gokyüzü", "gökyüzu"],
      correct: 0,
    },
    {
      id: 5,
      words: ["bahçe", "bahce", "baheçe"],
      correct: 0,
    },
    {
      id: 6,
      words: ["resim", "ressim", "rezim"],
      correct: 0,
    },
    {
      id: 7,
      words: ["yarışma", "yarişma", "yarışmaa"],
      correct: 0,
    },
    {
      id: 8,
      words: ["arkadaş", "arkadas", "arkdaş"],
      correct: 0,
    },
    {
      id: 9,
      words: ["ödev", "ödevv", "odev"],
      correct: 0,
    },
  ];

  const questionsSet10 = [
    {
      id: 1,
      words: ["sosyalleşmek", "sosyalileşmek", "sosyallesmek"],
      correct: 0,
    },
    {
      id: 2,
      words: ["bağımsızlık", "bagımsızlık", "bağımsızlıkh"],
      correct: 0,
    },
    {
      id: 3,
      words: ["mükemmellik", "mükemellik", "mukemmellik"],
      correct: 0,
    },
    {
      id: 4,
      words: ["entegrasyon", "entegresyon", "entegreasyon"],
      correct: 0,
    },
    {
      id: 5,
      words: ["optimizasyon", "optimizayson", "optimizasiyon"],
      correct: 0,
    },
    {
      id: 6,
      words: ["potansiyel", "potansyel", "potansiyal"],
      correct: 0,
    },
    {
      id: 7,
      words: ["stratejik", "stratajık", "stratejık"],
      correct: 0,
    },
    {
      id: 8,
      words: ["revizyon", "reviziyon", "revizsyon"],
      correct: 0,
    },
    {
      id: 9,
      words: ["uyumluluk", "uygunluk", "uyumlluk"],
      correct: 0,
    },
  ];

  const getSetByNumber = (setNumber) => {
    if (setNumber === 1) return questionsSet1;
    if (setNumber === 2) return questionsSet2;
    if (setNumber === 3) return questionsSet3;
    if (setNumber === 4) return questionsSet4;
    if (setNumber === 5) return questionsSet5;
    if (setNumber === 6) return questionsSet6;
    if (setNumber === 7) return questionsSet7;
    if (setNumber === 8) return questionsSet8;
    if (setNumber === 9) return questionsSet9;
    return questionsSet10;
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // Süre dolduğunda uyarı sesi çal
      if (timeUpAudioRef.current) {
        try {
          timeUpAudioRef.current.currentTime = 0;
          timeUpAudioRef.current.play();
        } catch (e) {}
      }
      finishExercise();
    }
  }, [isActive, timeLeft]);

  const startExercise = (setNumber) => {
    if (visibleSets && !visibleSets.includes(setNumber)) {
      return;
    }
    setCurrentSet(setNumber);
    setIsActive(true);
    setTimeLeft(40);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);

    const sourceQuestions = getSetByNumber(setNumber);
    const shuffled = sourceQuestions.map((q) => {
      const indices = [0, 1, 2];
      // Fisher-Yates
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const newWords = indices.map((idx) => q.words[idx]);
      const newCorrect = indices.indexOf(q.correct);
      return { ...q, words: newWords, correct: newCorrect };
    });
    setActiveQuestions(shuffled);
  };

  const selectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const finishExercise = () => {
    setIsActive(false);
    let correctCount = 0;
    activeQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);

    // Mevcut set için tüm sorular doğru cevaplandıysa başarı sesi çal
    const currentSetQuestions = getSetByNumber(currentSet);
    if (correctCount === currentSetQuestions.length && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Ses çalınamadı:", error);
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const allQuestionsAnswered = () => {
    return activeQuestions.every((question) =>
      selectedAnswers.hasOwnProperty(question.id)
    );
  };

  const goToMainMenu = () => {
    setIsActive(false);
    setShowResults(false);
    setSelectedAnswers({});
    setScore(0);
    setTimeLeft(40);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter p-4">
        <div className="max-w-4xl mx-auto">
          <audio
            ref={timeUpAudioRef}
            src="/sesler/doldu.mp3"
            preload="auto"
            hidden
          />
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Yazım Etkinliği Sonuçları - Set {currentSet}
            </h1>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {score}/{activeQuestions.length}
              </div>
              <div className="text-xl text-gray-600">
                Doğru Cevap:{" "}
                {Math.round((score / activeQuestions.length) * 100)}%
              </div>
            </div>

            <div className="grid gap-4">
              {activeQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correct;

                return (
                  <div
                    key={question.id}
                    className={`border rounded-lg p-4 ${
                      isCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">
                        Soru {index + 1}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "Doğru" : "Yanlış"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {question.words.map((word, wordIndex) => (
                        <div
                          key={wordIndex}
                          className={`p-3 rounded-lg border-2 ${
                            wordIndex === question.correct
                              ? "border-green-500 bg-green-100 text-green-800"
                              : wordIndex === userAnswer && !isCorrect
                              ? "border-red-500 bg-red-100 text-red-800"
                              : "border-gray-200 bg-gray-50 text-gray-600"
                          }`}
                        >
                          <div className="text-center">
                            {wordIndex === question.correct && (
                              <div className="text-green-600 font-bold mb-1">
                                ✓
                              </div>
                            )}
                            {wordIndex === userAnswer && !isCorrect && (
                              <div className="text-red-600 font-bold mb-1">
                                ✗
                              </div>
                            )}
                            <span className="font-medium">{word}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {!isCorrect && (
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="font-medium">Doğru cevap:</span>{" "}
                        {question.words[question.correct]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8 space-x-4">
              <button
                onClick={goToMainMenu}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                ← Ana Menüye Dön
              </button>
              <button
                onClick={() => startExercise(currentSet)}
                className={`font-semibold py-3 px-8 rounded-lg text-lg transition-colors ${
                  currentSet === 1
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : currentSet === 2
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : currentSet === 3
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : currentSet === 4
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : currentSet === 5
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : currentSet === 6
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : currentSet === 7
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : currentSet === 8
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : currentSet === 9
                    ? "bg-lime-600 hover:bg-lime-700 text-white"
                    : "bg-rose-600 hover:bg-rose-700 text-white"
                }`}
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full text-center">
          <audio
            ref={timeUpAudioRef}
            src="/sesler/doldu.mp3"
            preload="auto"
            hidden
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Yazım Etkinliği
          </h1>

          <div className="text-gray-600 mb-8">
            <p className="mb-4">
              Her satırda doğru yazılan kelimenin altını çiziniz.
            </p>
            <p className="text-sm mb-6">Her set için süre: 40 saniye</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {(!visibleSets || visibleSets.includes(1)) && (
              <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">1</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet1.length} soru
                </p>
                <button
                  onClick={() => startExercise(1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(2)) && (
              <div className="border-2 border-green-200 rounded-xl p-4 hover:border-green-400 transition-colors">
                <h3 className="text-lg font-semibold text-green-800 mb-2">2</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet2.length} soru
                </p>
                <button
                  onClick={() => startExercise(2)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(3)) && (
              <div className="border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 transition-colors">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  3
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet3.length} soru
                </p>
                <button
                  onClick={() => startExercise(3)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(4)) && (
              <div className="border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-colors">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  4
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet4.length} soru
                </p>
                <button
                  onClick={() => startExercise(4)}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(5)) && (
              <div className="border-2 border-pink-200 rounded-xl p-4 hover:border-pink-400 transition-colors">
                <h3 className="text-lg font-semibold text-pink-800 mb-2">5</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet5.length} soru
                </p>
                <button
                  onClick={() => startExercise(5)}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(6)) && (
              <div className="border-2 border-indigo-200 rounded-xl p-4 hover:border-indigo-400 transition-colors">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  6
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet6.length} soru
                </p>
                <button
                  onClick={() => startExercise(6)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(7)) && (
              <div className="border-2 border-teal-200 rounded-xl p-4 hover:border-teal-400 transition-colors">
                <h3 className="text-lg font-semibold text-teal-800 mb-2">7</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet7.length} soru
                </p>
                <button
                  onClick={() => startExercise(7)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(8)) && (
              <div className="border-2 border-amber-200 rounded-xl p-4 hover:border-amber-400 transition-colors">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">8</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet8.length} soru
                </p>
                <button
                  onClick={() => startExercise(8)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(9)) && (
              <div className="border-2 border-lime-200 rounded-xl p-4 hover:border-lime-400 transition-colors">
                <h3 className="text-lg font-semibold text-lime-800 mb-2">9</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet9.length} soru
                </p>
                <button
                  onClick={() => startExercise(9)}
                  className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}

            {(!visibleSets || visibleSets.includes(10)) && (
              <div className="border-2 border-rose-200 rounded-xl p-4 hover:border-rose-400 transition-colors">
                <h3 className="text-lg font-semibold text-rose-800 mb-2">10</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {questionsSet10.length} soru
                </p>
                <button
                  onClick={() => startExercise(10)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-sm"
                >
                  Başla
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Ses dosyası için gizli audio elementi */}
      <audio ref={audioRef} src="/success.mp3" preload="auto" />
      <audio
        ref={timeUpAudioRef}
        src="/sesler/doldu.mp3"
        preload="auto"
        hidden
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Yazım Etkinliği - Set {currentSet}
            </h1>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">Kalan Süre</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              Toplam {activeQuestions.length} soru
            </div>
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${
                    (Object.keys(selectedAnswers).length /
                      activeQuestions.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Her satırda doğru yazılan kelimenin altını çiziniz:
            </h2>
          </div>

          <div className="space-y-6">
            {activeQuestions.map((question, index) => (
              <div
                key={question.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-center mb-3">
                  <span className="font-semibold text-gray-700 mr-4 min-w-[60px]">
                    {index + 1}.
                  </span>
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    {question.words.map((word, wordIndex) => (
                      <button
                        key={wordIndex}
                        onClick={() => selectAnswer(question.id, wordIndex)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-center font-medium ${
                          selectedAnswers[question.id] === wordIndex
                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation and Finish Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToMainMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Ana Menüye Dön
          </button>

          <button
            onClick={finishExercise}
            disabled={!allQuestionsAnswered()}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
              !allQuestionsAnswered()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white shadow-lg"
            }`}
          >
            {allQuestionsAnswered() ? "Bitir ✓" : "Tüm soruları cevaplayın"}
          </button>
        </div>
      </div>
    </div>
  );
}
