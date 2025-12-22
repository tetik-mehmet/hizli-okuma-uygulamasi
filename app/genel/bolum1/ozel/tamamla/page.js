"use client";
import { useState, useEffect, useRef } from "react";

export default function TamamlaPage() {
  const [userInputs, setUserInputs] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [gameStarted, setGameStarted] = useState(false);
  const [completedWords, setCompletedWords] = useState(0);
  // Yeni state'ler ekle
  const [feedback, setFeedback] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [showExtraText, setShowExtraText] = useState(false);

  // İkinci metin için state'ler
  const [extraTextUserInputs, setExtraTextUserInputs] = useState({});
  const [extraTextFeedback, setExtraTextFeedback] = useState({});
  const [extraTextShowFeedback, setExtraTextShowFeedback] = useState({});
  const [extraTextScore, setExtraTextScore] = useState(0);
  const timeUpAudioRef = useRef(null);

  // Görüntüdeki yeni metin paragrafı - eksik harfler _ ile işaretlenmiş
  const originalText = `H_zlı oku_a, bireylerin metinleri daha kısa s_rede ve an_ayarak okuyabilmesini sağlayan bir okuma te_niğidir. Temel amacı, okuma hı_ını artırı_ken anlama oranını da koruma. ya da geliştirmektir. G_nümüzde bil_iye ulaşımın ol_ukça kolaylaştığı ancak zamanın daha kı_metli hale geldiği bir ça_da yaşıyoruz. Bu nedenle _ızlı ve e_kili okumak, hem öğrenciler hem _e profesyoneller i_in büyük bir avantaj sa_lar. Hızlı okuma tekni_leri, _elimeleri tek tek okumak yerine gru_lar halinde gö_meyi ve anla_ayı öğretir. Beyin, belirli bir hızdan sonra da_a _erimli çalıştığı için, bu _öntemle okunan metin daha kolay anla_ılır hale ge_ir. Ayrıca göz kap_klarının e_itilmesi ve geri dönüş hareke_lerinin a_altılması da okuma süre_ini önemli öl_üde kısaltır. Bu beceri, yalnız_a hız değil, aynı _amanda dikka_ve odaklanma gibi bili_sel yetenekleri de gel_ştirir. Hızlı okuma e_itimi alan kişiler, _etinler üzerinde daha fazla hâkimiye_kurar ve önemli bilgileri kolayca ayıklayabilir. Özellikle sına_lara hazırlanan öğrenciler için_aman yö_etimi açısından bü_ük bir katkı sağlar.`;

  // OCR ile çıkarılan ikinci metin (MERTİN BİR GÜNÜ) — eksik harfler _ ile bırakıldı
  const extraTextOCR = `MERTİN BİR GÜNÜ\n\nBir s_b_h_r sabahı, küçük b_r köyde yaşayan Mert, uyandığında penc_res_n_n önünde cıvıldayan kuşl_rı duydu. G_n_ş y_ni d_ğm_ş, gökyüzü m_smavi idi. O g_n köyde büyük b_r şenl_k ol_caktı. Mert, heyecanla y_tağından fırladı ve üstünü g_yindi ve annes_ne seslendi:\n-Anne!\n\nAnnesi, g_l_ms_yerek, “Evet oğl_m, daha erk_n ama h_zırl_klı ol_c_ğ_z” dedi. Mert, b_hç_ye çıkan çeyiz s_ndüğ_nden eski ama çok s_vdiği davulunu çıkardı. O d_v_l köyde hep büyük övgüler alırdı.\n\nKısa s_rede k_yün meydanında ins_nl_r t_pl_nmaya başladı. Çocuklar s_kı sıkıya el ele tutuşup oyun oynamaya koyuldular. Kad_nlar birleşen börek, tatlı ve taze pişmiş ekmek ikram ediyordu. Erk_klerse uzun masal_rda sohb_t ediy_r, gül_y_rdu.\n\nMert, davulunu çalmaya başladı, ortalık canlandı. En sevdiği arkadaşı Ayşe de eline bir z_l ve ş_kırtılı bir tef aldı. İkisi birlikte öyle b_r rit_m tuttular ki herkes dans etmeye başladı. Çevredeki insanlar halay ç_kiyor, yaşlıl_r ise başl_rını s_llayarak eski g_nl_ri yad ediyordu.\n\nBir s_re sonra köy_n yaşlı muhtarı söz aldı: “Sevgili komşular_m, bu şenlik bize b_rl_k b_raberliğimizi h_tırl_tıyor. Hepimiz aynı sofrada, aynı neşede b_luştuk. Bu bizim en güzel günümüz!”\n\nKalab_l_k toplu_l_k alkışladı. Çocuklar gülmeye başladı, kuşl_r kan_t çırptı. Mert, dav_l_nu son kez vurduğunda büyük bir mutluluk hissetti. O gün eks_k hiçb_r ş_y yoktu; y_lnızca sev_nç, paylaşma ve beraberlik vardı.`;

  // Eksik harflerin pozisyonlarını otomatik hesapla
  const calculateMissingPositions = () => {
    const positions = [];
    let count = 0;

    for (let i = 0; i < originalText.length; i++) {
      if (originalText[i] === "_") {
        positions.push({
          position: i,
          answer: getAnswerForPosition(i),
          word: getWordForPosition(i),
        });
        count++;
      }
    }

    return positions;
  };

  // Her pozisyon için doğru cevabı döndür
  const getAnswerForPosition = (pos) => {
    const answers = [
      "ı",
      "m",
      "ü",
      "l",
      "k",
      "z",
      "r",
      "ü",

      "g",
      "d",
      "y",
      "ğ",
      "H",
      "t",
      "d",
      "ç",
      "ğ",
      "k",
      "k",
      "p",
      "r",
      "m",
      "h",
      "v",
      "y",
      "ş",
      "l",
      "a",
      "ğ",
      "t",
      "z",
      "s",
      "ç",
      "c",
      "z",
      "t",
      "m",
      "i",
      "ğ",
      "m",
      "t",
      "v",
      "z",
      "n",
      "y",
    ];

    const underscoreCount =
      originalText.substring(0, pos).split("_").length - 1;
    return answers[underscoreCount] || "?";
  };

  // Her pozisyon için kelimeyi döndür
  const getWordForPosition = (pos) => {
    const words = [
      "Hızlı",
      "okuma",
      "sürede",
      "anlayarak",
      "tekniğidir",
      "hızını",
      "artırırken",
      "korumak",
      "Günümüzde",
      "bilgiye",
      "oldukça",
      "kıymetli",
      "çağda",
      "Hızlı",
      "etkili",
      "hemde",
      "için",
      "sağlar",
      "teknikleri",
      "kelimeleri",
      "gruplar",
      "görmeyi",
      "anlamayı",
      "daha",
      "verimli",
      "yöntemle",
      "anlaşılır",
      "geçir",
      "kalemlerinin",
      "eğitilmesi",
      "hareketlerinin",
      "aşaltılması",
      "süreçini",
      "ölçüde",
      "yalnızca",
      "zamanda",
      "dikkat",
      "bilişsel",
      "geliştirir",
      "eğitimi",
      "Metinler",
      "hâkimiyet",
      "sınavlara",
      "zaman",
      "yönetimi",
      "büyük",
    ];

    const underscoreCount =
      originalText.substring(0, pos).split("_").length - 1;
    return words[underscoreCount] || "?";
  };

  // Eksik harfleri otomatik hesapla
  const missingLetters = calculateMissingPositions();

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Süre dolduğunda uyarı sesi çal
      if (timeUpAudioRef.current) {
        try {
          timeUpAudioRef.current.currentTime = 0;
          timeUpAudioRef.current.play();
        } catch (e) {
          // sessiz geç
        }
      }
      checkFinalScore();
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setUserInputs({});
    setScore(0);
    setTimeLeft(180);
    setShowResult(false);
    setCompletedWords(0);
    // Feedback state'lerini sıfırla
    setFeedback({});
    setShowFeedback({});
  };

  const handleInputChange = (position, value) => {
    setUserInputs((prev) => ({
      ...prev,
      [position]: value,
    }));

    // Harf girildiğinde anında kontrol et
    if (value.length === 1) {
      const missingLetter = missingLetters.find(
        (letter) => letter.position === position
      );
      if (missingLetter) {
        const isCorrect =
          value.toLowerCase() === missingLetter.answer.toLowerCase();

        // Feedback'i göster
        setFeedback((prev) => ({
          ...prev,
          [position]: isCorrect ? "correct" : "incorrect",
        }));

        setShowFeedback((prev) => ({
          ...prev,
          [position]: true,
        }));

        // 2 saniye sonra feedback'i gizle
        setTimeout(() => {
          setShowFeedback((prev) => ({
            ...prev,
            [position]: false,
          }));
        }, 2000);

        // Doğru cevap ise puanı güncelle
        if (isCorrect) {
          setScore((prev) => prev + 10);
        }
      }
    }
  };

  const checkFinalScore = () => {
    let correctCount = 0;
    missingLetters.forEach((letter) => {
      if (
        userInputs[letter.position]?.toLowerCase() ===
        letter.answer.toLowerCase()
      ) {
        correctCount++;
      }
    });
    setScore(correctCount * 10);
    setCompletedWords(correctCount);
    setShowResult(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Metni render et ve eksik harfleri input olarak göster
  const renderTextWithInputs = () => {
    let result = [];

    for (let i = 0; i < originalText.length; i++) {
      if (originalText[i] === "_") {
        const missingLetter = missingLetters.find(
          (letter) => letter.position === i
        );
        if (missingLetter) {
          const isCorrect = feedback[i] === "correct";
          const isIncorrect = feedback[i] === "incorrect";
          const showFeedbackNow = showFeedback[i];

          result.push(
            <div key={i} className="inline-block relative">
              <input
                type="text"
                value={userInputs[i] || ""}
                onChange={(e) => handleInputChange(i, e.target.value)}
                placeholder="_"
                className={`w-8 h-8 text-center text-lg font-bold border-2 rounded-md focus:outline-none transition-all duration-300 ${
                  isCorrect
                    ? "border-green-500 bg-green-50 text-green-700"
                    : isIncorrect
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-blue-300 bg-yellow-50 text-gray-700 focus:border-blue-500"
                }`}
                maxLength={1}
              />

              {/* Feedback göstergesi */}
              {showFeedbackNow && (
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-semibold text-white transition-all duration-300 ${
                    isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {isCorrect ? "✓ Doğru!" : "✗ Yanlış!"}
                </div>
              )}

              {/* Doğru cevap göstergesi (yanlış girildiğinde) */}
              {isIncorrect && showFeedbackNow && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-semibold bg-blue-500 text-white">
                  Doğru: {missingLetter.answer}
                </div>
              )}
            </div>
          );
        }
      } else {
        result.push(originalText[i]);
      }
    }

    return result;
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <audio
            ref={timeUpAudioRef}
            src="/sesler/doldu.mp3"
            preload="auto"
            hidden
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Oyun Tamamlandı!
          </h1>
          <div className="text-6xl font-bold text-blue-600 mb-4">{score}</div>
          <div className="text-xl text-gray-600 mb-6">Puan</div>
          <div className="text-lg text-gray-500 mb-4">
            {completedWords} / {missingLetters.length} harf doğru
          </div>
          <div className="text-lg text-gray-500 mb-8">
            {score >= 350
              ? "Mükemmel! Çok iyi gidiyorsun!"
              : score >= 300
              ? "Harika! İyi çalışıyorsun!"
              : score >= 250
              ? "Güzel! Daha da iyileşebilirsin!"
              : score >= 200
              ? "İyi! Devam et!"
              : "Devam et! Her gün biraz daha iyi olacaksın!"}
          </div>
          <button
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition-colors"
          >
            Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <audio
            ref={timeUpAudioRef}
            src="/sesler/doldu.mp3"
            preload="auto"
            hidden
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Eksik Harfleri Tamamla
          </h1>
          <p className="text-gray-600 mb-8">
            Paragraftaki eksik harfleri (_) bulup yaz. Her doğru cevap için 10
            puan kazan!
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Nasıl Oynanır:</h3>
            <ul className="text-sm text-blue-700 text-left space-y-1">
              <li>• Paragraftaki _ işaretlerini bul</li>
              <li>• Eksik harfi yaz</li>
              <li>• 3 dakika içinde tüm eksik harfleri tamamla</li>
              <li>• Toplam {missingLetters.length} eksik harf var</li>
            </ul>
          </div>
          <button
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors"
          >
            Oyunu Başlat
          </button>

          {/* Ek Metin (OCR) */}
          <div className="mt-6 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Ek Metin: Mertin Bir Günü
              </h3>
              <button
                onClick={() => setShowExtraText((v) => !v)}
                className="text-blue-600 hover:underline text-sm"
              >
                {showExtraText ? "Gizle" : "Göster"}
              </button>
            </div>
            {showExtraText && (
              <div className="mt-3 text-gray-700 bg-gray-50 rounded-xl p-4 whitespace-pre-wrap leading-relaxed">
                {extraTextOCR}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <audio
        ref={timeUpAudioRef}
        src="/sesler/doldu.mp3"
        preload="auto"
        hidden
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Eksik Harfleri Tamamla
            </h1>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-500">Puan</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {Object.keys(userInputs).length} / {missingLetters.length} harf
              dolduruldu
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-500">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">Kalan Süre</div>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl text-gray-600 mb-6 text-center">
            Paragraftaki eksik harfleri (_) bul ve yaz:
          </h2>

          <div className="text-lg leading-relaxed text-gray-800 mb-8 p-6 bg-gray-50 rounded-xl">
            {renderTextWithInputs()}
          </div>

          <div className="text-center">
            <button
              onClick={checkFinalScore}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl text-lg transition-colors"
            >
              Bitir ve Puanı Hesapla
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>İlerleme</span>
            <span>
              {Math.round(
                (Object.keys(userInputs).length / missingLetters.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (Object.keys(userInputs).length / missingLetters.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Ek Metin (OCR) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Ek Metin: Mertin Bir Günü
            </h3>
            <button
              onClick={() => setShowExtraText((v) => !v)}
              className="text-blue-600 hover:underline text-sm"
            >
              {showExtraText ? "Gizle" : "Göster"}
            </button>
          </div>
          {showExtraText && (
            <div className="mt-4 text-gray-800 whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-xl p-4">
              {extraTextOCR}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
