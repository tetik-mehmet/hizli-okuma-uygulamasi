"use client";

import { useState } from "react";
import Exercise2 from "@/app/genel/bolum1/exercise2/page";
import Exercises from "@/app/genel/bolum1/exercises/page";
import HayvanKartlari from "@/app/genel/odak/hayvan-kartlari/page";
import RenkKaybolma from "@/app/genel/odak/renk-kaybolma/page";
import Ikilemeler from "@/app/genel/odak/ikilemeler/page";
import KaybolanMetin from "@/app/genel/bolum1/kaybolan-metin/page";
import Cabucak from "@/app/genel/bolum1/cabucak/page";

export default function Odev5() {
  const steps = [
    { key: "exercise2", title: "Görsel Takip - 1" },
    { key: "exercises", title: "Hızlı Okuma" },
    { key: "hayvankartlari", title: "Hayvan Kartları (5 Hayvan)" },
    { key: "renkkaybolma", title: "Renk Kaybolma (2 Oyun)" },
    { key: "ikilemeler", title: "İkilemeler (2 Etkinlik)" },
    { key: "kaybolanmetin", title: "Kaybolan Metin (2 Metin)" },
    { key: "cabucak", title: "Çabucak (2 Alıştırma)" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const goPrev = () => setCurrentStep((s) => Math.max(0, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(steps.length - 1, s + 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Ödev 5: Sınırlı Alıştırmalar
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            İlk iki alıştırma Ödev 1 ile aynıdır. Sonraki 5 alıştırma sınırlı
            sayıda etkinlik içerir.
          </p>
        </div>

        {/* Adım Göstergesi */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <ol className="grid grid-cols-1 sm:grid-cols-7 gap-3">
            {steps.map((step, idx) => (
              <li
                key={step.key}
                className={`flex items-center p-3 rounded-xl border transition-colors ${
                  idx === currentStep
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mr-3 ${
                    idx === currentStep
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {idx + 1}
                </span>
                <span
                  className={`text-sm font-medium ${
                    idx === currentStep ? "text-indigo-700" : "text-gray-700"
                  }`}
                >
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Adım İçeriği */}
        <div className="mb-6">
          {currentStep === 0 && (
            <div className="rounded-2xl overflow-hidden">
              {/* Exercise2 içeriği birebir */}
              <Exercise2 />
            </div>
          )}

          {currentStep === 1 && (
            <div className="rounded-2xl overflow-hidden">
              <Exercises />
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-2xl overflow-hidden">
              {/* Sadece ilk 5 hayvanı göster */}
              <HayvanKartlari visibleHayvanlar={[1, 2, 3, 4, 5]} />
            </div>
          )}

          {currentStep === 3 && (
            <div className="rounded-2xl overflow-hidden">
              {/* Sadece 2 oyun göster */}
              <RenkKaybolma visibleOyunlar={[1, 2]} />
            </div>
          )}

          {currentStep === 4 && (
            <div className="rounded-2xl overflow-hidden">
              {/* Sadece 2 etkinlik göster */}
              <Ikilemeler visibleEtkinlikler={[1, 2]} />
            </div>
          )}

          {currentStep === 5 && (
            <div className="rounded-2xl overflow-hidden">
              {/* Sadece 2 metin göster */}
              <KaybolanMetin visibleMetinler={[1, 2]} />
            </div>
          )}

          {currentStep === 6 && (
            <div className="rounded-2xl overflow-hidden">
              {/* Sadece 2 alıştırma göster */}
              <Cabucak visibleAlistirmalar={[1, 2]} />
            </div>
          )}
        </div>

        {/* Navigasyon Butonları */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className={`px-5 py-2.5 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
              currentStep === 0
                ? "bg-gray-200 text-gray-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Geri
          </button>

          <div className="flex-1"></div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={goNext}
              className="px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              İleri
            </button>
          ) : (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-5 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition"
            >
              Bitir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
