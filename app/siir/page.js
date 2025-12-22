"use client";

import React, { useMemo, useState } from "react";

// Şiir metni (kullanıcının görselde verdiği metnin tamamı)
const POEM_TEXT = `Gemiler geçer rüyalarımda,
Allı pullu gemiler, damların üzerinden;
Ben zavallı,
Ben yıllardır denize hasret,
"Bakar bakar ağlarım."

Hatırlarım ilk görüşümü dünyayı,
Bir midye kabuğunun aralığından;
Suların yeşili,göklerin mavisi,
Lapinaların en harelisi...
Hala tuzlu akar kanım
İstridyelerin kestiği yerden.

Neydi o deli gibi gidişimiz,
Bembeyaz köpüklerle, açıklara!
Köpükler ki fena kalpli değil,
Köpükler ki dudaklara benzer;
Köpükler ki insanlarla
Zinaları ayıp değil.

Gemiler gecer rüyalarımda,
Allı pullu gemiler,damların üzerinden;
Ben zavallı,
Ben yıllardır denize hasret`;

export default function SiirSayfasi() {
  const lines = useMemo(() => POEM_TEXT.split("\n"), []);
  const [cevap, setCevap] = useState("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white text-gray-900 font-inter">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">Şiir</h1>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {lines.map((line, lineIdx) => {
            if (line.trim() === "") {
              return <div key={lineIdx} className="h-5" />;
            }

            return (
              <p key={lineIdx} className="leading-8 text-lg">
                {line}
              </p>
            );
          })}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">
            Şiirden Ne Anladın? Ana Fikri Yaz
          </h2>
          <label htmlFor="cevap" className="block text-sm text-gray-600 mb-2">
            Şiirden ne anladığını ve ana fikrini tek bir kutuya yaz.
          </label>
          <textarea
            id="cevap"
            rows={6}
            value={cevap}
            onChange={(e) => setCevap(e.target.value)}
            placeholder="Örn: Şiir, denize duyulan özlemi ve çocukluk anılarını anlatıyor. Ana fikir: ..."
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-2 text-xs text-gray-500">
            {cevap.length} karakter
          </div>
        </div>
      </div>
    </div>
  );
}
