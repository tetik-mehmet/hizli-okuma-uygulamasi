"use client";
import { useState, useEffect, useRef } from "react";

export default function HeceOzel({ visibleSetKeys = null }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const timeUpAudioRef = useRef(null);

  // Zorluk seviyelerine göre süreler (tüm etkinliklerde aynı)
  const difficultyTimes = {
    easy: 90, // Kolay: 90 saniye
    medium: 60, // Orta: 60 saniye
    hard: 30, // Zor: 30 saniye
  };

  const exerciseSets = {
    exercise1: {
      title: "Etkinlik 1",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["RA", "KA", "MA"], answer: "MAKARA" },
        { id: 2, syllables: ["YON", "Sİ", "TAN"], answer: "TANSİYON" },
        { id: 3, syllables: ["Kİ", "ÇI", "TAP"], answer: "KİTAPÇI" },
        { id: 4, syllables: ["REV", "GÖ", "Lİ"], answer: "GÖREVLİ" },
        { id: 5, syllables: ["LE", "MEK", "İZ"], answer: "İZLEMEK" },
        { id: 6, syllables: ["MAK", "ĞIR", "ÇA"], answer: "ÇAĞIRMAK" },
        { id: 7, syllables: ["Cİ", "KAH", "VE"], answer: "KAHVECİ" },
        { id: 8, syllables: ["GE", "PÜR", "SÜ"], answer: "SÜPÜRGE" },
        { id: 9, syllables: ["ÇI", "YIK", "KA"], answer: "KAYIKÇI" },
        { id: 10, syllables: ["O", "CU", "YUN"], answer: "OYUNCU" },
        { id: 11, syllables: ["LIK", "ME", "ZAR"], answer: "MEZARLIK" },
        { id: 12, syllables: ["ÇA", "KAN", "LIŞ"], answer: "ÇALIŞKAN" },
        { id: 13, syllables: ["DİK", "Lİ", "KAT"], answer: "DİKKATLİ" },
      ],
    },
    exercise2: {
      title: "Etkinlik 2",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LIK", "Kİ", "RA"], answer: "KİRALIK" },
        { id: 2, syllables: ["PI", "ÇAR", "CI"], answer: "ÇARPICI" },
        { id: 3, syllables: ["ÇIR", "CI", "PI"], answer: "ÇIRPICI" },
        { id: 4, syllables: ["Sİ", "BE", "Lİ"], answer: "BESİLİ" },
        { id: 5, syllables: ["U", "LI", "ZAY"], answer: "UZAYLI" },
        { id: 6, syllables: ["DER", "MEK", "Gİ"], answer: "GİDERMEK" },
        { id: 7, syllables: ["İH", "YAÇ", "Tİ"], answer: "İHTİYAÇ" },
        { id: 8, syllables: ["CA", "KIN", "SA"], answer: "SAKINCA" },
        { id: 9, syllables: ["KUV", "Lİ", "VET"], answer: "KUVVETLİ" },
        { id: 10, syllables: ["LUK", "ÇO", "CUK"], answer: "ÇOCUKLUK" },
        { id: 11, syllables: ["Lİ", "MET", "ZAH"], answer: "ZAHMETLİ" },
        { id: 12, syllables: ["PIŞ", "YA", "KAN"], answer: "YAPIŞKAN" },
        { id: 13, syllables: ["GE", "Lİ", "DİK"], answer: "GEDİKLİ" },
      ],
    },
    exercise3: {
      title: "Etkinlik 3",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["CIM", "KI", "VIL"], answer: "KIVILCIM" },
        { id: 2, syllables: ["YON", "Sİ", "PAN"], answer: "PANSİYON" },
        { id: 3, syllables: ["DI", "RIM", "KAL"], answer: "KALDIRIM" },
        { id: 4, syllables: ["T", "PET", "ROM"], answer: "TROMPET" },
        { id: 5, syllables: ["LA", "MU", "MUŞ"], answer: "MUŞMULA" },
        { id: 6, syllables: ["NOL", "MA", "YA"], answer: "MANOLYA" },
        { id: 7, syllables: ["KAS", "YA", "A"], answer: "AKASYA" },
        { id: 8, syllables: ["BUN", "BAR", "YA"], answer: "BARBUNYA" },
        { id: 9, syllables: ["YE", "SUL", "FA"], answer: "FASULYE" },
        { id: 10, syllables: ["TİŞ", "AK", "ROS"], answer: "AKROSTİŞ" },
        { id: 11, syllables: ["LE", "FON", "TE"], answer: "TELEFON" },
        { id: 12, syllables: ["JUR", "BA", "A"], answer: "ABAJUR" },
        { id: 13, syllables: ["GU", "AR", "JA"], answer: "JAGUAR" },
      ],
    },
    exercise4: {
      title: "Etkinlik 4",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LA", "PA", "MUT"], answer: "PATLAMA" },
        { id: 2, syllables: ["CA", "KA", "RIN"], answer: "KARINCA" },
        { id: 3, syllables: ["BEK", "TE", "KÖS"], answer: "KÖSTEBEK" },
        { id: 4, syllables: ["NAL", "PE", "TI"], answer: "PENALTI" },
        { id: 5, syllables: ["LA", "MU", "MUŞ"], answer: "MUŞMULA" },
        { id: 6, syllables: ["KİR", "ÇE", "GE"], answer: "ÇEKİRGE" },
        { id: 7, syllables: ["RA", "RET", "HA"], answer: "HARARET" },
        { id: 8, syllables: ["LAN", "BU", "TI"], answer: "BULANTI" },
        { id: 9, syllables: ["B", "ŞİT", "RON"], answer: "BRONŞİT" },
        { id: 10, syllables: ["ZİT", "NÜ", "Sİ"], answer: "SİNÜZİT" },
        { id: 11, syllables: ["VİL", "Sİ", "CE"], answer: "SİVİLCE" },
        { id: 12, syllables: ["TİT", "MEK", "RE"], answer: "TİTREMEK" },
        { id: 13, syllables: ["YIF", "LIK", "ZA"], answer: "ZAYIFLIK" },
      ],
    },
    exercise5: {
      title: "Etkinlik 5",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LA", "LIK", "TA", "SA"], answer: "SALATALIK" },
        { id: 2, syllables: ["TEP", "GA", "AN", "Zİ"], answer: "GAZİANTEP" },
        { id: 3, syllables: ["MA", "RİS", "TAN", "CA"], answer: "MACARİSTAN" },
        { id: 4, syllables: ["LİK", "Rİ", "O", "MU"], answer: "OMURİLİK" },
        { id: 5, syllables: ["TO", "MO", "TİV", "O"], answer: "OTOMOTİV" },
        { id: 6, syllables: ["KIR", "Sİ", "TA", "YE"], answer: "KIRTASİYE" },
        { id: 7, syllables: ["LE", "TE", "VİZ", "YON"], answer: "TELEVİZYON" },
        { id: 8, syllables: ["Lİ", "MAN", "DA", "NA"], answer: "MANDALİNA" },
        { id: 9, syllables: ["KUR", "RI", "TA", "CI"], answer: "KURTARICI" },
        { id: 10, syllables: ["Lİ", "TE", "YE", "NEK"], answer: "YETENEKLİ" },
        { id: 11, syllables: ["KUL", "CI", "LA", "NI"], answer: "KULLANICI" },
        { id: 12, syllables: ["E", "Tİ", "YA", "YOP"], answer: "ETİYOPYA" },
        { id: 13, syllables: ["GAS", "MA", "DA", "KAR"], answer: "MADAGASKAR" },
        { id: 14, syllables: ["Bİ", "KO", "LOM", "YA"], answer: "KOLOMBİYA" },
        { id: 15, syllables: ["Lİ", "VE", "RİŞ", "EL"], answer: "ELVERİŞLİ" },
      ],
    },
    exercise6: {
      title: "Etkinlik 6",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["Lİ", "LİK", "RİM", "VE"], answer: "VERİMLİLİK" },
        { id: 2, syllables: ["YI", "LA", "TOP", "CI"], answer: "TOPLAYICI" },
        { id: 3, syllables: ["KE", "SİR", "BA", "LI"], answer: "BALIKESİR" },
        { id: 4, syllables: ["LE", "ŞE", "KER", "ME"], answer: "ŞEKERLEME" },
        { id: 5, syllables: ["KO", "Lİ", "CA", "E"], answer: "KOCAELİ" },
        { id: 6, syllables: ["KAS", "MO", "TA", "NU"], answer: "KASTAMONU" },
        { id: 7, syllables: ["BA", "LUM", "KAP", "ĞA"], answer: "KAPLUMBAĞA" },
        { id: 8, syllables: ["KA", "BA", "LIK", "LA"], answer: "KALABALIK" },
        { id: 9, syllables: ["TİF", "LO", "MO", "KO"], answer: "LOKOMOTİF" },
        { id: 10, syllables: ["MA", "MA", "TE", "TİK"], answer: "MATEMATİK" },
        { id: 11, syllables: ["VUR", "LA", "MAK", "GU"], answer: "VURGULAMAK" },
        {
          id: 12,
          syllables: ["A", "NAH", "LIK", "TAR"],
          answer: "ANAHTARLIK",
        },
        {
          id: 13,
          syllables: ["HEN", "DİS", "LİK", "MÜ"],
          answer: "MÜHENDİSLİK",
        },
        { id: 14, syllables: ["Tİ", "Mİ", "SU", "RA"], answer: "TİRAMİSU" },
        { id: 15, syllables: ["UR", "LI", "FA", "ŞAN"], answer: "ŞANLIURFA" },
      ],
    },
    exercise7: {
      title: "Etkinlik 7",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LOG", "Sİ", "KO", "P"], answer: "PSİKOLOJİ" },
        { id: 2, syllables: ["TE", "Jİ", "ST", "RA"], answer: "STRATEJİ" },
        { id: 3, syllables: ["TÜP", "NE", "HA", "KÜ"], answer: "KÜTÜPHANE" },
        { id: 4, syllables: ["DE", "MOK", "Sİ", "RA"], answer: "DEMOKRASİ" },
        { id: 5, syllables: ["TO", "Mİ", "Jİ", "LO"], answer: "MİTOLOJİ" },
        { id: 6, syllables: ["LO", "Bİ", "YO", "Jİ"], answer: "BİYOLOJİ" },
        { id: 7, syllables: ["KO", "Mİ", "NO", "E"], answer: "EKONOMİ" },
        { id: 8, syllables: ["ME", "ZE", "MAL", "Cİ"], answer: "MALZEMECİ" },
        { id: 9, syllables: ["YA", "EN", "DO", "NEZ"], answer: "ENDONEZYA" },
        { id: 10, syllables: ["KA", "RIK", "LE", "KI"], answer: "KIRIKKALE" },
        { id: 11, syllables: ["A", "KA", "VO", "DO"], answer: "AVOKADO" },
        { id: 12, syllables: ["BİS", "A", "TAN", "RA"], answer: "ARABİSTAN" },
        { id: 13, syllables: ["ZA", "BEY", "PA", "RI"], answer: "BEYPAZARI" },
        { id: 14, syllables: ["Cİ", "Nİ", "LİK", "Bİ"], answer: "BİNİCİLİK" },
        { id: 15, syllables: ["YA", "VUS", "A", "TUR"], answer: "AVUSRURYA" },
      ],
    },
    exercise8: {
      title: "Etkinlik 8",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["A", "TAR", "NAH"], answer: "ANAHTAR" },
        { id: 2, syllables: ["NIT", "A", "KA", "BİR"], answer: "ANITKABİR" },
        { id: 3, syllables: ["MAN", "TREN", "AN"], answer: "ANTRENMAN" },
        { id: 4, syllables: ["YE", "BE", "Dİ", "LE"], answer: "BELEDİYE" },
        { id: 5, syllables: ["LA", "BAK", "GİL"], answer: "BAKLAGİL" },
        { id: 6, syllables: ["BUZ", "BI", "LA", "DO"], answer: "BUZDOLABI" },
        { id: 7, syllables: ["YO", "LO", "Jİ", "Bİ"], answer: "BİYOLOJİ" },
        { id: 8, syllables: ["RET", "CE", "SA"], answer: "CESARET" },
        { id: 9, syllables: ["ZA", "CE", "EVİ"], answer: "CEZAEVİ" },
        { id: 10, syllables: ["ÇE", "LİŞ", "Lİ", "Kİ"], answer: "ÇELİŞKİLİ" },
        { id: 11, syllables: ["LEN", "MEK", "DİN"], answer: "DİNLENMEK" },
        { id: 12, syllables: ["Sİ", "LO", "DİP", "MA"], answer: "DİPLOMASİ" },
        { id: 13, syllables: ["NA", "DO", "NIM"], answer: "DONANIM" },
      ],
    },
    exercise9: {
      title: "Etkinlik 9",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["E", "VEYN", "BE"], answer: "EBEVEYN" },
        { id: 2, syllables: ["LİK", "GE", "E", "MEN"], answer: "EGEMENLİK" },
        { id: 3, syllables: ["Tİ", "EM", "PA"], answer: "EMPATİ" },
        { id: 4, syllables: ["NER", "Jİ", "E"], answer: "ENERJİ" },
        { id: 5, syllables: ["YON", "Sİ", "FEK", "EN"], answer: "ENFEKSİYON" },
        { id: 6, syllables: ["ER", "RUM", "ZU"], answer: "ERZURUM" },
        { id: 7, syllables: ["YA", "RAF", "NOG", "ET"], answer: "ETNOGRAFYA" },
        { id: 8, syllables: ["LİK", "EV", "Lİ"], answer: "EVLİLİK" },
        { id: 9, syllables: ["Rİ", "KA", "FAB"], answer: "FABRİKA" },
        { id: 10, syllables: ["FE", "KET", "LA"], answer: "FELAKET" },
        { id: 11, syllables: ["FE", "DE", "YON", "RAS"], answer: "FEDERASYON" },
        { id: 12, syllables: ["Cİ", "FEL", "FE", "SE"], answer: "FELSEFECİ" },
        { id: 13, syllables: ["TI", "NA", "FIR"], answer: "FIRTINA" },
      ],
    },
    exercise10: {
      title: "Etkinlik 10",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LER", "Lİ", "Fİ", "PİN"], answer: "FİLİPİNLER" },
        { id: 2, syllables: ["LAK", "Sİ", "GA"], answer: "GALAKSİ" },
        { id: 3, syllables: ["GE", "ME", "LİŞ"], answer: "GELİŞME" },
        { id: 4, syllables: ["GE", "GEN", "ZE"], answer: "GEZEGEN" },
        { id: 5, syllables: ["NÜL", "LÜ", "GÖ"], answer: "GÖNÜLLÜ" },
        { id: 6, syllables: ["EVİ", "LEM", "GÖZ"], answer: "GÖZLEMEVİ" },
        { id: 7, syllables: ["MÜŞ", "NE", "GÜ", "HA"], answer: "GÜMÜŞHANE" },
        { id: 8, syllables: ["GAH", "GÜ", "ZER"], answer: "GÜZERGAH" },
        { id: 9, syllables: ["HA", "SE", "Dİ"], answer: "HADİSE" },
        { id: 10, syllables: ["Lİ", "KAT", "HA", "Kİ"], answer: "HAKİKATLİ" },
        { id: 11, syllables: ["DA", "HAK", "MIZ", "KI"], answer: "HAKKIMIZDA" },
        { id: 12, syllables: ["LİK", "Lİ", "HA", "FE"], answer: "HALİFELİK" },
        { id: 13, syllables: ["HA", "RA", "TI"], answer: "HATIRA" },
      ],
    },
    exercise11: {
      title: "Etkinlik 11",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        {
          id: 1,
          syllables: ["STAN", "Tİ", "HIR", "VA"],
          answer: "HIRVATİSTAN",
        },
        { id: 2, syllables: ["YAN", "Tİ", "HRİS"], answer: "HRİSTİYAN" },
        { id: 3, syllables: ["I", "MA", "SIN"], answer: "ISINMA" },
        { id: 4, syllables: ["Tİ", "YAÇ", "İH"], answer: "İHTİYAÇ" },
        { id: 5, syllables: ["BA", "HAR", "İLK"], answer: "İLKBAHAR" },
        { id: 6, syllables: ["SON", "HAR", "BA"], answer: "SONBAHAR" },
        { id: 7, syllables: ["CE", "İN", "LİZ", "Gİ"], answer: "İNGİLİZCE" },
        { id: 8, syllables: ["MEK", "DE", "İR", "LE"], answer: "İRDELEMEK" },
        { id: 9, syllables: ["YET", "İS", "LA", "Mİ"], answer: "İSLAMİYET" },
        { id: 10, syllables: ["NAV", "KAN", "Dİ", "İS"], answer: "İSKANDİNAV" },
        { id: 11, syllables: ["RAR", "TİK", "LI", "İS"], answer: "İSTİKRARLI" },
        { id: 12, syllables: ["İŞ", "Cİ", "LET", "ME"], answer: "İŞLETMECİ" },
        { id: 13, syllables: ["TAL", "CA", "İ", "YAN"], answer: "İTALYANCA" },
      ],
    },
    exercise12: {
      title: "Etkinlik 12",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LAN", "DA", "İZ"], answer: "İZLANDA" },
        { id: 2, syllables: ["LOG", "JE", "O"], answer: "JEOLOG" },
        { id: 3, syllables: ["YI", "BA", "KA", "DA"], answer: "KABADAYI" },
        { id: 4, syllables: ["DA", "YIF", "KA"], answer: "KADAYIF" },
        { id: 5, syllables: ["KA", "KÖY", "DI"], answer: "KADIKÖY" },
        { id: 6, syllables: ["Gİ", "KAH", "REN", "VE"], answer: "KAHVERENGİ" },
        { id: 7, syllables: ["NİZ", "KA", "DE", "RA"], answer: "KARADENİZ" },
        { id: 8, syllables: ["RAR", "GAH", "KA"], answer: "KARARGAH" },
        { id: 9, syllables: ["KAR", "NAT", "BO"], answer: "KARBONAT" },
        { id: 10, syllables: ["NIM", "KA", "ZA"], answer: "KAZANIM" },
        { id: 11, syllables: ["Jİ", "LO", "KRİP", "TO"], answer: "KRİPTOLOJİ" },
        { id: 12, syllables: ["ŞAT", "KU", "MA"], answer: "KUŞATMA" },
        { id: 13, syllables: ["LA", "RENT", "Bİ"], answer: "LABİRENT" },
      ],
    },
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const startExercise = (exerciseKey, difficulty) => {
    setSelectedExercise(exerciseKey);
    setSelectedDifficulty(difficulty);
    setTimeLeft(difficultyTimes[difficulty]);
    setIsExerciseStarted(true);
    setIsTimerRunning(true);
  };

  const checkAnswers = () => {
    setShowResults(true);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setShowResults(true);
      // Süre dolduğunda uyarı sesi çal
      if (timeUpAudioRef.current) {
        try {
          timeUpAudioRef.current.currentTime = 0;
          timeUpAudioRef.current.play();
        } catch (e) {
          // Sessizce geç
        }
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const resetExercise = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(selectedDifficulty ? difficultyTimes[selectedDifficulty] : 60);
    setIsTimerRunning(false);
    setIsExerciseStarted(false);
    setSelectedExercise(null);
    setSelectedDifficulty(null);
  };

  const goBackToSelection = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(selectedDifficulty ? difficultyTimes[selectedDifficulty] : 60);
    setIsTimerRunning(false);
    setIsExerciseStarted(false);
    setSelectedExercise(null);
    setSelectedDifficulty(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentExercises = selectedExercise
    ? exerciseSets[selectedExercise].exercises
    : [];

  // Etkinlikler arası sıra ve gezinme
  const exerciseKeys = Object.keys(exerciseSets);
  const totalExerciseCount = exerciseKeys.length;
  const currentExerciseIndex = selectedExercise
    ? exerciseKeys.indexOf(selectedExercise)
    : -1;

  const goToExerciseByIndex = (newIndex) => {
    if (newIndex < 0 || newIndex >= totalExerciseCount) return;
    const nextKey = exerciseKeys[newIndex];
    setSelectedExercise(nextKey);
    setAnswers({});
    setShowResults(false);
    if (selectedDifficulty) {
      setTimeLeft(difficultyTimes[selectedDifficulty]);
      setIsTimerRunning(true);
    }
    setIsExerciseStarted(true);
  };

  const goToPrevExercise = () => {
    if (currentExerciseIndex <= 0) return;
    goToExerciseByIndex(currentExerciseIndex - 1);
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex >= totalExerciseCount - 1) return;
    goToExerciseByIndex(currentExerciseIndex + 1);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 hover:bg-green-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "hard":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "Kolay";
      case "medium":
        return "Orta";
      case "hard":
        return "Zor";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 font-inter">
      <audio
        ref={timeUpAudioRef}
        src="/sesler/doldu.mp3"
        preload="auto"
        hidden
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Hızlı Okuma - Hece Birleştirme
          </h1>
          <p className="text-lg text-gray-600">
            Her satırdaki heceleri birleştirerek anlamlı kelimeler oluşturun
          </p>
        </div>

        {!isExerciseStarted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
            {/* Etkinlik 1 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise1")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 1
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                {/* Zorluk Seviyeleri */}
                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise1", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise1", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise1", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 2 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise2")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 2
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise2", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise2", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise2", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 3 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise3")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 3
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise3", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise3", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise3", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 4 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise4")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-orange-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-600">4</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 4
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise4", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise4", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise4", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 5 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise5")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-red-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-red-600">5</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 5
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise5", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise5", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise5", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 6 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise6")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-pink-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-pink-600">6</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 6
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise6", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise6", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise6", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 7 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise7")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600">7</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 7
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise7", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise7", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise7", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 8 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise8")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-teal-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-600">8</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 8
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise8", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise8", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise8", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 9 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise9")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-emerald-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-600">9</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 9
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise9", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise9", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise9", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 10 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise10")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-cyan-600">10</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 10
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise10", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise10", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise10", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 11 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise11")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-amber-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-amber-600">11</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 11
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise11", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise11", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise11", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 12 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise12")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-lime-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-lime-600">12</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 12
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise12", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise12", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise12", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>

            {/* Ana süre göstergesi */}
            {isTimerRunning && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {exerciseSets[selectedExercise]?.title} -{" "}
                  {getDifficultyText(selectedDifficulty)} Seviye
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Etkinlik {currentExerciseIndex + 1}/{totalExerciseCount}
                </div>
                <p className="text-gray-600">
                  {timeLeft > 0 ? "Süre devam ediyor..." : "Süre doldu!"}
                </p>
              </div>
            )}

            {!showResults ? (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-center font-semibold text-gray-700 bg-gray-100 p-3 rounded">
                  <div>No</div>
                  <div>Heceler</div>
                  <div>Cevabınız</div>
                  <div>Doğru Cevap</div>
                </div>

                {currentExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-200 py-3"
                  >
                    <div className="text-center font-medium text-gray-600">
                      {exercise.id}
                    </div>
                    <div className="flex gap-2 justify-center">
                      {exercise.syllables.map((syllable, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium"
                        >
                          {syllable}
                        </span>
                      ))}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={answers[exercise.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(exercise.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            checkAnswers();
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Kelimeyi yazın..."
                      />
                    </div>
                    <div className="text-center text-gray-400">---</div>
                  </div>
                ))}

                <div className="text-center mt-6">
                  <button
                    onClick={checkAnswers}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg"
                  >
                    Cevapları Kontrol Et
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                {/* Özet: Doğru sayısı ve yüzde */}
                {(() => {
                  const total = currentExercises.length;
                  const correct = currentExercises.reduce((acc, ex) => {
                    const userAnswer = (answers[ex.id] || "").toLowerCase();
                    const real = (ex.answer || "").toLowerCase();
                    return acc + (userAnswer === real ? 1 : 0);
                  }, 0);
                  const percent =
                    total > 0 ? Math.round((correct / total) * 100) : 0;
                  return (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="text-lg font-semibold text-gray-800">
                        Sonuç: {correct}/{total} doğru
                      </div>
                      <div className="w-full sm:w-64">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm text-gray-600 mt-1">
                          %{percent}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-center font-semibold text-gray-700 bg-gray-100 p-3 rounded">
                  <div>No</div>
                  <div>Heceler</div>
                  <div>Cevabınız</div>
                  <div>Doğru Cevap</div>
                </div>

                {currentExercises.map((exercise) => {
                  const userAnswer = answers[exercise.id] || "";
                  const isCorrect =
                    userAnswer.toLowerCase() === exercise.answer.toLowerCase();

                  return (
                    <div
                      key={exercise.id}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-200 py-3"
                    >
                      <div className="text-center font-medium text-gray-600">
                        {exercise.id}
                      </div>
                      <div className="flex gap-2 justify-center">
                        {exercise.syllables.map((syllable, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium"
                          >
                            {syllable}
                          </span>
                        ))}
                      </div>
                      <div
                        className={`text-center ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {userAnswer || "Boş"}
                      </div>
                      <div
                        className={`text-center font-medium ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {exercise.answer}
                      </div>
                    </div>
                  );
                })}

                <div className="text-center mt-6">
                  <button
                    onClick={resetExercise}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg mr-4"
                  >
                    Yeniden Başla
                  </button>
                  <button
                    onClick={goToNextExercise}
                    disabled={currentExerciseIndex >= totalExerciseCount - 1}
                    className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg ${
                      currentExerciseIndex >= totalExerciseCount - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Sonraki Etkinliğe Geç
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlikler arası gezinme */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={goToPrevExercise}
                disabled={currentExerciseIndex <= 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-semibold transition-colors ${
                  currentExerciseIndex <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Önceki Etkinlik
              </button>

              <button
                onClick={goToNextExercise}
                disabled={currentExerciseIndex >= totalExerciseCount - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-semibold transition-colors ${
                  currentExerciseIndex >= totalExerciseCount - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Sonraki Etkinlik
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
