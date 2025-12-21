"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IkilemelerPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    sentence1: "",
    sentence2: "",
    sentence3: "",
    sentence4: "",
    sentence5: "",
    sentence6: "",
    sentence7: "",
    sentence8: "",
  });
  const [fillBlanks, setFillBlanks] = useState({
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    blank5: "",
    blank6: "",
    blank7: "",
  });
  const [reorder, setReorder] = useState({
    reorder1: "",
    reorder2: "",
    reorder3: "",
    reorder4: "",
  });
  const [activity4Mode, setActivity4Mode] = useState("ikileme");
  const [activity4SelectedI, setActivity4SelectedI] = useState({});
  const [activity4SelectedP, setActivity4SelectedP] = useState({});
  const [showActivity4Results, setShowActivity4Results] = useState(false);
  const [activity5, setActivity5] = useState({ s1: "", s2: "", s3: "" });
  const [showActivity5Results, setShowActivity5Results] = useState(false);
  const [activity6, setActivity6] = useState({
    a1: "",
    a2: "",
    a3: "",
    a4: "",
  });
  const [showActivity6Results, setShowActivity6Results] = useState(false);
  const [activity7Selected, setActivity7Selected] = useState({});
  const [showActivity7Results, setShowActivity7Results] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFillBlanksResults, setShowFillBlanksResults] = useState(false);
  const [showReorderResults, setShowReorderResults] = useState(false);

  const correctAnswers = {
    sentence1: "pekiştirme",
    sentence2: "ikileme",
    sentence3: "pekiştirme",
    sentence4: "ikileme",
    sentence5: "pekiştirme",
    sentence6: "ikileme",
    sentence7: "pekiştirme",
    sentence8: "ikileme",
  };

  const correctFillBlanks = {
    blank1: "masmavi",
    blank2: "güzel güzel",
    blank3: "kıpkırmızı",
    blank4: "neşe neşe",
    blank5: "bembeyaz",
    blank6: "özen özen",
    blank7: "yavaş yavaş",
  };

  const correctReorder = {
    reorder1: "annem bana tatlı tatlı konuştu",
    reorder2: "işçiler ağır ağır çalışıyordu",
    reorder3: "kitaplar üst üste yığılmıştı",
    reorder4: "çiçekler bahçede sapsarı açtı",
  };

  const activity4Text =
    "Sabah erkenden bahçeye çıktım. Çiçekler yemyeşildi. Kuşlar cıvıl cıvıl ötüyordu. Dedem bana tatlı tatlı gülümsedi. Gökyüzü masmaviydi, bulutlar ise bembeyazdı. Biz de birlikte yavaş yavaş yürüyerek ağacın altına oturduk.";
  const activity4CorrectIkileme = ["cıvıl cıvıl", "tatlı tatlı", "yavaş yavaş"];
  const activity4CorrectPekistirme = ["yemyeşildi", "masmaviydi", "bembeyazdı"];

  const pekistirmeWords = [
    "sapsarı",
    "masmavi",
    "kıpkırmızı",
    "yemyeşil",
    "kupkuru",
    "bembeyaz",
    "tertemiz",
    "upuzun",
    "kapkara",
    "yepyeni",
    "sapasağlam",
    "büsbüyük",
    "büsbeyaz",
    "dosdoğru",
  ];

  const activity6Correct = {
    a1: "koşa koşa",
    a2: "sapsarı",
    a3: "tatlı tatlı",
    a4: "bembeyaz",
  };

  const activity7Text =
    "Çocukluğumun geçtiği o küçük kasabayı düşündükçe içim ısınır. Sokaklar daracık, evler bembeyaz, pencereler yemyeşildi. Sabahları annem kapı kapı dolaşır, komşularla uzun uzun sohbet ederdi. Ben de arkadaşlarımla yavaş yavaş yürür, bazen koşar adım oyun alanına giderdim.\n\nKasabanın meydanı rengârenk çiçeklerle doluydu. Çiçekler mis gibi kokar, böcekler vızıl vızıl uçardı. Biz çocuklar da kahkahalarla oynar, şarkılar mırıl mırıl söylerdik. Öğle vakti güneş masmavi gökyüzünde ışıl ışıl parladığında, hepimiz gölgelere kaçar, serin serin otururduk.\n\nDedem bana masallar anlatırdı. Onun sesi tok tok, sözleri tane tane ve dosdoğruydu. Masalları dinlerken gözlerim pırıl pırıl olur, hayallerim uçsuz bucaksız diyarlara giderdi.\n\nKış geldiğinde kasaba apaydınlık bir kar örtüsüyle kaplanırdı. Çocuklar kartopu oynar, evlerin bacalarından dumanlar tüte tüte yükselirdi. Sokaklarda ayak seslerimiz yankılanır, karın üzerinde çıtır çıtır izler kalırdı.\n\nBugün o günleri düşündüğümde içimde sıcacık bir huzur beliriyor. Geçmişin o dupduru hatıraları, kalbimde hep capcanlı kalacak. Çünkü çocukluk, insanın hayatında en saf, en temiz, en parlak dönemdir.";
  const activity7CorrectPairs = [
    "kapı kapı",
    "uzun uzun",
    "yavaş yavaş",
    "vızıl vızıl",
    "mırıl mırıl",
    "ışıl ışıl",
    "tok tok",
    "tane tane",
    "pırıl pırıl",
    "tüte tüte",
    "çıtır çıtır",
  ];

  const handleAnswerChange = (sentence, value) => {
    setAnswers((prev) => ({
      ...prev,
      [sentence]: value,
    }));
  };

  const handleFillBlankChange = (blank, value) => {
    setFillBlanks((prev) => ({
      ...prev,
      [blank]: value,
    }));
  };

  const handleReorderChange = (key, value) => {
    setReorder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const checkFillBlanks = () => {
    setShowFillBlanksResults(true);
  };

  const resetExercise = () => {
    setAnswers({
      sentence1: "",
      sentence2: "",
      sentence3: "",
      sentence4: "",
      sentence5: "",
      sentence6: "",
      sentence7: "",
      sentence8: "",
    });
    setShowResults(false);
  };

  const resetFillBlanks = () => {
    setFillBlanks({
      blank1: "",
      blank2: "",
      blank3: "",
      blank4: "",
      blank5: "",
      blank6: "",
      blank7: "",
    });
    setShowFillBlanksResults(false);
  };

  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[.,!?;:]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const checkReorder = () => {
    setShowReorderResults(true);
  };

  const resetReorder = () => {
    setReorder({
      reorder1: "",
      reorder2: "",
      reorder3: "",
      reorder4: "",
    });
    setShowReorderResults(false);
  };

  const tokenizeActivity4 = (text) =>
    text.split(/(\s+|[.,!?;:]+)/).filter((t) => t !== "");
  const isWordToken = (t) => /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(t);

  const toggleActivity4Token = (idx) => {
    if (activity4Mode === "ikileme") {
      setActivity4SelectedI((prev) => ({ ...prev, [idx]: !prev[idx] }));
    } else {
      setActivity4SelectedP((prev) => ({ ...prev, [idx]: !prev[idx] }));
    }
  };

  const checkActivity4 = () => setShowActivity4Results(true);
  const resetActivity4 = () => {
    setActivity4SelectedI({});
    setActivity4SelectedP({});
    setShowActivity4Results(false);
  };

  const tokenizeGeneric = (text) =>
    text.split(/(\s+|[.,!?;:]+)/).filter((t) => t !== "");
  const toggleActivity7Token = (idx) =>
    setActivity7Selected((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const checkActivity7 = () => setShowActivity7Results(true);
  const resetActivity7 = () => {
    setActivity7Selected({});
    setShowActivity7Results(false);
  };

  const containsAny = (text, arr) => {
    const t = normalize(text);
    return arr.some((w) => t.includes(normalize(w)));
  };
  const containsDuplicatedWord = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,!?;:]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i] === words[i + 1]) return true;
    }
    return false;
  };
  const checkActivity5 = () => setShowActivity5Results(true);
  const resetActivity5 = () => {
    setActivity5({ s1: "", s2: "", s3: "" });
    setShowActivity5Results(false);
  };

  const checkActivity6 = () => setShowActivity6Results(true);
  const resetActivity6 = () => {
    setActivity6({ a1: "", a2: "", a3: "", a4: "" });
    setShowActivity6Results(false);
  };

  const getScore = () => {
    let correct = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key] === correctAnswers[key]) {
        correct++;
      }
    });
    return correct;
  };

  const getFillBlanksScore = () => {
    let correct = 0;
    Object.keys(fillBlanks).forEach((key) => {
      if (
        fillBlanks[key].toLowerCase().trim() ===
        correctFillBlanks[key].toLowerCase().trim()
      ) {
        correct++;
      }
    });
    return correct;
  };

  const getReorderScore = () => {
    let correct = 0;
    Object.keys(reorder).forEach((key) => {
      if (normalize(reorder[key]) === correctReorder[key]) {
        correct++;
      }
    });
    return correct;
  };

  const getActivity4Breakdown = () => {
    const tokens = tokenizeActivity4(activity4Text);
    const wordPositions = tokens
      .map((t, i) => (isWordToken(t) ? i : -1))
      .filter((i) => i !== -1);

    const foundIkileme = new Set();
    for (let k = 0; k < wordPositions.length - 1; k++) {
      const i = wordPositions[k];
      const j = wordPositions[k + 1];
      const a = normalize(tokens[i]);
      const b = normalize(tokens[j]);
      if (a && a === b && activity4SelectedI[i] && activity4SelectedI[j]) {
        foundIkileme.add(`${a} ${b}`);
      }
    }

    const foundPekistirme = new Set();
    wordPositions.forEach((i) => {
      if (activity4SelectedP[i]) {
        foundPekistirme.add(normalize(tokens[i]));
      }
    });

    let ikilemeCorrect = 0;
    activity4CorrectIkileme.forEach((p) => {
      if (foundIkileme.has(p)) ikilemeCorrect++;
    });

    let pekistirmeCorrect = 0;
    activity4CorrectPekistirme.forEach((w) => {
      if (foundPekistirme.has(w)) pekistirmeCorrect++;
    });

    return { ikileme: ikilemeCorrect, pekistirme: pekistirmeCorrect };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            İkilemeler ve Pekiştirmeler
          </h1>
          <p className="text-lg text-gray-600">Türkçe Dilbilgisi Öğrenimi</p>
        </div>

        {/* Konu Anlatımı */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            📚 Konu Anlatımı
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* İkilemeler */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                🔄 İkilemeler
              </h3>
              <p className="text-gray-700 mb-3">
                <strong>Tanım:</strong> Anlamı güçlendirmek için aynı ya da
                farklı iki kelimenin yan yana kullanılmasıdır.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Örnekler:</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <span className="font-medium">yavaş yavaş</span> (slowly
                    slowly)
                  </li>
                  <li>
                    • <span className="font-medium">irili ufaklı</span> (big
                    small/of various sizes)
                  </li>
                  <li>
                    • <span className="font-medium">üst üste</span> (on top of
                    each other)
                  </li>
                  <li>
                    • <span className="font-medium">güzel güzel</span>{" "}
                    (beautiful beautiful/nicely)
                  </li>
                  <li>
                    • <span className="font-medium">doğru dürüst</span> (truly
                    honest/properly)
                  </li>
                </ul>
              </div>
            </div>

            {/* Pekiştirmeler */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                ✨ Pekiştirmeler
              </h3>
              <p className="text-gray-700 mb-3">
                <strong>Tanım:</strong> Bir kelimenin başına m, p, r, s
                harflerinden biri eklenerek yapılan sözcüklerdir.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Örnekler:</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <span className="font-medium">sapsarı</span> (very yellow)
                  </li>
                  <li>
                    • <span className="font-medium">masmavi</span> (very blue)
                  </li>
                  <li>
                    • <span className="font-medium">kıpkırmızı</span> (very red)
                  </li>
                  <li>
                    • <span className="font-medium">yemyeşil</span> (very green)
                  </li>
                  <li>
                    • <span className="font-medium">kupkuru</span> (very dry)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Etkinlik 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            🎯 Etkinlik 1: Doğru mu Yanlış mı?
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              <strong>Yönergeler:</strong> Aşağıdaki cümlelerde{" "}
              <strong>kalın</strong> yazılan kelimeler ikileme mi, yoksa
              pekiştirme mi? Her cümlenin yanına &ldquo;ikileme&rdquo; veya
              &ldquo;pekiştirme&rdquo; yazın.
            </p>
          </div>

          <div className="space-y-4">
            {/* Cümle 1 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                1. Çiçekler <strong className="text-blue-600">masmavi</strong>{" "}
                açmıştı.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence1"
                    value="ikileme"
                    checked={answers.sentence1 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence1", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence1"
                    value="pekiştirme"
                    checked={answers.sentence1 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence1", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence1 === correctAnswers.sentence1
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence1 === correctAnswers.sentence1
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: Pekiştirme"}
                </div>
              )}
            </div>

            {/* Cümle 2 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                2. Çocuklar <strong className="text-blue-600">koşa koşa</strong>{" "}
                bahçeye gittiler.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence2"
                    value="ikileme"
                    checked={answers.sentence2 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence2", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence2"
                    value="pekiştirme"
                    checked={answers.sentence2 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence2", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence2 === correctAnswers.sentence2
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence2 === correctAnswers.sentence2
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: İkileme"}
                </div>
              )}
            </div>

            {/* Cümle 3 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                3. Bahçedeki elmalar{" "}
                <strong className="text-blue-600">yusyuvarlak</strong> olmuştu.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence3"
                    value="ikileme"
                    checked={answers.sentence3 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence3", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence3"
                    value="pekiştirme"
                    checked={answers.sentence3 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence3", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence3 === correctAnswers.sentence3
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence3 === correctAnswers.sentence3
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: Pekiştirme"}
                </div>
              )}
            </div>

            {/* Cümle 4 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                4. Dedem her sabah{" "}
                <strong className="text-blue-600">erken erken</strong> uyanır.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence4"
                    value="ikileme"
                    checked={answers.sentence4 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence4", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence4"
                    value="pekiştirme"
                    checked={answers.sentence4 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence4", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence4 === correctAnswers.sentence4
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence4 === correctAnswers.sentence4
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: İkileme"}
                </div>
              )}
            </div>

            {/* Cümle 5 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                5. Odası <strong className="text-blue-600">tertemizdi</strong>.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence5"
                    value="ikileme"
                    checked={answers.sentence5 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence5", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence5"
                    value="pekiştirme"
                    checked={answers.sentence5 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence5", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence5 === correctAnswers.sentence5
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence5 === correctAnswers.sentence5
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: Pekiştirme"}
                </div>
              )}
            </div>

            {/* Cümle 6 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                6. Kuşlar <strong className="text-blue-600">cıvıl cıvıl</strong>{" "}
                ötüyordu.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence6"
                    value="ikileme"
                    checked={answers.sentence6 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence6", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence6"
                    value="pekiştirme"
                    checked={answers.sentence6 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence6", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence6 === correctAnswers.sentence6
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence6 === correctAnswers.sentence6
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: İkileme"}
                </div>
              )}
            </div>

            {/* Cümle 7 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                7. Dağlar <strong className="text-blue-600">bembeyaz</strong>{" "}
                karlarla kaplanmıştı.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence7"
                    value="ikileme"
                    checked={answers.sentence7 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence7", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence7"
                    value="pekiştirme"
                    checked={answers.sentence7 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence7", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence7 === correctAnswers.sentence7
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence7 === correctAnswers.sentence7
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: Pekiştirme"}
                </div>
              )}
            </div>

            {/* Cümle 8 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                8. Çocuklar gülümseyerek{" "}
                <strong className="text-blue-600">tatlı tatlı</strong>{" "}
                konuşuyordu.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence8"
                    value="ikileme"
                    checked={answers.sentence8 === "ikileme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence8", e.target.value)
                    }
                    className="mr-2"
                  />
                  İkileme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sentence8"
                    value="pekiştirme"
                    checked={answers.sentence8 === "pekiştirme"}
                    onChange={(e) =>
                      handleAnswerChange("sentence8", e.target.value)
                    }
                    className="mr-2"
                  />
                  Pekiştirme
                </label>
              </div>
              {showResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    answers.sentence8 === correctAnswers.sentence8
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers.sentence8 === correctAnswers.sentence8
                    ? "✅ Doğru!"
                    : "❌ Yanlış! Doğru cevap: İkileme"}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            {!showResults ? (
              <button
                onClick={checkAnswers}
                disabled={Object.values(answers).some(
                  (answer) => answer === ""
                )}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  Puanınız: {getScore()}/8
                </div>
                <button
                  onClick={resetExercise}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Etkinlik 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            ✏️ Etkinlik 2: Boşluk Doldurma
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              <strong>Yönergeler:</strong> Aşağıdaki boşluklara uygun ikileme
              veya pekiştirme yazınız.
            </p>
          </div>

          <div className="space-y-4">
            {/* Cümle 1 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                1. Tatilde deniz o kadar güzeldi ki, suyun rengi{" "}
                <input
                  type="text"
                  value={fillBlanks.blank1}
                  onChange={(e) =>
                    handleFillBlankChange("blank1", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                görünüyordu.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank1.toLowerCase().trim() ===
                    correctFillBlanks.blank1.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank1.toLowerCase().trim() ===
                  correctFillBlanks.blank1.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank1}`}
                </div>
              )}
            </div>

            {/* Cümle 2 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                2. Öğretmenimiz konuyu{" "}
                <input
                  type="text"
                  value={fillBlanks.blank2}
                  onChange={(e) =>
                    handleFillBlankChange("blank2", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                anlattı, herkes çok iyi anladı.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank2.toLowerCase().trim() ===
                    correctFillBlanks.blank2.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank2.toLowerCase().trim() ===
                  correctFillBlanks.blank2.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank2}`}
                </div>
              )}
            </div>

            {/* Cümle 3 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                3. Bahçedeki güller{" "}
                <input
                  type="text"
                  value={fillBlanks.blank3}
                  onChange={(e) =>
                    handleFillBlankChange("blank3", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                olmuştu.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank3.toLowerCase().trim() ===
                    correctFillBlanks.blank3.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank3.toLowerCase().trim() ===
                  correctFillBlanks.blank3.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank3}`}
                </div>
              )}
            </div>

            {/* Cümle 4 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                4. Çocuklar bahçede{" "}
                <input
                  type="text"
                  value={fillBlanks.blank4}
                  onChange={(e) =>
                    handleFillBlankChange("blank4", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                oynuyorlardı.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank4.toLowerCase().trim() ===
                    correctFillBlanks.blank4.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank4.toLowerCase().trim() ===
                  correctFillBlanks.blank4.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank4}`}
                </div>
              )}
            </div>

            {/* Cümle 5 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                5. Yeni aldığım defter{" "}
                <input
                  type="text"
                  value={fillBlanks.blank5}
                  onChange={(e) =>
                    handleFillBlankChange("blank5", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                beyazdı.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank5.toLowerCase().trim() ===
                    correctFillBlanks.blank5.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank5.toLowerCase().trim() ===
                  correctFillBlanks.blank5.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank5}`}
                </div>
              )}
            </div>

            {/* Cümle 6 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                6. Annem sofrayı{" "}
                <input
                  type="text"
                  value={fillBlanks.blank6}
                  onChange={(e) =>
                    handleFillBlankChange("blank6", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                hazırlamıştı.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank6.toLowerCase().trim() ===
                    correctFillBlanks.blank6.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank6.toLowerCase().trim() ===
                  correctFillBlanks.blank6.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank6}`}
                </div>
              )}
            </div>

            {/* Cümle 7 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-lg mb-3">
                7. Yaşlı kadın{" "}
                <input
                  type="text"
                  value={fillBlanks.blank7}
                  onChange={(e) =>
                    handleFillBlankChange("blank7", e.target.value)
                  }
                  placeholder="Boşluğu doldurun"
                  className="border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600 w-32 text-center"
                />{" "}
                yürüyordu.
              </p>
              {showFillBlanksResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    fillBlanks.blank7.toLowerCase().trim() ===
                    correctFillBlanks.blank7.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fillBlanks.blank7.toLowerCase().trim() ===
                  correctFillBlanks.blank7.toLowerCase().trim()
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Doğru cevap: ${correctFillBlanks.blank7}`}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            {!showFillBlanksResults ? (
              <button
                onClick={checkFillBlanks}
                disabled={Object.values(fillBlanks).some(
                  (blank) => blank === ""
                )}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  Puanınız: {getFillBlanksScore()}/7
                </div>
                <button
                  onClick={resetFillBlanks}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Etkinlik 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            🧩 Etkinlik 3: Karışık Sözcükleri Düzenle
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              <strong>Yönergeler:</strong> Aşağıda karışık verilen sözcükleri
              düzenleyerek <strong>ikilemeli</strong> anlamlı bir cümle yazınız.
              Küçük/büyük harf ve noktalama önemsenmez.
            </p>
          </div>

          <div className="space-y-4">
            {/* Soru 1 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                1) tatlı / annem / tatlı / konuştu / bana
              </p>
              <input
                type="text"
                value={reorder.reorder1}
                onChange={(e) =>
                  handleReorderChange("reorder1", e.target.value)
                }
                placeholder="Cümlenizi yazın (örn: Annem bana tatlı tatlı konuştu)"
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showReorderResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(reorder.reorder1) === correctReorder.reorder1
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(reorder.reorder1) === correctReorder.reorder1
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Örnek doğru cümle: Annem bana tatlı tatlı konuştu`}
                </div>
              )}
            </div>

            {/* Soru 2 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                2) ağır / çalışıyordu / işçiler / ağır
              </p>
              <input
                type="text"
                value={reorder.reorder2}
                onChange={(e) =>
                  handleReorderChange("reorder2", e.target.value)
                }
                placeholder="Cümlenizi yazın (örn: İşçiler ağır ağır çalışıyordu)"
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showReorderResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(reorder.reorder2) === correctReorder.reorder2
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(reorder.reorder2) === correctReorder.reorder2
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Örnek doğru cümle: İşçiler ağır ağır çalışıyordu`}
                </div>
              )}
            </div>

            {/* Soru 3 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                3) kitaplar / üst / yığılmıştı / üst
              </p>
              <input
                type="text"
                value={reorder.reorder3}
                onChange={(e) =>
                  handleReorderChange("reorder3", e.target.value)
                }
                placeholder="Cümlenizi yazın (örn: Kitaplar üst üste yığılmıştı)"
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showReorderResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(reorder.reorder3) === correctReorder.reorder3
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(reorder.reorder3) === correctReorder.reorder3
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Örnek doğru cümle: Kitaplar üst üste yığılmıştı`}
                </div>
              )}
            </div>

            {/* Soru 4 */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                4) çiçekler / sapsarı / açtı / bahçede
              </p>
              <input
                type="text"
                value={reorder.reorder4}
                onChange={(e) =>
                  handleReorderChange("reorder4", e.target.value)
                }
                placeholder="Cümlenizi yazın (örn: Çiçekler bahçede sapsarı açtı)"
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showReorderResults && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(reorder.reorder4) === correctReorder.reorder4
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(reorder.reorder4) === correctReorder.reorder4
                    ? "✅ Doğru!"
                    : `❌ Yanlış! Örnek doğru cümle: Çiçekler bahçede sapsarı açtı`}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            {!showReorderResults ? (
              <button
                onClick={checkReorder}
                disabled={Object.values(reorder).some((v) => v === "")}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  Puanınız: {getReorderScore()}/4
                </div>
                <button
                  onClick={resetReorder}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Etkinlik 4 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            📝 Etkinlik 4: Metindeki İkilemeleri ve Pekiştirmeleri Bul
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              <strong>Yönergeler:</strong> Metni okuyun. Önce{" "}
              <strong>İkileme</strong>
              modunda ikilemeleri, sonra <strong>Pekiştirme</strong> modunda
              pekiştirmeleri <em>tıklayarak</em> seçin. Ardından &quot;Cevapları
              Kontrol Et&quot; butonuna basın.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-700">Mod:</span>
            <button
              onClick={() => setActivity4Mode("ikileme")}
              className={`px-3 py-1 rounded ${
                activity4Mode === "ikileme"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              İkileme
            </button>
            <button
              onClick={() => setActivity4Mode("pekiştirme")}
              className={`px-3 py-1 rounded ${
                activity4Mode === "pekiştirme"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Pekiştirme
            </button>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50 leading-8">
            {tokenizeActivity4(activity4Text).map((tok, idx) => {
              const isWord = isWordToken(tok);
              const selI = activity4SelectedI[idx];
              const selP = activity4SelectedP[idx];
              const base = "cursor-pointer px-0.5";
              const className = !isWord
                ? ""
                : selI
                ? "bg-yellow-200 underline underline-offset-4 " + base
                : selP
                ? "bg-green-200 underline underline-offset-4 " + base
                : base;
              return isWord ? (
                <span
                  key={idx}
                  className={className}
                  onClick={() => toggleActivity4Token(idx)}
                >
                  {tok}
                </span>
              ) : (
                <span key={idx}>{tok}</span>
              );
            })}
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            {!showActivity4Results ? (
              <button
                onClick={checkActivity4}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-3">
                {(() => {
                  const b = getActivity4Breakdown();
                  return (
                    <>
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                        İkilemeler: {b.ikileme}/3
                      </div>
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                        Pekiştirmeler: {b.pekistirme}/3
                      </div>
                    </>
                  );
                })()}
                <button
                  onClick={resetActivity4}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Etkinlik 5 */}
        <div className="bg-white rounded-lg shadow-lg p-6 my-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            ✍️ Etkinlik 5: Yönergeye Göre Cümle Yaz
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              Aşağıdaki yönergelere göre cümlelerinizi yazın. Dilerseniz
              noktalama kullanabilirsiniz.
            </p>
          </div>

          <div className="space-y-5">
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2 font-medium">
                1) İçinde bir <strong>pekiştirme sıfatı</strong> olsun.
              </p>
              <input
                type="text"
                value={activity5.s1}
                onChange={(e) =>
                  setActivity5({ ...activity5, s1: e.target.value })
                }
                placeholder="Örn: Oda tertemizdi."
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity5Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    containsAny(activity5.s1, pekistirmeWords)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {containsAny(activity5.s1, pekistirmeWords)
                    ? "✅ Pekiştirme var."
                    : "❌ Pekiştirme görünmüyor."}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2 font-medium">
                2) İçinde bir <strong>ikileme</strong> olsun.
              </p>
              <input
                type="text"
                value={activity5.s2}
                onChange={(e) =>
                  setActivity5({ ...activity5, s2: e.target.value })
                }
                placeholder="Örn: Yavaş yavaş yürüdük."
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity5Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    containsDuplicatedWord(activity5.s2)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {containsDuplicatedWord(activity5.s2)
                    ? "✅ İkileme var."
                    : "❌ İkileme görünmüyor (ör. tatlı tatlı, yavaş yavaş)."}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2 font-medium">
                3) Hem <strong>ikileme</strong> hem <strong>pekiştirme</strong>{" "}
                içeren bir cümle.
              </p>
              <input
                type="text"
                value={activity5.s3}
                onChange={(e) =>
                  setActivity5({ ...activity5, s3: e.target.value })
                }
                placeholder="Örn: Çocuklar bembeyaz karda neşe neşe koştular."
                className="w-full border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity5Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    containsDuplicatedWord(activity5.s3) &&
                    containsAny(activity5.s3, pekistirmeWords)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {containsDuplicatedWord(activity5.s3) &&
                  containsAny(activity5.s3, pekistirmeWords)
                    ? "✅ Her ikisi de var."
                    : "❌ İstenen öğeler eksik (ikileme ve/veya pekiştirme)."}
                </div>
              )}
            </div>
          </div>

          {/* Bu etkinlikte değerlendirme yok; kullanıcı serbestçe yazar. */}
        </div>

        {/* Etkinlik 6 */}
        <div className="bg-white rounded-lg shadow-lg p-6 my-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            🛠️ Etkinlik 6: Yanlış Yazılmış İkileme/Pekiştirmeyi Düzelt
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              Aşağıdaki cümlelerde yanlış yazılmış <strong>ikileme</strong> ya
              da
              <strong> pekiştirme</strong> var. Doğru biçimini kutucuğa yazın.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2">
                1) Çocuklar <strong>koşakoşa</strong> bahçeye gitti.
              </p>
              <input
                type="text"
                value={activity6.a1}
                onChange={(e) =>
                  setActivity6({ ...activity6, a1: e.target.value })
                }
                placeholder="Doğru yazımı"
                className="w-56 border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity6Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(activity6.a1) === normalize(activity6Correct.a1)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(activity6.a1) === normalize(activity6Correct.a1)
                    ? "✅ Doğru!"
                    : `❌ Doğru: ${activity6Correct.a1}`}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2">
                2) Bahçedeki çiçekler <strong>sapsara</strong> açmıştı.
              </p>
              <input
                type="text"
                value={activity6.a2}
                onChange={(e) =>
                  setActivity6({ ...activity6, a2: e.target.value })
                }
                placeholder="Doğru yazımı"
                className="w-56 border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity6Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(activity6.a2) === normalize(activity6Correct.a2)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(activity6.a2) === normalize(activity6Correct.a2)
                    ? "✅ Doğru!"
                    : `❌ Doğru: ${activity6Correct.a2}`}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2">
                3) Dedem bana <strong>tatlıtatlı</strong> baktı.
              </p>
              <input
                type="text"
                value={activity6.a3}
                onChange={(e) =>
                  setActivity6({ ...activity6, a3: e.target.value })
                }
                placeholder="Doğru yazımı"
                className="w-56 border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity6Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(activity6.a3) === normalize(activity6Correct.a3)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(activity6.a3) === normalize(activity6Correct.a3)
                    ? "✅ Doğru!"
                    : `❌ Doğru: ${activity6Correct.a3}`}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="mb-2">
                4) Kışın dağlar <strong>bembeyas</strong> olur.
              </p>
              <input
                type="text"
                value={activity6.a4}
                onChange={(e) =>
                  setActivity6({ ...activity6, a4: e.target.value })
                }
                placeholder="Doğru yazımı"
                className="w-56 border-b-2 border-blue-400 px-2 py-1 focus:outline-none focus:border-blue-600"
              />
              {showActivity6Results && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    normalize(activity6.a4) === normalize(activity6Correct.a4)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {normalize(activity6.a4) === normalize(activity6Correct.a4)
                    ? "✅ Doğru!"
                    : `❌ Doğru: ${activity6Correct.a4}`}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            {!showActivity6Results ? (
              <button
                onClick={checkActivity6}
                disabled={Object.values(activity6).some((v) => v === "")}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  Puanınız:{" "}
                  {
                    [
                      activity6Correct.a1,
                      activity6Correct.a2,
                      activity6Correct.a3,
                      activity6Correct.a4,
                    ].filter((_, idx) => {
                      const keys = ["a1", "a2", "a3", "a4"];
                      const k = keys[idx];
                      return (
                        normalize(activity6[k]) ===
                        normalize(activity6Correct[k])
                      );
                    }).length
                  }
                  /4
                </div>
                <button
                  onClick={resetActivity6}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Etkinlik 7 */}
        <div className="bg-white rounded-lg shadow-lg p-6 my-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            📖 Etkinlik 7: Paragraftaki İkilemeleri Bul
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              Paragrafı okuyun ve gördüğünüz <strong>ikilemeleri</strong>
              tıklayarak işaretleyin. Sonra Cevapları Kontrol Et'e basın.
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50 leading-8 whitespace-pre-wrap">
            {tokenizeGeneric(activity7Text).map((tok, idx, arr) => {
              const isWord = isWordToken(tok);
              const selected = activity7Selected[idx];
              const base = "cursor-pointer px-0.5 transition-colors";
              let className = base;
              if (isWord) {
                if (showActivity7Results) {
                  // Kontrol sonrası renkli gösterim
                  const isCorrect = (() => {
                    const tokens = tokenizeGeneric(activity7Text);
                    const wordPositions = tokens
                      .map((t, i) => (isWordToken(t) ? i : -1))
                      .filter((i) => i !== -1);
                    for (let k = 0; k < wordPositions.length - 1; k++) {
                      const i = wordPositions[k];
                      const j = wordPositions[k + 1];
                      const a = normalize(tokens[i]);
                      const b = normalize(tokens[j]);
                      if (a && b && a === b) {
                        const pair = `${a} ${b}`;
                        if (activity7CorrectPairs.includes(pair)) {
                          if (
                            (idx === i && activity7Selected[i]) ||
                            (idx === j && activity7Selected[j])
                          ) {
                            return true;
                          }
                        }
                      }
                    }
                    return false;
                  })();
                  if (selected && isCorrect) {
                    className += " bg-green-200 underline underline-offset-4";
                  } else if (selected && !isCorrect) {
                    className += " bg-red-200 underline underline-offset-4";
                  } else if (!selected && isCorrect) {
                    className += " bg-yellow-100";
                  }
                } else {
                  // Normal seçim modu
                  if (selected) {
                    className += " bg-yellow-200 underline underline-offset-4";
                  }
                }
              }
              return isWord ? (
                <span
                  key={idx}
                  className={className}
                  onClick={() =>
                    !showActivity7Results && toggleActivity7Token(idx)
                  }
                >
                  {tok}
                </span>
              ) : (
                <span key={idx}>{tok}</span>
              );
            })}
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            {!showActivity7Results ? (
              <button
                onClick={checkActivity7}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex gap-4 items-center flex-wrap justify-center">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  {(() => {
                    const tokens = tokenizeGeneric(activity7Text);
                    const wordPositions = tokens
                      .map((t, i) => (isWordToken(t) ? i : -1))
                      .filter((i) => i !== -1);
                    const found = new Set();
                    for (let k = 0; k < wordPositions.length - 1; k++) {
                      const i = wordPositions[k];
                      const j = wordPositions[k + 1];
                      const a = normalize(tokens[i]);
                      const b = normalize(tokens[j]);
                      if (
                        a &&
                        b &&
                        a === b &&
                        activity7Selected[i] &&
                        activity7Selected[j]
                      ) {
                        found.add(`${a} ${b}`);
                      }
                    }
                    const score = activity7CorrectPairs.filter((p) =>
                      found.has(p)
                    ).length;
                    return `Bulunan ikilemeler: ${score}/${activity7CorrectPairs.length}`;
                  })()}
                </div>
                <button
                  onClick={resetActivity7}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
