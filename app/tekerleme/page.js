"use client";

import { useState } from "react";

const DEFAULT_TEKERLEMELER = [
  'Bir berber bir berbere, "Gel beraber bir berber dükkanı açalım" demiş.',
  "Dal sarkar kartal kalkar, kartal kalkar dal sarkar.",
  "Şu köşe yaz köşesi, şu köşe kış köşesi, ortada su şişesi.",
  "Bir pirinci kırk birinciye kırk kere kırptırdım.",
  "Deniz denizden deniz, denizden deniz ne deniz.",
  "Kırk küp kırkının da kulpu kırık küp.",
  "Kırk küp kırkının da kulpu kırık küp müdür, kırık kulp mudur?",
  "Kırlık kız kırk kırmızı kurdeleyle kırk kırmızı kuş kondurmuş.",
  "İki köpek karşı karşıya gelmiş, karşılıklı havlamışlar.",
  "Sakla samanı, gelir zamanı; sakla samandan çıkar keramet.",
];

export default function TekerlemeOkuma({ items = DEFAULT_TEKERLEMELER }) {
  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(items.length - 1, i + 1));

  return (
    <div className="min-h-[520px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 font-inter">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Tekerlemeler
            </h2>
            <div className="px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700">
              {index + 1} / {items.length}
            </div>
          </div>

          <div className="text-lg md:text-xl leading-relaxed text-gray-800 bg-amber-50 border border-amber-100 rounded-xl p-5">
            {items[index]}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={index === 0}
              className={`px-5 py-2.5 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                index === 0
                  ? "bg-gray-200 text-gray-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Önceki
            </button>

            <div className="flex-1" />

            <button
              onClick={goNext}
              className={`px-5 py-2.5 rounded-xl font-semibold text-white transition ${
                index < items.length - 1
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {index < items.length - 1 ? "Sonraki" : "Tamamla"}
            </button>
          </div>

          <details className="mt-6">
            <summary className="cursor-pointer select-none text-sm text-gray-600 hover:text-gray-800">
              Tüm listeyi göster
            </summary>
            <ol className="list-decimal ml-5 mt-3 space-y-2 text-gray-700">
              {items.map((t, i) => (
                <li key={i} className="leading-relaxed">
                  {t}
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </div>
  );
}
