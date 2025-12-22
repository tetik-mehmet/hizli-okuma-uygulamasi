"use client";

import { useEffect, useMemo, useState } from "react";
import Exercise2 from "@/app/genel/bolum1/exercise2/page";
import Exercises from "@/app/genel/bolum1/exercises/page";
import BilmecePage from "@/app/genel/oyunkategori/bilmece/page";
import OdakliOkuma from "@/app/odakli-okuma/page";
import SagsolPage from "@/app/genel/bolum1/hafiza/sagsol/page";
import TamamlaPage from "@/app/genel/bolum1/ozel/tamamla/page";
import GorselYorumlama from "@/app/genel/odak/gorsel-yorumlama/page";

export default function Odev4() {
  const fixedSteps = useMemo(
    () => [
      { key: "exercise2", title: "Görsel Takip - 1" },
      { key: "exercises", title: "Hızlı Okuma" },
    ],
    []
  );

  const randomizableSteps = useMemo(
    () => [
      { key: "gorselyorum", title: "Görsel Yorumlama" },
      { key: "bilmece", title: "Bilmece Oyunu" },
      { key: "odakli", title: "Odaklı Okuma" },
      { key: "sagsol", title: "Sağ-Sol Egzersizi" },
      { key: "tamamla", title: "Eksik Harfleri Tamamla" },
    ],
    []
  );

  const [shuffled, setShuffled] = useState(randomizableSteps);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setShuffled((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const steps = useMemo(
    () => [...fixedSteps, ...shuffled],
    [fixedSteps, shuffled]
  );

  const goPrev = () => setCurrentStep((s) => Math.max(0, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(steps.length - 1, s + 1));

  const renderCurrent = () => {
    const key = steps[currentStep]?.key;
    if (key === "exercise2") {
      return <Exercise2 />;
    }
    if (key === "exercises") {
      return <Exercises />;
    }
    if (key === "gorselyorum") {
      return <GorselYorumlama />;
    }
    if (key === "bilmece") {
      return <BilmecePage />;
    }
    if (key === "odakli") {
      return <OdakliOkuma />;
    }
    if (key === "sagsol") {
      return <SagsolPage />;
    }
    if (key === "tamamla") {
      return <TamamlaPage />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 font-inter">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Ödev 4: Karışık Etkinlikler
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            İlk iki etkinlik Ödev 1 ile aynıdır. Sonraki 5 etkinlik farklı
            sayfalardan rastgele sıralanmıştır.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <ol className="grid grid-cols-1 sm:grid-cols-7 gap-3">
            {steps.map((step, idx) => (
              <li
                key={`${step.key}-${idx}`}
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

        <div className="mb-6">
          <div className="rounded-2xl overflow-hidden">{renderCurrent()}</div>
        </div>

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
