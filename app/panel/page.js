"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Eye,
  Target,
  ArrowRight,
  ArrowLeft,
  Brain,
} from "lucide-react";
import { checkPageAccess } from "@/lib/checkAccess";

export default function Panel() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");

  // Sayfa yüklendiğinde giriş ve abonelik kontrolü
  useEffect(() => {
    // Erişim kontrolü
    const accessCheck = checkPageAccess("/panel");
    if (!accessCheck.hasAccess) {
      router.push(accessCheck.redirectPath || "/subscription-expired");
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authToken = localStorage.getItem("authToken");
    const name = localStorage.getItem("userName");
    const surname = localStorage.getItem("userSurname");

    if (!isLoggedIn || !authToken) {
      router.push("/login");
      return;
    }


    setUserName(name || "");
    setUserSurname(surname || "");
    setIsLoading(false);
  }, [router]);

  // Geri dön fonksiyonu
  const handleGoBack = () => {
    router.push("/genel");
  };

  const alistirmalar = [
    {
      id: 1,
      baslik: "Hızlı Kelime Egzersizi",
      aciklama: "Kelimeleri hızlıca görüp tanıma alıştırması",
      icon: <BookOpen className="w-8 h-8" />,
      renk: "from-blue-500 to-purple-600",
      yol: "genel/bolum1/exercises",
    },
    {
      id: 2,
      baslik: "Göz Takibi Egzersizi",
      aciklama: "8 şeklinde hareket eden balık ile göz takibi",
      icon: <Eye className="w-8 h-8" />,
      renk: "from-orange-500 to-red-600",
      yol: "genel/bolum1/exercise2",
    },
    {
      id: 3,
      baslik: "Genel Alıştırmalar",
      aciklama: "Çeşitli hızlı okuma alıştırmaları",
      icon: <Target className="w-8 h-8" />,
      renk: "from-green-500 to-teal-600",
      yol: "genel/bolum1/exercise3",
    },
    {
      id: 4,
      baslik: "Hafıza Alıştırmaları",
      aciklama: "Hafıza ve konsantrasyon becerilerini geliştiren egzersizler",
      icon: <Brain className="w-8 h-8" />,
      renk: "from-pink-500 to-rose-600",
      yol: "genel/bolum1/hafiza",
    },
    {
      id: 5,
      baslik: "Özel Alıştırmalar",
      aciklama: "Kişiselleştirilmiş ve gelişmiş hızlı okuma teknikleri",
      icon: <Target className="w-8 h-8" />,
      renk: "from-yellow-500 to-orange-600",
      yol: "genel/bolum1/ozel", // /exercise4'ten /ozel'e değiştirildi
    },
    {
      id: 6,
      baslik: "Çabucak Görelim",
      aciklama: "Hızlıca gör ve tanı alıştırması",
      icon: <Eye className="w-8 h-8" />,
      renk: "from-indigo-500 to-blue-600",
      yol: "genel/bolum1/cabucak",
    },
    {
      id: 7,
      baslik: "Kaybolan Metin",
      aciklama: "Metinleri hızlıca okuyup hatırlama alıştırması",
      icon: <BookOpen className="w-8 h-8" />,
      renk: "from-emerald-500 to-green-600",
      yol: "genel/bolum1/kaybolan-metin",
    },
  ];

  const alistirmayaGit = (yol) => {
    router.push(yol);
  };

  // Loading durumunda loading göster
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - Başlık ve Geri Butonu */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hızlı Okuma Alıştırmaları
            </h1>
            {userName && userSurname && (
              <p className="text-xl text-blue-600 mb-4 font-semibold">
                Hoş geldin, {userName} {userSurname}!
              </p>
            )}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hızlı okuma becerilerinizi geliştirmek için aşağıdaki
              alıştırmaları sırayla yapabilirsiniz. Her alıştırma farklı bir
              beceriyi hedefler.
            </p>
          </div>

          {/* Geri Dön Butonu */}
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </button>
        </div>

        {/* Alıştırma Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {alistirmalar.map((alistirma, index) => (
            <div
              key={alistirma.id}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={() => alistirmayaGit(alistirma.yol)}
            >
              {/* Gradient Arka Plan */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${alistirma.renk} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* İçerik */}
              <div className="relative p-6">
                {/* İkon */}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${alistirma.renk} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {alistirma.icon}
                </div>

                {/* Başlık */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                  {alistirma.baslik}
                </h3>

                {/* Açıklama */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {alistirma.aciklama}
                </p>

                {/* Buton */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Alıştırma #{index + 1}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${alistirma.renk} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Hover Efekti */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${alistirma.renk} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
